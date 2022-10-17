
<template>
  <div class="flex flex-grow items-center justify-center" :class="color">
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AppNoData',

  props: {
    title: {
      type: String as PropType<string>,
      default: 'No data available'
    },

    color: {
      type: String as PropType<string>,
      default: 'text-nile-blue dark:text-let-it-snow'
    }
  }
})
</script>
