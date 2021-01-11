// City being searched
var city = document.getElementById("#search-result");

// Search button
var searchButton = document.getElementById("#searchBtn");

// Get city saved in local storage
$(document).ready(function() {
    if(localStorage.getItem(city) != null) {
        cityHolder = localStorage.getItem(city);
        searchCity();
    }
// QueryURL
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a388319d9671a29c369dd037334f23bc";

// Take a city and search the Open Weather API for it
var searchCity = function(city) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //calculate the temperature (converted from Kelvin)
        var fTemp = ((response.main.temp - 273.15) * 1.80 + 32).toFixed[0];

        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".temperature").text(fTemp + response.main.temp + " F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind speed: " + response.wind.speed + " km/h");
        
        // Store the latitude and longitude coordinates for the UV index and the index's queryURL
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=a388319d9671a29c369dd037334f23bc";

        // Get UV index
        $.ajax({
            url: uvQueryURL,
            method: "GET"      
        }).then(function(uvResponse){
            
        });
    });
};

// Add event listener to search button, create a list to show search history, and save to local storage
function searchCity() {
    $(searchButton).click(function(event) {
        event.preventDefault();
        function weather() {
            // Store city, create list element to hold it, add bootstrap class, and add li to ul
            localStorage.setItem(city, city.value());
            var cityHolder = $("<li>");
            $(cityHolder).addClass("list-group-item");
            $("#search-history").append(cityHolder);
            console.log(cityHolder);
            }
        })
    }
})