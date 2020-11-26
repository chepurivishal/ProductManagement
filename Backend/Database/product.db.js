var mongoose = require("mongoose");
const { number } = require("yargs");

var schema = mongoose.Schema;

var productSchema = new schema({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true  },
});

var product = mongoose.model("Products", productSchema);

module.exports = product;
