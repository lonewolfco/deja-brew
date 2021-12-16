
var input = document.querySelector("#search");


function formSubmit(event) {
    event.preventDefault();
 var city = input.value.trim;
}

function getCity(city) {
var url = `https://api.openbrewerydb.org/breweries?by_city=${city}`


fetch(url)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
   
  });

}

input.addEventListener("keydown", function(e) {
    var keyCode = e.which || e.keyCode;
    if (keyCode ==13)
    formSubmit();
})