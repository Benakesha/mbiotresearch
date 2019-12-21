module.exports = function(app, api) {
  require("./auth")(app, api);
  require("./visitor")(app, api);
  require("./exportData")(app, api);
  require("./pagenotfound")(app, api);
};
