var mongoose = require("mongoose");

var schema = mongoose.Schema;

var userSchema = new schema({
  type: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

var user = mongoose.model("User", userSchema);

module.exports = user;
