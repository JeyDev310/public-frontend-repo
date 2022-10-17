<template>
  <!-- TODO shadow-200 dark:shadow-100 -->
  <div class="card" :class="[isDefaultBackground && [isDarkMode ? 'is-dark' : 'bg-white'], rounded]">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppCard',

  props: {
    rounded: {
      type: String as PropType<string>,
      default: 'rounded-xlg'
    },

    isDefaultBackground: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  setup () {
    const { isDarkMode } = useGlobal()

    return { isDarkMode }
  }
})
</script>

<style lang="scss" scoped>
.card {
  &.is-dark {
    background: linear-gradient(128.47deg, #41536D 21.26%, rgba(45, 59, 80, 0.56) 78.06%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
  }
}
</style>
