Parse.initialize("rYhgbAiMXfzb692ANgZXoUVGQkhUOuMSnCY2sHtk", "yTfmNgzwyG2B7OirvNrQG0MqbsNrt9sxEvLyE3Yw");
					
var TwilioNumber = "+19152350594";
var OtherNumber = "+12144035793";

var socket;

socket = io();
	
console.log(socket);

socket.connect();

socket.on('connect',function() {
		
	socket.emit('phoneNumber', "Number goes here");
	
	console.log('Client has connected to the server!');
	
});
	// Add a connect listener
socket.on('message',function(data) {
		//Display data on screen
		//Do something with data
	var MessageObject = Parse.Object.extend("Message");
    var messageObject = new MessageObject();
    messageObject.save({sendingNumber: OtherNumber, BodyNotTranslated: data, BodyTranslated: data});
		
	console.log('Received a message from the server!',data);
});
	// Add a disconnect listener
socket.on('disconnect',function() {
	console.log('The client has disconnected!');
});
	
	// Sends a message to the server via sockets
function sendMessageToServer(num, msg) {
	socket.emit('message', {number: num, message: msg});
	console.log("Here!");
}
	
function sendPhoneNumberToServer(msg) {
	socket.emit('phoneNumber', msg);
}

var query = new Parse.Query("Message");
query.ascending("createdAt");
query.find({
  success: function(results) {
    console.log(results.length);
    for(var i = 0; i < results.length; i++)
    {
    	console.log(results[i].createdAt);
    }
  },

  error: function(error) {
    console.log("What the hell just happened!");
  }
});

