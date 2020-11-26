var BaseService = require("./baseservice");
var Promise = require("bluebird");
const productModel = require("../Models/product.model");
var _ = require("lodash");

class OrderService extends BaseService {
  constructor() {
    super();
  }

  addOrder(body) {
    const self = this;
    var orderModel = require("../Models/order.model").getInst();
    var productModel = require("../Models/product.model").getInst();
    if (body) {
      var getProductsP = productModel.getProductsByIds(body.products);
      return Promise.resolve(getProductsP).then(function (products) {
        return orderModel.createOrder(body).then(function (response) {
          response.products = products;
          return response;
        });
      });
    }
  }

  getOrders(opts) {
    console.log("22222222222222222222222222222222222222       ");
    var orderModel = require("../Models/order.model").getInst();
    var productModel = require("../Models/product.model").getInst();
    if (opts) {
      var getProductsP = productModel.getProductsByIds(opts.products);
      return Promise.resolve(getProductsP).then(function (products) {
        return orderModel.getOrders(opts).then(function (response) {
          response.products = products;
          return response;
        });
      });
    }
  }

  getOrder(id) {
    var orderModel = require("../Models/order.model").getInst();
    var productModel = require("../Models/product.model").getInst();
    if (id) {
      return orderModel.getOrder(id).then(function (response) {
        return productModel
          .getProductsByIds(response.products)
          .then(function (products) {
            response.products = products;
            return response;
          });
      });
    }
  }

  deleteOrder(id) {
    var orderModel = require("../Models/order.model").getInst();
    if (id) {
      return orderModel.deleteOrder(id);
    }
  }

  updateOrder(body, orderId) {
    var productModel = require("../Models/product.model").getInst();
    var orderModel = require("../Models/order.model").getInst();
    if (body) {
      var getProductsP = productModel.getProductsByIds(body.products);
      return Promise.resolve(getProductsP).then(function (products) {
        return orderModel.updateOrder(body, orderId).then(function (response) {
          response.products = products;
          return response;
        });
      });
    }
  }
  calculatePrice(products) {
    var unitPrice = 0;
    _.forEach(products, (product) => {
      unitPrice = unitPrice + product.unitPrice;
    });
    return unitPrice;
  }
}
module.exports = {
  getInst: () => {
    return new OrderService();
  },
};
