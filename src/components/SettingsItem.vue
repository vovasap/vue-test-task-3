<template>
  <div class="settings-item" @dragover="onDragOver">
    <div draggable="true" @dragstart="onDragStart($event, index)">
      <w-button icon="list" size="18" />
    </div>
    <span class="settings-item__title">{{
      `${cityWeather.city}, ${cityWeather.country}`
    }}</span>
    <w-button icon="trash" size="16" @click="deleteItem" />
  </div>
</template>
<script lang="ts">
import WButton from './WButton.vue'
import { PropType } from 'vue'
import Weather from '@/types/Weather'

export default {
  components: {
    WButton,
  },
  props: {
    cityWeather: {
      type: Object as PropType<Weather>,

      required: true,
    },
    index: {
      type: Number,
    },
  },
  setup(props: any, context: any) {
    const { emit } = context
    const deleteItem = (): void => {
      emit('deleteItem', props.cityWeather.id)
    }

    const onDragStart = (e: any, index: number): void => {
      emit('onDragStart', { e, index })
    }

    const onDragOver = (): void => {
      emit('onDragOver', props.index)
    }

    return {
      deleteItem,
      onDragStart,
      onDragOver,
    }
  },
}
</script>
<style lang="scss">
.settings-item {
  display: flex;
  align-items: center;
  max-width: 360px;
  margin-bottom: 8px;
  padding: 2px;

  background: #ccb;

  &__title {
    flex: 1 0 auto;
  }
}
</style>
