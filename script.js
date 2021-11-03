// IIFE Immediately Invoked Function Expression
$(function () {

// Constants
const BASE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";
const API_KEY = "LXIO70U1WOW3YKTB";

// Variables
let apiData;

// Cached Element References
const $form = $('form');
const $input = $('input[type="text"]');
const $main = $('main');

// Event Listeners
$form.on("submit", submitHandler);


// Functions
function submitHandler(evt) {
    evt.preventDefault();
    const ticker = $input.val()
    // fetch the api data and assign it to the apiData variable
    $.ajax(BASE_URL + ticker + "&apikey=" + API_KEY)
    .then(function(data) {
        apiData = data;
        console.log(apiData)
        displayDataInDom();
    }, function (error) {
        console.log("error")
    });
}

function displayDataInDom() {
    // transfer our api data to the DOM
    // have to use bracket notation becuase of all the spaces in the object names
    $main.html(`
        <p id="ticker">Data for: ${apiData["Global Quote"]["01. symbol"]}</p>
        <p id="price">Last Price: ${apiData["Global Quote"]["05. price"]}</p>
        <p id="volume">Volume: ${apiData["Global Quote"]["06. volume"]}</p>
        <p id="change">Percent Change: ${apiData["Global Quote"]["10. change percent"]}</p>
        `
        );
    $input.val("");
}
});