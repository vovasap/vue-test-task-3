import Xml from '@/helpers/Xml'
import Api from '@/api/Api'

export default class Weather {
  private static get = (requestUrl: string): Promise<Document> => {
    return Api.xml(requestUrl).then((str) => {
      return new window.DOMParser().parseFromString(str, 'text/xml')
    })
  }

  public static getByLocation = async (location: string): Promise<Document> => {
    return Weather.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&mode=xml`
    )
  }

  public static getByLatLon = async (
    lat: number,
    lon: number
  ): Promise<Document> => {
    return Weather.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&mode=xml`
    )
  }

  private weather: Document

  constructor(weather: Document) {
    this.weather = weather
  }

  private getTempFromKelvinToCelcius(kelvinTemp: number) {
    return Math.round(kelvinTemp - 273.15)
  }

  private capitalize(str: string) {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}.`
  }

  public get temp(): number | null {
    const temp = Xml.getAttributeValue(this.weather, 'value', 'temperature')
    return temp ? this.getTempFromKelvinToCelcius(Number(temp)) : null
  }

  public get humidity(): string | null {
    return Xml.getAttributeValue(this.weather, 'value', 'humidity')
  }

  public get city(): string | null {
    return Xml.getAttributeValue(this.weather, 'name', 'city')
  }

  public get country(): string | null {
    return Xml.getTextContent(this.weather, 'country')
  }

  public get id(): number | null {
    const value = Xml.getAttributeValue(this.weather, 'id', 'city')
    return value ? Number(value) : null
  }

  public get location(): string {
    if (this.city) {
      if (this.country) {
        return `${this.city}, ${this.country}`
      }
      return this.city
    } else if (this.country) {
      return this.country
    }
    return ''
  }

  public get weatherIcon(): string | null {
    return Xml.getAttributeValue(this.weather, 'icon', 'weather')
  }

  public get tempDisplay(): string | null {
    return `${this.temp ? this.temp : '? '}°C`
  }

  public get feelsLikeTempDisplay(): string | null {
    const temp = Xml.getAttributeValue(this.weather, 'value', 'feels_like')
    return `${temp ? this.getTempFromKelvinToCelcius(Number(temp)) : '? '}°C`
  }

  public get weatherDescription(): string | null {
    const description = Xml.getAttributeValue(this.weather, 'value', 'weather')
    return description ? this.capitalize(description) : ''
  }

  public get windDescription(): string | null {
    const description = Xml.getAttributeValue(
      this.weather,
      'name',
      'wind',
      'speed'
    )
    return description ? this.capitalize(description) : ''
  }

  public get windDisplay(): string {
    const speed =
      Xml.getAttributeValue(this.weather, 'value', 'wind', 'speed') || '? '
    const unit =
      Xml.getAttributeValue(this.weather, 'unit', 'wind', 'speed') || '? '
    const directionCode =
      Xml.getAttributeValue(this.weather, 'code', 'wind', 'direction') || '? '
    return `${speed}${unit} ${directionCode}`
  }

  public get pressureDisplay(): string {
    const value =
      Xml.getAttributeValue(this.weather, 'value', 'pressure') || '? '
    const unit = Xml.getAttributeValue(this.weather, 'unit', 'pressure') || '? '
    return `${value}${unit}`
  }

  public get humidityDisplay(): string {
    const value = this.humidity || '? '
    const unit = Xml.getAttributeValue(this.weather, 'unit', 'humidity') || '? '
    return `${value}${unit}`
  }

  public get dewPointDisplay(): string {
    if (this.temp && this.humidity) {
      const temp = this.temp
      const humidity = Number(this.humidity)
      const dewPoint = Math.round(
        (235 * (Math.log10(humidity) + (7.45 * temp) / (235 + temp) - 2)) /
          (7.45 - (Math.log10(humidity) + (7.45 * temp) / (235 + temp) - 2))
      )
      return `${dewPoint}°C`
    } else {
      return '?'
    }
  }
  public get visibilityDisplay(): string {
    const distance = Xml.getAttributeValue(this.weather, 'value', 'visibility')
    return `${distance ? Number(distance) / 1000 : '? '}km`
  }
}
