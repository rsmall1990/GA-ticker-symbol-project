// IIFE Immediately Invoked Function Expression
$(function () {

// Constants
const BASE_URL = "https://www.alphavantage.co/query?function=";
const API_KEY = "LXIO70U1WOW3YKTB";

// Variables
let quoteData;
let compData;

// Cached Element References
const $form = $('form');
const $input = $('input[type="text"]');
const $main = $('main');

// Event Listeners
$form.on("submit", submitHandler);


// Functions
function submitHandler(evt) {
    evt.preventDefault();
    const ticker = $input.val();
    // fetch the GLOBAL_QUOTE data and assign it to the quoteData variable
    $.ajax(BASE_URL + "GLOBAL_QUOTE&symbol=" + ticker + "&apikey=" + API_KEY)
    .then(function(data) {
        quoteData = data;
        console.log(quoteData)
        displayDataInDom();
    }, function (error) {
        console.log("error")
    });
    $.ajax(BASE_URL + "OVERVIEW&symbol=" + ticker + "&apikey=" + API_KEY)
    .then(function(data) {
        compData = data;
        console.log(compData)
        displayDataInDom();
    }, function (error) {
        console.log("error")
    });
}

function displayDataInDom() {
    // transfer our api data to the DOM
    // have to use bracket notation becuase of all the spaces in the object names
    $main.html(`
        <p id="ticker"><b>Ticker Symbol:</b> ${quoteData["Global Quote"]["01. symbol"]}</p>
        <p id="name"><b>Company Description:</b> ${compData["Name"]}</p>
        <p id="price"><b>Last Price:</b> ${quoteData["Global Quote"]["05. price"]}</p>
        <p id="volume"><b>Volume:</b> ${quoteData["Global Quote"]["06. volume"]}</p>
        <p id="change"><b>Percent Change:</b> ${quoteData["Global Quote"]["10. change percent"]}</p>
        <p id="description"><b>Company Description:</b> ${compData["Description"]}</p>
        `
        );
    $input.val("");
}
});