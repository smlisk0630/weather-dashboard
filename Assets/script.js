function weather() {

    // City being searched
    var city = document.getElementById("search-result");

    // Search button
    var searchButton = document.getElementById("searchBtn");

    // Get city saved in local storage
    $(document).ready(function() {
        var getCity = localStorage.getItem(city);
    })

    // QueryURL
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q={cityname}&appid=a388319d9671a29c369dd037334f23bc";

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
            $("uv-index").text("UV Index: " + response.visibility);
        });
    };

    // Add event listener to search button, create a list to show search history, and save to local storage
    function searchCity() {
        $(searchButton).click(function(event) {
            event.preventDefault();
            // Store city, create list element to hold it, add bootstrap class, and add li to ul
        localStorage.setItem(city, city.value());
        var cityHolder = $("<li>");
        $(cityHolder).addClass("list-group-item");
        $(".search-history").append(cityHolder);
        console.log(cityHolder);
        })
    }
}
weather();