<template>
  <weather-info-item
    v-for="cityWeather in citiesWeather"
    :city-weather="cityWeather"
    :key="cityWeather.id"
  />
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Weather from '@/types/Weather'
import WeatherInfoItem from '@/components/WeatherInfoItem.vue'

export default defineComponent({
  name: 'weather-info',
  components: {
    WeatherInfoItem,
  },
  props: {
    citiesWeather: {
      type: Array as PropType<Array<Weather>>,
      required: true,
    },
  },
  setup() {},
})
</script>
