import Xml from '@/helpers/Xml'

export default class Weather {
  private weather: Document

  constructor(weather: Document) {
    this.weather = weather
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
}
