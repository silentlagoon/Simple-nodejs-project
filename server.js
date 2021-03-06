'use strict';

var express = require('express'),
    config = require('./config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    chalk = require('chalk'),
    trim = require('trim');

var db = mongoose.connect(config.db, function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});
var models = require('./models')(db);
var app = express();

function makeRequest(request, res) {
    models.Checkin.find(request).lean().exec(function(err, checkins) {
        if(err) {
            res.status(400).send(err);
        }
        res.status(200).send(checkins);
    });
}

app.get('/checkin', function(req, res) {
    var username = req.query.username,
        location = req.query.location;

    if(username && location) {
        //Making simple input data check
        username = trim(username);
        location = trim(location);

        var checkIn = new models.Checkin({
            username: username,
            location: location
        });

        checkIn.save(function(err) {
            if(err){
                res.status(400).send(err);
            } else {
                res.status(200).send({
                    'username': username,
                    'location': location
                });
            }
        });
    } else {
        res.status(400).send('You should provide username and location as a GET parameters');
    }
});

app.get('/getcheckins', function(req, res) {
    var username = req.query.username,
        location = req.query.location;
    if(username && location) {
        res.status(400).send('Just one parameter should be passed!');
    } else if(req.query.username) {
        username = trim(username);
        makeRequest({username : username}, res);
    } else if (location) {
        location = trim(location);
        makeRequest({location : location}, res);
    } else {
        res.status(400).send('No params has been passed!');
    }
});


var server = app.listen(config.port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Simple NodeJS app listening at http://%s:%s', host, port);
});