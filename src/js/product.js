import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Obtener el productId de la URL (?product=xxx)
const productId = getParam("product");

// 2. Crear la fuente de datos (ejemplo: "tents")
const dataSource = new ProductData("tents");

// 3. Crear instancia de ProductDetails
const productDetails = new ProductDetails(productId, dataSource);

// 4. Inicializar (renderizar producto + activar botón)
productDetails.init();
