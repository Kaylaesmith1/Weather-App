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

let fahrenheitTemperature = null;
let feels = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNow");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  let celciusFeelsElement = document.querySelector("#feels");
  let celciusTemperatureFeels = ((feels - 32) * 5) / 9;
  celciusFeelsElement.innerHTML = Math.round(celciusTemperatureFeels);

  let fahrenheitForecastMax = document.querySelectorAll("#forecastMax");
  fahrenheitForecastMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  let fahrenheitForecastMin = document.querySelectorAll("#forecastMin");
  fahrenheitForecastMin.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNow");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let fahrenheitFeelsElement = document.querySelector("#feels");
  let fahrenheitTemperatureFeels = feels;
  fahrenheitFeelsElement.innerHTML = Math.round(fahrenheitTemperatureFeels);

  let fahrenheitForecastMax = document.querySelectorAll("#forecastMax");
  fahrenheitForecastMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(currentTemp);
  });

  let fahrenheitForecastMin = document.querySelectorAll("#forecastMin");
  fahrenheitForecastMin.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(currentTemp);
  });

  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}

function currentWeather(response) {
  fahrenheitTemperature = response.data.main.temp;
  let fahrenheitTemperatureElement = document.querySelector("#tempNow");
  fahrenheitTemperatureElement.innerHTML = Math.round(
    `${fahrenheitTemperature}`
  );
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  feels = Math.round(response.data.main.feels_like);
  let unix_sunrise = response.data.sys.sunrise;
  let date = new Date(unix_sunrise * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let unix_sunset = response.data.sys.sunset;
  let dateSunset = new Date(unix_sunset * 1000);
  let hoursSunset = dateSunset.getHours();
  let minutesSunset = "0" + dateSunset.getMinutes();

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = ` ${humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} mph`;
  let feelsLikeElement = document.querySelector("#feels");
  feelsLikeElement.innerHTML = `${feels}`;
  let formattedTimeSunrise = hours + ":" + minutes.substr(-2);
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = `${formattedTimeSunrise}`;
  let formattedTimeSunset = hoursSunset + ":" + minutesSunset.substr(-2);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = `${formattedTimeSunset}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

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

let lat = null;
let lon = null;

function myLocation(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

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

function RecentlySearchedBCN(response) {
  let maxTemperatureBCN = Math.round(response.data.main.temp_max);
  let maxTemperatureElementBCN = document.querySelector("#max-temp-BCN");
  maxTemperatureElementBCN.innerHTML = `${maxTemperatureBCN}°`;

  let minTemperatureBCN = Math.round(response.data.main.temp_min);
  let minTemperatureElementBCN = document.querySelector("#min-temp-BCN");
  minTemperatureElementBCN.innerHTML = `${minTemperatureBCN}°`;
  let iconElementBCN = document.querySelector("#iconBCN");
  iconElementBCN.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElementBCN.setAttribute("alt", response.data.weather[0].description);
}

function RecentWeatherBCN(event) {
  event.preventDefault();
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlRecentBCN = `${apiEndpoint}?q=Barcelona&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrlRecentBCN}`).then(RecentlySearchedBCN);
}

let searchButtonRecentBCN = document.querySelector("#searching");
searchButtonRecentBCN.addEventListener("submit", RecentWeatherBCN);

function RecentWeatherBCNCelcius(event) {
  event.preventDefault();
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlRecentBCN = `${apiEndpoint}?q=Barcelona&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrlRecentBCN}`).then(RecentlySearchedBCN);
}
let celciusLinkBCN = document.querySelector("#celcius-link");
celciusLinkBCN.addEventListener("click", RecentWeatherBCNCelcius);
let fahrenheitLinkBCN = document.querySelector("#fahrenheit-link");
fahrenheitLinkBCN.addEventListener("click", RecentWeatherBCN);

function RecentlySearchedChicago(response) {
  let maxTemperatureChicago = Math.round(response.data.main.temp_max);
  let maxTemperatureElementChicago = document.querySelector(
    "#max-temp-Chicago"
  );
  maxTemperatureElementChicago.innerHTML = `${maxTemperatureChicago}°`;

  let minTemperatureChicago = Math.round(response.data.main.temp_min);
  let minTemperatureElementChicago = document.querySelector(
    "#min-temp-Chicago"
  );
  minTemperatureElementChicago.innerHTML = `${minTemperatureChicago}°`;
  let iconElementChicago = document.querySelector("#iconChicago");
  iconElementChicago.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElementChicago.setAttribute("alt", response.data.weather[0].description);
}

function RecentWeatherChicago(event) {
  event.preventDefault();
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=Chicago&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(RecentlySearchedChicago);
}

let searchButtonRecentChicago = document.querySelector("#searching");
searchButtonRecentChicago.addEventListener("submit", RecentWeatherChicago);

function RecentWeatherChicagoCelcius(event) {
  event.preventDefault();
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlRecentChicago = `${apiEndpoint}?q=Chicago&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrlRecentChicago}`).then(RecentlySearchedChicago);
}

let celciusLinkChicago = document.querySelector("#celcius-link");
celciusLinkChicago.addEventListener("click", RecentWeatherChicagoCelcius);
let fahrenheitLinkChicago = document.querySelector("#fahrenheit-link");
fahrenheitLinkChicago.addEventListener("click", RecentWeatherChicago);

function RecentlySearchedBerlin(response) {
  let maxTemperatureBerlin = Math.round(response.data.main.temp_max);
  let maxTemperatureElementBerlin = document.querySelector("#max-temp-Berlin");
  maxTemperatureElementBerlin.innerHTML = `${maxTemperatureBerlin}°`;

  let minTemperatureBerlin = Math.round(response.data.main.temp_min);
  let minTemperatureElementBerlin = document.querySelector("#min-temp-Berlin");
  minTemperatureElementBerlin.innerHTML = `${minTemperatureBerlin}°`;
  let iconElementBerlin = document.querySelector("#iconBerlin");
  iconElementBerlin.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElementBerlin.setAttribute("alt", response.data.weather[0].description);
}

function RecentWeatherBerlin(event) {
  event.preventDefault();
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=Berlin&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(RecentlySearchedBerlin);
}

let searchButtonRecentBerlin = document.querySelector("#searching");
searchButtonRecentBerlin.addEventListener("submit", RecentWeatherBerlin);

function RecentWeatherBerlinCelcius(event) {
  event.preventDefault();
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlRecentBerlin = `${apiEndpoint}?q=Berlin&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrlRecentBerlin}`).then(RecentlySearchedBerlin);
}

let celciusLinkBerlin = document.querySelector("#celcius-link");
celciusLinkBerlin.addEventListener("click", RecentWeatherBerlinCelcius);
let fahrenheitLinkBerlin = document.querySelector("#fahrenheit-link");
fahrenheitLinkBerlin.addEventListener("click", RecentWeatherBerlin);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
<div class="col-2">
          <strong class="forecast-time">
            ${formatHours(forecast.dt * 1000)}
            </strong>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            />  
            <div class="weather-forecast-temperature">  
              <span class="forecastMax">
              ${Math.round(forecast.main.temp_max)}°
              </span> 
              <span class="forecastMin">${Math.round(
                forecast.main.temp_min
              )}°</span>
            </div>  
      </div>
      `;
  }
}

