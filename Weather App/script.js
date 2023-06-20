const searchButton = document.getElementById("search-btn");
const searchInput = document.querySelector("input[type='text']");
const locationElement = document.getElementById("location");
const weatherIconElement = document.getElementById("weather-icon");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const location = searchInput.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`)
    .then(response => response.json())
    .then(data => {
      locationElement.textContent = data.name;
      weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
    })
    .catch(error => {
      locationElement.textContent = "";
      weatherIconElement.innerHTML = "";
      temperatureElement.textContent = "";
      descriptionElement.textContent = "Unable to retrieve weather data. Please try again.";
    });
});
