import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";

const productData = new ProductData("tents");
const productListElement = qs(".product-list");

const productList = new ProductList("tents", productData, productListElement);
productList.init();
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
