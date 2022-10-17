<template>
  <div class="flex flex-col flex-grow text-nile-blue dark:text-white">
    <h2 class="mb-20 text-xl font-semibold">Colors:</h2>

    <div class="grid grid-cols-2 gap-40 flex-grow">
      <div
        v-for="{name, value} in colors"
        :key="value"
        class="grid grid-cols-2 gap-x-20"
      >
        <div class="flex flex-col">
          <pre class="mb-10">text-{{ name }}</pre>
          <pre>bg-{{ name }}</pre>
        </div>

        <div :style="{ backgroundColor: value }" class="flex items-center justify-center">
          <span :style="{ 'mix-blend-mode': 'difference' }">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TIndexedObject, TIndexedArray } from '@/types'

export default defineComponent({
  name: 'PgColors',

  props: {
    tailwind: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const colors = ref<TIndexedArray<TIndexedObject<string>>>([])

    function parseColors (config: TIndexedObject<string>) {
      return Object.entries(config).map(([name, value]) => {
        if (typeof value === 'string') {
          return { name, value }
        } else {
          return Object.entries(value).map(([nestedName, nestedValue]) => {
            return { name: `${name}-${nestedName}`, value: nestedValue }
          })
        }
      }).flat()
    }

    colors.value = parseColors(props.tailwind.colors)

    return {
      colors
    }
  }
})
</script>
