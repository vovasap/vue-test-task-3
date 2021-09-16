export const getWeatherByLocation = async (
  location: string
): Promise<Document | null> => {
  return getWeather(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&mode=xml`
  )
}

export const getWeatherByLatLon = async (
  lat: number,
  lon: number
): Promise<Document | null> => {
  console.log(lat, lon)
  return getWeather(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&mode=xml`
  )
}

const getWeather = async (requestUrl: string): Promise<Document | null> => {
  const response = await fetch(requestUrl)
  if (response.status === 200) {
    return await response
      .text()
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
  } else {
    //TODO handle error
    return new Promise((resolve) => resolve(null))
  }
}
