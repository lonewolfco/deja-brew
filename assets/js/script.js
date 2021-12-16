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

function breweryData(data) {

  breweryList.innerHTML= "";

  for (let i = 0; i < data.length; i++) {
    
  var name = data[i].name;
  var address = data[i].street;
  var city = data[i].city;
  var postal = data[i].postal_code;
  var state = data[i].state;
  var lat = data[i].latitude;
  var long = data[i].longitude;
  var website = data[i].website_url;
  
  var brewName = document.createElement("h5");
  var brewAddress = document.createElement("tr");

  brewName.textContent = name;
  brewAddress.textContent = address+ " " +city + ", " + state + " "+ postal;

  breweryList.append(brewName);
  breweryList.append(brewAddress);

}}

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    formSubmit(event);
  }
});