function searchForecast(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".search-city").value;
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "imperial";
  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast";

  let apiUrlForecast = `${apiEndpointForecast}?q=${inputCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(displayForecast);
}

let searchButtonForecast = document.querySelector("#searching");
searchButtonForecast.addEventListener("submit", searchForecast);

function searchForecastCelcius(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".search-city").value;
  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "metric";
  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast";

  let apiUrlForecast = `${apiEndpointForecast}?q=${inputCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(displayForecast);
}

let celciusLinkForecast = document.querySelector("#celcius-link");
celciusLinkForecast.addEventListener("click", searchForecastCelcius);
let fahrenheitLinkForecast = document.querySelector("#fahrenheit-link");
fahrenheitLinkForecast.addEventListener("click", searchForecast);

function myLocationForecast(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "imperial";
  let apiEndpointForecastCurrent =
    "https://api.openweathermap.org/data/2.5/forecast";

  let apiUrlForecastCurrent = `${apiEndpointForecastCurrent}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecastCurrent).then(displayForecast);
}

function getCurrentPositionForecast() {
  navigator.geolocation.getCurrentPosition(myLocationForecast);
}
let searchCurrentForecast = document.querySelector("#search-current");
searchCurrentForecast.addEventListener("click", getCurrentPositionForecast);

function myLocationForecastCelcius(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  let apiKey = "c5ec52f93b5c1b4b6fe696ad9119316f";
  let units = "metric";
  let apiEndpointForecastCurrent =
    "https://api.openweathermap.org/data/2.5/forecast";

  let apiUrlForecastCurrent = `${apiEndpointForecastCurrent}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecastCurrent).then(displayForecast);
}
