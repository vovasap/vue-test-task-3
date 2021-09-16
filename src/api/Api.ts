export default class Api {
  public static async json(requestUrl: string): Promise<any> {
    return await fetch(requestUrl).then((resp) => {
      if (resp.status !== 200) {
        // logging
      }
      return resp.json()
    })
  }

  public static async xml(requestUrl: string): Promise<any> {
    return await fetch(requestUrl).then((resp) => {
      if (!resp.ok) {
        // logging
      }
      return resp.text()
    })
  }
}
