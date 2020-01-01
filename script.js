var searchBtn = $("#searchButton");
var searchList = $("#searchResults");
var clearBtn = $("#clearSearch")


console.log("Weather Dashboard");

// Add city name to list and return weather data.
searchBtn.click(function (event) {
    event.preventDefault();
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

