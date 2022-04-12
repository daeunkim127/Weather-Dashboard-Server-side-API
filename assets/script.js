var city = document.getElementById('city');
var date = document.getElementById('date');
var weatherIcon = document.getElementById('weather-icon');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var uvIndex = document.getElementById('uv-index');
var fiveDayImg = document.querySelector('.fiveDay-img');
var fiveDayTemp = document.querySelector('.fiveDay-temp');
var fiiveDayHumid = document.querySelector('.fiveDay-humid');
var cityInput = document.querySelector('#city-input');
var searchBtn = document.getElementById('search-btn')
var cityList = document.querySelector('.cityList')

var apiKey = '7b109f561dbce00a44f73faa03e0edee';
var baseUrl = 'http://api.openweathermap.org'

function getCityDayWeather(city) {
    var url= '${baseUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}';
    console.log(url)
    fetch(url).then(function(response) {
        return response.json();
    })
    .then(function (data) {

    })
}

function handleFormSubmit(evt){
    evt.preventDefault();
    var city=cityInput.value;
    getCityDayWeather(city);
}

function addEventListeners () {
    
    searchBtn.addEventListener('click', handleFormSubmit)

}

function init() {
    addEventListeners()
}

init();