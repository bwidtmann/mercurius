var setColors = function(colorsRaw) {
    var colors = [],
        acceptedColors = [
            'Champagner',
            'Elfenbein',
            'Weiß',
            'Zartrosa'
        ];
    colorsRaw.forEach(function(colorRaw) {
        if (acceptedColors.indexOf(colorRaw) > -1) {
            colors.push(colorRaw);
        }
    });
    return colors;
};

var color = {
    setColors: setColors
};

module.exports = color;