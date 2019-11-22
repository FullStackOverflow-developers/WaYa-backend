var express = require("express");
var mqtt = require("mqtt");
var bodyParser = require("body-parser");
var app = express();

let orvalleke = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


let mqttClient = mqtt.connect('ws://mqtt.devbit.be');

// Mqtt error calback
mqttClient.on('error', (err) => {
  console.log(err);
  mqttClient.end();
});

mqttClient.on('connect', () => {
  console.log(`mqtt client connected`);
  // Routes

  // mqtt subscriptions
  mqttClient.subscribe('wifi-counter/0285', { qos: 0 });

  // When a message arrives, console.log it

  mqttClient.on('close', () => {
    console.log(`mqtt client disconnected`);
  });

  setInterval(
    function () {
      mqttClient.on('message', function (topic, message) {
        console.log(message.toString());
        orvalleke = JSON.parse(message);



      }.bind(this),
        1000
      );

    });

});

app.get("/willy", function (req, res) {
  res.setHeader('content-type', 'text/javascript');
  res.send(JSON.stringify(orvalleke));
});



app.get("/marjet", function (req, res) {
  res.send(
    { walput: "walput" }
  );
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log("app running on port.", server.address().port);
});