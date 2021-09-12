<template>
  <div class="settings">
    <pre>{{citiesWeather}}</pre>
    <p class="settings_title">Settings</p>
    <label class="settings_input-title" for="location">Add Location:</label>
    <div>
      <input id="location" class="settings_input" type="text" v-model="query">
      <w-button icon="arrow-return-left" @click="addLocation"/>
    </div>
  </div>
</template>

<script lang="ts">
import WButton from '@/components/WButton.vue'
import { ref } from 'vue'

export default {
  name: 'settings',
  components: {
    WButton,
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props: { value: Array<Record<string, any>> }, context: any) {
    const { emit } = context
    const citiesWeather = ref<Array<Record<string,any>>>(props.value)
    const query = ref<string>('pskov')

    const getWeatherByLocation = async (location: string): Promise<Record<string, any>> => {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`)
      if (response.status === 200) {
        return await response.json()
      } else {
        //TODO handle error
        return new Promise(resolve => resolve({}))
      }
    }

    const addLocation = (): void => {
      getWeatherByLocation(query.value).then(weather => {
        citiesWeather.value.push(weather)
        emit('input', citiesWeather)
        query.value = ''
      })
    }

    return {
      query,
      addLocation,
      citiesWeather,
    }
  }
}
</script>
<style lang="scss">
.settings{
 max-width: 320px;

  &_title, &_input-title {
   font-weight: 700;
  }

  &_input {
   padding: 4px;
  }
}
</style>