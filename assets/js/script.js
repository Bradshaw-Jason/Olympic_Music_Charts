/*
1.retrive form entry on olmpic game to search
2.use Olympic games API to get date of the games
3.search date for the top of the charts with billboard and retrive data
4.display the retrived song data on the page
*/

//element we will append all options to
var gameSelectEl = $("#gamesSelection");



//retrive Olympics data

// var requestOlympicData = new XMLHttpRequest();

// requestOlympicData.open('GET', 'https://private-anon-45ff00f95f-olympicsapi.apiary-mock.com/scrape/olympics');

// requestOlympicData.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//   }

// console.log(this.response['0'].year)
// console.log(this)
// console.log(this.response)

// };
// requestOlympicData.send();


var map = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();