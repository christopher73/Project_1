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

to select the destination of our traveler we generated an array of multiple states, after the client clicks on the button (id = btn-ClientSubmit) it generates a random element from the array creating out target destination (note: this might not be the only random element selected, this could due to errors on the callback function such "no tickets found for the destination" in which in that case our recursion funtion will trigger the whole function (flightserach) again after an error is found)

Ben was a major help with our callback funtions !

potential apis are ipAPI which can detect the area you are from
