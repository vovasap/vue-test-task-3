export default class Xml {
  public static getAttributeValue(
    document: Document | Element,
    attribute: string,
    ...tags: Array<string>
  ): string | null {
    if (tags.length === 1) {
      return document.getElementsByTagName(tags[0])[0].getAttribute(attribute)
    }
    return Xml.getAttributeValue(
      document.getElementsByTagName(tags[0])[0],
      attribute,
      ...tags.slice(1)
    )
  }

  public static getTextContent(
    document: Document | Element,
    ...tags: Array<string>
  ): string | null {
    if (tags.length === 1) {
      return document.getElementsByTagName(tags[0])[0].textContent
    }
    return Xml.getTextContent(
      document.getElementsByTagName(tags[0])[0],
      ...tags.slice(1)
    )
  }
}
