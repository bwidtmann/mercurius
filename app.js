var express = require('express');
var db = require('./db.js');
var Crawler = require('./crawlers/crawler.js');
var Product = require('./models/product.js');
var Report = require('./reporters/report.js');

// Constants
var PORT = 8080;

// App
var app = express();

var renderProducts = function(products) {
    var html = '';
    products.forEach(function(product) {
        html += '<div style="clear:both">' +
        '<div style="position: relative; float: left; width: 300px">' +
        '<a href="' + product.linkUrl + '">' +
            '<img src=' + product.imageUrl + ' width="300px"></img>' +
        '</a>' +
        '</div>' +
        '<div style="position: relative;">' +
        '<div>title: ' + product.title + '</div>' +
        '<div>silhouette: ' + product.silhouette + '</div>' +
        '<div>neckline: ' + product.neckline + '</div>' +
        '<div>hemline: ' + product.hemline + '</div>' +
        '<div>fabric: ' + product.fabric + '</div>' +
        '<div>backstyle: ' + product.backstyle + '</div>' +
        '<div>straps: ' + product.straps + '</div>' +
        '<div>colors: ' + product.colors + '</div>' +
        '<div>sizes: ' + product.sizes + '</div>' +
        '<div>price: ' + product.price + '</div>' +
        '</div>' +
        '</div>';
    });
    return html;
};

app.get('/search', function (req, res) {

    Product.find({
        //category: 'Meerjungfrauen-Stil',
        //price: { $gt: 0, $lt: 250 }
        }, function(err, products) {
            res.send(renderProducts(products));
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