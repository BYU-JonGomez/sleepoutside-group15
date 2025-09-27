import { renderTotal } from "./cart.js"
import { getLocalStorage } from "./utils.mjs";

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
        this.calculateItemSummary();
    }

    calculateItemSubtotal() {
        this.itemTotal = renderTotal();
    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal) * 0.06;
        this.shipping = totalShipping;
        if (this.list != 0) {
            this.shipping = 10;
            const items = this.list.length;
            if (items >= 2) {
                const totalShipping = (items - 1) * 2;
                return totalShipping + this.shipping;
            }
            this.orderTotal = this.tax + this.shipping;
            this.displayOrderTotal(this.orderTotal);
        }
    }
    displayOrderTotal() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        tax.innerText = `$${this.tax.toFixed(2)}`;
    }
}