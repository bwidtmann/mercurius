var Report = require('./report.js');
var eventBus = require('../buses/eventbus.js');

var report;

eventBus.on('started', function(e) {
    console.log('[Reporter] started', e);
    report = new Report();
    report.startedAt = Date.now();
});
eventBus.on('normalized', function(e) {
    if (e.value) {
        report.successes.push(e);
    } else {
        report.failures.push(e);
    }
});
eventBus.on('ended', function() {
    console.log('[Reporter] crawler ended -> creating report...');
    report.endedAt = Date.now();
    report.save(function(err, doc) {
        eventBus.emit('reporter:ended');
    });
});