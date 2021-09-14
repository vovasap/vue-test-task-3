<template>
  <div class="weather-info">
    <w-button
      class="weather-info__gear"
      icon="gear"
      @click="$emit('toggleDisplay')"
    />
    <weather-info-item
      v-for="cityWeather in citiesWeather"
      class="weather-info__item"
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
<style lang="scss">
.weather-info {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  &__item {
    width: 320px;
  }

  &__gear {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
