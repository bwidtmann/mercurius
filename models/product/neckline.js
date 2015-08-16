var normalize = function(valueRaw) {
    var result,
        acceptedValues = [
            { key: 'sweetheart', regex: 'heart|herz' },
            { key: 'strapless', regex: 'strapless|trägerlos|halterlos' },
            { key: 'v', regex: 'v-neck|v-ausschnitt' },
            { key: 'scoop', regex: 'scoop|u-ausschnitt' },
            { key: 'strap', regex: 'strap|träger|halter' },
            { key: 'oneShoulder', regex: 'one-shoulder|one shoulder|1-Schulter|1 Schulter' },
            { key: 'offTheShoulder', regex: 'off-the-shoulder|off the shoulder|schulterfrei' },
            { key: 'square', regex: 'square|carre|carré|rechteck' },
            { key: 'scalloped', regex: 'scallop|welle' },
            { key: 'high', regex: 'high|steh' }
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

var neckline = {
    normalize: normalize
};

module.exports = neckline;