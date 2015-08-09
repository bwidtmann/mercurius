var http = require('http');
var cheerio = require('cheerio');

var Site = function() {};

Site.prototype.crawl = function() {
    this.downloadUrl(this.startUrl, this.crawlProductList.bind(this));
};

Site.prototype.downloadUrl = function(url, callback) {
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

module.exports = Site;