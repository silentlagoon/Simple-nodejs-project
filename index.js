'use strict';
// var http = require('http');
var express = require('express');
var config = require('./config');

var app = express();
app.set('port', (process.env.PORT || config.server.port));

app.get('/', function(req, res) {
  res.send('Simple NodeJS app');
});


var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Simple NodeJS app listening at http://%s:%s', host, port);
});