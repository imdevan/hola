var express = require("express");
var port = process.env.PORT || 80;
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("Got here");
var http = require('http').Server(app);
var io = require('socket.io')(http);
console.log(io);
var path = require('path');
var twilio = require(path.resolve('./js', 'twilio.js'));

var endUserNumber = "";

app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/', function(req, res){
    res.send('POST request to homepage');
    var obj = JSON.parse(JSON.stringify(req.body, null, 2));
    console.log(obj.number);
    console.log(obj.message);
    twilio.sendMessage(obj.number, obj.message);
});

var sendingFunction;
app.post('/sms', function(req, res){
    res.send('POST request to homepage');
    var obj = JSON.parse(JSON.stringify(req.body, null, 2));
    console.log(obj.Body);
    sendingFunction(obj.Body);
});

app.post('/endnumber', function(req, res){
    res.send('POST request to homepage');
    var obj = JSON.parse(JSON.stringify(req.body, null, 2));
    endUserNumber = "+1" + obj.number;
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('phoneNumber', function(msg){
    endUserNumber = "+1" + msg;
  });
  
  socket.on('message', function(data){
    console.log("Got Here as well!");
    twilio.sendMessage(data.number, data.message);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  sendingFunction = function(msg)
  {
      socket.emit('message', msg);
  }
  
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:3000');
});

//app.listen(port);