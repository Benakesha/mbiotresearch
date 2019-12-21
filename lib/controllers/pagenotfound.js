const path = require("path");

module.exports = function(app, api) {
  api.get("/404", function(err, res) {
    res.sendFile(path.join(__dirname, "../templates/pagenotfound.html"));
  });
  api.get("/*", function(err, res) {
    res.sendFile(path.join(__dirname, "../templates/pagenotfound.html"));
  });
};
