let today = new Date();
console.log(today.getDate());

let currentTime = document.querySelector("#rightNow");
let hours = today.getHours();

let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = days[today.getDay()];
currentTime.innerHTML = `${now} ${hours}:${minutes}`;

function convertToCelcius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#tempNow");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);

  temperature = Number(temperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#tempNow");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);

  temperature = Number(temperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function currentWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemperatureElement = document.querySelector("#tempNow");
  currentTemperatureElement.innerHTML = `${currentTemperature}`;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let feels = Math.round(response.data.main.feels_like);
  let sunrise = response.data.sys.sunrise;
  let sunset = response.data.sys.sunset;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = ` ${humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} mph`;
  let feelsLikeElement = document.querySelector("#feels");
  feelsLikeElement.innerHTML = `${feels}°`;
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = `${sunrise}`;
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = `${sunset}`;

  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}`.toUpperCase();
}

function searchCityWeather(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".search-city").value;
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${inputCity}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(currentWeather);
}

let searchButton = document.querySelector("#searching");
searchButton.addEventListener("submit", searchCityWeather);

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlmyLocation = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrlmyLocation}`).then(currentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myLocation);
}
let searchCurrent = document.querySelector("#search-current");
searchCurrent.addEventListener("click", getCurrentPosition);
