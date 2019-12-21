var cluster = require("cluster");
var numCPUs = require("os").cpus().length;
process.env.NODE_ENV = "local_machine";

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    var env = { workerId: i },
      newWorker = cluster.fork(env);
    newWorker.process.env = env;
  }
  Object.keys(cluster.workers).forEach(function(id) {
    console.log("I am running with ID : " + cluster.workers[id].process.pid);
  });
  cluster.on("exit", function(worker, code, signal) {
    console.log("worker " + worker.process.pid + " died");
    var env = worker.process.env,
      newWorker = cluster.fork(env);
    newWorker.process.env = env;
  });
} else {
  var app = require("./lib/app");
  var config = require("./lib/config.js").getConfig();
  app.listen(config.port, function() {
    console.log("I am running on Port: " + config.port);
  });
}
