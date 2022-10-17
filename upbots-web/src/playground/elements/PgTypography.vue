<template>
  <div class="playground-typography-container w-full text-nile-blue dark:text-white">
    <div class="flex flex-col mb-40">
      <p class="mb-20 text-lg font-medium">Font Family:</p>

      <div class="grid grid-rows-1 gap-y-20">
        <div v-for="(title, index) in tailwindFontFamily" :key="index" class="grid grid-cols-2 gap-x-20">
          <pre>font-{{ title[0] }}</pre>
          <span>{{ title[1][0] }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <p class="mb-20 text-lg font-medium">Font Weight:</p>

      <div class="grid grid-rows-1 gap-y-20">
        <div v-for="(title, index) in tailwindFontWeight" :key="index" class="grid grid-cols-2 gap-x-20">
          <pre>font-{{ title[0] }}</pre>
          <span>{{ title[1] }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <p class="mb-20 text-lg font-medium">Font Size:</p>

      <div class="grid grid-rows-1 gap-y-20">
        <div v-for="(title, index) in tailwindFontSize" :key="index" class="grid grid-cols-2 gap-x-20">
          <pre>font-{{ title[0] }}</pre>
          <span>{{ title[1] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'PgTypography',

  props: {
    tailwind: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const fontWeights = ref([
      { title: 'Normal', value: 'font-normal' },
      { title: 'Medium', value: 'font-medium' },
      { title: 'Semibold', value: 'font-semibold' },
      { title: 'Bold', value: 'font-bold' },
      { title: 'Extrabold', value: 'font-extrabold' }
    ])

    const tailwindFontWeight = computed(() => {
      return Object.entries(props.tailwind.fontWeight)
    })

    const tailwindFontFamily = computed(() => {
      return Object.entries(props.tailwind.fontFamily)
    })

    const tailwindFontSize = computed(() => {
      return Object.entries(props.tailwind.fontSize)
    })

    return { fontWeights, tailwindFontWeight, tailwindFontFamily, tailwindFontSize }
  }
})
</script>

<style scoped>
.playground-typography-container {
  max-width: 500px;
}
</style>
