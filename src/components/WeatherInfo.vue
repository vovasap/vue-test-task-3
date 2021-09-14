<template>
  <div>
    <w-button icon="gear" @click="$emit('toggleDisplay')" />
    <weather-info-item
      v-for="cityWeather in citiesWeather"
      :city-weather="cityWeather"
      :key="cityWeather.id"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Weather from '@/types/Weather'
import WeatherInfoItem from '@/components/WeatherInfoItem.vue'
import WButton from '@/components/WButton.vue'

export default defineComponent({
  name: 'weather-info',
  components: {
    WeatherInfoItem,
    WButton,
  },
  props: {
    citiesWeather: {
      type: Array as PropType<Array<Weather>>,
      required: true,
    },
  },
})
</script>
