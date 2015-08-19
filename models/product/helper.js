var eventBus = require('../../buses/eventbus.js');

var normalize = function(acceptedValues, valueRaw) {
    var result;
    acceptedValues.every(function(acceptedValue) {
        var regex = new RegExp(acceptedValue.regex,'i');
        if (valueRaw.match(regex)) {
            result = acceptedValue.key;
            return false;
        }
        return true;
    });
    eventBus.emit('normalized', { valueRaw: valueRaw, value: result });
    return result;
};

var normalizeArray = function(acceptedValues, valuesRaw) {
    var result = [];
    valuesRaw.forEach(function(valueRaw) {
        var valueNormalized = normalize(acceptedValues, valueRaw);
        valueNormalized && result.push(valueNormalized);
    });
    return result;
};

var helper = {
    normalize: normalize,
    normalizeArray: normalizeArray
};

module.exports = helper;