var db = require('./db.js');
var Crawler = require('./crawlers/crawler.js');
var eventBus = require('./buses/eventbus.js');

// start crawling
var crawler = new Crawler('davidsbridal');
crawler.crawl();

eventBus.on('ended', function() {
    console.log('crawler ended received!');
    db.close();
});