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
// console.log(client_date);
//   client_date.addEventListener("change", function() {
//     console.log(this);
//   });

// submit.addEventListener("click", function() {
//   console.log(client_money + " and " + client_date + " and " + client_weather);
// });

//this is a clock section( demo )

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

var startPlace = "SFO-sky";
var endPlace = "JFK-sky";
const instance = axios.create({
  headers: {
    get: {
      "X-RapidAPI-Key": "09ab412fd5mshe43091763ba5f28p14d116jsn7f1cf1111ecb"
    }
  }
});

instance
  .get(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" +
      startPlace +
      "/" +
      endPlace +
      "/2019-10-01?inboundpartialdate=2019-11-01"
  )
  .then(function(result) {
    console.log(result.data);
  });

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
    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h4>" + response.name + " Weather</h4>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F): " + response.main.temp);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
  });
// /------------------------
