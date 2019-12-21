var path = require("path");
const { format } = (winston = require("winston"));

module.exports = winston.createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File({
      level: "info",
      filename: path.join(__dirname, "../logs/app.log"),
      json: false
    })
  ]
});
