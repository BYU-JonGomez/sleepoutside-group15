import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Obtener los detalles del producto
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. Renderizar los detalles en el HTML
    this.renderProductDetails();

    // 3. Agregar el event listener al botón "Add to Cart" (después de renderizar)
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    // Obtener el carrito actual o un array vacío
    let cart = getLocalStorage("so-cart") || [];

    // Agregar el producto actual
    cart.push(this.product);

    // Guardar el carrito actualizado
    setLocalStorage("so-cart", cart);

    // Opcional: mostrar mensaje de éxito
    alert("¡Producto agregado al carrito!");
  }

  renderProductDetails() {
    // Suponiendo que tienes un contenedor con id="product-details" en tu HTML
    const container = document.getElementById("product-details");
    if (!container) return;

    // Mostrar los colores disponibles usando map
    const colores = (this.product.Colors || [])
      .map((color) => `<span class="color">${color.ColorName}</span>`)
      .join(", ");

    container.innerHTML = `
      <h2>${this.product.Name}</h2>
      <img src="${this.product.Image}" alt="${this.product.Name}" style="max-width:300px;">
      <div>${this.product.DescriptionHtmlSimple || ""}</div>
      <p>Colores disponibles: ${colores}</p>
      <p>Precio: $${this.product.FinalPrice}</p>
      <button id="addToCart">Agregar al carrito</button>
    `;
  }
}