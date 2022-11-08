function setupDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let nowDate = date.getDate();

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day}, ${month} ${nowDate}, ${year}, ${hours}:${minutes}`;

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="75"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>|<span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4f158b998cdd1f3876802fe0834b00f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

/* Use imperial metric, because USA.
OpenWeather API key
*/

function searchCity(city) {
  let apiKey = "4f158b998cdd1f3876802fe0834b00f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function magnifyButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4f158b998cdd1f3876802fe0834b00f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateIndex = document.querySelector("#date");
let currentTime = new Date();
dateIndex.innerHTML = setupDate(currentTime);

let searchDoc = document.querySelector("#search-form");
searchDoc.addEventListener("submit", magnifyButton);

let pinDropButton = document.querySelector("#current-location-button");
pinDropButton.addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitOption.classList.remove("default");
  celsiusOption.classList.add("default");
  let celsiusTemperature = (fahrenheitTemperature - 32) / 1.8;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusOption.classList.remove("default");
  fahrenheitOption.classList.add("default");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusOption = document.querySelector("#celsius-option");
celsiusOption.addEventListener("click", displayCelsiusTemperature);

let fahrenheitOption = document.querySelector("#fahrenheit-option");
fahrenheitOption.addEventListener("click", displayFahrenheitTemperature);

function displayPhrase() {
  var phrases = [
    "Always check the weather before going on long drives!",
    "Make sure your tires have tread.",
    "Make sure your wipers work properly.",
    "Always check fuel and oil levels.",
    "Drive safe today!",
    "Dress accordingly!",
    "Check your tire pressure regularly.",
  ];

  var randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  console.log(randomPhrase);
}

searchCity("New Jersey");
