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
import Weather from './types/Weather'
import WeatherInfo from '@/components/WeatherInfo.vue'
import { getWeatherByLatLon, getWeatherByLocation } from './utils/utils'

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
          getWeatherByLocation(city).then((weather) => {
            if (weather) {
              citiesWeather.value.push(new Weather(weather))
            }
          })
        })
      } else {
        const id = navigator.geolocation.watchPosition(
          (response) => {
            getWeatherByLatLon(
              response.coords.latitude,
              response.coords.longitude
            ).then((weather) => {
              if (weather) {
                citiesWeather.value.push(new Weather(weather))
                navigator.geolocation.clearWatch(id)
              }
            })
          },
          () => {
            fetch('//api.ipify.org?format=json').then((response) => {
              response.json().then(({ ip }) => {
                fetch(`http://ip-api.com/json/${ip}?fields=lat,lon`).then((r) =>
                  r.json().then(({ lat, lon }) => {
                    getWeatherByLatLon(lat, lon).then((weather) => {
                      if (weather) {
                        citiesWeather.value.push(new Weather(weather))
                        navigator.geolocation.clearWatch(id)
                      }
                    })
                  })
                )
              })
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
.app {
  max-width: 680px;
  margin: 0 auto;

  @media (max-width: 700px) {
    max-width: 360px;
  }
}
</style>
