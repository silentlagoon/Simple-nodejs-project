var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    config = require('../config');

describe('App', function() {
    var baseUrl = 'localhost:' + config.port;
    var models, url;

    before(function(done) {
        var db = mongoose.connect(config.db, function () {
            models = require('../models')(db);
            done();
        });
    });

    afterEach(function(done) {
        mongoose.connection.db.dropCollection('checkins', function (err) {
            done();
        });
    });

    describe('/checkin', function() {
        context('When no parameters provided', function () {
            it('should return 400 status code', function (done) {
                request(baseUrl)
                    .get('/checkin')
                    .end(function (err, res) {
                        res.status.should.be.equal(400);
                        done();
                    });
            });
        });

        context('When parameters provided', function () {
            beforeEach(function() {
                url = '/checkin?username=foo&location=bar';
            });

            it('should return 200 status code', function (done) {
                request(baseUrl)
                    .get(url)
                    .end(function (err, res) {
                        res.status.should.be.equal(200);
                        done();
                    });
            });

            it('should create a new record in db', function (done) {
                request(baseUrl)
                    .get(url)
                    .end(function () {
                        models.Checkin.find({
                            username: 'foo',
                            location: 'bar'
                        }).exec(function (err, obj) {
                            obj.should.be.ok();
                            done();
                        });
                    });
            });
        });
    });

    describe('/getcheckins', function() {
        context('When parameters are not provided', function() {
            it('should return error response', function (done) {
                request(baseUrl)
                    .get('/getcheckins')
                    .end(function (err, res) {
                        res.status.should.be.equal(400);
                        done();
                    });
            });
        });

        beforeEach(function (done) {
            var seed = new models.Checkin({
                username: 'test',
                location: 'test'
            });
            seed.save(function(err){
                done();
            });
        });

        context('When one parameter provided', function() {
            it('should return success response with username provided', function (done) {
                request(baseUrl)
                    .get('/getcheckins?username=test')
                    .end(function (err, res) {
                        res.status.should.be.equal(200);
                        done();
                    });
            });

            it('should return success response with location provided', function (done) {
                request(baseUrl)
                    .get('/getcheckins?location=test')
                    .end(function (err, res) {
                        res.status.should.be.equal(200);
                        done();
                    });
            });
        });

        context('When two parameters provided at once', function() {
            it('shoud return error response with username and location provided the same time', function() {
                request(baseUrl)
                    .get('/getcheckins?location=test&username=test')
                    .end(function (err, res) {
                        res.status.should.be.equal(400);
                        done();
                    });
            });
        });
    });
});