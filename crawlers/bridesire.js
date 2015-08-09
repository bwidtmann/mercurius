var Product = require('../models/product.js');
var Site = require('./site.js');

var Bridesire = function() {
    Site.apply(this, Array.prototype.slice.call(arguments));
    this.baseUrl = 'http://www.bridesire.de';
    this.startUrl = 'http://www.bridesire.de/brautkleider_c97';
};

Bridesire.prototype = new Site();

Bridesire.prototype.crawlProductList = function($) {
    var self = this,
        link;
    // go through all products on page x
    $('#list_bg_big_img>ul>li').each(function() {
        // find link of current product to its product details page
        link = $(this).find('a').attr('href');
        // follow link to product details
        self.downloadUrl(link, self.crawlProductDetails.bind(self));
    });
    // try to go to next page
    $('p.b>a').each(function() {
        if ($(this).attr('title').trim() === 'Next Page') {
            link = $(this).attr('href');
            // follow link to next page
            self.downloadUrl(link, self.crawlProductList.bind(self));
            return false;
        }
    })

};

Bridesire.prototype.crawlProductDetails = function($) {
    var product = new Product();
    // retrieve (parse) relevant product details
    product.title = $('h1').text();
    product.price = $('#products_price_unit').text();
    product.category = $('a span.red').text();
    product.link = $('a span.red').parent().next().attr('href');
    product.imageUrl = $('#product_flash_show').attr('href');
    $('#attrib-2 option').each(function() {
        product.colors.push($(this).text());
    });
    $('#attrib-9 option').each(function() {
        product.sizes.push($(this).text());
    });
    // store them in db
    product.save(function(err) {console.log('product saved', err)});
};

module.exports = Bridesire;