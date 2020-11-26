var Promise = require("bluebird");
var codes = require("../codes.json");

module.exports = function (app) {
  var bodyparser = require("body-parser");
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.post("/prod/signup", (req, res) => {
    var serviceInst = require("../Services/user.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    if (!req.body) {
      res.status("400");
      res.send(codes["MISSING_BODY"]);
    }
    return serviceInst
      .signup(req.body)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch(function (err) {
        console.log("ERR!!!!!!!         ", err);
      });
  });

  app.post("/prod/login", (req, res) => {
    var serviceInst = require("../Services/user.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    if (!req.body) {
      res.status("400");
      res.send(codes["MISSING_BODY"]);
    }
    return serviceInst
      .login(req.body)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log("ERR!!!!!!!!!          ", err);
        res.status(403);
        res.send({
          Error: codes["LOGIN_FAILED"],
        });
      });
  });
};
