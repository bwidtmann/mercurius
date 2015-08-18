var events = require('events');

var EventBus = function() {
    events.EventEmitter.call(this);
};

EventBus.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = EventBus;