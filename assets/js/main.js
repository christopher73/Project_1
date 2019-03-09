// function getValues() {
let thisState = "New+York";
$("#loading").hide();
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

//-----------------------

//this is the weather api

var APIKey = "166a433c57516f51dfab1f7edaed8413";
var apiState = thisState.replace("+", " ");
console.log(apiState);
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${apiState},US&units=imperial&appid=${APIKey}`;
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    // Log the queryURL
    // console.log(queryURL);

    // Log the resulting object
    // console.log(response);

    // Transfer content to HTML
    $(".city").html("<h4>" + response.name + " Weather</h4>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F): " + response.main.temp);
  });
// /------------------------

const instance = axios.create({
  headers: {
    get: {
      "X-RapidAPI-Key": "401114fe6fmshb12dbbb2c327e71p18f2adjsn9ca39da349a2"
    }
  }
});

function api_weather(place) {
  //function call to retrieve weather of a specific place
  let api1 = `http://api.openweathermap.org/data/2.5/weather?q=${place},us&APPID=0efb56e5bec85725341b6059789ed1f9&units=imperial`;
  axios //I'm using axios since i want to get familiar with it and promises
    .get(api1)
    .then(function(response) {
      $(".temp").text(`TEMP : ${response.data.main.temp}`);
      $(".mintemp").text(`min : ${response.data.main.temp_min}`);
      $(".maxtemp").text(`max : ${response.data.main.temp_max}`);
      console.log(response);
      //return response; //return res obj
    })
    .catch(function(error) {
      console.log(error); //throw error stack if any
    });
}
function api_pics(place) {
  //function call to retrieve weather of a specific place

  axios
    .get(
      `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${place}&client_id=1a3d1339cdba614d446b8479918150da9acd74c2ea74f1e7b45c1d1411d1057c`
    )
    .then(function(response) {
      console.log(response.data.results[0].urls.small);
      for (let i = 0; i < 3; i++) {
        $(".pictures-results").append(
          `<img src="${response.data.results[i].urls.small}"/>`
        );
      }

      //return response; //return res obj
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
  "District+of+Columbia",
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
  "Marshall+Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New+Hampshire",
  "New+Jersey",
  "New+Mexico",
  "North+Carolina",
  "North+Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto+Rico",
  "Rhode+Island",
  "South+Carolina",
  "South+Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin+Island",
  "Virginia",
  "Washington",
  "West+Virginia",
  "Wisconsin",
  "Wyoming"
];

//get date with yyy-mm-dd format
let dateObj = new Date();
let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
let day = ("0" + dateObj.getDate()).slice(-2);
let year = dateObj.getFullYear();
newdate = year + "-" + month + "-" + day;

console.log(newdate);
let infoObj = {}; //create empty obj

function flightSearch() {
  let ranState = ranStates[Math.floor(Math.random() * ranStates.length)]; //select random state
  let id_thisState = "";
  //ranState = ranState.replace(/" "/g, "+"); //replace "empty space" to comply with api call
  console.log(ranState);

  instance
    .get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-us/?query=${thisState}`
    )
    .then(function(result) {
      console.log(result.data.Places[0].PlaceId);
      var thisStateId = result.data.Places[0].PlaceId;
      instance
        .get(
          `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-us/?query=${ranState}`
        )
        .then(function(result) {
          //to get id of random place we regenerated
          console.log(result.data.Places[0].PlaceId); //get results
          return result.data.Places[0].PlaceId; // return value place ID from api
        })
        .then(function(placeId) {
          instance //make another call to get quotes of tickets using the "id" we got from the last call
            .get(
              `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${thisStateId}/${placeId}/${newdate}?inboundpartialdate=anytime`
            )
            .then(function(result) {
              console.log(result.data.Quotes); //get min

              // if (result.data.Quotes.length < 1) {
              //   console.log("No Flighs");
              //   throw new Error("abort promise chain");
              //   return;
              // }

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
              let destinationId =
                result.data.Quotes[0].OutboundLeg.DestinationId;
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
              return infoObj;
            })
            .then(function(iObj) {
              api_weather(iObj.destinationInfo.destinationCityName);
              api_pics(iObj.destinationInfo.destinationCityName);
              $(".result-destination").text(
                `Let's Travel to ${
                  iObj.destinationInfo.destinationCityName
                } !!!`
              );
              $(".to").text(
                `TO : ${iObj.destinationInfo.destinationAirportName}`
              );
              $(".from").text(`FROM : ${iObj.originInfo.originAirportName}`);
              $(".price").text(`PRICE : ${iObj.price} $`);
              $("#loading").hide();
              $(".mainResultDiv").show();
              console.log(iObj);
            })
            .catch(function(error) {
              console.log("There was an error ... no flights ??");
              flightSearch();
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log("There was an error");
          console.log(error);
        });
    })
    .catch(function(error) {
      console.log("There was an error ... at the beginning of the call ");
      console.log(error);
      flightSearch();
    });

  // $(".weather-results ").append(document.createTextNode(""));
  // $(".pictures-results").append(document.createTextNode(""));
}

let mainButton = document.getElementById("btn-ClientSubmit");
mainButton.addEventListener("click", function() {
  $(".mainDiv").hide();
  $(".mainResultDiv").hide();
  $("#loading").show();
  // $(".weather-results").empty();
  // $(".ticketPrice-results").empty();
  // $(".pictures-results").empty();
  flightSearch();
});

// let destinationWeather = weatherData.main.temp
// console.log(destinationWeather)
//   var btn = document.querySelectorAll(`.btn-money`);
//   var btn2 = document.querySelectorAll(`.btn-weather`);

//   for (var i = 0; i < btn.length; i++) {
//     btn[i].addEventListener("click", function() {
//       var tmp = this.value;
//       client_money = tmp;
//     });
//   }
//   for (var i = 0; i < btn2.length; i++) {
//     btn2[i].addEventListener("click", function() {
//       var tmp2 = this.value;
//       client_weather = tmp2;
//     });
//   }
// }

// getValues();
