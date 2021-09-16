<template>
  <button class="w-button" :disabled="disabled">
    <img
      :style="{ width: `${size}px` }"
      class="w-button__icon"
      :src="require(`../assets/svg/${icon}.svg`).default"
      :alt="icon"
    />
    <slot />
  </button>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'w-button',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 20,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
<style lang="scss">
.w-button {
  padding: 4px;

  background: transparent;
  border: none;
  cursor: pointer;
  &__icon {
    vertical-align: middle;
  }
}
</style>
