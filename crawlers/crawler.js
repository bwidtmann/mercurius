var http = require('http');
var cheerio = require("cheerio");

var Product = require('../models/product.js');

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

var crawler = {
    downloadUrl: downloadUrl,
    crawlProductList: crawlProductList,
    crawlProductDetails: crawlProductDetails
};

module.exports = crawler;
