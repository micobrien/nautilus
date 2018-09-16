var $ = require('jquery');

//console.log($('form'));
//console.log("it's working");

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
        // INSERT ERROR HANDLE HERE
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

    // Extract variables from weather data JSON
    var weatherjson = JSON.parse(wwresult);
    var speciesjson = JSON.parse(alaresult);

    //console.log(speciesjson);

    // Convert numerical trend to string
    function findTrend(trend){
        if (trend < 0){return 'falling'}
        if (trend > 0){return 'rising'}
        else {return 'steady'} 
    };
    // Current Temperature
    var ctemp = weatherjson.observational.observations.temperature.temperature;
    var temptrend = findTrend(weatherjson.observational.observations.temperature.trend);
    // Current Humidity
    // Current Wind
    var windspeed = weatherjson.observational.observations.wind.speed;
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
    }
    speciestable = speciestable + '</table>';

    // Send variables to function to create the infowindow content
    // ERROR HANDLE IF ITEMS COME BACK AS ERROR/UNDEFINED
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
        '<br>Suitable for Fishing.<br>Suitable for Diving/Snorkeling.<br>Suitable for Surfing.</p>'+
    '</div>' +
    '<div class="iw-bottom-gradient"></div>' +
    '</div>';
    return contentString;
}

var json = require('./beacheslrg.json'); //(with path)

function initMap() {}

$(() => {
    // Load beach data from local json file
    
    
    var mapOptions = {
        center: {lat: -27.17, lng: 153.04},
        zoom: 9,
        styles:[
            {elementType: "geometry", stylers: [{color: "#f5f5f5"}]},
            {elementType: "labels.icon", stylers: [{visibility: "off"}]},
            {elementType: "labels.text.fill", stylers: [{color: "#616161"}]},
            {elementType: "labels.text.stroke", stylers: [{color: "#f5f5f5"}]},
            {featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{color: "#bdbdbd"}]},
            {featureType: "poi", elementType: "geometry", stylers: [{"color": "#eeeeee"}]},
            {featureType: "poi", elementType: "labels.text.fill", stylers: [{"color": "#757575"}]},
            {featureType: "poi.business", stylers: [{visibility: "off"}]},
            {featureType: "poi.park", elementType: "geometry", stylers: [{color: "#e5e5e5"}]},
            {featureType: "poi.park", elementType: "labels.text", stylers: [{visibility: "off"}]},
            {featureType: "poi.park", elementType: "labels.text.fill", stylers: [{color: "#9e9e9e"}]},
            {featureType: "road", "stylers": [{visibility: "off"}]},
            {featureType: "road", elementType: "geometry", stylers: [{color: "#ffffff"}]},
            {featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{color: "#757575"}]},
            {featureType: "road.highway", elementType: "geometry", stylers: [{color: "#dadada"}]},
            {featureType: "road.highway", elementType: "labels.text.fill", stylers: [{color: "#616161"}]},
            {featureType: "road.local", elementType: "labels.text.fill", stylers: [{color: "#9e9e9e"}]},
            {featureType: "transit.line", elementType: "geometry", stylers: [{color: "#e5e5e5"}]},
            {featureType: "transit.station", elementType: "geometry", stylers: [{color: "#eeeeee"}]},
            {featureType: "water", elementType: "geometry", stylers: [{color: "#c9c9c9"}]},
            {featureType: "water", elementType: "geometry.fill", stylers: [{color: "#006c90"}]},
            {featureType: "water", elementType: "labels.text.fill", stylers: [{color: "#9e9e9e"}]}
        ]
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
            title: obj.name // this works, giving the marker a title with the correct title
        });

        // InfoWindow content
        //var contentString = createContent(obj.name, obj.id, obj.lat, obj.lng, obj.region, obj.state);

        var contentString = '<div id="iw-container">' +
        '<div class="iw-title">Beach Location</div>' +
        '<div class="iw-content">' +
            '<p>Region, State</p>' +
            '<div class="iw-subTitle">Current Conditions</div>' +
            '<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
            '<p>Wind:' +
            '<br>Rain:' +
            '<br>Swell:' +
            '<br>Tide:' +
            '<br>Report:' +
            '</p>' +
            '<div class="iw-subTitle">Species Sighted at Location</div>' +
            '<table style="width:100%"><tr><th>Scientific Name</th><th>Vernacular Name</th><th>No. Sightings</th></tr><tr><td>Jill</td><td>Smith</td><td>50</td></tr><tr><td>Eve</td><td>Jackson</td><td>94</td></tr></table>' +
            '<br><div class="iw-subTitle">Recommendations</div>' +
            '<p>Based on the weather and wildlife data collected for this area, Nautilus suggests that this location is: <br>'+
            '<br>Suitable for Fishing.<br>Suitable for Diving/Snorkeling.<br>Suitable for Surfing.</p>'+
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
            //var contentString = createContent(obj.name, obj.id, obj.lat, obj.lng, obj.region, obj.state);
            //var infowindow = new google.maps.InfoWindow({content: contentString});
            var contentString = collectData(marker.getTitle());
            infowindow.setContent(contentString);

            if (infowindow) {infowindow.close();}
            infowindow.open(map, marker);
            //infowindow.close();
        });

        // *
        // START INFOWINDOW CUSTOMIZE.
        // The google.maps.event.addListener() event expects
        // the creation of the infowindow HTML structure 'domready'
        // and before the opening of the infowindow, defined styles are applied.
        // *
        google.maps.event.addListener(infowindow, 'domready', function() {
            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');
            /* Since this div is in a position prior to .gm-div style-iw.
            * We use jQuery and create a iwBackground variable,
            * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
            */
            var iwBackground = iwOuter.prev();
            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({'display' : 'none'});
            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({'display' : 'none'});
            // Moves the infowindow 115px to the right.
            iwOuter.parent().parent().css({left: '0px'});
            // Moves the shadow of the arrow 76px to the left margin.
            iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
            // Moves the arrow 76px to the left margin.
            iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
            // Changes the desired tail shadow color.
            iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();
            // Apply the desired effect to the close button
            iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #B22222', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});
            // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
            if($('.iw-content').height() < 140){
                $('.iw-bottom-gradient').css({display: 'none'});
            }
            // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
            iwCloseBtn.mouseout(function(){
            $(this).css({opacity: '1'});
            });
        });
    }
})
window.initMap = initMap;




