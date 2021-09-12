<template>
  <div class="settings-item">
    <w-button icon="list" size="18" />
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
  },
  setup(props: any, context: any) {
    const { emit } = context
    const deleteItem = (): void => {
      emit('deleteItem', props.id)
    }

    return {
      deleteItem,
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
