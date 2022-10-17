<template>
  <div class="flex items-center px-20 3xl:px-30">
    <div
      v-for="(item, index) in labels"
      :key="index"
      class="text-blue-chill font-medium dark:text-blair 4xl:text-lg pr-10"
      :class="[`swap-table__col-${index + 1}`]"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SwapTableLabel',

  props: {
    labels: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>
