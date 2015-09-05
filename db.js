var mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://mongo:27017/test');
var db = mongoose.connection;
db.on('open', function() {
    console.log('mongodb connected');
});

module.exports = db;