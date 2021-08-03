/*
1.create a popup for each pin
1b. populate popup with 
2. create side bar to select which game you want
2a. populate side bar with list of counttries
2b. zoom to appropriate marker on click
*/

// var zoomTestEl = $('#testBtn')

var sydneyButtonEl = $('#Host1')
var athensButtonEl = $('#Host2')
var beijingButtonEl = $('#Host3')
var londonButtonEl = $('#Host4')
var rioButtonEl = $('#Host5')
var tokyoButtonEl = $('#Host6')

var locationSearchBtnEl = $('#locationSearchBtn')



//sets default values for user airport and date
var userAirport = "JFK-sky";
var userDate = "2021-08-04";



//creates the map using leaflets API
var map = L.map('mapid').setView([20, 0], 3);

//adds a tile layer to the map from openstreetmaps
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//creates a marker for each olympics stadium from geojson and adds to the map
//calls the function that creats the popup content for each marker
var stadiumMarkers = new L.geoJSON(OlympicsData, {
    onEachFeature: createPopup,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});

// adds the stadium layer to the map
map.addLayer(stadiumMarkers);


//this function generates the content for the popup at each marker
function createPopup(feature, layer) {

    var popupContent = ""

    getFlightInfo(feature.properties.airport)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log(data);
            popupContent += "<h3>" + feature.properties.stadium + "</h3>";
            popupContent += "<p>" + feature.properties.year + " " + feature.properties.city + ", " + feature.properties.country +"</p><br>"

            if (data.Quotes.length === 0) {
                popupContent += "<p> No flights to this stadium could be found! please choose a different date of origin city</p>";
            }
            else {
                popupContent += "<p> Flights between "+data.Places[1].Name+" and "+data.Places[0].Name+": </p><br>";
                for(var i=0; i<data.Quotes.length; i++){
                    popupContent += "<p> Carrier: " + data.Carriers[i].Name + "</p>";
                    popupContent += "<p> Depature Date: " + data.Quotes[i].OutboundLeg.DepartureTime + "</p>";
                    popupContent += "<p> Price: $" + data.Quotes[i].MinPrice + "</p><br>";

                }
            }

            layer.bindPopup(popupContent);

        })
        .catch(err => {
            console.error(err);
            popupContent += "<p>there was a problem retriving flight info</p>"
            layer.bindPopup(popupContent);
        });


}


function getFlightInfo(destination) {

    var flightURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + userAirport + "/" + destination + "/" + userDate

    return fetch(flightURL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "74843f7863msh4827f7620e8ef19p122bb2jsn8896e6fc4cbc",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
};

// search for users desired airports and populates selection with them
locationSearchBtnEl.click(function(){
    var searchedLocation = $('#locationSearch').val()
    console.log(searchedLocation)
    if(searchedLocation != null){
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query="+searchedLocation, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "74843f7863msh4827f7620e8ef19p122bb2jsn8896e6fc4cbc",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            //add search options to element
            for(var i=0; i<data.Places.length; i++)
            $('#airportSelect').append("<option value="+data.Places[i].PlaceId+">"+data.Places[i].PlaceName+"</option>")
        })
    }
    else{
        return;
    }
});

$('#userAirportBtn').click(function(){
    userAirport = $('#airportSelect').find(":selected").val();
    console.log(userAirport)
    // userDate = ""
    stadiumMarkers.eachLayer(function (layer) {
        layer._popup.setContent(createPopup(layer.feature, layer))
    });
})





sydneyButtonEl.on('click', function () {
    map.flyTo([-33.8471, 151.0634], 15)
})

athensButtonEl.on('click', function () {
    map.flyTo([38.0361, 23.7876], 15)
})

beijingButtonEl.on('click', function () {
    map.flyTo([39.9929, 116.3965], 15)
})

londonButtonEl.on('click', function () {
    map.flyTo([51.5387, -0.0166], 15)
})

rioButtonEl.on('click', function () {
    map.flyTo([-22.9121, -43.2303], 15)

})

tokyoButtonEl.on('click', function () {
    map.flyTo([35.6779, 139.7145], 15)

})






