'use strict';

var express = require('express'),
    config = require('./config/init'),
    mongoose = require('mongoose'),
    chalk = require('chalk');

var db = mongoose.connect(config.db, function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});

var app = express();

app.get('/', function(req, res) {
  res.send('Simple NodeJS app');
});


var server = app.listen(config.port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Simple NodeJS app listening at http://%s:%s', host, port);
});