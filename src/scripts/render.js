import '../style.sass'

function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, {weekday: 'long'});
  }
      

function renderWeatherBox(weatherInfos, div){
    weatherInfos.forEach((weatherInfo) => {
        const weatherBox = document.createElement('div')
        weatherBox.classList.add('weather-box')

        const weatherIcon = document.createElement('img')
        weatherIcon.src = weatherInfo.icon
        weatherIcon.classList.add('weather-icon')
        weatherBox.appendChild(weatherIcon)

        const weatherTemp = document.createElement('span')
        weatherTemp.textContent = `${Math.round(weatherInfo.temp)}°C`
        weatherTemp.classList.add('weather-temp')
        weatherBox.appendChild(weatherTemp)

        const weatherDescription = document.createElement('span')
        weatherDescription.textContent = weatherInfo.text
        weatherDescription.classList.add('weather-description')
        weatherBox.appendChild(weatherDescription)

        const weatherDate = document.createElement('span')
        weatherDate.textContent = getDayName(new Date(weatherInfo.date))
        weatherDate.classList.add('weather-date')
        weatherBox.appendChild(weatherDate)

        div.appendChild(weatherBox)
    });
}

function renderHeading(location, div){
    const heading = document.createElement('h1')
    heading.classList.add('heading')
    heading.textContent = location
    div.parentNode.insertBefore(heading, div)
}

function renderError(error){
    const errorSpan = document.createElement('span')
    errorSpan.classList.add('error')
    errorSpan.textContent = error
    document.body.appendChild(errorSpan)
}

export { renderWeatherBox, renderHeading, renderError }