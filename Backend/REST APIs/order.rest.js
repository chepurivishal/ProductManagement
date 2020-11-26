var Promise = require("bluebird");
var codes = require("../codes.json");

module.exports = function (app) {
  var bodyparser = require("body-parser");
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.post("/prod/api/user/:userId/order", (req, res) => {
    var serviceInst = require("../Services/order.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    if (!req.body) {
      res.status("400");
      res.send(codes["MISSING_BODY"]);
    }
    return serviceInst
      .addOrder(req.body)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      // .catch((err) => {
      //   res.status("500");
      //   res.send({
      //     Error: codes["INTERNAL_SERVER_ERR"],
      //   });
      // });
  });

  app.get("/prod/api/user/:userId/order", (req, res) => {
    var serviceInst = require("../Services/order.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    console.log(
      "1111111111111111111111111111111111111111111111111111111111111111",
      req.query
    );
    return serviceInst.getOrders(req.query).then(function (data) {
      if (!data) {
        res.status("400");
        res.send(codes["ERR_IN_FETCH"]);
      }
      res.send(data);
    });
    // .catch((err) => {
    //   res.status("500");
    //   res.send({
    //     Error: codes["INTERNAL_SERVER_ERR"],
    //   });
    // });
  });

  app.get("/prod/api/user/:userId/order/:id", (req, res) => {
    var serviceInst = require("../Services/order.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    return serviceInst
      .getOrder(req.params.id)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(
          " ==================    ERROR   ================== ",
          JSON.stringify(err)
        );
        res.status("500");
        res.send({
          Error: codes["INTERNAL_SERVER_ERR"],
        });
      });
  });

  app.put("/prod/api/user/:userId/order/:id", (req, res) => {
    var serviceInst = require("../Services/order.service").getInst();
    var orderId;
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    if (!req.body) {
      res.status("400");
      res.send(codes["MISSING_BODY"]);
    }
    if (req.params) {
      productId = req.params.id;
    }
    return serviceInst
      .updateOrder(req.body, orderId)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(
          " ==================    ERROR   ================== ",
          JSON.stringify(err)
        );
        res.status("500");
        res.send({
          Error: codes["INTERNAL_SERVER_ERR"],
        });
      });
  });

  app.delete("/prod/api/user/:userId/order/:id", (req, res) => {
    var serviceInst = require("../Services/order.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }

    return serviceInst
      .deleteOrder(req.params.id)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(
          " ==================    ERROR   ================== ",
          JSON.stringify(err)
        );
        res.status("500");
        res.send({
          Error: codes["INTERNAL_SERVER_ERR"],
        });
      });
  });
};
