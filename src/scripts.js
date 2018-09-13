var $ = require('jquery');

//console.log($('form'));
//console.log("it's working");

$('form').submit(function(event) {
    
    var userEmail = $('#email').val();
    console.log(userEmail);

    event.preventDefault();
    $.ajax({
        url: '/',
        type: 'POST',
        data: {
            email: userEmail
        },
        success: function(response) {
            console.log(response);
        }
    });
});


function initMap() {

    // var json = (function () {
    //     var json = null;
    //     $.ajax({
    //         'async': false,
    //         'global': false,
    //         'url': "./beaches.js",
    //         'dataType': "json",
    //         'success': function (data) {
    //             json = data;
    //         }
    //     });
    //     return json;
    // }); 

    var json = [
        {
            "id": 5391,
            "name": "Airlie Beach",
            "region": "Mackay",
            "state": "QLD",
            "postcode": "4802",
            "timeZone": "Australia/Brisbane",
            "lat": -20.26787,
            "lng": 148.71622,
            "typeId": 16
        },
        {
            "id": 6972,
            "name": "Rainbow Beach",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "4581",
            "timeZone": "Australia/Brisbane",
            "lat": -25.90213,
            "lng": 153.09218,
            "typeId": 2
        },
        {
            "id": 7127,
            "name": "Nudgee Beach",
            "region": "Brisbane",
            "state": "QLD",
            "postcode": "4014",
            "timeZone": "Australia/Brisbane",
            "lat": -27.34749,
            "lng": 153.10555,
            "typeId": 14
        },
        {
            "id": 19170,
            "name": "Cronulla Beach",
            "region": "Sydney",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -34.0557225,
            "lng": 151.1553955,
            "typeId": 2
        },
        {
            "id": 18374,
            "name": "Ocean Grove Beach",
            "region": "Barwon",
            "state": "VIC",
            "postcode": "",
            "timeZone": "Australia/Melbourne",
            "lat": -38.2721545,
            "lng": 144.5246744,
            "typeId": 2
        },
        {
            "id": 18156,
            "name": "Maroochydore Beach",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "",
            "timeZone": "Australia/Brisbane",
            "lat": -26.66118,
            "lng": 153.10565,
            "typeId": 2
        },
        {
            "id": 17705,
            "name": "Port Macquarie Town Beach",
            "region": "Mid North Coast",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -31.4287835,
            "lng": 152.9186582,
            "typeId": 2
        },
        {
            "id": 8784,
            "name": "West Beach",
            "region": "Adelaide",
            "state": "SA",
            "postcode": "5024",
            "timeZone": "Australia/Adelaide",
            "lat": -34.9385128,
            "lng": 138.497858,
            "typeId": 2
        },
        {
            "id": 18119,
            "name": "Currumbin Beach",
            "region": "Gold Coast",
            "state": "QLD",
            "postcode": "",
            "timeZone": "Australia/Brisbane",
            "lat": -28.13116,
            "lng": 153.48897,
            "typeId": 2
        },
        {
            "id": 20006,
            "name": "Ocean Beach",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "",
            "timeZone": "Australia/Brisbane",
            "lat": -26.9434232,
            "lng": 153.1485414,
            "typeId": 2
        },
        {
            "id": 7039,
            "name": "Beachmere",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "4510",
            "timeZone": "Australia/Brisbane",
            "lat": -27.12906,
            "lng": 153.05226,
            "typeId": 14
        },
        {
            "id": 6833,
            "name": "Coolum Beach",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "4573",
            "timeZone": "Australia/Brisbane",
            "lat": -26.52722,
            "lng": 153.09049,
            "typeId": 2
        },
        {
            "id": 18371,
            "name": "Jan Juc Beach",
            "region": "Barwon",
            "state": "VIC",
            "postcode": "",
            "timeZone": "Australia/Melbourne",
            "lat": -38.3482582,
            "lng": 144.3052482,
            "typeId": 2
        },
        {
            "id": 17814,
            "name": "Manly Beach",
            "region": "Sydney",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -33.79452,
            "lng": 151.28858,
            "typeId": 2
        },
        {
            "id": 19017,
            "name": "Main Beach (Byron Bay)",
            "region": "Far North Coast",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -28.64125,
            "lng": 153.620726,
            "typeId": 2
        },
        {
            "id": 18824,
            "name": "Cottesloe Beach",
            "region": "Perth",
            "state": "WA",
            "postcode": "",
            "timeZone": "Australia/Perth",
            "lat": -31.99576,
            "lng": 115.75091,
            "typeId": 2
        },
        {
            "id": 11642,
            "name": "Bells Beach",
            "region": "Barwon",
            "state": "VIC",
            "postcode": "3228",
            "timeZone": "Australia/Melbourne",
            "lat": -38.3676,
            "lng": 144.28172,
            "typeId": 2
        },
        {
            "id": 4988,
            "name": "Bondi Beach",
            "region": "Sydney",
            "state": "NSW",
            "postcode": "2026",
            "timeZone": "Australia/Sydney",
            "lat": -33.89054,
            "lng": 151.27486,
            "typeId": 2
        },
        {
            "id": 17641,
            "name": "Newcastle Beach",
            "region": "Hunter",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -32.9302515,
            "lng": 151.7862939,
            "typeId": 2
        },
        {
            "id": 10027,
            "name": "Goolwa Beach",
            "region": "Fleurieu Peninsula",
            "state": "SA",
            "postcode": "5214",
            "timeZone": "Australia/Adelaide",
            "lat": -35.51069,
            "lng": 138.77109,
            "typeId": 2
        },
        {
            "id": 6003,
            "name": "Main Beach",
            "region": "Gold Coast",
            "state": "QLD",
            "postcode": "4217",
            "timeZone": "Australia/Brisbane",
            "lat": -27.977577,
            "lng": 153.4298586,
            "typeId": 2
        },
        {
            "id": 19180,
            "name": "Bellambi Beach",
            "region": "Illawarra",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -34.3640614,
            "lng": 150.9213781,
            "typeId": 2
        },
        {
            "id": 6871,
            "name": "Golden Beach",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "4551",
            "timeZone": "Australia/Brisbane",
            "lat": -26.82302,
            "lng": 153.11987,
            "typeId": 14
        },
        {
            "id": 2459,
            "name": "Umina Beach",
            "region": "Central Coast",
            "state": "NSW",
            "postcode": "2257",
            "timeZone": "Australia/Sydney",
            "lat": -33.52875,
            "lng": 151.3075,
            "typeId": 2
        },
        {
            "id": 6446,
            "name": "Mission Beach",
            "region": "Far North",
            "state": "QLD",
            "postcode": "4852",
            "timeZone": "Australia/Brisbane",
            "lat": -17.86729,
            "lng": 146.10716,
            "typeId": 16
        },
        {
            "id": 6714,
            "name": "Banksia Beach",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "4507",
            "timeZone": "Australia/Brisbane",
            "lat": -27.0466718,
            "lng": 153.1334495,
            "typeId": 14
        },
        {
            "id": 5107,
            "name": "Dundee Beach",
            "region": "Darwin",
            "state": "NT",
            "postcode": "0840",
            "timeZone": "Australia/Darwin",
            "lat": -12.75954,
            "lng": 130.35752,
            "typeId": 2
        },
        {
            "id": 19167,
            "name": "Maroubra Beach",
            "region": "Sydney",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -33.9493435,
            "lng": 151.2570834,
            "typeId": 2
        },
        {
            "id": 18126,
            "name": "Tallebudgera Beach",
            "region": "Gold Coast",
            "state": "QLD",
            "postcode": "",
            "timeZone": "Australia/Brisbane",
            "lat": -28.09978,
            "lng": 153.46307,
            "typeId": 2
        },
        {
            "id": 5824,
            "name": "Sarina Beach",
            "region": "Mackay",
            "state": "QLD",
            "postcode": "4737",
            "timeZone": "Australia/Brisbane",
            "lat": -21.3881093,
            "lng": 149.3135726,
            "typeId": 2
        },
        {
            "id": 19638,
            "name": "Coffs Harbour Beach",
            "region": "Mid North Coast",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -30.2989465,
            "lng": 153.1397938,
            "typeId": 2
        },
        {
            "id": 18364,
            "name": "Anglesea Beach",
            "region": "Barwon",
            "state": "VIC",
            "postcode": "",
            "timeZone": "Australia/Melbourne",
            "lat": -38.4169497,
            "lng": 144.1835832,
            "typeId": 2
        },
        {
            "id": 18919,
            "name": "Trigg Beach",
            "region": "Perth",
            "state": "WA",
            "postcode": "",
            "timeZone": "Australia/Perth",
            "lat": -31.8774,
            "lng": 115.75128,
            "typeId": 2
        },
        {
            "id": 8806,
            "name": "Beachport",
            "region": "Limestone Coast",
            "state": "SA",
            "postcode": "5280",
            "timeZone": "Australia/Adelaide",
            "lat": -37.48098,
            "lng": 140.01304,
            "typeId": 12
        },
        {
            "id": 2249,
            "name": "Palm Beach",
            "region": "Sydney",
            "state": "NSW",
            "postcode": "2108",
            "timeZone": "Australia/Sydney",
            "lat": -33.5979288,
            "lng": 151.3251364,
            "typeId": 2
        },
        {
            "id": 19555,
            "name": "Scarborough Beach",
            "region": "Perth",
            "state": "WA",
            "postcode": "",
            "timeZone": "Australia/Perth",
            "lat": -31.8935218,
            "lng": 115.754342,
            "typeId": 2
        },
        {
            "id": 17591,
            "name": "Evans Head Beach",
            "region": "Far North Coast",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -29.07951,
            "lng": 153.43828,
            "typeId": 2
        },
        {
            "id": 17573,
            "name": "The Entrance Beach",
            "region": "Central Coast",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -33.3468826,
            "lng": 151.5035247,
            "typeId": 2
        },
        {
            "id": 6150,
            "name": "Bushland Beach",
            "region": "Northern",
            "state": "QLD",
            "postcode": "4818",
            "timeZone": "Australia/Brisbane",
            "lat": -19.19459,
            "lng": 146.67533,
            "typeId": 16
        },
        {
            "id": 9887,
            "name": "Aldinga Beach",
            "region": "Adelaide",
            "state": "SA",
            "postcode": "5173",
            "timeZone": "Australia/Adelaide",
            "lat": -35.2791289,
            "lng": 138.4423255,
            "typeId": 2
        },
        {
            "id": 18118,
            "name": "Coolangatta Beach",
            "region": "Gold Coast",
            "state": "QLD",
            "postcode": "",
            "timeZone": "Australia/Brisbane",
            "lat": -28.16533,
            "lng": 153.53571,
            "typeId": 2
        },
        {
            "id": 18234,
            "name": "Gunnamatta Beach",
            "region": "Mornington Peninsula",
            "state": "VIC",
            "postcode": "",
            "timeZone": "Australia/Melbourne",
            "lat": -38.45704,
            "lng": 144.86865,
            "typeId": 2
        },
        {
            "id": 18158,
            "name": "Mudjimba Beach",
            "region": "Sunshine Coast",
            "state": "QLD",
            "postcode": "",
            "timeZone": "Australia/Brisbane",
            "lat": -26.61633,
            "lng": 153.10271,
            "typeId": 2
        },
        {
            "id": 2318,
            "name": "Avoca Beach",
            "region": "Central Coast",
            "state": "NSW",
            "postcode": "2251",
            "timeZone": "Australia/Sydney",
            "lat": -33.4655688,
            "lng": 151.435182,
            "typeId": 2
        },
        {
            "id": 6027,
            "name": "Palm Beach",
            "region": "Gold Coast",
            "state": "QLD",
            "postcode": "4221",
            "timeZone": "Australia/Brisbane",
            "lat": -28.12088,
            "lng": 153.47257,
            "typeId": 2
        },
        {
            "id": 1439,
            "name": "Culburra Beach",
            "region": "Illawarra",
            "state": "NSW",
            "postcode": "2540",
            "timeZone": "Australia/Sydney",
            "lat": -34.9278498,
            "lng": 150.7694363,
            "typeId": 2
        },
        {
            "id": 19266,
            "name": "Inverloch Surf Beach",
            "region": "Gippsland",
            "state": "VIC",
            "postcode": "",
            "timeZone": "Australia/Melbourne",
            "lat": -38.6478324,
            "lng": 145.7011771,
            "typeId": 2
        },
        {
            "id": 19298,
            "name": "Thirteenth Beach",
            "region": "Barwon",
            "state": "VIC",
            "postcode": "",
            "timeZone": "Australia/Melbourne",
            "lat": -38.2854615,
            "lng": 144.4615459,
            "typeId": 2
        },
        {
            "id": 4502,
            "name": "Valla Beach",
            "region": "Mid North Coast",
            "state": "NSW",
            "postcode": "2448",
            "timeZone": "Australia/Sydney",
            "lat": -30.59181,
            "lng": 153.00848,
            "typeId": 2
        },
        {
            "id": 17805,
            "name": "Dee Why Beach",
            "region": "Sydney",
            "state": "NSW",
            "postcode": "",
            "timeZone": "Australia/Sydney",
            "lat": -33.74766,
            "lng": 151.30097,
            "typeId": 2
        }
    ];

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
                scale: 10
            },
            map: map,
            title: obj.name // this works, giving the marker a title with the correct title
        });
        
        // Adding a new info window for the object
        var clicker = addClicker(marker, obj.name);
    } // end loop

    // Adding a new click event listener for the object
    function addClicker(marker, content) {
        google.maps.event.addListener(marker, 'click', function() {
            //if (infowindow) {infowindow.close();}
            var infowindow = new google.maps.InfoWindow({content: content});
            infowindow.open(map, marker);
        
        });
    }
  
}
window.initMap = initMap;



