var Promise = require("bluebird");
var BaseModel = require("./basemodel");

class UserModel extends BaseModel {
  constructor() {
    super();
  }

  createUser(data) {
    var body = {};
    if (data) {
      if (data.type) {
        body.type = data.type;
      }
      if (data.firstName) {
        body.firstName = data.firstName;
      }
      if (data.lastName) {
        body.lastName = data.lastName;
      }
      if (data.userName) {
        body.userName = data.userName;
      }
      if (data.password) {
        body.password = data.password;
      }
      var model = require("../Database/user.db");
      var newUser = model(body);
      return Promise.resolve(newUser.save());
    }
  }
  getUser(opts) {
    var query = {};
    if (opts) {
      if (opts._id) {
        query._id = opts._id;
      }
      if (opts.type) {
        query.type = opts.type;
      }
      if (opts.firstName) {
        query.firstName = opts.firstName;
      }
      if (opts.lastName) {
        query.lastName = opts.lastName;
      }
      if (opts.userName) {
        query.userName = opts.userName;
      }
      if (opts.password) {
        query.password = opts.password;
      }
    }
    var model = require("../Database/user.db");
    return model.findOne(query).then(function (userInfo) {
      if (userInfo) return userInfo.toObject(userInfo);
    });
  }
}

module.exports = {
  getInst: () => {
    return new UserModel();
  },
};
