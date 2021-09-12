import { TCityWeather } from '@/types/global'

export const getWeather = (weather: any): TCityWeather => {
  return {
    city: weather.name,
    country: weather.sys.country,
    id: weather.id,
  }
}
