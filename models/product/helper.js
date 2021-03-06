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
    eventBus.emit('normalized', { valueRaw: valueRaw, value: result, key: acceptedValues[0].key });
    return result;
};

var normalizeArray = function(acceptedValues, valuesRaw) {
    var result = [];
    valuesRaw.forEach(function(valueRaw) {
        var valueNormalized = normalize(acceptedValues, valueRaw);
        valueNormalized && (result.indexOf(valueNormalized) === -1) && result.push(valueNormalized);
    });
    return result;
};

var helper = {
    normalize: normalize,
    normalizeArray: normalizeArray
};

module.exports = helper;