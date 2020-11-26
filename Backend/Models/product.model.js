var Promise = require("bluebird");
var BaseModel = require("./BaseModel.js");

class ProductModel extends BaseModel {
  constructor() {
    super();
  }
  createProduct(body) {
    var data = {};
    if (body) {
      if (body.productName) {
        data.productName = body.productName;
      }
      if (body.productImage) {
        data.productImage = body.productImage;
      }
      if (body.description) {
        data.description = body.description;
      }
      if (body.quantity) {
        data.quantity = body.quantity;
      }
      if (body.unitPrice) {
        data.unitPrice = body.unitPrice;
      }
    }
    var model = require("../Database/product.db");
    var newProduct = model(body);
    return Promise.resolve(newProduct.save());
  }

  getProducts(opts) {
    var model = require("../Database/product.db");
    var query = {};
    console.log("1111111111111111111");
    if (opts) {
      if (opts._id) {
        query._id = opts._id;
      }
      if (opts.productName) {
        query.productName = opts.productName;
      }
      if (opts.productImage) {
        query.productImage = opts.productImage;
      }
      if (opts.description) {
        query.description = opts.description;
      }
      if (opts.quantity) {
        query.quantity = opts.quantity;
      }
      if (opts.unitPrice) {
        query.unitPrice = opts.unitPrice;
      }
    }
    console.log("@@@@@@@@@@@@@@@@@@@@@", query);
    return Promise.resolve(model.find(query, {}, { sort: { time: -1 } }));
  }

  getProduct(id) {
    var model = require("../Database/product.db");
    var query = {};
    if (id) {
      query._id = id;
    }
    return Promise.resolve(model.findOne(query)).then(function (data) {
      if (data) return data.toObject(data);
      else return Promise.reject();
    });
  }

  updateProduct(body, productId) {
    var model = require("../Database/product.db");
    var query = {};
    var data = {};
    if (productId) {
      query._id = productId;
    }
    if (body) {
      if (body.productName) {
        data.productName = body.productName;
      }
      if (body.productImage) {
        data.productImage = body.productImage;
      }
      if (body.description) {
        data.description = body.description;
      }
      if (body.quantity) {
        data.quantity = body.quantity;
      }
      if (body.unitPrice) {
        data.unitPrice = body.unitPrice;
      }
    }
    return Promise.resolve(model.findOneAndUpdate(query, data));
  }

  deleteProduct(id) {
    var model = require("../Database/product.db");
    var query = {};
    if (id) {
      query._id = id;
    }
    return Promise.resolve(model.findByIdAndRemove(query));
  }

  getProductsByIds(productIds) {
    var model = require("../Database/product.db");
    var query = {};
    if (productIds) {
      query._id = {
        $in: productIds,
      };
    }
    return model.find(query);
  }
}
module.exports = {
  getInst: () => {
    return new ProductModel();
  },
};
