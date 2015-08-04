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

var Product = mongoose.model('Product', {   title: String,
                                            price: Number,
                                            category: String,
                                            link: String,
                                            imageUrl: String,
                                            colors: String,
                                            sizes: String});

app.get('/search', function (req, res) {

    Product.find({
        price: { $gt: 0, $lt: 150 }
    }, function(err, products) {
            res.send(products);
    }).sort({ price: 1 });
});

var downloadUrl = function(url, callback) {
    console.log('downloadUrl: ', url);
    http.get(url, function(res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function() {
            callback(cheerio.load(data));
        });
    })
};

var crawlProductList = function($) {
    var link;
    // go through all products on page x
    $('#list_bg_big_img>ul>li').each(function() {
        // find link of current product to its product details page
        link = $(this).find('a').attr('href');
        // follow link to product details
        downloadUrl(link, crawlProductDetails);
    });
    // try to go to next page
    $('p.b>a').each(function() {
        if ($(this).attr('title').trim() === 'Next Page') {
            link = $(this).attr('href');
            // follow link to next page
            downloadUrl(link, crawlProductList);
            return false;
        }
    })

};

var crawlProductDetails = function($) {
    var product, title, price, category, link, imageUrl, colors = [], sizes = [];
    // retrieve (parse) relevant product details
    title = $('h1').text().trim();
    price = parseFloat($('#products_price_unit').text().trim().replace(/[^0-9\.-]+/g,''));
    category = $('a span.red').text().trim();
    link = $('a span.red').parent().next().attr('href');
    imageUrl = $('#product_flash_show').attr('href');
    $('#attrib-2 option').each(function() {
        var colorId = $(this).val(),
            colorName = $(this).text();
        // do not add options like 'Bitte Auswählen' to colors
        if (colorId > 0 && colorId !== '149') {
            colors.push(colorName);
        }
    });
    $('#attrib-9 option').each(function() {
        var sizeId = $(this).val(),
            sizeName = $(this).text();
        // do not add options like 'Bitte Auswählen' to sizes
        if (sizeId > 0 && sizeId < 154) {
            sizes.push(sizeName);
        }
    });
    // store them in db
    product = new Product({ title: title,
                            price: price,
                            category: category,
                            link: link,
                            imageUrl: imageUrl,
                            colors: colors,
                            sizes: sizes});
    product.save();
};

app.get('/crawl', function (req, res) {

    res.send('crawling ' + 'bridesire' + ' ...\n');

    // first flush all products before crawling new products
    Product.remove({}, function(err) {
        console.log('products removed', err);
    });

    // start crawling
    downloadUrl('http://www.bridesire.de/brautkleider_c97', crawlProductList);

});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);