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
		
		function responseText () {
   			var translated = JSON.parse(this.responseText).responseData.translatedText;
   			console.log(translated);
   			
   			var MessageObject = Parse.Object.extend("Message");
    		var messageObject = new MessageObject();
    		messageObject.save({sendingNumber: OtherNumber, BodyNotTranslated: data, BodyTranslated: translated});
    		var wat = translated;
    		var elem = '<div class="message--container"> \
							<p class="message--text"> \
								' + translated +' \
							</p> \
							<span class="message--translate-button"> \
								? \
							</span> \
						</div>'
    		
    		$('#message-conversation').append(elem);
  		}
 		console.log("I received a message!");
  		var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair=en|es";
 
  		var oReq = new XMLHttpRequest();
  		oReq.addEventListener('load', responseText);
  		oReq.open("get", url, true);
  		oReq.send();
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
query.descending("createdAt");
query.find({
  success: function(results) {
    console.log(results.length);
    for(var i = 0; i < results.length; i++)
    {
        // THIS IS THE DATA results[i].get("key")
    	console.log(results[i]);
    }
  },

  error: function(error) {
    console.log("What the hell just happened!");
  }
});

