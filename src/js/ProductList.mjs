import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <picture>
          <source media="(min-width: 1950px)" srcset="${product.Images.PrimaryExtraLarge}" />
          <source media="(min-width: 1200px)" srcset="${product.Images.PrimaryLarge}" />
          <source media="(min-width: 700px)" srcset="${product.Images.PrimaryMedium}" />
          <img src="${product.Images.PrimarySmall}" alt="${product.Name}" />
        </picture>
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="quick-view-btn" data-id="${product.Id}">
        Quick View
      </button>
    </li>
  `;
}


export default class ProductList {
  constructor(productCategory, dataSource, listElement) {
    this.productCategory = productCategory;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.productCategory);

    this.renderList(list);
    this.addQuickViewListeners(list);

    document.querySelector("h2").innerHTML = "Top Products: " + this.productCategory;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addQuickViewListeners(products) {
    const buttons = this.listElement.querySelectorAll(".quick-view-btn");
    const modal = document.getElementById("productModal");
    const modalDetails = document.getElementById("modalDetails");
    const closeModal = document.getElementById("closeModal");

    if (!modal || !closeModal || !modalDetails) {
      console.error("Modal elements not found in the DOM");
      return;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;
        const product = products.find((p) => p.Id == productId);
        if (product) {
          modalDetails.innerHTML = this.buildModalContent(product);
          modal.showModal();
        }
      });
    });

    closeModal.addEventListener("click", () => {
      modal.close();
    });
  }

  buildModalContent(product) {
    return `
      <div class="modal-product">
        <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
        <div>
          <h2>${product.Name}</h2>
          <p>Brand: ${product.Brand.Name}</p>
          <p>Price: $${product.FinalPrice}</p>
          <p>${product.DescriptionHtmlSimple}</p>
        </div>
      </div>
    `;
  }
}
