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
    <div class="settings__input-form">
      <input
        id="location"
        class="settings__input"
        v-model="query"
        type="text"
        placeholder="City name"
      />
      <w-button
        icon="arrow-return-left"
        @click="addLocation"
        :disabled="isLoading"
      />
    </div>
    <small class="settings__validation">{{ validationMessage }}</small>
  </div>
</template>

<script lang="ts">
import WButton from '@/components/WButton.vue'
import SettingsItem from '@/components/SettingsItem.vue'
import { PropType, ref } from 'vue'
import Weather from '@/types/Weather'
import { getWeatherByLocation } from '@/utils/utils'

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
    const query = ref<string>('')
    const validationMessage = ref<string | null>(null)
    const isLoading = ref<boolean>(false)

    const setValue = (): void => {
      window.localStorage.setItem(
        'cities',
        JSON.stringify(citiesWeather.value.map((city) => city.city))
      )
      emit('update:citiesWeather', citiesWeather.value)
    }

    const addLocation = (): void => {
      isLoading.value = true
      getWeatherByLocation(query.value)
        .then((weather) => {
          if (weather.getElementsByTagName('current')[0]) {
            citiesWeather.value.push(new Weather(weather))
            setValue()
            query.value = ''
            validationMessage.value = null
          } else {
            validationMessage.value =
              weather.getElementsByTagName('message')[0].textContent
          }
        })
        .finally(() => (isLoading.value = false))
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
      validationMessage,
      isLoading,
    }
  },
}
</script>
<style lang="scss">
.settings {
  width: min-content;
  margin: 0 auto;

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

  &__input-form {
    display: flex;
    max-width: 360px;
  }

  &__input {
    flex: 1 0 auto;
    padding: 4px;
  }

  &__validation {
    color: red;
  }
}
</style>
