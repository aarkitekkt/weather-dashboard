$(document).ready(function () {

    var searchBtn = $("#searchButton");
    var searchList = $("#searchResults");
    var cityList = [];
    var clearBtn = $("#clearSearch");
    var cityName = "";
    var queryURL = "";
    var uvURL = "";
    var forecastURL = "";
    var APIkey = "660521d9b46c429e48d2ebff0b626ea8";
    var weatherData = "";
    var uvData = "";
    var forecastData = "";
    var cityEl = $("#currentCity");
    var tempEl = $("#temp");
    var humidityEl = $("#humidity");
    var windEl = $("#windSpeed");
    var uvEl = $("#uvIndex");
    var day1El = $("#day1");
    var forecastEl = $("#5dayForecast");
    var weatherIconEl = $("#weatherIcon");

    console.log("Weather Dashboard");

    init();

    searchBtn.on("click", function (event) {
        event.preventDefault();
        cityName = $("#citySearch").val();
        console.log(cityName);
        buildWeatherURL();
        buildForecastUrl();
        getWeather();
        getForecast();
        addCity();
        storeCities();
    });

    // Clear search history when button is clicked.d
    clearBtn.on("click", function () {
        searchList.empty();
        cityList = [];
        localStorage.setItem("cities", JSON.stringify(cityList));
    });

    function init() {

        var storedCities = JSON.parse(localStorage.getItem("cities"));

        if (storedCities !== null) {
            cityList = storedCities;
        } else return
        for (var i = 0; i < storedCities.length; i++) {
            searchList.append($("<li class='list-group-item'>" + storedCities[i] + "</li>"));
            cityName = storedCities[0];
            buildWeatherURL();
            buildForecastUrl();
            getWeather();
            getForecast();
        }
    }

    // Function to add city to list of searched cities.
    function addCity() {

        if (cityName) {
            cityList.unshift(cityName);
            searchList.prepend($("<li class='list-group-item'>" + cityName + "</li>"));
            searchList = $("#searchResults");
            $("#citySearch").val("");
        }
    }

    // Function to save searched city list to local storage.
    function storeCities() {
        localStorage.setItem("cities", JSON.stringify(cityList));
    }

    // Function to build query URL.
    function buildWeatherURL() {

        if (cityName) {
            queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;
            console.log("Weather URL");
            console.log(queryUrl);
        }
    }

    // Function to query weather API and return weather data.
    function getWeather() {

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            weatherData = response;
            console.log("Weather Data")
            console.log(weatherData);
            showWeather(weatherData);
            buildUVurl(weatherData);
            getUVindex(uvURL);
        })

    }

    // Function to build url for UV Index API call.
    function buildUVurl(weatherData) {

        var lat = weatherData.coord.lat;
        var lon = weatherData.coord.lon;
        console.log(lat, lon);
        uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
        console.log("UV Index URL")
        console.log(uvURL);
    }

    // Function to query weather API and return UV Index.
    function getUVindex(uvURL) {

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            uvData = response;
            console.log("UV Index Data")
            console.log(uvData);
            showUVindex(uvData);
        })
    }

    function buildForecastUrl() {

        if (cityName) {
            forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIkey;
            console.log("5 day forecast URL")
            console.log(forecastUrl);
        }
    }

    function getForecast() {

        $.ajax({
            url: forecastUrl,
            method: "GET"
        }).then(function (response) {
            forecastData = response;
            console.log("5 Day Forecast Data")
            console.log(forecastData);
            showForecast(forecastData);
        })
    }

    // Take weather data and display weather information in html.
    function showWeather(weatherData) {

        weatherIconEl.empty();
        var dateobj = new Date().toString();
        var date = dateobj.substring(0, 15);
        console.log(date);
        var iconCode = weatherData.weather[0].icon;
        var icon = $("<img src=" + "'http://openweathermap.org/img/wn/" + iconCode + "@2x.png'>");
        tempEl.text("Temperature: " + weatherData.main.temp.toFixed(0) + "°F");
        humidityEl.text("Humidity: " + weatherData.main.humidity.toFixed(0) + "%");
        windEl.text("Wind Speed: " + weatherData.wind.speed.toFixed(0));
        cityEl.text(weatherData.name + " - " + date);
        weatherIconEl.append(icon);

    }

    function showUVindex(uvData) {

        uvEl.text("UV Index: " + uvData.value);
    }

    function showForecast(forecastData) {

        forecastEl.empty();

        for (var i = 0; i < forecastData.list.length; i++) {
            var time = forecastData.list[i].dt_txt.substring(11, 19);
            if (time === "15:00:00") {
                var day = $("<div class='col-12 col-lg border rounded-lg shadow-sm m-1'></div>");
                var date = $("<h5 class='text-center'>" + forecastData.list[i].dt_txt.substring(5, 11) + "</h5>");
                var temp = $("<h5 class='text-center'>" + "Temp: " + forecastData.list[i].main.temp.toFixed(0) + "°F" + "</h5>");
                var humidity = $("<h5 class='text-center'>" + "Humidity: " + forecastData.list[i].main.humidity.toFixed(0) + "%" + "</h5>");
                var iconCode = forecastData.list[i].weather[0].icon;
                var icon = $("<img class='d-block mx-auto' src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png'>");
                day.append(date, icon, temp, humidity);
                forecastEl.append(day);
            }
        }
    }

    // When list item is clicked, return weather for that city.
    $(searchList).on("click", "li", function () {

        cityName = $(this).text();
        console.log(cityName);
        buildWeatherURL();
        buildForecastUrl();
        getWeather();
        getForecast();
    });
});