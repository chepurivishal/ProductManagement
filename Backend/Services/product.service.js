var BaseService = require("./baseservice");
const productModel = require("../Models/product.model");

class ProductService extends BaseService {
  constructor() {
    super();
  }

  addProduct(body) {
    var productModel = require("../Models/product.model").getInst();
    if (body) {
      return productModel.createProduct(body);
    }
  }

  getProducts(opts) {
    console.log("22222222222222222222222222222222222222       ");
    var productModel = require("../Models/product.model").getInst();
    if (opts) {
      return productModel.getProducts(opts);
    }
  }

  getProduct(id) {
    var productModel = require("../Models/product.model").getInst();
    if (id) {
      return productModel.getProduct(id);
    }
  }

  deleteProduct(id) {
    var productModel = require("../Models/product.model").getInst();
    if (id) {
      return productModel.deleteProduct(id);
    }
  }

  updateProduct(body, productId) {
    var productModel = require("../Models/product.model").getInst();
    if (body) {
      return productModel.updateProduct(body, productId);
    }
  }
}
module.exports = {
  getInst: () => {
    return new ProductService();
  },
};
