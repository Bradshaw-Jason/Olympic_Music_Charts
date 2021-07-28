/*
1.retrive form entry on olmpic game to search
2.use Olympic games API to get date of the games
3.search date for the top of the charts with billboard and retrive data
4.display the retrived song data on the page
*/

//element we will append all options to
var gameSelectEl = $("#gamesSelection");



//retrive Olympics data
var request = new XMLHttpRequest();

request.open('GET', 'https://private-anon-45ff00f95f-olympicsapi.apiary-mock.com/scrape/olympics');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);

    


  }
};

request.send();


