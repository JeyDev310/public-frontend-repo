<template>
  <div class="grid grid-cols-3 gap-x-10 flex-shrink-0 mb-8">
    <span
      v-for="(label, index) in orderBookLabels"
      :key="index"
      class="text-beguiling-blue dark:text-blair font-medium text-base md:text-sm 3xl:text-base"
    >
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OrderBookLabels',

  setup () {
    const orderBookLabels: string[] = ['Amount', 'Total', 'Price']

    return { orderBookLabels }
  }
})
</script>
