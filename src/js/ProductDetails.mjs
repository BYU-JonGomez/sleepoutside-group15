import { getLocalStorage, setLocalStorage } from "./utils.mjs";

/**
 * ProductDetails class
  * Manages fetching, rendering, and adding a product to the cart
 */
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;      // Product ID to look up
    this.product = {};               // Product details object
    this.dataSource = dataSource;    // Instance of ProductData for fetching
  }

  /**
   * Initialize the product page: fetch data, render, and set up event listeners
   */
  async init() {
    // 1️⃣ Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Handle missing product
    if (!this.product) {
      const container = document.getElementById("product-details");
      if (container) {
        container.innerHTML = `<p style="color:red;">Product not found. Please check the link or ID.</p>`;
      }
      return;
    }

    // 2️⃣ Render HTML for product
    this.renderProductDetails();

    // 3️⃣ Attach "Add to Cart" listener
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  /**
   * Add the current product to the cart (stored in localStorage)
   */
  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];

    if (!this.product || !this.product.Id) {
      alert("Could not add the product. Try reloading the page.");
      return;
    }

    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    alert("Product added to the cart!");
  }

  /**
   * Render product details into the #product-details container
   */
  renderProductDetails() {
    const container = document.getElementById("product-details");
    if (!container) return;

    const colors = (this.product.Colors || []).map((c) => c.ColorName).join(", ");

    container.innerHTML = `
      <section class="product-detail">
        <h3>${this.product.Brand?.Name || ""}</h3>
        <h2 class="divider">${this.product.Name || ""}</h2>
        <img
          class="divider"
          src="${this.product.Image || ""}"
          alt="${this.product.Name || ""}"
          id="productImage"
        />
        <p class="product-card__price">$${this.product.FinalPrice || ""}</p>
        <p class="product__color">${colors}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple || ""}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id || ""}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}
