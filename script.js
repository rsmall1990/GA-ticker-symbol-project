// Constants
const BASE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";
const API_KEY = "LXIO70U1WOW3YKTB";
// State Variables
let apiData;
// Cached Element References
const $main = $("main");
const $var = "FAS" // need input value to be dynamic
// Event Listeners

// Functions
const getData = function fetchApiData() {
    // fetch the api data and assign it to the apiData variable
    $.ajax(BASE_URL + $var + "&apikey=" + API_KEY)
    .then(function(data) {
        apiData = data;
        render();
    }, function (error) {
        console.log("error")
    });
}

const render = function displayDataInDom() {
    // transfer our api data to the DOM
    console.log(apiData)
}