var input = document.querySelector("#search");
var breweryList = document.querySelector("#breweries-list");

function formSubmit(event) {
  event.preventDefault();
  var city = input.value;
  getCity(city);
  console.log(city);
  input.value = "";
}

function getCity(city) {
  var url = `https://api.openbrewerydb.org/breweries?by_city=${city}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      breweryData(data);
    });
}

}}

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    formSubmit(event);
  }
});
