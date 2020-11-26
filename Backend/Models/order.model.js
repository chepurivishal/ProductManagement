var Promise = require("bluebird");
var BaseModel = require("./BaseModel.js");

class OrderModel extends BaseModel {
  constructor() {
    super();
  }
  createOrder(body) {
    var data = {};
    if (body) {
      if (body.userId) {
        data.userId = body.userId;
      }
      if (body.products) {
        data.products = body.products;
      }
      if (body.price) {
        data.price = body.price;
      }
    }
    var model = require("../Database/order.db");
    var newOrder = model(body);
    return Promise.resolve(newOrder.save());
  }

  getOrders(opts) {
    var model = require("../Database/order.db");
    var query = {};
    console.log("1111111111111111111");
    if (opts) {
      if (opts._id) {
        query._id = opts._id;
      }
      if (opts.userId) {
        query.userId = opts.userId;
      }
      if (opts.price) {
        query.price = opts.price;
      }
    }
    console.log("@@@@@@@@@@@@@@@@@@@@@", query);
    return Promise.resolve(model.find(query, {}, { sort: { time: -1 } }));
  }

  getOrder(id) {
    var model = require("../Database/order.db");
    var query = {};
    if (id) {
      query._id = id;
    }
    return Promise.resolve(model.findOne(query)).then(function (data) {
      if (data) return data.toObject(data);
      else return Promise.reject();
    });
  }

  updateOrder(body, orderId) {
    var model = require("../Database/order.db");
    var query = {};
    var data = {};
    if (orderId) {
      query._id = orderId;
    }
    if (body) {
      if (body.userId) {
        data.userId = body.userId;
      }
      if (body.products) {
        data.products = body.products;
      }
      if (body.price) {
        data.price = body.price;
      }
    }
    return Promise.resolve(model.findOneAndUpdate(query, data));
  }

  deleteOrder(id) {
    var model = require("../Database/order.db");
    var query = {};
    if (id) {
      query._id = id;
    }
    return Promise.resolve(model.findByIdAndRemove(query));
  }
}
module.exports = {
  getInst: () => {
    return new OrderModel();
  },
};
