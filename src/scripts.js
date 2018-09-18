var $ = require('jquery');
//console.log("It's working");

// Load beach data from local json file
var json = require('./beacheslrg.json'); //(with path)
var mapjson = require('./mapstyle.json'); //(with path)

function collectData(name){
    // First, find the correct location ID based on the marker name
    // Have to search location JSON again as only a title can be attached to a marker in the Google Maps API
    var needle = name;
    console.log(name);
    for (var i = 0; i < json.length; i++){
        if (json[i].name == needle){
            var id = json[i].id
            var lat = json[i].lat
            var lon = json[i].lng
            var region = json[i].region
            var state = json[i].state
        }
    }
    // Get the weather data
    var wwresult; // Willy Weather Results
    $.ajax({
        url: '/weather',
        type: 'POST',
        data: {
            email: id,
            locname: name,
            locid: id,
            loclat: lat,
            loclon: lon
        },
        async: false,
        success: function(response){
            wwresult = response;
        }, // due to async, move data to function to be used further
    });

    // Get the wildlife data
    var alaresult; // Atlas of Living Australia Results
    $.ajax({
        url: '/wildlife',
        type: 'POST',
        data: {
            email: id,
            locname: name,
            locid: id,
            loclat: lat,
            loclon: lon
        },
        async: false,
        success: function(response){
            alaresult = response;
        }, // due to async, move data to function to be used further
    });

    // Extract variables from weather and wildlife data JSONs
    var weatherjson = JSON.parse(wwresult);
    var speciesjson = JSON.parse(alaresult);

    // Convert numerical trend to string
    function findTrend(trend){
        if (trend < 0){return 'falling'}
        if (trend > 0){return 'rising'}
        else {return 'steady'} 
    };
    // Current Temperature
    var ctemp = weatherjson.observational.observations.temperature.temperature;
    if (ctemp < 15){
        var tempwarning = true;
        //console.log('Too Cold')
    }
    var temptrend = findTrend(weatherjson.observational.observations.temperature.trend);
    // Current Humidity
    // Current Wind
    var windspeed = weatherjson.observational.observations.wind.speed;
    if (windspeed > 35){
        var windwarning = true;
        //console.log('Too Windy')
    }
    var winddir = weatherjson.observational.observations.wind.directionText;
    // Rainfall Today
    var raintoday = weatherjson.observational.observations.rainfall.todayAmount;
    // Report
    var report = weatherjson.regionPrecis.days[0].entries[0].precis;
    // Swell - Midday prediction
    var swellheight = weatherjson.forecasts.swell.days[0].entries[12].height;
    var swelldir = weatherjson.forecasts.swell.days[0].entries[12].directionText;
    var swellperiod = weatherjson.forecasts.swell.days[0].entries[12].period;
    // Tide - 3 results for today
    var tide1time = weatherjson.forecasts.tides.days[0].entries[0].dateTime;
    var tide1height = weatherjson.forecasts.tides.days[0].entries[0].height;
    var tide1type = weatherjson.forecasts.tides.days[0].entries[0].type;
    var tide2time = weatherjson.forecasts.tides.days[0].entries[1].dateTime;
    var tide2height = weatherjson.forecasts.tides.days[0].entries[1].height;
    var tide2type = weatherjson.forecasts.tides.days[0].entries[1].type;

    // Get the wildlife data
    var speciestable = '<table style="width:100%"><tr><th>Scientific Name</th><th>Vernacular Name</th><th>No. Sightings</th></tr>';
    for(var i = 0; i < speciesjson.length; i++) {
        speciestable = speciestable + '<tr><td>' + speciesjson[i].name + '</td><td>' + speciesjson[i].commonName + '</td><td>' + speciesjson[i].count + '</td></tr>';
        if (speciesjson[i].commonName.includes('shark') || speciesjson[i].commonName.includes('shark')){
            var sharkwarning = true;
            //console.log('Shark Warning')
        }
        if (speciesjson[i].commonName.includes('Stonefish') || speciesjson[i].commonName.includes('stonefish')){
            var stonefishwarning = true;
            //console.log('Stonefish Warning')
        }
    }
    speciestable = speciestable + '</table>';


    // Produce warning messages - only have done this for two types of species/weather - extension
    var sharkwarn = '';
    if (sharkwarning) { sharkwarn = '<br>Warning: Sharks have been sighted in this region'; }
    var stonewarn = ''; 
    if (stonefishwarning) { stonewarn = '<br>Warning: Stonefish have been sighted in this region'; }
    var tempwarn = '';
    if (tempwarning) { tempwarn = '<br>Warning: Low temperature, you may need a wetsuit if you are planning on surfing or swimming'; }
    var windwarn = '';
    if (windwarning) { windwarn = '<br>Warning: Strong winds, be cautious if visiting this location'; }

    // Send variables to function to create the infowindow content
    // Create content to be displayed
    var contentString = '<div id="iw-container">' +
    '<div class="iw-title">' + name +  '</div>' +
    '<div class="iw-content">' +
        '<p>' + region + ', ' + state + '</p>' +
        '<div class="iw-subTitle">Current Conditions</div>' +
        //'<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
        '<p><b>Temperature</b> <br> ' + ctemp + ' C , trend: ' + temptrend + 
        '<br><b>Wind</b> <br>' + windspeed + ' km/h ' + winddir +
        '<br><b>Rainfall Today (<24hrs)</b> <br> ' + raintoday + ' mm' +
        '<br><b>Swell</b> <br>' + swellheight + ' meters in the ' + swelldir + ' direction and a ' + swellperiod + ' second swell period' +
        '<br><b>Tides</b> ' + '<br>       ' + tide1type + ' tide of ' + tide1height + ' meters, time: ' + tide1time +
                        '<br>       ' + tide2type + ' tide of ' + tide2height + ' meters, time: ' + tide2time +
        '<br><b>Report</b> <br>' + report +
        '</p>' +
        '<div class="iw-subTitle">Species Sighted at Location</div>' + speciestable +
        '<br><div class="iw-subTitle">Recommendations</div>' +
        '<p>Based on the weather and wildlife data collected for this area, Nautilus advises the following warnings: <br>'+
        sharkwarn +
        stonewarn +
        tempwarn +
        windwarn +
        '</p>'+
    '</div>' +
    '<div class="iw-bottom-gradient"></div>' +
    '</div>';
    return contentString;
}

