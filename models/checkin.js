var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function (db) {
    var CheckinSchema = new Schema({
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

    return db.model('Checkin', CheckinSchema);
};