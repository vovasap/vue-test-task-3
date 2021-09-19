<template>
  <div class="app">
    <weather-info
      v-if="displayWeatherInfo"
      :cities-weather="citiesWeather"
      @toggleDisplay="toggleDisplay"
    />
    <settings
      v-else
      v-model:cities-weather="citiesWeather"
      @toggleDisplay="toggleDisplay"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import Settings from '@/components/Settings.vue'
import Weather from '@/types/Weather'
import WeatherInfo from '@/components/WeatherInfo.vue'
import Api from './api/Api'

export default defineComponent({
  name: 'app',
  components: {
    WeatherInfo,
    Settings,
  },
  setup() {
    const displayWeatherInfo = ref<boolean>(true)
    const citiesWeather = ref<Array<Weather>>([])
    const toggleDisplay = (): void => {
      displayWeatherInfo.value = !displayWeatherInfo.value
    }

    onBeforeMount(() => {
      const cities: Array<string> = JSON.parse(
        window.localStorage.getItem('cities') || '[]'
      )

      if (cities.length) {
        cities.forEach((city) => {
          Weather.getByLocation(city).then((weather) => {
            if (weather) {
              citiesWeather.value.push(new Weather(weather))
            }
          })
        })
      } else {
        const id = navigator.geolocation.watchPosition(
          (response) => {
            Weather.getByLatLon(
              response.coords.latitude,
              response.coords.longitude
            ).then((weather) => {
              if (weather) {
                citiesWeather.value.push(new Weather(weather))
                navigator.geolocation.clearWatch(id)
              } else {
                // error handling
              }
            })
          },
          () => {
            Api.json('http://api.ipify.org?format=json').then(({ ip }) => {
              Api.json(`http://ip-api.com/json/${ip}?fields=lat,lon`).then(
                ({ lat, lon }) => {
                  Weather.getByLatLon(lat, lon).then((weather) => {
                    if (weather.getElementsByTagName('current')[0]) {
                      citiesWeather.value.push(new Weather(weather))
                    } else {
                      // error handling
                    }
                  })
                }
              )
            })
          }
        )
      }
    })

    return {
      citiesWeather,
      toggleDisplay,
      displayWeatherInfo,
    }
  },
})
</script>
<style lang="scss">
@import './assets/scss/main.scss';
</style>
