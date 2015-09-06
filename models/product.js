var mongoose = require('mongoose');
var helper = require('./product/helper.js');
var price = require('./product/price.js');
var colors = require('./product/colors.json');
var size = require('./product/size.js');
var silhouettes = require('./product/silhouettes.json');
var necklines = require('./product/necklines.json');
var hemlines = require('./product/hemlines.json');
var straps = require('./product/straps.json');
var backstyles = require('./product/backstyles.json');
var fabrics = require('./product/fabrics.json');
var embellishments = require('./product/embellishments.json');

var schema = new mongoose.Schema({
    title: { type: String, trim: true },
    price: { type: Number, set: price.setPrice },
    silhouette: { type: String, set: function(valueRaw) { return helper.normalize(silhouettes, valueRaw) } },
    neckline: { type: String, set: function(valueRaw) { return helper.normalize(necklines, valueRaw) } },
    hemline: { type: String, set: function(valueRaw) { return helper.normalize(hemlines, valueRaw) } },
    fabric: { type: Array, set: function(valueRaw) { return helper.normalizeArray(fabrics, valueRaw) } },
    embellishment: { type: Array, set: function(valueRaw) { return helper.normalizeArray(embellishments, valueRaw) } },
    backstyle: { type: String, set: function(valueRaw) { return helper.normalize(backstyles, valueRaw) } },
    straps: { type: Array, set: function(valueRaw) { return helper.normalizeArray(straps, valueRaw) } },
    linkUrl: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    colors: { type: Array, set: function(valuesRaw) { return helper.normalizeArray(colors, valuesRaw) } },
    sizes: { type: Array, set: size.setSizes }
});

module.exports = mongoose.model('Product', schema);