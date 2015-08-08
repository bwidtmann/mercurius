var express = require('express');

var db = require('./db.js');
var crawler = require('./crawlers/crawler.js');
var Product = require('./models/product.js');

// Constants
var PORT = 8080;

// App
var app = express();

app.get('/search', function (req, res) {

    Product.find({
        //category: 'Meerjungfrauen-Stil',
        //price: { $gt: 0, $lt: 250 }
        }, function(err, products) {
            res.send(products);
    }).sort({ price: -1 });
});

app.get('/crawl', function (req, res) {

    res.send('crawling ' + 'bridesire' + ' ...\n');

    // first flush all products before crawling new products
    Product.remove({}, function(err) {
        console.log('products removed', err);
    });

    // start crawling
    crawler.downloadUrl('http://www.bridesire.de/brautkleider_c97', crawler.crawlProductList);

});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);