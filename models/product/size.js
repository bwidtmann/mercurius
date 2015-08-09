var setSizes = function(sizesRaw) {
    var sizes = [],
        acceptedSizes = [
            '2',
            '4',
            '6',
            '8',
            '10',
            '12',
            '14',
            '16'
        ];
    sizesRaw.forEach(function(sizeRaw) {
        if (acceptedSizes.indexOf(sizeRaw) > -1) {
            sizes.push(sizeRaw);
        }
    });
    return sizes;
};

var size = {
    setSizes: setSizes
};

module.exports = size;