var http = require('http');
var cheerio = require('cheerio');
var eventBus = require('../buses/eventbus.js');

var Site = function() {};

Site.prototype.crawl = function() {
    eventBus.emit('started', { name: this.startUrl });
    this.downloadUrl(this.startUrl, this.crawlCategoryList.bind(this));
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

Site.prototype.stringToArray = function(string) {
    return string.trim().split(',').map(function(s) {
        return s.trim();
    });
};

module.exports = Site;