function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
// ProductData class to fetch product data from JSON files
export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`; 
  }

  // Fetch and return the full product data array
  getData() {
    return fetch(this.path)
      .then(convertToJson) 
      .then((data) => data);
  }

  // Find and return a product by its ID
  async findProductById(id) {
    const products = await this.getData(); 
    return products.find((item) => item.Id === id);
  }
}
