
var input = document.querySelector("#search");
var matchList = document.querySelector("#matchList");
var searchBtn = document.querySelector("#searchBtn");
var api = "https://api.openbrewerydb.org/breweries?by_city=";


//search API ad filter it


function formSubmit() {
  let city = document.querySelector("#search").value;
  let cityNospace = city.split(' ').join("%20");
  let url = "https://api.openbrewerydb.org/breweries?by_city=" + cityNospace;

console.log(city);
console.log(url);

 fetch(url)
  .then(function (response) {
  return response.json();
 })
  .then(function (data) {
});
};




input.addEventListener("keydown", function(e) {
    var keyCode = e.which || e.keyCode;
    if (keyCode ==13)
    formSubmit();
});

searchBtn.addEventListener("click", function() {
  formSubmit();
}); 


//AUTOCOMPLETE ATTEMPT
// var searchCity = async searchBox => {
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

