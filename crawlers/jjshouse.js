var Product = require('../models/product.js');
var Site = require('./site.js');

var Jjshouse = function() {
    Site.apply(this, Array.prototype.slice.call(arguments));
    this.baseUrl = 'http://www.jjshouse.com';
    this.startUrl = 'http://www.jjshouse.com/de/Brautkleider-c2';
};

Jjshouse.prototype.__proto__ = Site.prototype;

Jjshouse.prototype.crawlProductList = function($) {
    var self = this,
        link;
    // go through all products on page x
    $('.catpl-prod').each(function() {
        console.log('.catpl-prod');
        // find link of current product to its product details page
        link = self.baseUrl + $(this).find('.pic>a').attr('href');
        // follow link to product details
        self.downloadUrl(link, self.crawlProductDetails.bind(self));
    });
    // try to go to next page
    $('.page_redirect').each(function() {
        if ($(this).text().match(/Nächste/)) {
            link = self.baseUrl + $(this).attr('href');
            // follow link to next page
            self.downloadUrl(link, self.crawlProductList.bind(self));
            return false;
        }
    });

};

Jjshouse.prototype.crawlProductDetails = function($) {
    var self = this,
        product = new Product();
    // retrieve (parse) relevant product details
    product.title = $('h1').text();
    product.price = $('#id_shop_price').text();
    $('table.goods_attribute_new>tr').each(function() {
        var title = $(this).find('td:first-child'),
            value = title.next();

        if (title.text().match(/Silhouette/)) {
            product.silhouette = value.text();
        } else if (title.text().match(/Halsausschnitt/)) {
            product.neckline = value.text();
        } else if (title.text().match(/Saum|Zug/)) {
            product.hemline = value.text();
        } else if (title.text().match(/Stoff/)) {
            product.fabric = self.stringToArray(value.text());
        } else if (title.text().match(/Verschönerung/)) {
            product.embellishment = self.stringToArray(value.text());
        } else if (title.text().match(/Träger/)) {
            product.straps = value.text();
        } else if (title.text().match(/Ärmel/)) {
            product.sleeve = value.text();
        } else if (title.text().match(/Rücken/)) {
            product.backstyle = value.text();
        }
    });
    $('meta').each(function() {
        if ($(this).attr('property') === 'og:url') {
            product.link = $(this).attr('content');
            return false;
        }
    });
    product.imageUrl = $('img#magnify_pic').attr('src');
    $('.pis-color').each(function() {
        product.colors.push($(this).attr('data-value'));
    });
    $('#_size option').each(function() {
        product.sizes.push($(this).text().slice(3,6).trim());
    });
    // store them in db
    product.save(function(err, doc) {console.log('product saved', doc, err)});
};

module.exports = Jjshouse;