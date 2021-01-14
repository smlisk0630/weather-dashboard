// Search button
var searchButton = document.getElementById("#searchBtn");

// Get city saved in local storage
$(document).ready(function () {

    // Take a city and search the Open Weather API for it
    function searchCity() {
        // City being searched
        var city = document.getElementById("search-result").value;

        // if (localStorage.getItem(city) != null) {
        //     cityHolder = localStorage.getItem(city);
        //     searchCity();
        // }

        // QueryURL
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a388319d9671a29c369dd037334f23bc";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var tempResults = response.list[0].main.temp;
            
            //calculate the temperature (converted from Kelvin)
            var fTemp = ((tempResults - 273.15) * 1.80 + 32).toFixed(0);
            console.log(fTemp);
            // Calculate latitude and longitude for UV index
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            // Display the city, temperature, humidity, and windspeed
            $(".city").html("<h1>" + response.city.name + " Weather Details</h1>");
            $(".temperature").text(fTemp + "° F");
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            $(".wind").text("Wind speed: " + response.list[0].wind.speed + " km/h");

            // Store the latitude and longitude coordinates for the UV index and the index's queryURL
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a388319d9671a29c369dd037334f23bc";
            console.log(uvQueryURL);
            // Get UV index
            $.ajax({
                url: uvQueryURL,
                method: "GET"      
            }).then(function (uvResponse) {
                console.log(uvResponse);

                // Display the UV Index
                $(".uv-index").text("UV Index: " + uvResponse.current.uvi);
            });

            // Add event listener to search button, create a list to show search history, and save to local storage
            // List element to hold city
            var cityHolder = $("<li>");
            // Ensures string gets converted back into array
            var cities = JSON.parse(localStorage.getItem("searchHistory")) || [];
            cities.push(response.city.name);

            // Store city, add bootstrap class to li, and add li to ul
            localStorage.setItem("searchHistory",JSON.stringify(cities));
            var cityHolder = cities;
            $(cityHolder).addClass("list-group-item");
            $("#search-history").append(cityHolder);
            console.log(cityHolder);
        });
    };
    $("#searchBtn").click(searchCity);
})