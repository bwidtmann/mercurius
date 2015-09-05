var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var cheerio = require('cheerio');
var eventBus = require('../buses/eventbus.js');

var Site = function() {};

Site.prototype.crawl = function() {
    var self = this;
    eventBus.emit('started', { name: this.startUrl });
    this.downloadUrl(this.startUrl).then(function($) {
        self.crawlCategoryList($).then(function() {
            eventBus.emit('ended');
        })
    });
};

Site.prototype.downloadUrl = function(url) {
    console.log('downloadUrl: ', url);
    return request.getAsync(url).spread(function(response, body) {
        return new Promise(function(resolve, reject) {
            resolve(cheerio.load(body));
        });
    });
};

Site.prototype.stringToArray = function(string) {
    return string.trim().split(',').map(function(s) {
        return s.trim();
    });
};

module.exports = Site;