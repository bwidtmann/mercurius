var Product = require('../models/product.js');
var Site = require('./site.js');

var Bridesire = function() {
    Site.apply(this, Array.prototype.slice.call(arguments));
    this.baseUrl = 'http://www.bridesire.de';
    this.startUrl = 'http://www.bridesire.de/brautkleider_c97';
};

Bridesire.prototype.__proto__ = Site.prototype;

Bridesire.prototype.crawlCategoryList = function($) {
    return this.downloadUrl(this.startUrl).then(this.crawlProductList.bind(this));
};

Bridesire.prototype.crawlProductList = function($) {
    var self = this,
        link, promise;
    // go through all products on page x
    $('#list_bg_big_img>ul>li').each(function() {
        // find link of current product to its product details page
        link = $(this).find('a').attr('href');
        // follow link to product details
        promise = self.downloadUrl(link).then(self.crawlProductDetails.bind(self,link));
    });
    // try to go to next page
    $('p.b>a').each(function() {
        if ($(this).attr('title').trim() === 'Next Page') {
            link = $(this).attr('href');
            // follow link to next page
            promise = self.downloadUrl(link).then(self.crawlProductList.bind(self));
            return false;
        }
    });
    return promise;

};

Bridesire.prototype.crawlProductDetails = function(link, $) {
    var self = this,
        colors = [], sizes = [], straps = [],
        product = new Product();
    // retrieve (parse) relevant product details
    product.title = $('h1').text();
    product.price = $('#products_price_unit').text();
    product.linkUrl = link;

    $('.description_sec>strong').each(function() {
        var title = $(this).text(),
            value = $(this).get(0).nextSibling.data || '';

        if (title.match(/Silhouette/i)) {
            product.silhouette = value;
        } else if (title.match(/Ausschnitt/i)) {
            product.neckline = value;
            straps.push(value);
        } else if (title.match(/Saum/i)) {
            product.hemline = value;
        } else if (title.match(/Stoff/i)) {
            product.fabric = self.stringToArray(value);
        } else if (title.match(/Verschönerung|Verzierung/i)) {
            product.embellishment = self.stringToArray(value);
        } else if (title.match(/Ärmel/i)) {
            straps.push(value);
        } else if (title.match(/Rücken/i)) {
            product.backstyle = value;
        }
    });
    product.straps = straps;

    product.imageUrl = $('#product_flash_show').attr('href');
    $('#attrib-2 option').each(function() {
        colors.push($(this).text());
    });
    product.colors = colors;
    $('#attrib-9 option').each(function() {
        sizes.push($(this).text());
    });
    product.sizes = sizes;
    // store them in db
    product.save(function(err, doc) {console.log('product saved', err, doc)});
};

module.exports = Bridesire;