var jwt = require("jsonwebtoken");
var codes = require("../codes.json");
var config = require("../config.json");
var BaseService = require("./baseservice");
class UserService extends BaseService {
  constructor() {
    super();
  }
  validateData(body) {
    var model = require("../Models/user.model").getInst();
    var userName = body.userName;
    return model.getUser({ userName: userName }).then(function (data) {
      if (data && data.length > 0) {
        throw new Error(codes["USERNAME_ALREADY_EXISTS"]);
      }
    });
  }
  signup(body) {
    console.log("11111111111111111111111111111     ");
    const self = this;
    const model = require("../Models/user.model").getInst();
    if (body) {
      return self
        .validateData(body)
        .then(function () {
          console.log("2222222222222222222222222222222      ");
          return model.createUser(body);
        })
        .then(function (user) {
          console.log("33333333333333333333333333333333            ");
          var userData = {};
          if (user.userName && user._id) {
            userData.userName = user.userName;
            userData._id = user._id;
          }
          var token = jwt.sign(userData, config.privateKey);
          return {
            token,
            userName: user.userName,
            userId: user._id,
            type: user.type,
          };
        });
    }
  }
  login(body) {
    var model = require("../Models/user.model").getInst();
    if (body) {
      console.log("BODY!!!!!!         ", body);
      return model
        .getUser(body)
        .then(function (userData) {
          console.log("RES!!!!!!!!!!          ", userData.length, !userData);
          if (!userData) {
            console.log("AAAAAAA!!!!!!!!!!         ");
            throw new Error(codes["LOGIN_FAILED"]);
          }
          return userData;
        })
        .then(function (userData) {
          var token = jwt.sign(
            { userName: body.userName, _id: userData._id },
            config.privateKey
          );
          return { token, userName: body.userName, userId: userData._id };
        });
    }
  }
}

module.exports = {
  getInst: () => {
    return new UserService("User");
  },
};
