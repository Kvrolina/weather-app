let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();

let currentTime = document.querySelector("#date");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function cToc(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    ((42.8 - 32) * 5) / 9
  );
}

let linkC = document.querySelector(".tempc");
linkC.addEventListener("click", cToc);

function cTof(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (6 * 9) / 5 + 32
  );
}

let linkF = document.querySelector(".tempf");
linkF.addEventListener("click", cTof);

function showTemp(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#name").innerHTML = response.data.name;

  document.querySelector("#current-feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "b6d339314ce6cb1eca41a2997d435c26";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function submit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input");
  search(newCity.value);
}

let enterCity = document.querySelector("#city-search-form");
enterCity.addEventListener("submit", submit);

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b6d339314ce6cb1eca41a2997d435c26";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
function geoLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", geoLocation);
