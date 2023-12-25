import { renderHeading, renderWeatherBox} from './render'

const DAYS = 3

async function fetchData(coords) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=c88ee6341e504c69a49151119212606&q=${coords}&days=${DAYS}&aqi=no`, { mode: "cors" })
      if (!response.ok){
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;    
    } catch (error) {
    console.log(error) // log the error
    return undefined;
  }
}

function parseJson(data){
  const arr = [];
  for (let i = 0; i < DAYS; i+= 1){
    arr.push({
      icon: data.forecast.forecastday[i].day.condition.icon,
      text: data.forecast.forecastday[i].day.condition.text,
      temp: data.forecast.forecastday[i].day.avgtemp_c,
      date: data.forecast.forecastday[i].date,
    });
  }
  return{
    location: data.location.name,
    weatherInfo: arr,  
  }
}
  

async function displayWeatherBox(position){
  const jsonData = await fetchData(`${position.coords.latitude},${position.coords.longitude}`);
  const parsedJson = parseJson(jsonData)
  const weatherDiv = document.querySelector('.content')
  renderHeading(parsedJson.location, weatherDiv)
  renderWeatherBox(parsedJson.weatherInfo, weatherDiv)
};

navigator.geolocation.getCurrentPosition(displayWeatherBox);

// #TODO
// 1. getLocation ☑
// 2. loadingScreen
// 3. Display city name as heading ☑
// 4. display few days forecast ☑