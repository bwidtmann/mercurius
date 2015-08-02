var express = require('express');
var redis = require('redis');

// Constants
var PORT = 8080;

// App
var app = express();

var client = redis.createClient(process.env.REDIS_PORT_6379_TCP_PORT || '6379',
                                process.env.REDIS_PORT_6379_TCP_ADDR || 'localhost');

client.on('connect', function () {
    console.log('redis connected');
});

app.get('/', function (req, res) {
    res.send('Hello world\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);