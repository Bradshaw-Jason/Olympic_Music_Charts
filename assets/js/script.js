
//element we will append all options to
var gameSelectEl = $("#gamesSelection");


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