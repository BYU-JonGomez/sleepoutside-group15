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
  return items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity || 1,
    };
  });
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
      if (err.name === 'servicesError') {
        const errorMessages = Object.values(err.message).join('\n');
        alert(errorMessages);
      } else {
        alert("An unknown error occurred during checkout.");
      }
    }
  }
}
