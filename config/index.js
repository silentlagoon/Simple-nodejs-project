module.exports = {
    db: process.env.DB || 'mongodb://localhost/simple-nodejs',
    port: process.env.PORT || 5000
};