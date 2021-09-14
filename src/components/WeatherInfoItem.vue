<template>
  <div>
    <h2>
      {{ cityWeather.location }}
    </h2>
    <div>
      <img
        :src="`http://openweathermap.org/img/wn/${cityWeather.weatherIcon}@2x.png`"
        :alt="cityWeather.weatherDescription"
      />
      <p>{{ cityWeather.tempDisplay }}</p>
    </div>
    <p>
      Feels like {{ cityWeather.feelsLikeTempDisplay }}.
      {{ cityWeather.weatherDescription }}
      {{ cityWeather.windDescription }}
    </p>
    <div>
      <div>
        {{ cityWeather.windDisplay }}
      </div>
      <div>
        {{ cityWeather.pressureDisplay }}
      </div>
      <div>Humidity: {{ cityWeather.humidityDisplay }}</div>
      <div>Dew point: {{ cityWeather.dewPointDisplay }}</div>
      <div>Visibility: {{ cityWeather.visibilityDisplay }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Weather from '@/types/Weather'
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'weather-info-item',
  props: {
    cityWeather: {
      type: Object as PropType<Weather>,
      required: true,
    },
  },
})
</script>
