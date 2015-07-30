'use strict';

var express = require('express'),
    config = require('./config/init'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    chalk = require('chalk');

var db = mongoose.connect(config.db, function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});

var app = express();

var CheckInSchema = new Schema({
    username : {
        type: String
    },
    location : {
        type: String
    },
    date : {
        type: Date,
        default: Date.now
    }
});

var CheckIn = db.model('Checkin', CheckInSchema);

function makeRequest(request, res) {
    var checkIn = db.model('checkins', CheckInSchema);
    checkIn.find(request).lean().exec(function(err, checkins) {
        console.log('I am here');
        res.status(200).send(checkins);
    });
}

app.get('/', function(req, res) {
  res.send('Simple NodeJS app');
});

app.get('/checkin', function(req, res) {
    if(req.query.username != undefined && req.query.location != undefined) {
        var checkIn = new CheckIn({
            username: req.query.username,
            location: req.query.location
        });

        checkIn.save(function(err) {
            if(err){
                console.log(err);
            }
        });

        res.status(200).send({
            'username' : req.query.username,
            'location': req.query.location
        });
    } else {
        res.status(400).send('You should provide username and location as a GET parameters');
    }
});

app.get('/getcheckins', function(req, res) {
    if(req.query.username != undefined) {
        makeRequest({username : req.query.username}, res);
    } else if (req.query.location != undefined) {
        makeRequest({location : req.query.location}, res);
    } else {
        res.status(400).send('No params has been passed!');
    }
});


var server = app.listen(config.port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Simple NodeJS app listening at http://%s:%s', host, port);
});