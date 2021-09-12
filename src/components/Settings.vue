<template>
  <div class="settings">
    <!-- <pre>{{ citiesWeather }}</pre> -->
    <settings-item
      v-for="cityWeather in citiesWeather"
      :city="cityWeather.name"
      :country="cityWeather.sys.country"
      :id="cityWeather.id"
      @deleteItem="deleteItem"
      :key="cityWeather.id"
    />
    <p class="settings__title">Settings</p>
    <label class="settings__input-title" for="location">Add Location:</label>
    <div>
      <input
        id="location"
        class="settings__input"
        type="text"
        v-model="query"
      />
      <w-button icon="arrow-return-left" @click="addLocation" />
    </div>
  </div>
</template>

<script lang="ts">
import WButton from '@/components/WButton.vue'
import SettingsItem from '@/components/SettingsItem.vue'
import { ref } from 'vue'

export default {
  name: 'settings',
  components: {
    WButton,
    SettingsItem,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: any, context: any) {
    const { emit } = context
    const citiesWeather = ref<Array<Record<string, any>>>(props.value)
    const query = ref<string>('pskov')

    const getWeatherByLocation = async (
      location: string
    ): Promise<Record<string, any> | null> => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`
      )
      if (response.status === 200) {
        return await response.json()
      } else {
        //TODO handle error
        return new Promise((resolve) => resolve(null))
      }
    }

    const addLocation = (): void => {
      getWeatherByLocation(query.value).then((weather) => {
        if (weather) {
          citiesWeather.value.push(weather)
          emit('input', citiesWeather.value)
          query.value = ''
        }
      })
    }

    const deleteItem = (id: number): void => {
      citiesWeather.value = citiesWeather.value.filter((city) => city.id !== id)
      emit('input', citiesWeather.value)
    }

    return {
      query,
      addLocation,
      citiesWeather,
      deleteItem,
    }
  },
}
</script>
<style lang="scss">
.settings {
  max-width: 320px;

  &__title,
  &__input-title {
    font-weight: 700;
  }

  &__input {
    padding: 4px;
  }
}
</style>
