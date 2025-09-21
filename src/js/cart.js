import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs"; // Added setLocalStorage

loadHeaderFooter();

const priceContainer = document.getElementById("price-container");
const divRef = document.querySelector(".price-div");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    renderTotal(cartItems);
    attachRemoveEventListeners(); // Call to attach listeners
  } else {
    divRef.setAttribute("class", `hidden`);
  }
  updateCartCount(cartItems.length);
}

function cartItemTemplate(item) {
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
    <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
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

// New function to remove item from cart
function removeItemFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex(item => item.Id === id);
  if (index > -1) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents(); // Re-render the cart after removal
  }
}

// New function to attach event listeners to remove buttons
function attachRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      removeItemFromCart(id);
    });
  });
}


const badge = document.getElementById("cart-badge");
const cartBtn = document.getElementById("cart-btn");

export function updateCartCount(count) {
  const n = Number(count) || 0;

  if (n <= 0) {
    badge.textContent = "0";
    badge.classList.add("hidden");
    cartBtn?.setAttribute("aria-label", "cart, empty");
  } else {
    badge.textContent = n > 99 ? "99+" : String(n);
    badge.classList.remove("hidden");
    cartBtn?.setAttribute("aria-label", `cart, ${n} item${n > 1 ? "s" : ""}`);

    // animation effect
    badge.style.transform = "scale(1.25)";
    setTimeout(() => (badge.style.transform = ""), 120);
  }
}
renderCartContents();