import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// PRUEBA GIT 2

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // get current cart or empty array
  let cart = getLocalStorage("so-cart") || [];

  // add new product
  cart.push(product);

  // save updated cart
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
