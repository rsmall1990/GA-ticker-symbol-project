// Constants
const BASE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FAS&"
const API_KEY = "LXIO70U1WOW3YKTB"
// State Variables
let apiData;
// Cached Element References
const $main = $('main');
// Event Listeners

// Functions
function getdata(){
    // get api data and assign it to to our api data variable
    $.ajax(BASE_URL + 'apikey=' + API_KEY)
    .then(function(data) {
        apiData = data;
        render();
    }, function (error) {

    });
}

function render(){
    // transfer our api data to the DOM
    console.log(apiData)
}