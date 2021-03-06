// IIFE Immediately Invoked Function Expression
$(function () {

// Constants
const BASE_URL = "https://www.alphavantage.co/query?function=";
const API_KEY = "LXIO70U1WOW3YKTB";

// Variables
let quoteData;
let compData;
let timeSeriesData;
let myChart = document.getElementById("myChart").getContext("2d");
let priceData = [];

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
        displayDataInDom();
    }, function (error) {
        console.log("error")
    });
    $.ajax(BASE_URL + "OVERVIEW&symbol=" + ticker + "&apikey=" + API_KEY)
    .then(function(data) {
        compData = data;
        // console.log(compData)
        displayDataInDom();
    }, function (error) {
        console.log("error")
    });
    $.ajax(BASE_URL + "TIME_SERIES_MONTHLY_ADJUSTED&symbol=" + ticker + "&apikey=" + API_KEY)
    .then(function(data) {
        timeSeriesData = data;
        createPriceData();
        createDates();
        displayDataInDom();
        // console.log(timeSeriesData)
    }, function (error) {
        console.log("error")
    });
}

function createPriceData(){
    // for each element in timeSeriesData[1] push element name to labels[]
    // for each element in time series, add to data[]
    for (price in timeSeriesData["Monthly Adjusted Time Series"]){
        priceData.push(timeSeriesData["Monthly Adjusted Time Series"][price]["5. adjusted close"])
        // console.log(priceData);
    }
    // console.log(priceData)
}

function displayDataInDom() {
    // transfer our api data to the DOM
    // have to use bracket notation becuase of all the spaces in the object names
    $main.html(`
        <p id="ticker"><b>Ticker Symbol:</b> ${quoteData["Global Quote"]["01. symbol"]}</p>
        <p id="name"><b>Company Name:</b> ${compData["Name"]}</p>
        <p id="price"><b>Last Price:</b> ${quoteData["Global Quote"]["05. price"]}</p>
        <p id="volume"><b>Volume:</b> ${quoteData["Global Quote"]["06. volume"]}</p>
        <p id="change"><b>Percent Change:</b> ${quoteData["Global Quote"]["10. change percent"]}</p>
        <p id="description"><b>Company Description:</b> ${compData["Description"]}</p>
        `
        );
    $input.val("");
    let lineChart = new Chart(myChart, {
        type: "line",
        data: {
            labels: Object.keys(timeSeriesData["Monthly Adjusted Time Series"]),
            datasets:[{
                label: "Price",
                data: priceData,
                borderColor: "blue",
            }]
        },
        options:{}
    });
}
});
