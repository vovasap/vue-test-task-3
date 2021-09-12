<template>
  <div class="settings-item" @dragover="onDragOver">
    <div draggable="true" @dragstart="onDragStart($event, index)">
      <w-button icon="list" size="18" />
    </div>
    <span class="settings-item__title">{{ `${city}, ${country}` }}</span>
    <w-button icon="trash" size="16" @click="deleteItem" />
  </div>
</template>
<script lang="ts">
import WButton from './WButton.vue'

export default {
  components: {
    WButton,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  setup(props: any, context: any) {
    const { emit } = context
    const deleteItem = (): void => {
      emit('deleteItem', props.id)
    }

    const onDragStart = (e: any, index: number) => {
      emit('onDragStart', { e, index })
    }

    const onDragOver = () => {
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
  margin-bottom: 4px;
  padding: 2px;

  background: #ccb;

  &__title {
    flex: 1 0 auto;
  }
}
</style>
