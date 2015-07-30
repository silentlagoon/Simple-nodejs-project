var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    config = require('../config/init');

describe('Routing', function() {
    var url = 'localhost:' + config.port;

    before(function (done) {
        mongoose.connect(config.db);
        done();
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

        it('should return success response if get params provided', function (done) {
            request(url)
                .get('/checkin?username=foo&location=bar')
                .end(function (err, res) {
                    res.status.should.be.equal(200);
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

        it('should return success response if get params provided', function (done) {
            request(url)
                .get('/getcheckins?username=Foo')
                .end(function (err, res) {
                    res.status.should.be.equal(200);
                    done();
                });
        });
    });
});