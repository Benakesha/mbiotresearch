var path = require("path");
module.exports.getConfig = function() {
  switch (process.env.NODE_ENV) {
    case "local_machine":
      return {
        secret_key: "dingdingdiganadangdangdagana",
        port: 3000,
        mongoDB_path: "mongodb://localhost/embiotech_executive",
        use_database: true
      };
    case "development":
      return {
        secret_key: "dingdingdiganadangdangdagana",
        port: 3000,
        mongoDB_path: "mongodb://localhost/embiotech_executive",
        use_database: true
      };
  }
};
