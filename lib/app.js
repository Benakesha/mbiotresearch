var compression = require("compression");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app = module.exports = express();
app.use(cors());

var config = require("./config.js").getConfig();

app.locals.config = config;

var path = require("path");
var logger = require("./logger");
var morgan = require("morgan");
var api = express.Router();
app.use(compression());
app.enable("trust proxy");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

switch (process.env.NODE_ENV) {
  case "local_machine":
    api.route("/").get(function(req, res) {
      res.sendFile(__dirname, "../public/index.html");
    });
    app.use(express.static(path.join(__dirname, "../public/")));

    var index = path.resolve(__dirname, "../public/index.html");
    break;
  case "development":
    api.route("/").get(function(req, res) {
      res.sendFile(__dirname, "../build/index.html");
    });
    app.use(express.static(path.join(__dirname, "../build/")));

    var index = path.resolve(__dirname, "../build/index.html");
    break;
}

require("./models");
require("./controllers")(app, api);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const uri = app.locals.config.mongoDB_path;
mongoose.connect(uri, options);

mongoose.connection.on("open", function(ref) {
  console.log("open connection to mongo server.");
});

mongoose.connection.on("connected", function(ref) {
  console.log("connected to mongo server.");
});

mongoose.connection.on("disconnected", function(ref) {
  console.log("disconnected from mongo server.");
});

mongoose.connection.on("close", function(ref) {
  console.log("close connection to mongo server");
});

mongoose.connection.on("error", function(err) {
  console.log("error connection to mongo server!");
  console.log(err);
});

mongoose.connection.on("reconnect", function(ref) {
  console.log("reconnect to mongo server.");
});

app.enable("trust proxy");
app.use(bodyParser.json());

// Add support for logging the hostname using Morgan.
morgan.token("host", function(req) {
  return req.hostname;
});

// Add support for logging the IP using Morgan (which is the actual IP, if trust proxy is set).
morgan.token("ip", function(req) {
  return req.ip;
});

app.use(
  morgan(
    ":ip -> :host - :method :url :status :res[content-length] - :response-time ms"
  )
);
app.use("/api/v1", api);

app.use(function(req, res) {
  res.sendFile(index);
});

module.exports = app;
