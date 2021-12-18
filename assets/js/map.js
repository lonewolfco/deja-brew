// declare variables
var map = document.querySelector("#map");
// var breweryLocation = 'Vashon,WA';
var tableContainer = document.querySelector("#brewery-table");




function generateBreweryData (cityName) {
    tableContainer.innerHTML = "";
    console.log(cityName);

    cityName = "Vashon";

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
            
            var buttonValue = data[i].latitude + ", " + data[i].longitude;
            console.log(buttonValue);
            // buttons to view the brewery on a map
            var mapButton = document.createElement('button');
            mapButton.className = "btn waves-effect grey darken-4";
            mapButton.setAttribute("type", "submit");
            mapButton.textContent = "View on the Map!";
            mapButton.setAttribute("data-cord", buttonValue);
            console.log(mapButton.dataset.cord);
            // icon on the map buttons
            var btnIcon = document.createElement("i");
            btnIcon.className = "material-icons right";
            btnIcon.textContent = "location_searching";
            mapButton.append(btnIcon);

            buttonContainer.append(mapButton);



            rowEl.append(rowContent, buttonContainer);
            rowContent.append(brewName, breweryAddress, brewWebsite);

            mapButton.addEventListener("click",function(event) {
                event.target.dataset.cord;
                map.src="";
                var mapRequestURL = 'https://maps.googleapis.com/maps/api/staticmap?zoom=16&size=350x300&scale=1&maptype=roadmap&markers=size%3Alrg%7Ccolor%3Ablack%7C' + mapButton.dataset.cord + '&center=' + mapButton.dataset.cord + 'key=AIzaSyBPtCzgyimy69Svl3-LRgwO47gFXn8XAyI';
                console.log(mapRequestURL);
                map.src = mapRequestURL;
                // generateMap(mapButton.value);
            })

        }

        })
    }
    })
}

generateBreweryData();


// function generateMap (breweryLocation) {
//     // map.innerHTML = "";
//     console.log(breweryLocation);

//     // apiKey = "hNNynQKgGNZYjm3yv3iNIOnlcdiwyX5f";

//     var mapRequestURL = 'https://maps.googleapis.com/maps/api/staticmap?zoom=16&size=350x300&scale=1&maptype=roadmap&markers=size%3Alrg%7Ccolor%3Ablack%7C' + breweryLocation + '&center=' + breweryLocation + 'key=AIzaSyBPtCzgyimy69Svl3-LRgwO47gFXn8XAyI';
//     console.log(mapRequestURL);


//     map.src = mapRequestURL;
    


// }

