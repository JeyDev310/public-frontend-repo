<template>
  <div class="grid grid-cols-3 gap-x-10 flex-shrink-0 mb-8">
    <span
      v-for="(label, index) in getLabels"
      :key="index"
      class="text-beguiling-blue dark:text-blair font-medium text-base md:text-sm 3xl:text-base"
    >
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BalanceLabels',

  props: {
    currency: {
      type: String as PropType<string>,
      default: 'N/A'
    }
  },

  setup (props) {
    const getLabels = computed((): string[] => ['Coin', 'Amount', `${props.currency?.toUpperCase()} Value`])

    return { getLabels }
  }
})
</script>
