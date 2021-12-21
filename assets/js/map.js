// declare variables
var map = document.querySelector("#map");
var input = document.querySelector("#search");
let coordinates = JSON.parse(localStorage.getItem("brewcord")) || [];
let history = JSON.parse(localStorage.getItem("search-history")) || [];
var tableContainer = document.querySelector("#brewery-table");
var histContainer = document.querySelector("#dropdown1");
var clearBtn = document.querySelector("#clear-btn");
// var searchBtn = document.querySelector(".search-btn");
// var searchField = document.querySelector(".search-field");

// activates the history dropdown in the navbar
$('.dropdown-trigger').dropdown();

// searchBtn.addEventListener("click", function (){
//     searchField.classList.remove("hide");
// })

// event listener when the enter key is pressed while the user has their cursor in the search bar
input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      localStorage.removeItem("brewcord");
      coordinates = [];
      formSubmit(event);
    //   location.reload();
    }
  });

// function that triggers the other functions when the form is submitted (and sets the coordinate data to the local storage)
function formSubmit(event) {
    event.preventDefault();
    var cityName = input.value;
    generateBreweryData(cityName);
    history.push(cityName);
    localStorage.setItem("search-history", JSON.stringify(history));
    renderSearchHistBtns ();
    input.value = "";
  }


// api fetch function that fetches brewery data for a city, and creates the list elements
function generateBreweryData (cityName) {
    tableContainer.innerHTML = "";
    console.log(cityName);

    // cityName = "Vashon";

    var brewRequestURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;

    fetch(brewRequestURL)
    .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);


                // for loop to create table elements
                for (let i =0; i < data.length; i++) {

                    var rowEl = document.createElement('tr');
                    tableContainer.append(rowEl);

                    var rowContent = document.createElement('td');
                    rowEl.append(rowContent);

                    var brewName = document.createElement('p');
                    brewName.classList.add("brew-name");
                    brewName.textContent = data[i].name + " [" + data[i].brewery_type + "]" ;

                    var breweryAddress = document.createElement('p');
                    var addressFull = "";
                    
                                        // if else to remove any breweries that feature null address data
                    if (data[i].street) {
                    addressFull += data[i].street + " " + data[i].city + ", " + data[i].state + " " + data[i].postal_code;
                    }
                    else {
                    rowEl.remove();
                    }

                    if(data[i].brewery_type==="closed") {
                        rowEl.remove();
                    }

                    breweryAddress.textContent = addressFull;

                    var brewWebsite = document.createElement('a');
                    brewWebsite.classList.add("brew-website");
                    brewWebsite.href = data[i].website_url;
                    brewWebsite.textContent = data[i].website_url;


                    var buttonContainer = document.createElement('td');
                    buttonContainer.classList.add ("mapbtn-container");
                    
                    var buttonValue = data[i].latitude + "," + data[i].longitude;


                    coordinates.push(buttonValue);
                    localStorage.setItem("brewcord", JSON.stringify(coordinates));
                    console.log(coordinates);

                        // buttons to view the brewery on a map
                        const mapButton = document.createElement('button');
                        mapButton.className = " map-btn btn waves-effect grey darken-4";
                        mapButton.setAttribute("type", "submit");
                        mapButton.textContent = "Map it!";
                        mapButton.setAttribute("value", coordinates[i]);

                        // icon on the map buttons
                        var btnIcon = document.createElement("i");
                        btnIcon.className = "material-icons left";
                        btnIcon.textContent = "location_searching";
                        mapButton.append(btnIcon);
            
                        buttonContainer.append(mapButton);

                        // event listener for the map buttons to start the gerneateMap function on click
                        mapButton.addEventListener("click", event => {
                            console.log(event.target.value);
                            generateMap(event.target.value);
                        })
          
                // appends elements to each other on the brewery list
                rowEl.append(rowContent, buttonContainer);
                rowContent.append(brewName, breweryAddress, brewWebsite);

        }
        })
         }
        })
        }


    // function to create the search history buttons
    function renderSearchHistBtns() {
        histContainer.innerHTML = "";
        for (let i=0; i<history.length; i++) {
            const historyLI = document.createElement("li");
            histContainer.append(historyLI);
            const historyBtn = document.createElement("button");
            historyBtn.setAttribute("type","text");
            historyBtn.setAttribute("readonly",true);
            historyBtn.setAttribute("class", "btn waves-effect grey darken-4");
            historyBtn.textContent = history[i];
            historyBtn.setAttribute("value", history[i]);
            historyBtn.addEventListener("click",function() {
                localStorage.removeItem("brewcord");
                 coordinates = [];
                generateBreweryData(historyBtn.value);
            })
            historyLI.append(historyBtn);
        }
        }
        
// runs this function on page load so the history buttons are always there, fixes bug that was generating an extra button
    renderSearchHistBtns();
    if (history.length > 0) {
        generateBreweryData(history[history.length - 1]);
    }


// function to generate the map data on button click
function generateMap (breweryLocation) {
    console.log(breweryLocation);
    var mapRequestURL = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=250x250&scale=2&maptype=roadmap&markers=size%3Alrg%7Ccolor%3Ablack%7C' + breweryLocation + '&center=' + breweryLocation + '&key=AIzaSyBPtCzgyimy69Svl3-LRgwO47gFXn8XAyI';
    console.log(mapRequestURL);
    map.src = mapRequestURL;
    
}

// if you click the clear button, it will clear the local storage for search history & reload the page to clear the buttons, and bring you back to the main page
clearBtn.addEventListener("click",function() {
    localStorage.removeItem("search-history");
    history = [];
    location.reload();
  })