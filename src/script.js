function formatDate() {
  let now = new Date();
  let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Day = Days[now.getDay()];
  let Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let Month = Months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  return `${Day}</br> ${Month} ${date},${year}`;

  let weekDay = Days[now.getDay()];
  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = `${weekDay}`;
}

let currentDay = document.querySelector("#currentDate");
currentDay.innerHTML = formatDate(currentDay);

function formatHours(timestamp) {}

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#dayTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#todayType").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#mainIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#mainIcon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function searchCity(cityInput) {
  let apiKey = "1ed0e5ac9db3bedb50c4d9ca63aebd2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  let apiurlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiurlForecast).then(displayForecast);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTemperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  fahrenheit.classList.add("active");
  celcius.classList.remove("active");
}
let fahrenheit = document.querySelector("#Fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);
let celcius = document.querySelector("#Celcius-link");
celcius.addEventListener("click", convertToCelcius);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTemperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let weekDay = days[date.getDay()];
  return weekDay;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#week");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 7; index < 40; index += 8) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-sm"><h4>${formatForecastDate(
      forecast.dt * 1000
    )}</h4><img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt="" id="weekDay"><strong>${Math.round(
      forecast.main.temp_max
    )}°</strong></div>`;
  }
}
searchCity("Boston");

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchQuery").value;
  searchCity(cityInput);
}

function searchLocation(position) {
  let apiKey = "1ed0e5ac9db3bedb50c4d9ca63aebd2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentlocationButton = document.querySelector("#currentButton");
currentlocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
