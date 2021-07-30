/*
1.create a popup for each pin
1a. get music data for the year
1b. populate popup with 
2. create side bar to select which game you want
2a. populate side bar with list of counttries
2b. zoom to appropriate marker on click
*/

// var zoomTestEl = $('#testBtn')

//creates the map using leaflets API
var map = L.map('mapid').setView([51.505, -0.09], 13);

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
    var popupContent = "<p>"+feature.properties.city+"</P>"

    layer.bindPopup(popupContent); 
}


// zoomTestEl.on('click', function(){
//     map.flyTo([-100,100], 5)
// })