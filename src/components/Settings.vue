<template>
  <div class="settings">
    <div class="settings__header">
      <p class="settings__title">Settings</p>
      <w-button icon="x" @click="close" />
    </div>
    <settings-item
      v-for="(cityWeather, index) in citiesWeather"
      :cityWeather="cityWeather"
      :index="index"
      @deleteItem="deleteItem"
      @onDragStart="onDragStart"
      @onDragOver="onDragOver"
      :key="cityWeather.id"
    />
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
import { PropType, ref } from 'vue'
import Weather from '@/types/Weather'

export default {
  name: 'settings',
  components: {
    WButton,
    SettingsItem,
  },
  props: {
    citiesWeather: {
      type: Array as PropType<Array<Weather>>,
      default: () => [],
    },
  },
  setup(props: any, context: any) {
    const { emit } = context
    const citiesWeather = ref<Array<Weather>>(props.citiesWeather)
    const query = ref<string>('pskov')

    const setValue = (): void => {
      emit('update:citiesWeather', citiesWeather.value)
    }

    const getWeatherByLocation = async (
      location: string
    ): Promise<Document | null> => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&mode=xml`
      )
      if (response.status === 200) {
        return await response
          .text()
          .then((str) =>
            new window.DOMParser().parseFromString(str, 'text/xml')
          )
      } else {
        //TODO handle error
        return new Promise((resolve) => resolve(null))
      }
    }

    const addLocation = (): void => {
      getWeatherByLocation(query.value).then((weather) => {
        if (weather) {
          citiesWeather.value.push(new Weather(weather))
          setValue()
          query.value = ''
        }
      })
    }

    const deleteItem = (id: number): void => {
      citiesWeather.value = citiesWeather.value.filter(
        (cityWeather) => cityWeather.id !== id
      )
      setValue()
    }

    let draggedItemIndex: number | null = null
    let draggedItem: any = null

    const onDragStart = ({ e, index }: any) => {
      draggedItemIndex = index
      if (draggedItemIndex !== null) {
        draggedItem = citiesWeather.value[draggedItemIndex]
      }
      const target = e.target.closest('.settings-item')
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', target)
      e.dataTransfer.setDragImage(target, 20, 20)
    }

    const onDragOver = (index: any) => {
      if (draggedItem === citiesWeather.value[index]) {
        return
      }

      citiesWeather.value = citiesWeather.value.filter(
        (item) => item !== draggedItem
      )
      citiesWeather.value.splice(index, 0, draggedItem)

      setValue()
    }

    const close = () => {
      emit('toggleDisplay')
    }

    return {
      query,
      addLocation,
      citiesWeather,
      deleteItem,
      onDragStart,
      onDragOver,
      close,
    }
  },
}
</script>
<style lang="scss">
.settings {
  max-width: 320px;

  &__header {
    display: flex;
  }

  &__title {
    flex: 1 0 auto;

    font-weight: 700;
  }

  &__input-title {
    font-weight: 700;
  }

  &__input {
    padding: 4px;
  }
}
</style>
