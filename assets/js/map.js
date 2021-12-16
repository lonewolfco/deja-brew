// create fields on user click using index

// needs to create buttons 

var map = document.querySelector("#map");
var submitBtn = document.getElementById("submit-btn");
let breweryLocation = 'Vashon,WA';
// event listener on the brewery buttons to generate a map
// will need to be held inside brewery for loop
// will need to set value of button to the brewery location

submitBtn.addEventListener("click", function () {
    console.log(breweryLocation)
    generateMap();
})



function generateMap () {
    // map.innerHTML = "";


    apiKey = "hNNynQKgGNZYjm3yv3iNIOnlcdiwyX5f";

    // var mapResquestURL = 'https://open.mapquestapi.com/staticmap/v5/map?key=' + apiKey + 'locations=' + breweryLocation + '|marker-lg-24135E-000000&size=600,500@2x';
    // var mapResquestURL = 'https://open.mapquestapi.com/staticmap/v5/map?key=' + apiKey + '&locations=3307%20Stadium%20Dr,%20Kalamazoo,%20MI%7Cmarker-lg-24135E-000000&size=600,500@2x';
    var mapRequestURL = 'https://maps.googleapis.com/maps/api/staticmap?size=500x400&scale=2&maptype=hybrid%5C&markers=size%3Amid%7Ccolor%3Ablack%7C' + breweryLocation + '&center=' + breweryLocation + 'key=AIzaSyBPtCzgyimy69Svl3-LRgwO47gFXn8XAyI';

    // need brewery api information to pull in brewery data

    map.src = mapRequestURL;
    
    // fetch(mapRequestURL)
    //     .then(function (response) {
    //         if (response.ok) {
    //             response.json().then(function (data) {
    //                 console.log(data);


    //             }
    //             )}
    //     })
}
