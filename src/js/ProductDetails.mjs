import { getLocalStorage, setLocalStorage } from "./utils.mjs";

/**
 * ProductDetails class
  * Manages fetching, rendering, and adding a product to the cart
 */
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;      // Product ID to look up
    this.product = {};               // Product details object
    this.dataSource = dataSource;    // Instance of ExternalServices for fetching
  }


  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  /**
   * Add the current product to the cart (stored in localStorage)
   */
  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    if (!this.product || !this.product.Id) {
      alert("Could not add the product. Try reloading the page.");
      return;
    }

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert("Product added to the cart!");
  }

  /**
   * Render product details into the #product-details container
   */
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.getElementById("product-brand-name").textContent = product.Brand.Name;
  document.getElementById("product-name").textContent = product.Name;
  document.getElementById("productImage").src = product.Images.PrimaryLarge;
  document.getElementById("productImage").alt = product.Name;
  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}
