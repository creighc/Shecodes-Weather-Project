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

function formatHours(timestamp) {}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTemperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#Fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTemperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celcius = document.querySelector("#Celcius-link");
celcius.addEventListener("click", convertToCelcius);

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
}

function searchCity(cityInput) {
  let apiKey = "1ed0e5ac9db3bedb50c4d9ca63aebd2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  let apiurlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiurlForecast).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.list[0];
  document.querySelector("#week").innerHTML = `
            <div class= "col-sm">Mon</br>
                <i class="fas fa-bolt" id ="weekDay"></i>
                <img src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" alt="" id="monIcon">
                </br><strong>${Math.round(
                  forecast.main.temp_max
                )}°</strong> ${Math.round(forecast.main.temp_min)}°
            </div>
            <div class= "col-sm">Tues</br>
                <i class="fas fa-wind" id ="weekDay"></i>
                </br>19°
            </div>
            <div class="col-sm">Wed</br>
                <i class="fas fa-sun" id ="weekDay"></i>
                </br>19°
            </div>
            <div class="col-sm">Thurs</br>
                <i class="fas fa-cloud" id ="weekDay"></i>
                </br>19°
            </div>
            <div class="col-sm">Fri</br>
                <i class="fas fa-cloud-sun" id ="weekDay"></i>
                </br>19°
            </div>
            <div class="col-sm">Sat</br>
                <i class="fas fa-cloud-showers-heavy" id ="weekDay"></i>
                </br>19°
            </div>
            <div class="col-sm" >Sun</br>
                <i class="fas fa-cloud-rain" id ="weekDay"></i>
                </br>19°
            </div>`;

  forecast = response.data.list[1];
  document.querySelector("#week").innerHTML += `
  `;

  console.log(forecast);
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
