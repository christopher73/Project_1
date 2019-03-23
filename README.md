# Project_1 "Let's Travel"

#demo : https://christopher73.github.io/Project_1/

In this project we used the following APIs (3 total):

# SKYSCANNER for real time ticket quotes

## for each result we make 3 calls to this apis. one is to get destination place ID and origin place od

## after getting those two ids we were able to request a quote from the API

# OPEN WEATHER MAP's API

## we made 2 calls to this API in order to get the weather from the places we need (destincation and origin)

# UNSPLASH's API

##to the unsplash api we only made one call to get pictures of the destination place

      In this project I selected the origin of our travelers by
              identifying their public IP and the destination by generating an
              array of multiple states, after the client clicks on the button
              (id = btn-ClientSubmit) it generates a random element from the
              "destination" array, given us our target destination (note: this
              might not be the only random element selected, this function can
              be triggered multiple times if the api respond with "no tickets
              found for the destination" in which in that case our recursion
              funtion will trigger the whole function (flightserach) again if an
              error is found)

Ben was a major help with our callback funtions !

potential apis are ipAPI which can detect the area you are from
