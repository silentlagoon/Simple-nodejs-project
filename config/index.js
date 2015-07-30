module.exports = {
    development: {
        db: process.env.DB || 'mongodb://localhost/simple-nodejs',
        port: process.env.PORT || 5000
    },
    testing: {
        db: process.env.DB || 'mongodb://localhost/simple-nodejs-testing',
        port: process.env.PORT || 5000
    }
};