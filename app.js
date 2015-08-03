var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var cheerio = require("cheerio");

// Constants
var PORT = 8080;

// App
var app = express();

// connect to mongodb
mongoose.connect('mongodb://mongo:27017/test');
mongoose.connection.on('open', function() {
    console.log('mongodb connected');
});

var Product = mongoose.model('Product', { title: String, price: String });

app.get('/search', function (req, res) {

    Product.find({price: { $gt: 100, $lt: 200 }}, function(err, products) {
        res.send(products);
    });
});

app.get('/crawl', function (req, res) {

    res.send('crawling ' + req.query.site + ' ...\n');

    // first flush all products before crawling new products
    Product.remove({}, function(err) {
        console.log('products removed', err);
    });

    http.get(req.query.site, function(res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function() {
            var $ = cheerio.load(data),
                product, title, price;

            $('#list_bg_big_img>ul>li').each(function() {
                title = $(this).find('img').attr('title');
                price = parseFloat($(this).find('.car_price').text().replace(/[^0-9\.-]+/g,''));
                product = new Product({ title: title, price: price });
                product.save();
            });
        });
    })
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);