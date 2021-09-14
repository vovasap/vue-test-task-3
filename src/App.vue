<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Settings from '@/components/Settings.vue'
import Weather from './types/Weather'
import WeatherInfo from '@/components/WeatherInfo.vue'

export default defineComponent({
  name: 'app',
  components: {
    WeatherInfo,
    Settings,
  },
  setup() {
    const displayWeatherInfo = ref<boolean>(false)
    const citiesWeather = ref<Array<Weather>>([])
    const toggleDisplay = () => {
      displayWeatherInfo.value = !displayWeatherInfo.value
    }

    return {
      citiesWeather,
      toggleDisplay,
      displayWeatherInfo,
    }
  },
})
</script>
