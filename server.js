var express = require("express");
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var http = require('http').Server(app);

var client = require('twilio')('AC04ae25977f10fe51e9d811bf0bf2a07f',
	'd820c97f96b72dfb49464b79b4158779');

var path = require('path');
var twilio = require(path.resolve('./', 'twilio.js'));
console.log(twilio);

app.use(express.static(__dirname + '/js'));
app.get('/', function(req, res){
  res.sendfile('pages/index.html');
});

app.post('/', function(req, res){
  	res.send('POST request to homepage');
  	var obj = JSON.parse(JSON.stringify(req.body, null, 2));
  	console.log(obj.number);
  	console.log(obj.message);
  	twilio.sendMessage(obj.number, obj.message);
});

app.post('/sms', function(req, res){
  	res.send('POST request to homepage');
  	var obj = JSON.parse(JSON.stringify(req.body, null, 2));
  	console.log("Recieved text");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
