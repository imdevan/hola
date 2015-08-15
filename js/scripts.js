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