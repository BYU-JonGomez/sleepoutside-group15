import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

// Create a ProductData instance
const dataSource = new ProductData();
const productId = getParam("product");

// 3. Crear instancia de ProductDetails
const productDetails = new ProductDetails(productId, dataSource);

// 4. Inicializar (renderizar producto + activar botón)
productDetails.init();
