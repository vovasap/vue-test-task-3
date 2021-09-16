import Api from '@/api/Api'

export const getWeatherByLocation = async (
  location: string
): Promise<Document> => {
  return getWeather(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&mode=xml`
  )
}

export const getWeatherByLatLon = async (
  lat: number,
  lon: number
): Promise<Document> => {
  return getWeather(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&mode=xml`
  )
}

const getWeather = (requestUrl: string): Promise<Document> => {
  return Api.xml(requestUrl).then((str) => {
    return new window.DOMParser().parseFromString(str, 'text/xml')
  })
}
