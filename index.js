var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqtt_handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.get("/willy", function (req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send(
    { fazant: "fazant" }
  );
});

app.get("/marjet", function (req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send(
    { walput: "walput" }
  );
});

var server = app.listen(3000, function () {
  console.log("app running on port.", server.address().port);
});