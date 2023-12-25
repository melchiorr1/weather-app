import render from './render'

async function fetchData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=c88ee6341e504c69a49151119212606&q=${location}&aqi=no`, { mode: "cors" })
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
  return{
    icon: data.current.condition.icon,
    text: data.current.condition.text,
    temp: data.current.temp_c,
    location: data.location.name
  }
}

const jsonData = await fetchData("Wadowice");
const parsedJson = parseJson(jsonData)
const weatherDiv = document.querySelector('.content')
render(parsedJson, weatherDiv)