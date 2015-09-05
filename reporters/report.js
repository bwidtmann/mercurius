var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    startedAt: { type: Date },
    endedAt: { type: Date },
    successes: { type: Array },
    failures: { type: Array }
});

module.exports = mongoose.model('Report', schema);