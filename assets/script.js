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
var forecastContainer=document.getElementById('forecastContainer')
var searchHistoryBtn=document.getElementById('searchHistoryBtn')
var currentIcon = document.getElementById('icon')

var apiKey = '7b109f561dbce00a44f73faa03e0edee';
var baseUrl = 'http://api.openweathermap.org'


function populate5Dasy (data) {
    forecastContainer.textContent=''
    data.forEach(function(day, index){
        if(index===0 || index >5){
            return;
        }
        var dt = day.dt
        var date= moment(dt*1000).format('L')
        var temp=day.temp.day;
        var windSpeed=day.wind_speed;
        var humid=day.humidity;
        var icon=day.weather[0].icon;
        var div = document.createElement('div')
        div.classList='card-weather col bg-dark text-light'
        console.log(icon)
        div.innerHTML = '<h4>'+date+'</h4><img src="http://openweathermap.org/img/wn/'+icon+'@2x.png"/><dl><dt>Temp:</dt><dd>'+temp+'</dd><dt>Wind:</dt> <dd>'+windSpeed+'</dd><dt>Humidity:</dt><dd>'+humid+'</dd></dl>';
        forecastContainer.appendChild(div)
    })
}

function getCityDayWeather(cityName) {
    var url= baseUrl+'/geo/1.0/direct?q='+cityName+'&limit=1&appid='+apiKey;
    fetch(url).then(function(response) {
        return response.json();
    })
    .then(function (data) {
        if(!data.length){
            window.alert('No City Matches')
            return;
        }
        storeCityLocation(cityName)
        populateButton(cityName)
        var cityObejct=data[0];
        var lat = cityObejct.lat;
        var lon = cityObejct.lon;

        var currentWeatherUrl = baseUrl+'/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+apiKey
        
        fetch(currentWeatherUrl).then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data)
            var current = data.current;
            var temp = current.temp;
            var icon= current.weather[0].icon
            var windSpeed = current.wind_speed;
            var humid = current.humidity;
            var uviIndex = current.uvi;
            
            city.textContent=cityName;
            temperature.textContent=temp;
            wind.textContent=windSpeed;
            humidity.textContent=humid;
            uvIndex.textContent=uviIndex;
            if(uviIndex<3) {
                uvIndex.style.backgroundColor ='green';
            } else if(uviIndex >= 3 && uviIndex < 6) {
                uvIndex.style.backgroundColor='yellow'
            } else {
                uvIndex.style.backgroundColor='red'
            }

            currentIcon.src='http://openweathermap.org/img/wn/'+icon+'@2x.png'

            populate5Dasy(data.daily)
            

        })
    })
}

function populateButton(cityName) {
    searchHistoryBtn.innerHTML=''
    var cities=window.localStorage.getItem('cities')
    if (cities) {
        cities = JSON.parse(cities)
    }else {
        cities=[]
    }
    cities.forEach(function(cityName){
        var button = document.createElement('button');
        button.classList = "btn btn-secondary col-12";
        button.textContent=cityName;
        button.setAttribute('data-city',cityName)
        searchHistoryBtn.appendChild(button)
    })
    
}

function storeCityLocation(cityName){
    console.log(cityName)
    var cities=window.localStorage.getItem('cities')
    if (cities) {
        cities = JSON.parse(cities)
    }else {
        cities=[]
    }
    if(cities.includes(cityName)) {
        return
    }else {
        cities.push(cityName)
    }

    window.localStorage.setItem('cities',JSON.stringify(cities))
}

function handleFormSubmit(evt){
    evt.preventDefault();
    var cityName=cityInput.value;
    getCityDayWeather(cityName);
   
}

function handleButtonClick(evt) {
    var target = evt.target;
    var cityName=target.getAttribute('data-city')
    console.log(cityName);
    getCityDayWeather(cityName)
}

function addEventListeners () {
    
    searchBtn.addEventListener('click', handleFormSubmit)
    searchHistoryBtn.addEventListener('click', handleButtonClick)

}

function init() {
    addEventListeners()
    populateButton()
}

init();