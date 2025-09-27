import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";

const ExternalServices = new ExternalServices("tents");
const productListElement = qs(".product-list");

const productList = new ProductList("tents", ExternalServices, productListElement);
productList.init();
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
