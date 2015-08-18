var express = require('express');

var EventBus = require('./eventbus.js');
EVENTBUS = new EventBus();
var reporter = require('./reporters/reporter.js');
var db = require('./db.js');
var Crawler = require('./crawlers/crawler.js');
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

    res.send('crawling ' + req.query.site + ' ...\n');

    // first flush all products before crawling new products
    Product.remove({}, function(err) {
        console.log('products removed', err);
    });

    // start crawling
    var crawler = new Crawler(req.query.site);
    crawler.crawl();

});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);