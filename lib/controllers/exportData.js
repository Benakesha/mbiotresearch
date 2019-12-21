const config = require("../config.js").getConfig(),
  logger = require("../logger"),
  jwt = require("jsonwebtoken"),
  Visitor = require("../models/visitor"),
  Excel = require("exceljs"),
  path = require("path");

module.exports = function(app, api) {
  api.get("/exportData", (req, res) => {
    Visitor.find({}, (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Mbiot Visitor");
        worksheet.properties.outlineLevelRow = 1;
        worksheet.properties.outlineProperties = {
          summaryBelow: false,
          summaryRight: false
        };

        worksheet.columns = [
          { header: "Fullname", key: "fullname", width: 22 },
          { header: "Email", key: "email", width: 20 },
          { header: "Address", key: "address", width: 20 },
          { header: "Phone", key: "phoneNo", width: 20 },
          { header: "Type of place", key: "typeOfPlace", width: 20 },
          { header: "Contractor Name", key: "contractorName", width: 20 },
          { header: "ContractorPhoneNo", key: "contractorPhoneNo", width: 20 },
          { header: "Latitude", key: "latitude", width: 20 },
          { header: "Longitude", key: "longitude", width: 20 },
          { header: "City", key: "city", width: 20 }
        ];
        data.forEach((data, index) => {
          worksheet.addRow([
            data.fullname,
            data.email,
            data.address,
            data.phoneNo,
            data.typeOfPlace,
            data.contractorName,
            data.contractorPhoneNo,
            data.latitude,
            data.longitude,
            data.city
          ]);
        });
        var filePath = path.join(__dirname, "../../excel_sheets/fb.xlsx");
        workbook.xlsx.writeFile(filePath).then(function(err) {
          if (err) throw err;
          res.sendFile(filePath, function(err) {
            if (err) throw err;
          });
        });
      }
    });
  });
};
