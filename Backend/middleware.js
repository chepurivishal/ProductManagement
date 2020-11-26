var jwt = require("jsonwebtoken");
var config = require("./config.json");
var codes = require("./codes.json");

module.exports = function (app) {
  var bodyparser = require("body-parser");
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.use("/prod/api/user/:userId", function (req, res, next) {
    var tokenInfo = req.headers.authorization;
    var token;
    if (!tokenInfo) {
      res.status(403);
      res.send(codes["TOKEN_REQUIRED"]);
    }
    token = tokenInfo.split(" ")[1];
    var decoded;
    try {
      decoded = jwt.verify(token, config.privateKey);
      if (decoded._id !== req.params.userId) {
        console.log("idddddddddddddddddddddd",decoded._id,req.params.userId)
        res.status(403);
        res.send(codes["INVALID_USER"]);
      }
    } catch (err) {
      res.status(403);
      res.send(codes["INVALID_TOKEN"]);
    }
    next();
  });
};
