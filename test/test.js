var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    config = require('../config/init');

describe('Routing', function() {
    var url = 'localhost:' + config.port;

    before(function (done) {
        // In our tests we use the test db
        mongoose.connect(config.db);
        done();
    });

    describe('Main page', function() {
        it('should return 200ok response upon arriving', function (done) {
            request(url)
                .get('/')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(200);
                    done();
                });
        });
    });

    describe('Checkin page', function() {
        it('should return error response if no get params provided', function (done) {
            request(url)
                .get('/checkin')
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    done();
                });
        });
    });

    describe('Checkins page', function() {
        it('should return error response if no get params provided', function (done) {
            request(url)
                .get('/getcheckins')
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    done();
                });
        });
    });

    /*describe('checkin', function() {
        it('should return error trying to save duplicate username', function (done) {
            var profile = {
                username: 'vgheri',
                password: 'test',
                firstName: 'Valerio',
                lastName: 'Gheri'
            };
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .post('/api/profiles')
                .send(profile)
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.should.have.status(400);
                    done();
                });
        });
    });*/
});