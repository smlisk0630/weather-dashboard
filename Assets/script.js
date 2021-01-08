
// QueryURL
var queryURL = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid=a388319d9671a29c369dd037334f23bc";

// Take a city and search the Open Weather API for it
var searchCity = function(city) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    });
};