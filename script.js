var searchBtn = $("#searchButton");
var searchList = $("#searchResults");
var clearBtn = $("#clearSearch");
var queryURL = "";


console.log("Weather Dashboard");

searchBtn.click(function (event) {
    event.preventDefault();
    getWeather();
    addCity();
});

// Clear search history when button is clicked.d
clearBtn.click(function () {
    searchList.empty();
})

// Function to add city to list of searched cities.
function addCity() {
    var cityName = $("#citySearch").val();
    if (cityName) {
        console.log(cityName);
        searchList.prepend($("<li>" + cityName + "</li>"));
        $("#citySearch").val("");
    }
}

// Function to build query URL.
function buildURL() {
    var cityName = $("#citySearch").val();
    var APIkey = "660521d9b46c429e48d2ebff0b626ea8";
    queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;
}

// Function to query weather API and return weather data.
function getWeather() {
    buildURL();
    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}