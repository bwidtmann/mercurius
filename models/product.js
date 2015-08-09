var mongoose = require('mongoose');
var price = require('./product/price.js');
var color = require('./product/color.js');
var size = require('./product/size.js');

var schema = new mongoose.Schema({
    title: { type: String, trim: true },
    price: { type: Number, set: price.setPrice },
    category: { type: String, trim: true },
    link: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    colors: { type: Array, set: color.setColors },
    sizes: { type: Array, set: size.setSizes }
});

module.exports = mongoose.model('Product', schema);