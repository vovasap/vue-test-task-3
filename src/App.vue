<template>
  <settings v-model="citiesWeather"/>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import Settings from "@/components/Settings.vue";

export default defineComponent({
  name: 'App',
  components: {
    Settings,
  },
  setup() {
    const citiesWeather = ref<Array<Record<string, any>>>([])

    return {
      citiesWeather
    }
  }
})
</script>