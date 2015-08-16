var mongoose = require('mongoose');
var price = require('./product/price.js');
var color = require('./product/color.js');
var size = require('./product/size.js');
var silhouette = require('./product/silhouette.js');
var neckline = require('./product/neckline.js');

var schema = new mongoose.Schema({
    title: { type: String, trim: true },
    price: { type: Number, set: price.setPrice },
    silhouette: { type: String, set: silhouette.normalize },
    neckline: { type: String, set: neckline.normalize },
    waist: { type: String, trim: true },
    hemline: { type: String, trim: true },
    fabric: { type: Array, trim: true },
    embellishment: { type: Array, trim: true },
    backstyle: { type: String, trim: true },
    sleeve: { type: String, trim: true },
    straps: { type: String, trim: true },
    link: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    colors: { type: Array, set: color.setColors },
    sizes: { type: Array, set: size.setSizes }
});

module.exports = mongoose.model('Product', schema);