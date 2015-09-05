var eventBus = require('../buses/eventbus.js'),
    report = {
        successes: [],
        failures: []
    };

eventBus.on('started', function(e) {
    console.log('[Reporter] started', e);
});
eventBus.on('normalized', function(e) {
    if (e.value) {
        report.successes.push(e);
    } else {
        report.failures.push(e);
    }
});
eventBus.on('ended', function() {
    console.log('[Reporter] crawler ended received!');
    console.log('[Reporter] success:', report.successes.length);
    console.log('[Reporter] failures:', report.failures.length);
});