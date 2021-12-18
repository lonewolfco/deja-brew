var input = document.querySelector("#autocomplete-input");
let city = document.querySelector("#autocomplete-input").value;
var matchList = document.querySelector("#matchList");
var searchBtn = document.querySelector("#searchBtn");
var api = "https://api.openbrewerydb.org/breweries?by_city=";



//search API ad filter it


function formSubmit() {
  let city = document.querySelector("#autocomplete-input").value;
  let cityNospace = city.split(' ').join("%20");
  let url = "https://api.openbrewerydb.org/breweries?by_city=" + cityNospace;

console.log(city);
console.log(url);

 fetch(url)
  .then(function (response) {
    console.log(response);
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data)
      })
    }
});
};



// async function asyncFunc() {
//   const results = await fetch("https://api.openbrewerydb.org/breweries?by_city=");
//   cities = await results.json();
//   //removeNull();
//   //searchCities('');
//   console.log(cities)
// }


// // AUTOCOMPLETE ATTEMPTS

// const searchCities = searchText => {
//   for (let city of cities) {
//     const regEx = new RegExp(`^${searchText}`, 'gi');
//     city.match = city.name.match(regEx) || city.abbr.match(regEx);
//   }
//   //outputHTML();
// }

// $(document).ready(function(){
//   $('input.autocomplete').autocomplete({
//     source: function (request, response) {
//       $.getJSON(
//         {url: "https://api.openbrewerydb.org/breweries?by_city=${input.autocomplete}",
//         success: console.log(data)
//              })
//             }
//           })
//         })
 
// var searchCity = async function(searchBox) {
//   return searchBox.json();
//   var results = await fetch('city');
//   var cities = await results.json();
  
//   //Get & Filter Through Entered Data
//   var fits = cities.filter(city => {
//     var regex = new RegExp(`^${searchBox}`, 'gi');
//     return city.name.match(regex) || city.abbr.match(regex);
//   });
  
//   //Clears Data If Search Input Field Is Empty
//   if (searchBox.length === 0) {
//     fits = [];
//     matchList.innerHTML = '';
//   }
//   outputHtml(fits);
// };

//event listeners for searchf function

input.addEventListener("keydown", function(e) {
  var keyCode = e.which || e.keyCode;
  if (keyCode ==13)
  generateBreweryData();
});

searchBtn.addEventListener("click", function() {
generateBreweryData();
}); 