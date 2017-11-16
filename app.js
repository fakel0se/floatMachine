var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var path = require('path');
app.set('port', (process.env.PORT || 5000));
	
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/bootstrap-3.3.7-dist", express.static(__dirname + '/bootstrap-3.3.7-dist'));

app.get('/', function(req, res){
	console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});



http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});