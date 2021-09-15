export const getWeatherByLocation = async (
  location: string
): Promise<Document | null> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&mode=xml`
  )
  if (response.status === 200) {
    return await response
      .text()
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
  } else {
    //TODO handle error
    return new Promise((resolve) => resolve(null))
  }
}
