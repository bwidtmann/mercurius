var Product = require('../models/product.js');
var Site = require('./site.js');

var Davidsbridal = function() {
    Site.apply(this, Array.prototype.slice.call(arguments));
    this.baseUrl = 'http://www.davidsbridal.com';
    this.startUrl = 'http://www.davidsbridal.com/Browse_wedding-dresses-all-wedding-dresses';
};

Davidsbridal.prototype.__proto__ = Site.prototype;

Davidsbridal.prototype.crawlCategoryList = function($) {
    this.downloadUrl(this.startUrl, this.crawlProductList.bind(this));
};

Davidsbridal.prototype.crawlProductList = function($) {
    var self = this,
        link, price;
    // go through all products on page x
    $('#ctnr-prod-items>.ctnr-prod-item').each(function() {
        // find link of current product to its product details page
        link = $(this).find('.product_info>a').attr('href');
        price = $(this).find('.product_info>.product_price>a').text();
        // follow link to product details
        self.downloadUrl(link, self.crawlProductDetails.bind(self, link, price));
    });
    // try to go to next page
    $('.paging-next').each(function() {
        link = $(this).attr('href');
        // follow link to next page
        self.downloadUrl(link, self.crawlProductList.bind(self));
        return false;
    });

};

Davidsbridal.prototype.crawlProductDetails = function(link, price, $) {
    var self = this,
        fullText,
        colors = [], sizes = [],
        product = new Product();
    // retrieve (parse) relevant product details
    product.title = $('h1').text().replace(/\n| +(?= )/g,'');
    product.price = price;
    product.linkUrl = link;

    fullText = $('.full-text').text();
    product.silhouette = fullText;
    product.neckline = fullText;
    product.hemline = fullText;
    product.fabric = [fullText];
    product.embellishment = fullText;
    product.backstyle = fullText;
    product.straps = [fullText];

    product.imageUrl = $('.image_container>img').attr('src');
    $('#product_color_swatch_heading>ul>li').each(function() {
        colors.push($(this).attr('id'));
    });
    product.colors = colors;
    $('.swatch_list.ctnr-size-swatches>ul>li>a').each(function() {
        sizes.push($(this).attr('aria-label'));
    });
    product.sizes = sizes;
    // store them in db
    product.save(function(err, doc) {console.log('product saved', doc, err)});
};

module.exports = Davidsbridal;