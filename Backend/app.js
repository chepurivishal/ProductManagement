var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("./config.json");
var cors = require("cors");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose.connect(config.mongo);

var productAppListener = require("./REST APIs/product.rest");
var userAppListener = require("./REST APIs/user.rest");
var orderAppListener = require('./REST APIs/order.rest');
var middleware = require("./middleware");

middleware(app);
productAppListener(app);
userAppListener(app);
orderAppListener(app);

app.listen(config.port);
