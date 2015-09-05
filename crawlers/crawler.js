var reporter = require('../reporters/reporter.js');

var Crawler = function(name) {
    var Site = require('./' + name + '.js');
    this.name = name;
    this.site = new Site();
};

Crawler.prototype.crawl = function() {
    this.site.crawl();
};

module.exports = Crawler;
