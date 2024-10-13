// WEATHER APP

const weatherForm = document.querySelector(".weatherform");
const cityinput = document.querySelector(".whichCity");
const card = document.querySelector(".space");
const apikey = "6e91254aff5f68255a6a98672ad3ac2c"

weatherForm.addEventListener("submit",async event =>{

    event.preventDefault();

    const city = cityinput.value;
    if(city){
        try {
            const weatherData = await getData(city);
            console.log(weatherData);
            weatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            errorDisplay(error);
        }

    } else{
        errorDisplay("Enter a city !");
    }
})

async function getData(city) {
     
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}
function weatherInfo(data){

    const {name: city,
           main: {temp,humidity}, 
           weather: [{id, description}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisp = document.createElement("h1");
    const tempDisp = document.createElement("p");
    const humidityDisp = document.createElement("p");
    const descpDisp = document.createElement("p");
    const emojiDisp = document.createElement("p");

    cityDisp.textContent = city;
    tempDisp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisp.textContent = `Humidity: ${humidity}%`;
    descpDisp.textContent = description;
    emojiDisp.textContent = getEmoji(id);

    cityDisp.classList.add("cityDisp");
    tempDisp.classList.add("tempDisp");
    humidityDisp.classList.add("humidityDisp");
    descpDisp.classList.add("descpDisp");
    emojiDisp.classList.add("emojiDisp");

    card.appendChild(cityDisp);
    card.appendChild(tempDisp);
    card.appendChild(humidityDisp);
    card.appendChild(descpDisp);
    card.appendChild(emojiDisp);
}
function getEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId == 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
              return "☁️" ;
        default:
            return "❌"
    }
}
function errorDisplay(message){
    const displayError = document.createElement("p");
    displayError.textContent = message;
    displayError.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(displayError);

}