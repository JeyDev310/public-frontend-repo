<template>
  <div
    class="grid items-center justify-between flex-shrink-0 gap-x-10 md:gap-x-20 mb-10"
    :class="getGridClasses"
  >
    <div
      v-for="(item, index) in labels"
      :key="index"
      class="flex"
      :class="[
        {'justify-center': index === 1},
        {'justify-end': index === 2}
      ]"
    >
      <span class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue'

export default defineComponent({
  name: 'TradeFilterBarPairLabels',

  setup () {
    /* INJECT VALUES */
    const showLastPrice = inject('showLastPrice') as Ref<boolean>
    const showChange = inject('showChange') as Ref<boolean>

    const labels = computed((): string[] => {
      if (!showLastPrice.value && !showChange.value) {
        return ['Pair']
      } else if (showLastPrice.value && !showChange.value) {
        return ['Pair', 'Last Price']
      } else if (showChange.value && !showLastPrice.value) {
        return ['Pair', 'Change']
      } else {
        return ['Pair', 'Last Price', 'Change']
      }
    })

    const getGridClasses = computed((): string => {
      if (!showLastPrice.value && !showChange.value) {
        return 'grid-cols-1'
      } else if ((showLastPrice.value && !showChange.value) || (showChange.value && !showLastPrice.value)) {
        return 'grid-cols-2'
      } else {
        return 'grid-cols-3'
      }
    })

    return { labels, getGridClasses }
  }
})
</script>
