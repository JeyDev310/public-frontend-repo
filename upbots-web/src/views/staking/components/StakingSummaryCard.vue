<template>
  <div
    class="
    staking__summary-card
    flex
    flex-col
    flex-grow
    items-center
    justify-center
    h-auto
    border-b
    border-misty-mountains
    dark:border-chambray
    md:border-r
    md:border-b-0
    last:border-none
    md:px-20
    pb-20
    px-20"
  >
    <span class="text-lucid-blue dark:text-soaring-eagle font-medium text-base text-center">
      {{ data?.title }}
    </span>

    <span
      class="
      text-beguiling-blue
      dark:text-cloudless
      font-semibold
      text-2xl
      md:text-xl
      lg:text-3xl
      mt-10
      flex
      justify-center
      items-center"
    >
      {{ getValue }}
      <span
        v-if="data.usdValue >= 0"
        class="
        text-beguiling-blue
        dark
        font-semibold
        text-base
        ml-8"
      >
        ${{ data.usdValue }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { IStakingSummary } from '@/types'
import { formatNumber } from '@/core/helpers'

export default defineComponent({
  name: 'StakingSummaryCard',

  props: {
    data: {
      type: Object as PropType<IStakingSummary>,
      required: true
    }
  },

  setup (props) {
    const getValue = computed(() => {
      if (props.data.value != null) {
        if (typeof props.data.value !== 'number') return props.data.value
        else if (props.data.type === 'currency') return `$${formatNumber(props.data.value)}`
        else if (props.data.type === 'percent') return `${formatNumber(props.data.value)}%`
        return `${formatNumber(props.data.value)}`
      } else {
        return 'N/A'
      }
    })

    return { getValue }
  }
})
</script>

<style lang="scss" scoped>
.staking {
  &__summary-card {
    @media(min-width: 768px) {
      height: 100px;
    }
  }
}
</style>
