import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const services = new ExternalServices();
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");
const container = document.querySelector(".product-list");

const validCategories = ["tents", "backpacks", "sleeping bags", "hammocks"];

function renderSearchResults(products) {
  if (!products || products.length === 0) {
    container.innerHTML = "<p>No products were found.</p>";
    return;
  }

  const html = products
    .map(
      (product) => `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">${product.FinalPrice}</p>
      </a>
    </li>
  `,
    )
    .join("");

  container.innerHTML = html;
}

async function initSearch() {
  if (!searchQuery) {
    container.innerHTML = "<p>No search term specified.</p>";
    return;
  }

  try {
    const normalizedQuery = searchQuery.toLowerCase();

    if (validCategories.includes(normalizedQuery)) {
      const results = await services.getData(normalizedQuery);
      renderSearchResults(results);
    } else {
      let allProducts = [];

      for (const cat of validCategories) {
        const categoryProducts = await services.getData(cat);
        allProducts = allProducts.concat(categoryProducts);
      }

      // Filtrar por nombre (o marca si querés)
      const filtered = allProducts.filter(
        (product) =>
          product.Name.toLowerCase().includes(normalizedQuery) ||
          product.Brand.Name.toLowerCase().includes(normalizedQuery),
      );

      renderSearchResults(filtered);
    }
  } catch (error) {
    console.error("Error performing search:", error);
    container.innerHTML =
      "<p>An error occurred while searching for products.</p>";
  }
}

initSearch();
