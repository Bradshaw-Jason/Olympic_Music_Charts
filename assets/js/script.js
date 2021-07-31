/*
1.create a popup for each pin
1a. get music data for the year
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
var tokyoButtonEl =$('#Host6')


//creates the map using leaflets API
var map = L.map('mapid').setView([20, 0], 3);

//adds a tile layer to the map from openstreetmaps
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//creates a marker for each olympics stadium from geojson and adds to the map
//calls the function that creats the popup content for each marker
var stadiumMarkers = new L.geoJSON(OlympicsData,{
    onEachFeature: createPopup,
    pointToLayer: function (feature, latlng){
        return L.marker(latlng);
    }
});

// adds the stadium layer to the map
map.addLayer(stadiumMarkers);


//this function generates the content for the popup at each marker
function createPopup(feature, layer){

    var popupContent =""

    getFlightInfo(feature.properties.airport)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        popupContent += "<h3>"+feature.properties.city+"</h3>";
        if (data.Quotes.length === 0){
            popupContent += "<p> No flights to this stadium could be found! please choose a different date of origin city</p>";
        }
        else{
            // popupContent += "<p>"+data.Places[0].CityId+"</p>";
        }
        
        layer.bindPopup(popupContent); 
        
    })
    .catch(err => {
        console.error(err);
        popupContent += "<p>there was a problem</p>"
        layer.bindPopup(popupContent); 
    });

    
}


function getFlightInfo(destination){

    // return fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm", {
    // 	"method": "GET",
    // 	"headers": {
	//     	"x-rapidapi-key": "74843f7863msh4827f7620e8ef19p122bb2jsn8896e6fc4cbc",
	//     	"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    // 	}
    // })
    var flightURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/JFK-sky/"+destination+"/2021-07-31"

    return fetch(flightURL, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "74843f7863msh4827f7620e8ef19p122bb2jsn8896e6fc4cbc",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
    })

// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

};

// zoomTestEl.on('click', function(){
//     map.flyTo([-100,100], 5)
// })

// "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2021-07-31"


//search for a city ID
// fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=seattle", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "74843f7863msh4827f7620e8ef19p122bb2jsn8896e6fc4cbc",
// 		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	return response.json();
// })
// .then(data=> {
// 	console.log(data);
// })

sydneyButtonEl.on('click', function(){
    map.flyTo([-33.8471, 151.0634], 15)
})

athensButtonEl.on('click', function(){
    map.flyTo([38.0361,23.7876], 15)
})

beijingButtonEl.on('click', function(){
    map.flyTo([39.9929,116.3965], 15)
})

londonButtonEl.on('click', function(){
    map.flyTo([51.5387,-0.0166], 15)
})

rioButtonEl.on('click', function(){
    map.flyTo([-22.9121, -43.2303], 15)

})

tokyoButtonEl.on('click', function(){
    map.flyTo([35.6779,139.7145], 15)
})

// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

};

