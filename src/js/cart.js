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
  updateCartCount(cartItems.length);
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

const badge = document.getElementById('cart-badge');
const cartBtn = document.getElementById('cart-btn');

function updateCartCount(count) {
  const n = Number(count) || 0;

  if (n <= 0) {
    badge.textContent = '0';
    badge.classList.add('hidden');
    cartBtn?.setAttribute('aria-label', 'cart, empty');
  } else {
    badge.textContent = n > 99 ? '99+' : String(n);
    badge.classList.remove('hidden');
    cartBtn?.setAttribute('aria-label', `cart, ${n} item${n > 1 ? 's' : ''}`);

    // animation effect
    badge.style.transform = 'scale(1.25)';
    setTimeout(() => (badge.style.transform = ''), 120);
  }
}

function renderTotal(cartItems) {
  let sumPrices = 0;
  cartItems.forEach((item) => {
    sumPrices += item.FinalPrice;
  });

  priceContainer.textContent = `Total: $${sumPrices.toFixed(2)}`;
}

renderCartContents();

