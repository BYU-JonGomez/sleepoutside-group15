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

    // if (!this.product) {
    //   const container = document.getElementById("product-details");
    //   if (container) {
    //     container.innerHTML = `<p style="color:red;">Product not found. Please check the link or ID.</p>`;
    //   }
    //   return;
    // }

    this.renderProductDetails();

    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  /**
   * Add the current product to the cart (stored in localStorage)
   */
  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    // if (!this.product || !this.product.Id) {
    //   alert("Could not add the product. Try reloading the page.");
    //   return;
    // }

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
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
