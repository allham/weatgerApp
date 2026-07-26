const apiKey = "365bd68a16a7f2debb51acf2d3a62724";
const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error("Network response was not 'ok'.");
        }
        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`      
        ];
        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
        weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherData.querySelector(".description").textContent = `${description}`;
        weatherData.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");
    }catch(error){}
}
