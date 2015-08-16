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
    return result;
};

var helper = {
    normalize: normalize
};

module.exports = helper;