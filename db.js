var mongoose = require('mongoose');

// connect to mongodb
var db = mongoose.connect('mongodb://mongo:27017/test');
mongoose.connection.on('open', function() {
    console.log('mongodb connected');
});

module.exports = db;