function initMap() {}
$(() => {
   
    var mapOptions = {
        center: {lat: -27.17, lng: 153.04},
        zoom: 9,
        styles: mapjson,
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Looping through all the entries from the JSON data
    for(var i = 0; i < json.length; i++) {
        // Current object
        var obj = json[i];
        // Adding a new marker for the object
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(obj.lat,obj.lng),
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8
            },
            map: map,
            title: obj.name // Hover content
        });

        // InfoWindow content
        // To show if an error has occured creating content
        var contentString = '<div id="iw-container">' +
        '<div class="iw-title">Beach Location</div>' +
        '<div class="iw-content">' +
            '<p>An error has occured in processing your request</p>' +
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
        '</div>';

        // Adding a new info window for the object
        var clicker = addClicker(marker, contentString);
    } // end loop

    // Adding a new click event listener for the object
    function addClicker(marker, content) {
        
        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
            // Populate infowindow
            var contentString = collectData(marker.getTitle());
            infowindow.setContent(contentString);
            // Open the window
            if (infowindow) {infowindow.close();}
            infowindow.open(map, marker);
        });

        // To customise the infowindow google.maps.event.addListener() event expects HTML structure 'domready'
        google.maps.event.addListener(infowindow, 'domready', function() {
            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');
            var iwBackground = iwOuter.prev();
            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({'display' : 'none'});
            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({'display' : 'none'});
            // Arrow margin and shadow.
            iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
            iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
            iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();
            // Apply effect to the close button
            iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #B22222', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});
            // If content of infowindow not exceed the set maximum height remove gradient.
            if($('.iw-content').height() < 140){
                $('.iw-bottom-gradient').css({display: 'none'});
            }
            // This function reverses close button opacity
            iwCloseBtn.mouseout(function(){
            $(this).css({opacity: '1'});
            });
        });
    }
})
window.initMap = initMap;




