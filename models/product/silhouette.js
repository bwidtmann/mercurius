var normalize = function(valueRaw) {
    var result,
        acceptedValues = [
            { key: 'ballGown', regex: 'ball|gown|duchesse' },
            { key: 'empire', regex: 'empire' },
            { key: 'trumpetMermaid', regex: 'trumpet|trompete|mermaid|meerjungfrau' },
            { key: 'sheathColumn', regex: 'sheath|column|etui' },
            { key: 'aLinePrincess', regex: 'a-line|a-linie|princess|prinzessin' }
        ];
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

var silhouette = {
    normalize: normalize
};

module.exports = silhouette;