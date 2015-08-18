EVENTBUS.on('started', function(e) {
    console.log('[Reporter] started', e);
});
EVENTBUS.on('normalized', function(e) {
    if (e.value) {
        console.log('[Reporter] normalized', e);
    } else {
        console.error('[Reporter] normalized', e);
    }
});