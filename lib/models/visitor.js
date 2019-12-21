var mongoose = require("mongoose");

const newVisitor = mongoose.Schema({
  fullname: {
    type: String,
    require: true
  },
  email: {
    type: String
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
  typeOfPlace: {
    type: String,
    require: true
  },
  contractorName: {
    type: String
  },
  contractorPhoneNo: {
    type: String
  },
  // geoLocation: {
  //   type: Object
  // }
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  city: {
    type: String
  }
});

var Visitor = (module.exports = mongoose.model("Visitor", newVisitor));
module.exports.findUserByName = function(visitor, callback) {
  Visitor.findOne({ email: visitor.email }, callback);
};

module.exports.addVisitor = function(newVisitor, callback) {
  let visitor = new Visitor(newVisitor);
  visitor.save(callback);
};
