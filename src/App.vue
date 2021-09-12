<template>
  <div v-if="displayWeatherInfo">weather info</div>
  <settings v-else v-model="citiesWeather" @toggleDisplay="toggleDisplay" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Settings from '@/components/Settings.vue'
import { TCityWeather } from './types/global'

export default defineComponent({
  name: 'App',
  components: {
    Settings,
  },
  setup() {
    const displayWeatherInfo = ref<boolean>(false)
    const citiesWeather = ref<Array<TCityWeather>>([])
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
