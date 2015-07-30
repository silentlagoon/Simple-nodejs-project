var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    config = require('../config');

describe('App', function() {
    var url = 'localhost:' + config.development.port,
        db = mongoose.connect(config.development.db),
        CheckInSchema = new mongoose.Schema({
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

    before(function() {
        mongoose.connection.db.dropCollection('checkins');
    });

    describe('/checkin', function() {
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

        it('should return  DB record', function (done) {
            var result = mongoose.model('checkins', CheckInSchema).find({ username: 'foo'});
            result.should.be.true;
            done();
        });
    });

    describe('/getcheckins', function() {
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