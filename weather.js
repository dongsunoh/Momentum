const   weather = document.querySelector(".js-weather");
const   weatherLocation = document.querySelector(".js-weather-loaction");

const   API_KEY = `7ff4160820866a67a23047b552a2dbea`;
const   COORDS  = `coords`;

function getWeather( lat, lng){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json();
    }).then(function(json){
      const temperature = json.main.temp;
      const place = json.name;

      weather.innerText = `${temperature}°`;
      weatherLocation.innerText = `${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess( position) {
  const latitude = position.coords.latitude; // 위도
  const longitude = position.coords.longitude; // 경도
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords( coordsObj);
  getWeather( latitude, longitude);
}

function handleGeoError() {
  console.log(`Can't access geo location`);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);

  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
