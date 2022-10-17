<template>
  <div class="flex flex-col items-center">
    <div
      class="flex items-center justify-center bg-cowgirl-blue dark:bg-bianchi-green
      rounded-full mb-12 md:mb-24"
      :style="`width: ${circleSize}px; height: ${circleSize}px`"
    >
      <span class="text-white font-bold" :style="`font-size: ${titleSize}px`">{{ title }}</span>
    </div>

    <p class="text-cowgirl-blue dark:text-bianchi-green text-sm md:text-lg font-bold text-center">{{ desc }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CircleInfo',

  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },

    desc: {
      type: String as PropType<string>,
      required: true
    },

    titleSize: {
      type: String as PropType<string>,
      required: true
    },

    circleSize: {
      type: String as PropType<string>,
      required: true
    }
  }
})
</script>
