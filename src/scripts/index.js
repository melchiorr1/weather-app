import { renderHeading, renderWeatherBox, renderError } from "./render";

const DAYS = 3; // max 3 days for free api key

async function fetchData(coords) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=c88ee6341e504c69a49151119212606&q=${coords}&days=${DAYS}&aqi=no`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    renderError(error);
    return undefined;
  }
}

function parseJson(data) {
  console.log(data);
  const arr = [];
  for (let i = 0; i < DAYS; i += 1) {
    arr.push({
      icon: data.forecast.forecastday[i].day.condition.icon,
      text: data.forecast.forecastday[i].day.condition.text,
      temp: data.forecast.forecastday[i].day.avgtemp_c,
      date: data.forecast.forecastday[i].date,
    });
  }
  return {
    location: data.location.name,
    weatherInfo: arr,
  };
}

function beginLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");
  loadingScreen.classList.remove("hidden");
}

function endLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");
  loadingScreen.classList.add("hidden");
}

async function displayWeatherBox(position) {
  beginLoadingScreen();
  const jsonData = await fetchData(
    `${position.coords.latitude},${position.coords.longitude}`
  );
  if (!jsonData) {
    endLoadingScreen();
    return;
  }
  endLoadingScreen();
  const parsedJson = parseJson(jsonData);
  const weatherDiv = document.querySelector(".content");
  renderHeading(parsedJson.location, weatherDiv);
  renderWeatherBox(parsedJson.weatherInfo, weatherDiv);
}

navigator.geolocation.getCurrentPosition(displayWeatherBox, (error) => {
  if (error.code === error.PERMISSION_DENIED) {
    renderError("Please allow location access and refresh the app");
  } else {
    renderError("Something went wrong, please refresh the app");
  }
  endLoadingScreen();
});
