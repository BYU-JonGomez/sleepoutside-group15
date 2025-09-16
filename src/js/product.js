import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Create a ProductData instance for tents
const dataSource = new ProductData("tents");
const productID = getParam("product");

// 3. Crear instancia de ProductDetails
const productDetails = new ProductDetails(productId, dataSource);

// 4. Inicializar (renderizar producto + activar botón)
productDetails.init();
