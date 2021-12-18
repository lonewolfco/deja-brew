// declare variables
var map = document.querySelector("#map");
// var breweryLocation = 'Vashon,WA';
var tableContainer = document.querySelector("#brewery-table");




function generateBreweryData (cityName) {
    tableContainer.innerHTML = "";
    console.log(cityName);

    cityName = "Kalamazoo";

    var brewRequestURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;

    fetch(brewRequestURL)
    .then(function (response) {
        console.log(response);
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);


        // for loop to create table elements
        for (let i =0; i < 5; i++) {

            var rowEl = document.createElement('tr');
            tableContainer.append(rowEl);

            var rowContent = document.createElement('td');
            // rowContent.classList.add("col s8");
            rowEl.append(rowContent);

            var brewName = document.createElement('p');
            brewName.classList.add("brew-name");
            brewName.textContent = data[i].name + " [" + data[i].brewery_type + "]" ;


            var breweryAddress = document.createElement('p');
            breweryAddress.textContent = data[i].street + " " + data[i].city + ", " + data[i].state + " " + data[i].postal_code;

            var brewWebsite = document.createElement('a');
            brewWebsite.classList.add("brew-website");
            brewWebsite.href = data[i].website_url;
            brewWebsite.textContent = data[i].website_url;

            var buttonContainer = document.createElement('td');
            // rowContent.classList.add("col s4");
            
            var buttonValue = data[i].longitude + ", " + data[i].latitude;
            console.log(buttonValue);

            // buttons to view the brewery on a map
            var mapButton = document.createElement('button');
            mapButton.className = "btn waves-effect grey darken-4";
            mapButton.setAttribute("type", "submit");
            mapButton.textContent = "See on Map!";
            mapButton.setAttribute = ("value", buttonValue);
            // icon on the map buttons
            var btnIcon = document.createElement("i");
            btnIcon.className = "material-icons right";
            btnIcon.textContent = "location_searching";
            mapButton.append(btnIcon);

            buttonContainer.append(mapButton);



            rowEl.append(rowContent, buttonContainer);
            rowContent.append(brewName, breweryAddress, brewWebsite);



        }

        })
    }
    })
}

generateBreweryData();


// function generateMap () {
//     // map.innerHTML = "";


//     apiKey = "hNNynQKgGNZYjm3yv3iNIOnlcdiwyX5f";

//     // var mapResquestURL = 'https://open.mapquestapi.com/staticmap/v5/map?key=' + apiKey + 'locations=' + breweryLocation + '|marker-lg-24135E-000000&size=600,500@2x';
//     // var mapResquestURL = 'https://open.mapquestapi.com/staticmap/v5/map?key=' + apiKey + '&locations=3307%20Stadium%20Dr,%20Kalamazoo,%20MI%7Cmarker-lg-24135E-000000&size=600,500@2x';
//     var mapRequestURL = 'https://maps.googleapis.com/maps/api/staticmap?size=500x400&scale=2&maptype=hybrid%5C&markers=size%3Amid%7Ccolor%3Ablack%7C' + breweryLocation + '&center=' + breweryLocation + 'key=AIzaSyBPtCzgyimy69Svl3-LRgwO47gFXn8XAyI';

//     // need brewery api information to pull in brewery data

//     map.src = mapRequestURL;
    

// 
