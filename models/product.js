var mongoose = require('mongoose');
var helper = require('./product/helper.js');
var price = require('./product/price.js');
var colors = require('./product/colors.json');
var size = require('./product/size.js');
var silhouettes = require('./product/silhouettes.json');
var necklines = require('./product/necklines.json');

var schema = new mongoose.Schema({
    title: { type: String, trim: true },
    price: { type: Number, set: price.setPrice },
    silhouette: { type: String, set: function(valueRaw) { return helper.normalize(silhouettes, valueRaw) } },
    neckline: { type: String, set: function(valueRaw) { return helper.normalize(necklines, valueRaw) } },
    waist: { type: String, trim: true },
    hemline: { type: String, trim: true },
    fabric: { type: Array, trim: true },
    embellishment: { type: Array, trim: true },
    backstyle: { type: String, trim: true },
    sleeve: { type: String, trim: true },
    straps: { type: String, trim: true },
    link: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    colors: { type: Array, set: function(valuesRaw) { return helper.normalizeArray(colors, valuesRaw) } },
    sizes: { type: Array, set: size.setSizes }
});

module.exports = mongoose.model('Product', schema);