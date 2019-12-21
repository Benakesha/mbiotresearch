var mongoose = require("mongoose");
const crypto = require("crypto");

const newUser = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phoneNo: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  pincode: {
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true
  },
  salt: String
});

var User = (module.exports = mongoose.model("User", newUser));

module.exports.findUserByName = function(newUsers, callback) {
  User.findOne({ email: newUsers.email }, callback);
};

module.exports.addUser = function(newUsers, callback) {
  this.salt = crypto.randomBytes(16).toString("hex");
  newUsers.salt = this.salt;
  newUsers.password = crypto
    .pbkdf2Sync(newUsers.password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  let user = new User(newUsers);
  user.save(callback);
};

module.exports.comparePassword = function(formpassword, hash, salt, callback) {
  var hash1 = crypto
    .pbkdf2Sync(formpassword, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  if (hash === hash1) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
