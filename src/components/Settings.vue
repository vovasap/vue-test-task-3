<template>
  <div class="settings">
    <!-- <pre>{{ citiesWeather }}</pre> -->
    <settings-item
      v-for="(cityWeather, index) in citiesWeather"
      :cityWeather="cityWeather"
      :index="index"
      @deleteItem="deleteItem"
      @onDragStart="onDragStart"
      @onDragOver="onDragOver"
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
import { PropType, ref } from 'vue'
import { getWeather } from '@/utils/utils'
import { TCityWeather } from '@/types/global'

export default {
  name: 'settings',
  components: {
    WButton,
    SettingsItem,
  },
  props: {
    value: {
      type: Array as PropType<Array<TCityWeather>>,
      default: () => [],
    },
  },
  setup(props: any, context: any) {
    const { emit } = context
    const citiesWeather = ref<Array<TCityWeather>>(props.value)
    const query = ref<string>('pskov')

    const setValue = (): void => {
      emit('input', citiesWeather.value)
    }

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
          citiesWeather.value.push(getWeather(weather))
          setValue()
          query.value = ''
        }
      })
    }

    const deleteItem = (id: number): void => {
      citiesWeather.value = citiesWeather.value.filter((city) => city.id !== id)
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

    return {
      query,
      addLocation,
      citiesWeather,
      deleteItem,
      onDragStart,
      onDragOver,
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
