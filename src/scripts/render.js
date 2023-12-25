import '../style.sass'

export default function createWeatherBox(weatherInfo, div){
    const weatherBox = document.createElement('div')
    weatherBox.classList.add('weather-box')

    const weatherLocation = document.createElement('span')
    weatherLocation.textContent = weatherInfo.location
    weatherLocation.classList.add('weather-location')
    weatherBox.appendChild(weatherLocation)

    const weatherIcon = document.createElement('img')
    weatherIcon.src = weatherInfo.icon
    weatherIcon.classList.add('weather-icon')
    weatherBox.appendChild(weatherIcon)

    const weatherTemp = document.createElement('span')
    weatherTemp.textContent = `${weatherInfo.temp}°C`
    weatherTemp.classList.add('weather-temp')
    weatherBox.appendChild(weatherTemp)

    const weatherDescription = document.createElement('span')
    weatherDescription.textContent = weatherInfo.text
    weatherDescription.classList.add('weather-description')
    weatherBox.appendChild(weatherDescription)

    div.appendChild(weatherBox)
    return weatherBox
}