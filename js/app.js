//   var config = {
//     apiKey: "AIzaSyBHFhFxaelIbZrC49uuNLPt4tDCoZx3gNM",
//     authDomain: "letstravel-956b6.firebaseapp.com",
//     databaseURL: "https://letstravel-956b6.firebaseio.com",
//     projectId: "letstravel-956b6",
//     storageBucket: "letstravel-956b6.appspot.com",
//     messagingSenderId: "1046260323930"
//   };
//   firebase.initializeApp(config);
//   var db = firebase.database();
var submit = document.getElementById("btn-ClientSubmit");

//get elements
var client_money = "";
var client_weather = "";
var client_date = "";
// const client_id = "";
// const client_location = "";

function getValues() {
  var btn = document.querySelectorAll(`.btn-money`);
  var btn2 = document.querySelectorAll(`.btn-weather`);
  document.getElementById("clientDate").addEventListener("change", function() {
    client_date = this.value;
  });

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

submit.addEventListener("click", function() {
  console.log(client_money + " and " + client_date + " and " + client_weather);
});
//   function getClienInfo(e) {
//     e.preventDefault();

//     role = $("#role")
//       .val()
//       .trim();
//     start_date = $("#start-date")
//       .val()
//       .trim();
//     rate = $("#monthly-rate")
//       .val()
//       .trim();

//     var dateFormat = "MM/DD/YYYY";
//     var s_date = moment(start_date, dateFormat);
//     console.log(s_date);

//     var new_data = {
//       e_name: e_name,
//       role: role,
//       start_date: s_date._i,
//       rate: rate
//     };
//     database.ref().push(new_data);
//   }
