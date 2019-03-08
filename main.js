var submit = document.getElementById("btn-ClientSubmit");
var client_date = document.getElementById("clientDate");
//get elements
var client_money = "";
var client_weather = "";

function getValues() {
  var btn = document.querySelectorAll(`.btn-money`);
  var btn2 = document.querySelectorAll(`.btn-weather`);

  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function() {
      var tmp = this.value;
      client_money = tmp;
    });
  }
  for (var i = 0; i < btn2.length; i++) {
    btn2[i].addEventListener("click", function() {
      var tmp2 = this.value;
      client_weather = tmp2;
    });
  }
}

getValues();

setInterval(function() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  var period = "AM";

  if (hours >= 12) {
    period = "PM";
  }

  if (hours > 12) {
    hours = hours - 12;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  var clockTime = hours + ":" + minutes + ":" + seconds + " " + period;
  var clock = document.getElementById("clock");

  clock.innerText = clockTime;
}, 1000);

//this is the weather api

var APIKey = "166a433c57516f51dfab1f7edaed8413";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=New York,US&units=imperial&appid=" +
  APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);

    // Log the data in the console as well
    // console.log("Wind Speed: " + response.wind.speed);
    // console.log("Humidity: " + response.main.humidity);
    // console.log("Temperature (F): " + response.main.temp);
  });
// /------------------------
const instance = axios.create({
  headers: {
    get: {
      "X-RapidAPI-Key": "401114fe6fmshb12dbbb2c327e71p18f2adjsn9ca39da349a2"
    }
  }
});

function api_call(place) {
  let api1 = `http://api.openweathermap.org/data/2.5/weather?q=${place},us&APPID=0efb56e5bec85725341b6059789ed1f9&units=imperial`;
  axios //I'm using axios since i want to get familiar with it and promises
    .get(api1)
    .then(function(response) {
      console.log(response);
      return response; //return res obj
    })
    .catch(function(error) {
      console.log(error); //throw error stack if any
    });
}

let ranStates = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

function flightSearch() {
  let infoObj = {};

  let ranState = ranStates[Math.floor(Math.random() * ranStates.length)];

  ranState = ranState.replace(/" "/g, "+");

  instance
    .get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-us/?query=${ranState}`
    )
    .then(function(result) {
      console.log(result.data.Places[0].PlaceId);

      return result.data.Places[0].PlaceId;
    })
    .then(function(placeId) {
      instance
        .get(
          `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/NYCA-sky/${placeId}/2019-04-01`
        )
        .then(function(result) {
          console.log(result.data);

          console.log(result.data.Quotes[0]);

          if (result.data.Quotes.length < 1) {
            console.log("No Flighs");
            throw new Error("abort promise chain");
            return;
          }

          infoObj.price = result.data.Quotes[0].MinPrice;
          let airlineId = result.data.Quotes[0].OutboundLeg.CarrierIds[0];
          let carriers = result.data.Carriers;
          carriers.forEach(carrier => {
            if (airlineId === carrier.CarrierId) {
              console.log(carrier.Name);
              infoObj.airline = carrier.Name;
            }
          });
          let places = result.data.Places;
          let originCityObj = {};
          let destinationCityObj = {};
          let OriginId = result.data.Quotes[0].OutboundLeg.OriginId;
          let destinationId = result.data.Quotes[0].OutboundLeg.DestinationId;
          places.forEach(place => {
            if (OriginId === place.PlaceId) {
              originCityObj.originAirportName = place.Name;
              originCityObj.originAirportCode = place.IataCode;
              originCityObj.originCityName = place.CityName;
            }

            if (destinationId === place.PlaceId) {
              destinationCityObj.destinationAirportName = place.Name;
              destinationCityObj.destinationAirportCode = place.IataCode;
              destinationCityObj.destinationCityName = place.CityName;
              destinationAirportName = place.Name;
              destinationAirportCode = place.IataCode;
              destinationCityName = place.CityName;
            }
          });

          infoObj.originInfo = originCityObj;
          infoObj.destinationInfo = destinationCityObj;

          console.log(infoObj);

          return destinationCityName;
        })
        .then(function(destinationCityName) {
          return api_call(destinationCityName);
        })
        .then(function(weatherData) {
          console.log(weatherData);

          // let destinationWeather = weatherData.main.temp
          // console.log(destinationWeather)
        })
        .catch(function(error) {
          console.log("There was an eror");
          console.log(error);
          flightSearch();
        });
    });
}

let mainButton = document.getElementById("btn-ClientSubmit");

mainButton.addEventListener("click", function() {
  flightSearch();
});
