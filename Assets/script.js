// Search button
var searchButton = document.getElementById("#searchBtn");

// Date
var date = dayjs().format("MM/DD/YY");

// Get city saved in local storage
$(document).ready(function () {

    // Take a city and search the Open Weather API for it
    function searchCity() {
        // City being searched
        var city = document.getElementById("search-result").value;

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

            // Display the date, city, temperature, humidity, and windspeed
            // $(".fiveDayForecast").html("<h2>" + "5-Day Forecast" + "</h2>");
            $(".city").html("<h1>" + response.city.name + " (" + date + ")" + "</h1>");
            //$(".currentWeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather.icon + "@2x.png");
            $(".temperature").text(fTemp + "° F");
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            $(".wind").text("Wind speed: " + response.list[0].wind.speed + " km/h");

            // for (var i = 0; i < 5; i++) {

                // Display the five-day forecast
                var forecastHolder = $("<section>").append(city[i])

                $(forecastHolder).addClass("forecast");

                $(".date").text(date).append(forecastHolder);
                //$(".weatherIcon").img(weatherIcon);
                $(".temperature").text(fTemp + "° F");
                $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");

            // }

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

                if (uvResponse.current.uvi < 3) {
                    $(".uv-index").attr("style", "background-color: green; color: white; font-weight: bold; width: 80px; border-radius: 4px; padding: 13px");
                } else if (uvResponse.current.uvi < 6) {
                    $(".uv-index").attr("style", "background-color: orange; color: white; font-weight: bold; width: 80px; border-radius: 4px; padding: 13px");
                } else {
                    $(".uv-index").attr("style", "background-color: red; color: white; font-weight: bold; width: 80px; border-radius: 4px; padding: 13px");
                }
            });

            // Add event listener to search button, create a list to show search history, and save to local storage
            // List element to hold city
            var cityHolder = $("<li>");

            // If nothing is returned from local storage, the variable type is an array. If it's empty and then you attempt to push an item into it, you will get an error.
            // Also ensures string gets converted back into array
            var cities = JSON.parse(localStorage.getItem("searchHistory")) || [];
            cities.push(response.city.name);
            $("#search-history").html(" ");

            // Add for loop and make each list item an index item
            for (var i = 0; i < cities.length; i++) {
                
                // Store city, add bootstrap class to li, and add li to ul
                localStorage.setItem("searchHistory", JSON.stringify(cities));
                var cityHolder = $("<li>").append(cities[i]);
                $(cityHolder).addClass("list-group-item");
                $("#search-history").append(cityHolder);
                console.log(cityHolder);
            }
        });
    };
    $("#searchBtn").click(searchCity);
})