import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter().then(() => {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  updateCartCount(cartItems.length);
});

const priceContainer = document.getElementById("price-container");
const divRef = document.querySelector(".price-div");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    document.querySelectorAll(".cart-remove-item").forEach((btn) => {
      btn.addEventListener("click", removeFromCart);
    });

    renderTotal(cartItems);
    updateCartCount(cartItems.length);
  } else {
    divRef.setAttribute("class", "hidden");
    document.querySelector(".product-list").innerHTML = "";
    updateCartCount(0);
  }
}

function cartItemTemplate(item, index) {
  const imgSrc = item.Images ? item.Images.PrimaryMedium : item.Image;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imgSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">${item.FinalPrice}</p>
  <button class="cart-remove-item" data-index="${index}">❌</button>
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

function removeFromCart(event) {
  const index = event.target.dataset.index;
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems.splice(index, 1);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

export function updateCartCount(count) {
  const badge = document.getElementById("cart-badge");
  const cartBtn = document.getElementById("cart-btn");
  if (!badge) return; // si la página no tiene el badge, no hace nada

  const n = Number(count) || 0;

  if (n <= 0) {
    badge.textContent = "0";
    badge.classList.add("hidden");
    cartBtn?.setAttribute("aria-label", "cart, empty");
  } else {
    badge.textContent = n > 99 ? "99+" : String(n);
    badge.classList.remove("hidden");
    cartBtn?.setAttribute("aria-label", `cart, ${n} item${n > 1 ? "s" : ""}`);
    badge.style.transform = "scale(1.25)";
    setTimeout(() => (badge.style.transform = ""), 120);
  }
}
renderCartContents();
