import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
// first create an instance of the ExternalServices class.
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();

const searchForm = document.getElementById("searchForm");

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();

    if (query) {
      // ✅ Ajustá esta ruta a donde realmente está tu product-list.html
      window.location.href = `${window.location.origin}/search-product/search_product.html?search=${encodeURIComponent(query)}`;
    }
  });
}
