var mongoose = require("mongoose");

var schema = mongoose.Schema;

var orderSchema = new schema({
  userId: {
    type: String,
  },
  products: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
  },
});

var order = mongoose.model("Orders", orderSchema);

module.exports = order;
