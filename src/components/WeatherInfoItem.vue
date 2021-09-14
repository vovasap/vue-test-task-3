<template>
  <div class="weather-info-item">
    <h2 class="weather-info-item__location">
      {{ cityWeather.location }}
    </h2>
    <div class="weather-info-item__main-info">
      <div class="weather-info-item__weather-icon">
        <img
          :src="`http://openweathermap.org/img/wn/${cityWeather.weatherIcon}@2x.png`"
          :alt="cityWeather.weatherDescription"
        />
      </div>
      <p class="weather-info-item__temp">{{ cityWeather.tempDisplay }}</p>
    </div>
    <p>
      Feels like {{ cityWeather.feelsLikeTempDisplay }}.
      {{ cityWeather.weatherDescription }}
      {{ cityWeather.windDescription }}
    </p>
    <div class="weather-info-item__additional-info">
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
<style lang="scss">
.weather-info-item {
  padding: 10px;

  &__location {
    margin-bottom: 0;

    font-weight: 700;
    font-size: 16px;
  }

  &__main-info {
    display: flex;
    justify-content: space-evenly;

    font-size: 36px;
  }

  &__additional-info {
    display: grid;
    grid-template-columns: 1fr 1fr;

    & div {
      padding: 5px 0;
      margin: auto;
    }
  }
}
</style>
