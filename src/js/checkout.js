import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess("so-cart", "#summary-container");
checkoutProcess.init();

const form = document.querySelector("#checkout-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutProcess.checkout(form);
});

// Input formatting
const cardNumberInput = document.querySelector("#cardNumber");
cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += "-";
        }
        formattedValue += value[i];
    }
    e.target.value = formattedValue;
});

const expirationInput = document.querySelector("#expiration");
expirationInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }
    e.target.value = value;
});