import { renderListWithTemplate } from "./utils.mjs";

// template for product card
// function productCardTemplate(product) {
//   return `
//     <li class="product-card">
//       <a href="product_pages/?product=${product.Id}">
//         <img
//           src="${product.Image || ""}"
//           alt="${product.Name || ""}"
//         />
//         <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
//         <h2 class="card__name">${product.Name || ""}</h2>
//         <p class="product-card__price">$${product.FinalPrice || ""}</p>
//       </a>
//     </li>
//   `;
// }

// export default class ProductList {
//   constructor(category, dataSource, listElement) {
//     this.category = category;
//     this.dataSource = dataSource;
//     this.listElement = listElement;
//   }

//   async init() {
//     const list = await this.dataSource.getData();

//     // filter only products with detail pages
//     const filteredList = list.filter((product) => {
//       const allowedIds = ["880RR", "985RF", "985PR", "344YJ"];
//       return allowedIds.includes(product.Id);
//     });

//     this.renderList(filteredList);
//   }

//   renderList(list) {
//     renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend", true);
//   }
// }
function productCardTemplate(product) {
  return `
        <li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
            <h2>${product.Brand.Name}</h2>
            <h3>${product.Name}</h3>
            <p class="product-card__price">${product.FinalPrice}</p>
        </a>
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
    document.querySelector("h2").innerHTML = "Top Products: " + this.productCategory;
  }

  renderList(list) {
    //First renderList
    //const htmlStrings = list.map(productCardTemplate);
    //this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
