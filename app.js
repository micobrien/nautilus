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

app.post('/weather', function(req, res) {
    addWeatherData(req.body.locid, req.body.locname, req, res);
    //res.json(addWeatherData(req.body.locid, req.body.locname));
    //res.end('success');
});

app.post('/wildlife', function(req, res) {
    addWildlifeData(req.body.loclat, req.body.loclon, req, res);
    //res.json(addWeatherData(req.body.locid, req.body.locname));
    //res.end('success');
});

// Willy Weather Requests
function addWeatherData(id, name, req, res) {
    var request = require("request");

    var urlstart = 'https://api.willyweather.com.au/v2/YzVkN2Q4NjVkNDA1YjM4NDA0MGZjNz/locations/';
    var locationid = id;
    var urlend = '/weather.json';
    var urlfinal = urlstart + locationid + urlend;
    console.log(urlfinal);

    var options = { method: 'GET',
    url: urlfinal,
    qs: 
    { observational: 'true', days: '1', regionPrecis: 'true', days: '1', forecasts: 'tides,swell', days: '1' },
    headers: 
    { 'Postman-Token': 'e33a5046-3b1f-4ee3-8a56-59b09e6c24ae',
        'Cache-Control': 'no-cache' } };

    request(options, function (error, response, body) {
        console.log('Getting Weather Report: ' + name);
        res.send(body);
    //if (error) throw new Error(error);
    //console.log(body);
    });
}

// Atlas of Living Australia Requests
function addWildlifeData(latin, lonin, req, res) {
    var request = require("request");

    var options = { method: 'GET',
    url: 'http://biocache.ala.org.au/ws/explore/group/Fishes',
    qs: 
    { lat: latin,
        lon: lonin,
        radius: '10',
        pageSize: '100',
        sort: 'count' },
    headers: 
    { 'Postman-Token': 'bff02e45-adf7-4175-a72f-d8f480ee71a6',
        'Cache-Control': 'no-cache' } };

    request(options, function (error, response, body) {
        console.log('Getting Species List: ' + latin + ', ' + lonin);
        res.send(body);
    //if (error) throw new Error(error);
    //console.log(body);
    });
}


