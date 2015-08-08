var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    link: String,
    imageUrl: String,
    colors: String,
    sizes: String
});

module.exports = mongoose.model('Product', schema);