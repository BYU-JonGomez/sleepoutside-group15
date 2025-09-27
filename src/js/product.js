import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

// Create a ExternalServices instance
const dataSource = new ExternalServices();
const productId = getParam("product");

// 3. Crear instancia de ProductDetails
const productDetails = new ProductDetails(productId, dataSource);

// 4. Inicializar (renderizar producto + activar botón)
productDetails.init();
