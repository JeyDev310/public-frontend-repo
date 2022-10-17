<template>
  <div class="grid grid-cols-3 gap-x-10 flex-shrink-0 mb-8">
    <span
      v-for="(label, index) in tradeHistoryLabels"
      :key="index"
      class="text-beguiling-blue dark:text-blair font-medium text-sm"
    >
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TradeHisotryLabels',

  setup () {
    const tradeHistoryLabels: string[] = ['Time', 'Price', 'Size']

    return { tradeHistoryLabels }
  }
})
</script>
