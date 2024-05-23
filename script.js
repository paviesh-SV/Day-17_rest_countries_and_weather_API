// fetching data from rest countries url with the details of the country usinng async await function
async function fetchData() {
    try {
        let response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
            throw new Error("some error")
        }
        const data = await response.json();
        return data
    }
    catch (error) {
        console.log(error);
    }
}

//fecthing weather data from openweathermap.org with details on weather from specific countries using async await function
async function weatherData(cityName) {
    try {
        const apiKey = "8b973bd34aa2e73ac4742be2bd31c654";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("some error")
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

//creating a card for each country with their name, flag, capital, region, latitude and longitude, country code and weather information
async function createCard(country) {
    let countryName = country.name.common;
    let capital = country.capital;
    let region = country.region;
    let latitude = country.latlng[0];
    let longitude = country.latlng[1];
    let countryCode = country.cca3;
    let countryFlag = country.flags.png;

    //creating a div with class col to create columns for each card
    let colDiv = document.createElement("div");
    colDiv.className =
        "col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-4 mb-3 justify-content-center";

    // creatning the outline of the card using DOM and bootstrap
    let card = document.createElement("div");
    card.className = "card h-100 border-0  rounded-4";
    card.style.background = "linear-gradient(315deg, #ffffff 0%, #5899e2 74%)";

    //creating the header of the car and adding the country name from the rest countries URL
    let cardHeader = document.createElement("div");
    cardHeader.className =
        "card-header  rounded-top-4 text-white bg-dark text-center fs-2";
    cardHeader.textContent = countryName;

    //creating the outline of the car body with all the details of each country and their flag from rest countries URL
    let cardBody = document.createElement("div");
    cardBody.className = "card-body text-center fs-5 fw-bold";

    let cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.setAttribute(
        "style",
        "height: 8rem; width: 12rem; border: 1px solid black;");
    cardImg.src = countryFlag;
    cardImg.alt = "countryFlag";

    let details = document.createElement("div");
    details.className = "card-text fs-5 mt-3";
    details.innerHTML = `
    <span style="color:#00008B;">Capital : </span>${capital}
    <hr>
    <span style="color:#00008B;">Region : </span>${region}
    <hr>
    <span style="color:#00008B;">Latitude : </span>${latitude}, <span style="color:#00008B;">Longitude : </span>${longitude}
    <hr>
    <span style="color:#00008B;">Country code : </span>${countryCode}
    <br>`;

    //creating a button so that when we click it, we will get the weather details of specfic country
    let button = document.createElement("button");
    button.className = "btn btn-dark mt-3 fs-5 fw-bold";
    button.textContent = "Weather Details";

    //creating the function when button is pressed and the details on the weather that needed to be shown
    button.onclick = async function () {
        let weather_data = await weatherData(capital);
        let temp = weather_data.main.temp;
        let pressure = weather_data.main.pressure;
        let humidity = weather_data.main.humidity;
        let weather_speed = weather_data.wind.speed;

        let weatherAlert = document.createElement("div");
        weatherAlert.className =
            "alert rounder-5 alert-light text-dark mt-3 border-dark";

        //weatherAlert.style.border= "solid red";
        weatherAlert.style.background = "linear-gradient(315deg, #ffffff 0%, #5899e2 74%)";
        let head = document.createElement("h3");
        head.className = "text-dark";
        head.textContent = "Weather Details of The Capital";

        //creating a list for the weather details that needed to be shown
        let list = document.createElement("ul");
        list.className = "fs-5 fw-bold mt-4 text-dark text-center";
        list.innerHTML = `
      <li type="none"><span style="color:#00008B;">Temperature :</span> ${parseInt(
            temp - 273
        )}&deg;C</li>
      <hr>
      <li type="none"><span style="color:#00008B;">Pressure :</span> ${pressure}mb</li>
      <hr>
      <li type="none"><span style="color:#00008B;">Humidity :</span> ${humidity}%</li>
      <hr>
      <li type="none"><span style="color:#00008B;">Wind Speed :</span> ${weather_speed}km/h</li>`;

        //creatinng a button to go back to the country details when clicked
        let button1 = document.createElement("button");
        button1.className = "btn btn-dark mt-3";
        button1.textContent = "Country Details";

        //creating the function for when Go back button is clicked to remove weather details and show country details
        button1.onclick = function () {
            cardBody.removeChild(weatherAlert);
            cardBody.append(cardImg, details);
        };

        weatherAlert.append(head, list, button1);
        cardBody.removeChild(details);
        cardBody.removeChild(cardImg);
        cardBody.appendChild(weatherAlert);
    };

    //apenndding added features of html through javascript
    colDiv.appendChild(card);
    card.append(cardHeader, cardBody);
    cardBody.append(cardImg, details);
    details.appendChild(button);

    return colDiv;
}

// creating the function to outpt the card
async function createCards() {
    let cardRow = document.getElementById("cardRow");

    const data = await fetchData();
    for (let country of data) {
        let card = await createCard(country);
        cardRow.appendChild(card);
    }
}

//calling the function
createCards();