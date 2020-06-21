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
  return `Today, ${Day}</br> ${Month} ${date}, ${year}`;
}

let currentDay = document.querySelector("#currentDate");
currentDay.innerHTML = formatDate(currentDay);

var currentTime = new Date().getHours();
if (7 <= currentTime && currentTime < 20) {
  if (document.body) {
    document.body.className = "boxDay";
  }
} else {
  if (document.body) {
    document.body.className = "boxNight";
  }
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTemperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * 9) / 5 + 32;
}
let fahrenheit = document.querySelector("#Fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTemperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 5) / 9;
}

let celcius = document.querySelector("#Celcius-link");
celcius.addEventListener("click", convertToCelcius);

function searchCity(cityInput) {
  let apiKey = "1ed0e5ac9db3bedb50c4d9ca63aebd2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

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

  console.log(response.data);
}

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Boston");

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentlocationButton = document.querySelector("#currentButton");
currentlocationButton.addEventListener.apply("click".getCurrentLocation);
