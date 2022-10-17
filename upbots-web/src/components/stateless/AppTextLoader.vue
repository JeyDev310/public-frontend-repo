<template>
  <div class="text-loading">
    {{ text }}
    <span class="text-loading__dot">.</span>
    <span class="text-loading__dot">.</span>
    <span class="text-loading__dot">.</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AppTextLoader',

  props: {
    text: {
      type: String as PropType<string>,
      default: 'Loading'
    }
  }
})
</script>

<style lang="scss" scoped>
.text-loading {
  &__dot {
    animation-name: blinkdot;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;

    &:nth-child(2) {
      animation-delay: .2s;
    }

    &:nth-child(3) {
      animation-delay: .4s;
    }
  }
}
</style>

<style lang="scss">
@keyframes blinkdot {
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
}
</style>
