import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateOrderSummary();
  }

  calculateOrderSummary() {
    if (this.list && this.list.length > 0) {
      this.itemTotal = this.list.reduce(
        (total, item) => total + item.FinalPrice * (item.quantity || 1),
        0
      );
      this.shipping = 10 + (this.list.length - 1) * 2;
    } else {
        this.itemTotal = 0;
        this.shipping = 0;
    }
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    this.displayOrderSummary();
  }

  displayOrderSummary() {
    if (this.outputSelector) {
      const element = document.querySelector(this.outputSelector);
      if (element) {
        element.innerHTML = `
            <div class="summary-item">
                <span>Subtotal</span>
                <span>${this.itemTotal.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span>Shipping</span>
                <span>${this.shipping.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span>Tax</span>
                <span>${this.tax.toFixed(2)}</span>
            </div>
            <div class="summary-item total">
                <span>Total</span>
                <span>${this.orderTotal.toFixed(2)}</span>
            </div>
        `;
      }
    }
  }

  async checkout(form) {
    const json = formDataToJSON(form);

    if (json.cardNumber) {
      json.cardNumber = json.cardNumber.replace(/-/g, "");
    }

    json.orderDate = new Date().toISOString();
    json.items = packageItems(this.list);
    json.orderTotal = this.orderTotal.toFixed(2);
    json.shipping = this.shipping.toFixed(2);
    json.tax = this.tax.toFixed(2);

    try {
      const res = await services.checkout(json);
      setLocalStorage(this.key, []);
      location.assign("/checkout/success.html");
    } catch (err) {
      console.error(err);

      // Build an array of error messages from the server response
      let messages = [];
      if (err && err.name === "servicesError") {
        const src = err.message;
        if (Array.isArray(src)) {
          messages = src;
        } else if (src && typeof src === "object") {
          messages = Object.values(src);
        } else if (typeof src === "string") {
          messages = [src];
        } else {
          messages = ["There was a problem processing your payment."];
        }
      } else {
        messages = ["An unknown error occurred during checkout."];
      }

      // Ensure an alert container exists just above the form
      const formEl =
        form instanceof HTMLFormElement
          ? form
          : document.querySelector("#checkout-form");
      let container = document.querySelector("#checkout-messages");
      if (!container) {
        container = document.createElement("div");
        container.id = "checkout-messages";
        container.className = "alert-container";
        container.setAttribute("aria-live", "polite");
        if (formEl && formEl.parentNode) {
          formEl.parentNode.insertBefore(container, formEl);
        } else {
          document.body.prepend(container);
        }
      }

      // Simple HTML-escape helper
      const escape = (s) => {
        const d = document.createElement("div");
        d.textContent = String(s);
        return d.innerHTML;
      };

      // Render each error as a dismissible banner (no alerts)
      container.innerHTML = messages
        .map(
          (m) =>
            `<div class="alert-banner" role="alert">
               <span>${escape(m)}</span>
               <button class="alert-close" type="button" aria-label="Close">×</button>
             </div>`
        )
        .join("");

      // One-time event delegation to close banners
      if (!container.dataset.bound) {
        container.addEventListener("click", (e) => {
          if (e.target && e.target.classList.contains("alert-close")) {
            e.target.parentElement.remove();
          }
        });
        container.dataset.bound = "1";
      }

      // Bring the messages into view without disrupting form styles
      if (container && typeof container.scrollIntoView === "function") {
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
}
