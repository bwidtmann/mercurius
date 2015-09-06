var Product = require('../models/product.js');
var Site = require('./site.js');

var Jjshouse = function() {
    Site.apply(this, Array.prototype.slice.call(arguments));
    this.baseUrl = 'http://www.jjshouse.com';
    this.startUrl = 'http://www.jjshouse.com/Cheap-Wedding-Dresses-c2';
};

Jjshouse.prototype.__proto__ = Site.prototype;

Jjshouse.prototype.crawlCategoryList = function($) {
    return this.downloadUrl(this.startUrl).then(this.crawlProductList.bind(this));
};

Jjshouse.prototype.crawlProductList = function($) {
    var self = this,
        link, promise;
    // go through all products on page x
    $('.catpl-prod').each(function() {
        // find link of current product to its product details page
        link = self.baseUrl + $(this).find('.pic>a').attr('href');
        // follow link to product details
        promise = self.downloadUrl(link).then(self.crawlProductDetails.bind(self, link));
    });
    // try to go to next page
    $('.page_redirect').each(function() {
        if ($(this).text().match(/Next/)) {
            link = self.baseUrl + $(this).attr('href');
            // follow link to next page
            promise = self.downloadUrl(link).then(self.crawlProductList.bind(self));
            return false;
        }
    });
    return promise;

};

Jjshouse.prototype.crawlProductDetails = function(link, $) {
    var self = this,
        colors = [], sizes = [], straps = [],
        product = new Product();
    // retrieve (parse) relevant product details
    product.title = $('h1').text();
    product.price = $('#id_shop_price').text();
    product.linkUrl = link;

    $('table.goods_attribute_new>tr').each(function() {
        var title = $(this).find('td:first-child'),
            value = title.next();

        if (title.text().match(/Silhouette/)) {
            product.silhouette = value.text();
        } else if (title.text().match(/Neckline/)) {
            //jjshouse puts 'neckholder' wrong to 'neckline'! -> should be 'straps'
            if (value.text().trim().match(/^Halter$/)) {
                straps.push('neckholder');
            } else {
                product.neckline = value.text();
            }
        } else if (title.text().match(/Hemline|Train/)) {
            product.hemline = value.text();
        } else if (title.text().match(/Fabric/)) {
            product.fabric = self.stringToArray(value.text());
        } else if (title.text().match(/Embellishment/)) {
            product.embellishment = self.stringToArray(value.text());
        } else if (title.text().match(/Straps/)) {
            straps.push(value.text());
        } else if (title.text().match(/Sleeve/)) {
            straps.push(value.text());
        } else if (title.text().match(/Back/)) {
            product.backstyle = value.text();
        }
    });
    product.straps = straps;

    product.imageUrl = $('img#magnify_pic').attr('src');
    $('.pis-color').each(function() {
        colors.push($(this).attr('data-value'));
    });
    product.colors = colors;
    $('#_size option').each(function() {
        sizes.push($(this).text().slice(3,6).trim());
    });
    product.sizes = sizes;
    // store them in db
    product.save(function(err, doc) {console.log('product saved', doc, err)});
};

module.exports = Jjshouse;