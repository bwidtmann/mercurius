var express = require('express');
var db = require('./db.js');
var Crawler = require('./crawlers/crawler.js');
var Product = require('./models/product.js');
var Report = require('./reporters/report.js');

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

app.get('/flush', function (req, res) {

    // flush all products in db
    Product.remove({}, function(err) {
        res.send('products flushed');
    });

});

app.get('/crawl', function (req, res) {

    res.send('crawling ' + req.query.site + ' ...\n');

    // start crawling
    var crawler = new Crawler(req.query.site);
    crawler.crawl();

});

app.get('/reports', function (req, res) {

    Report.find({}, function(err, reports) {
        res.send(reports);
    }).sort({ startedAt: -1 });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);