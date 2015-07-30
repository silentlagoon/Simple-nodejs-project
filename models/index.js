module.exports = function (db) {
    return {
        Checkin: require('./checkin')(db)
    };
};