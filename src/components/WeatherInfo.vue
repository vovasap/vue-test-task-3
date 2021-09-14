<template>
  {{ citiesWeather }}
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Weather from '@/types/Weather'

export default defineComponent({
  name: 'weather-info',
  props: {
    citiesWeather: {
      type: Array as PropType<Array<Weather>>,
      required: true,
    },
  },
  setup() {},
})
</script>
