var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('port', (process.env.PORT || 5000));
	
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/bootstrap-3.3.7-dist", express.static(__dirname + '/bootstrap-3.3.7-dist'));

app.get('/', function(req, res){
	console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//console.log('Got message: ', socket);
  socket.on('machineStart', function(msg){
		console.log('Got message: ', msg);
  });
});


http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});