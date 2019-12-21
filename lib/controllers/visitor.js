const config = require("../config.js").getConfig(),
  logger = require("../logger"),
  Visitor = require("../models/visitor"),
  ips = require("ip"),
  iplocation = require("iplocation").default;

module.exports = function(app, api) {
  api.post("/visitor", async (req, res) => {
    var idId = ips.address();
    var ip = "207.97.227.239";
    // var geolocation = {
    //   country: "",
    //   region: "",
    //   city: "",
    //   postal: "",
    //   ip: "",
    //   latitude: "",
    //   longitude: "",
    //   timezone: ""
    // };
    var latitude;
    var longitude;
    var city;
    await iplocation(ip)
      .then(res => {
        // geolocation.country = res.country;
        // (geolocation.region = res.region),
        //   (geolocation.city = res.city),
        //   (geolocation.postal = res.postal),
        //   (geolocation.ip = res.ip),
        //   (geolocation.latitude = res.latitude),
        //   (geolocation.longitude = res.longitude),
        //   (geolocation.timezone = res.timezone);
        (latitude = res.latitude),
          (longitude = res.longitude),
          (city = res.city);
      })
      .catch(err => {
        console.log("err---", err);
      });
    const visitorData = {
      fullname: req.body.userData.username,
      email: req.body.userData.email,
      phoneNo: req.body.userData.phoneNo,
      address: req.body.userData.address,
      pincode: req.body.userData.pincode,
      typeOfPlace: req.body.userData.role,
      contractorName: req.body.userData.cname,
      contractorPhoneNo: req.body.userData.cphone,
      // geoLocation: geolocation
      latitude: latitude,
      longitude: longitude,
      city: city
    };

    Visitor.findUserByName(visitorData, (err, user) => {
      if (err) throw err;
      if (user) {
        return res.json({ success: false, message: "user already exists" });
      } else {
        Visitor.addVisitor(visitorData, (err, data) => {
          if (err) throw err;
          if (data) {
            return res.json({
              success: true,
              message: "user added succesfully"
            });
          }
        });
      }
    });
  });
  api.get("/visitorData", (req, res) => {
    Visitor.find({}, (error, result) => {
      if (error) {
        res.json({ success: false, message: error });
      }
      if (result.length > 0) {
        // var tableData = [];
        // result.map(data => {
        //   tableData .fullname = data.fullname),
        //     (tableData.email = data.email),
        //     (tableData.phoneNo = data.phoneNo),
        //     (tableData.address = data.address);
        // });
        res.json({ success: true, data: result });
      } else {
        res.json({ success: false, message: "no fields available" });
      }
    });
  });
};
