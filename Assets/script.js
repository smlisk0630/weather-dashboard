// Search button
var searchButton = document.getElementById("#searchBtn");

// Get city saved in local storage
$(document).ready(function () {

    // Take a city and search the Open Weather API for it
    function searchCity(city) {
        // City being searched
        //var city = document.getElementById("search-result").value;

        // QueryURL
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a388319d9671a29c369dd037334f23bc";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            
            // Date
            var date = dayjs().format("MM/DD/YY");
            // Temperature
            var tempResults = response.list[0].main.temp;

            // Calculate the temperature (converted from Kelvin)
            var fTemp = ((tempResults - 273.15) * 1.80 + 32).toFixed(0);
            // Calculate latitude and longitude for UV index
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            // Display the current date, city, temperature, humidity, and windspeed
            // $(".fiveDayForecast").html("<h2>" + "5-Day Forecast" + "</h2>");
            $(".city").html("<h1>" + response.city.name + " (" + date + ")" + "</h1>");
            
            $(".temperature").text(fTemp + "° F");
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            $(".wind").text("Wind speed: " + response.list[0].wind.speed + " km/h");

            for (var i = 4; i < response.list.length; i+=8) {
                
                // 5-Day temps
                var fiveDayTempResults = response.list[i].main.temp;
                // Calculate the temperature (converted from Kelvin into Fahrenheit)
                var fiveDayFTemp = ((fiveDayTempResults - 273.15) * 1.80 + 32).toFixed(0);
                // Unix timestamp to be used in 5-day forecast
                var timeStamp = response.list[i].dt;
                // Converts timestamp to milliseconds in new Date object and formats date as mm/dd/yy
                var newDate = dayjs(new Date(timeStamp * 1000)).format("MM/DD/YY");
                // Weather Icon
                var weatherIconID = response.list[i].weather[0].icon;
                $(".currentWeatherIcon").attr("src", "https://openweathermap.org/img/w/" + weatherIconID + ".png");
                // Display search history
                var forecastHolder = $("<section>").append(city[i])
                $(forecastHolder).addClass("forecast");

                // Display the five-day forecast
                $("#date-" +i).text(newDate).append(forecastHolder);
                $("#weatherIcon-" +i).attr("src", "https://openweathermap.org/img/w/" + weatherIconID + ".png");
                $("#temperature-" +i).text(fiveDayFTemp + "° F");
                $("#humidity-" +i).text("Humidity: " + response.list[i].main.humidity + "%");
            }

            // Store the latitude and longitude coordinates for the UV index and the index's queryURL
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a388319d9671a29c369dd037334f23bc";
            
            // Get UV index
            $.ajax({
                url: uvQueryURL,
                method: "GET"
            }).then(function (uvResponse) {

                // Display the UV Index
                var uvValue = uvResponse.current.uvi;
                var uvIndex = $(".uv-index").text("UV Index: " + uvValue);

                if (uvIndex < 3) {
                    $(uvIndex).attr("style", "background-color: green; color: white; font-weight: bold; width: 18%; border-radius: 4px; padding: 13px");
                } else if (uvIndex < 6) {
                    $(uvIndex).attr("style", "background-color: orange; color: white; font-weight: bold; width: 18%; border-radius: 4px; padding: 13px");
                } else {
                    $(uvIndex).attr("style", "background-color: red; color: white; font-weight: bold; width: 18%; border-radius: 4px; margin-right: 15px; padding: 13px");
                }
            });

            // Add event listener to search button, create a list to show search history, and save to local storage
            // List element to hold city
            var cityHolder = $("<li>");

            // If nothing is returned from local storage, the variable type is an array. If it's empty and then you attempt to push an item into it, you will get an error.
            // Also ensures string gets converted back into array
            var cities = JSON.parse(localStorage.getItem("searchHistory")) || [];
            cities.push(response.city.name);
            // Clear the contents of the search history
            $("#search-col").empty();

            // Add for loop and make each list item an index item
            for (var i = 0; i < cities.length; i++) {

                // Store city, add bootstrap class to li, and add li to ul
                localStorage.setItem("searchHistory", JSON.stringify(cities));
                var cityHolder = $("<li>").append(cities[i]);
                $(cityHolder).addClass("list-group-item city-click");
                $(cityHolder).attr("value", cities[i]);
                //$("#search-history").append(cityHolder);
                $("#search-col").append(cityHolder);
            }
        });
    };
    $("#searchBtn").click(function () {
        // City being searched
        var city = document.getElementById("search-result").value;
        searchCity(city)
    });
    $("#searchBtn").click(function () {
        // City being searched
        var city = document.getElementById("search-result").value;
        searchCity(city)
    });
})