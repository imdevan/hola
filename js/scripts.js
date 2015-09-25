Parse.initialize("rYhgbAiMXfzb692ANgZXoUVGQkhUOuMSnCY2sHtk", "yTfmNgzwyG2B7OirvNrQG0MqbsNrt9sxEvLyE3Yw");
					
var TwilioNumber = "+19152350594";
var OtherNumber = "+12144035793";

$('#phonenumberbutton').click(function()
{
	OtherNumber = $('textfieldphone').val();
})

var selectLang = 'es';

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
    		messageObject.save({sendingNumber: OtherNumber, LanguageOne: data, LanguageTwo: translated});
    		var wat = translated;
						
			var elem = '<div class="message--container"> \
								<div class="message--text-container"> \
									<p class="message--text primary-text"> \
										' + translated +' \
									</p> \
									<p class="message--text secondary-text"> \
										' + data +' \
									</p> \
									</div> \
									<div class="message--tb-container"> \
									<span class="message--translate-button"> \
										? \
									</span> \
								</div> \
							</div>'
    		
    		$('#message-conversation').append(elem);	 
			    		
			$(".message--translate-button").unbind('click');
			$(".message--translate-button").on('click', function () {
			    console.log('click');
			    $(this).parent().parent().toggleClass("view-translation");
			});
    		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
    		
  		}
 		console.log("I received a message!");
  		var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair=en|"+selectLang;
 		
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

$(document).ready(function()
{
	var query = new Parse.Query("Message");
	//query.ascending("createdAt");
	query.find({
	  success: function(results) {
	    for(var i = 0; i < results.length; i++)
	    {
	    	console.log(results[i]);
	        if(results[i].get("sendingNumber") == OtherNumber)
	        {
	        	console.log("I'm in here!");
	        	var elem = '<div class="message--container"> \
								<div class="message--text-container"> \
									<p class="message--text primary-text"> \
										' + results[i].get("LanguageTwo") +' \
									</p> \
									<p class="message--text secondary-text"> \
										' + results[i].get("LanguageOne") +' \
									</p> \
									</div> \
									<div class="message--tb-container"> \
									<span class="message--translate-button"> \
										? \
									</span> \
								</div> \
							</div>'
	    		
	    		$('#message-conversation').append(elem);	    
				$(".message--translate-button").unbind('click');
				$(".message--translate-button").on('click', function () {
				    console.log('click');
				    $(this).parent().parent().toggleClass("view-translation");
				});		
	    	
	        }
	        else if(results[i].get("sendingNumber") == TwilioNumber)
	        {
	        	console.log("Hah");
	        	var elem = '<div class="message--container-RIGHT"> \
								<div class="message--text-container"> \
									<p class="message--text primary-text"> \
										' + results[i].get("LanguageTwo") +' \
									</p> \
									<p class="message--text secondary-text"> \
										' + results[i].get("LanguageOne") +' \
									</p> \
									</div> \
									<div class="message--tb-container"> \
									<span class="message--translate-button"> \
										? \
									</span> \
								</div> \
							</div>';
	    		
	    		$('#message-conversation').append(elem);
	    		
				$(".message--translate-button").unbind('click');
				$(".message--translate-button").on('click', function () {
				    console.log('click');
				    $(this).parent().parent().toggleClass("view-translation");
				});
	        }
	        else
	        {
	        	console.log('Why the fuck am I in here');
	        }
	    }
	  },
	
	  error: function(error) {
	    console.log("What the hell just happened!");
	  }
	});
});

