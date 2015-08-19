var eventBus = require('../buses/eventbus.js');

eventBus.on('started', function(e) {
    console.log('[Reporter] started', e);
});
eventBus.on('normalized', function(e) {
    if (e.value) {
        console.log('[Reporter] normalized', e);
    } else {
        console.error('[Reporter] normalized', e);
    }
});