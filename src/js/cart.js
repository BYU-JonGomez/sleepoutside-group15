import { getLocalStorage } from "./utils.mjs";
const priceContainer = document.getElementById("price-container");
const divRef = document.querySelector(".price-div");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    renderTotal(cartItems);
  } else {
    divRef.setAttribute("class", `hidden`);
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function renderTotal(cartItems) {
  let sumPrices = 0;
  cartItems.forEach((item) => {
    sumPrices += item.FinalPrice;
  });

  priceContainer.textContent = `Total: $${sumPrices.toFixed(2)}`;
}
renderCartContents();
