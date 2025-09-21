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


  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      const container = document.getElementById("product-details");
      if (container) {
        container.innerHTML = `<p style="color:red;">Product not found. Please check the link or ID.</p>`;
      }
      return;
    }

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

    cart.push(this.product);
    setLocalStorage("so-cart", cart);
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
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
