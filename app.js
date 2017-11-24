var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");

app.set('port', (process.env.PORT || 5000));
	
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/bootstrap-3.3.7-dist", express.static(__dirname + '/bootstrap-3.3.7-dist'));

app.get('/', function(req, res){
	console.log(__dirname);
	res.sendFile(__dirname + '/index.html');
});

var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};


io.on('connection', function(socket){
	var now = new Date();
	fs.appendFile('logs.txt', now.toLocaleString("en-US", options)  + " --- Клиент: " + socket.id + " подключился\n", (err) => {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});
	//fs.writeFileSync("logs.txt", now.toLocaleString("en-US", options)  + " --- Клиент " + socket.id + " подключен");
	//console.log('Got message: ', socket);
	socket.on('machineStart', function(msg){
	console.log('Got message: ', msg);
	socket.emit('result', machine(msg));
	});
  
	socket.on("disconnect", function(){
		console.log(socket);
		var now = new Date();
		fs.appendFile('logs.txt', now.toLocaleString("en-US", options)  + " --- Клиент: " + socket.id + " отключился\n", (err) => {
		  if (err) throw err;
		  console.log('The "data to append" was appended to file!');
		});
	});

});


http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function machine(msg)
{
	var states = 
	{
		values: ["S0", "S1", "S2"], //s0 и s1 - allowable states, s2 - no,
		getState: function(idx) {
			return this.values[idx];
		},
		isAvailable: function(state) {
			if (state == this.values[2])
				return false;
			return true;			
		}
	};
	
	var symbols = 
	{
		values: ['0', '1', '2', '3', '4', '6', '6', '7', '8', '9', '.'],
		getSymb: function(idx) {
			return this.values[idx];
		}		
	}
	
	var transitions =
	{		
		getTransition: function(state, symb){
			if (msg[0] == '.')
				return states.getState(2);
			
			if (state == states.getState(2))
				return states.getState(2);
			
			if (symbols.values.indexOf(symb) == -1)
			{
				return states.getState(2);
			}
			if ((symb == ".") && (state == states.getState(0)))
			{
				return states.getState(1);
			}
			if (symb == ".")
			{
				return states.getState(2);
			}
			
			if (state == states.getState(0))
			{
				return states.getState(0);
			}
			
			return states.getState(1);
				
			
		}
	}	
	
	var currentState = states.getState(0);
	var belong = false;
	
	if (msg[0] == '.')
		currentState = states[2];
	
	for (let i = 0; i < msg.length; i++)
	{
		currentState = transitions.getTransition(currentState, msg[i]);
	}
	
	if (states.isAvailable(currentState))
		belong = true;
		
	return belong;	
}
