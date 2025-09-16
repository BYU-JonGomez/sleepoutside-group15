import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Create a ProductData instance for tents
const dataSource = new ProductData("tents");
const productID = getParam("product");

// Create a ProductDetails instance and initialize it
const product = new ProductDetails(productID, dataSource);
product.init();
