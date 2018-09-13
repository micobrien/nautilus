const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(3000, function() {
    console.log("listen to andre 3000");
});

app.post('/', function(req, res) {
    addWeatherData(req.body.email);
    console.log(req.body.email)
    res.end('success');
});

function addWeatherData(email) {
    var request = require("request");

    var urlstart = 'https://api.willyweather.com.au/v2/YzVkN2Q4NjVkNDA1YjM4NDA0MGZjNz/locations/';
    var locationid = email;
    var urlend = '/weather.json';
    var urlfinal = urlstart + locationid + urlend;
    console.log(urlfinal);

    var options = { method: 'GET',
    url: urlfinal,
    qs: { forecasts: 'weather,wind' },
    headers: 
    { 'Postman-Token': 'e33a5046-3b1f-4ee3-8a56-59b09e6c24ae',
        'Cache-Control': 'no-cache' } };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});

}
