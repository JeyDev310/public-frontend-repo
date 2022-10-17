<template>
  <AppCard
    class="ubxt-bridge-tooltip__card w-full px-20 md:px-20 3xl:px-40 py-20 md:py-20 3xl:py-30"
    :class="isDarkMode ? 'ubxt-bridge-tooltip__card--dark' : 'ubxt-bridge-tooltip__card--light' "
  >
    <!-- HEADER -->
    <div
      class="
      flex
      items-center
      justify-between
      text-beguiling-blue
      dark:text-white
      uppercase
      mb-20
      md:mb-30
      3xl:mb-40
      space-x-10
      "
    >
      <div class="text-md 3xl:text-xl font-medium">UBXT</div>
      <div class="flex items-center space-x-10 space-x-5 4xl:space-x-20">
        <div class="relative h-24 w-24 md:h-36 4xl:h-50 md:w-36 4xl:w-50 rounded-full">
          <img src="/img/cryptocoins/ubxt.svg" alt="ubxt" class="w-full h-full">
          <img
            :src="`/img/cryptocoins/${srcChainName}.svg`"
            :alt="srcChainName"
            class="
            absolute
            -bottom-5
            -right-5
            4xl:-bottom-8
            4xl:-right-8
            w-18
            md:w-20
            4xl:w-28
            h-18
            md:h-20
            4xl:h-28
            bg-white
            border
            border-blue-haze
            rounded-full
            "
          >
        </div>

        <AppIcon name="arrow-long" :size="!is4XL ? '30' : '20'" class="transform rotate-180" />

        <div class="relative h-24 w-24 md:h-36 4xl:h-50 md:w-36 4xl:w-50 rounded-full">
          <img src="/img/cryptocoins/ubxt.svg" alt="ubxt" class="w-full h-full">
          <img
            :src="`/img/cryptocoins/${dstChainName}.svg`"
            :alt="dstChainName"
            class="
              absolute
              -bottom-5
              -right-5
              4xl:-bottom-8
              4xl:-right-8
              w-18
              md:w-20
              4xl:w-28
              h-18
              md:h-20
              4xl:h-28
              bg-white
              border
              border-blue-haze
              rounded-full
            "
          >
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div v-if="data" class="flex flex-col text-beguiling-blue dark:text-white space-y-14 mb-30 3xl:mb-40">
      <div class="flex justify-between text-sm md:text-base 3xl:text-md 4xl:text-lg">
        <span>Max Swap Amount</span>
        <span>{{ `${getFormattedValue(data.MaximumSwap)} UBXT` }}</span>
      </div>
      <div class="flex justify-between text-sm md:text-base 3xl:text-md 4xl:text-lg">
        <span>Min Swap Amount</span>
        <span>{{ `${getFormattedValue(data.MinimumSwap)} UBXT` }}</span>
      </div>
      <div class="flex justify-between text-sm md:text-base 3xl:text-md 4xl:text-lg">
        <span>Swap Fee</span>
        <span>{{ `${getFormattedValue(data.SwapFeeRate)}%` }}</span>
      </div>
      <div class="flex justify-between text-sm md:text-base 3xl:text-md 4xl:text-lg">
        <span>Max Fee Amount</span>
        <span>{{ `${getFormattedValue(data.MaximumSwapFee)} UBXT` }}</span>
      </div>
      <div class="flex justify-between text-sm md:text-base 3xl:text-md 4xl:text-lg">
        <span>Min Fee Amount</span>
        <span>{{ `${getFormattedValue(data.MinimumSwapFee)} UBXT` }}</span>
      </div>
    </div>

    <!-- FOOTER -->
    <div
      v-if="data"
      class="text-sm md:text-base 4xl:text-lg text-beguiling-blue dark:text-crushed-ice px-20 text-center"
    >
      Deposit > {{ getFormattedValue(data.BigValueThreshold) }} UBXT could take up to 12 hrs
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { formatNumber } from '@/core/helpers'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'UBXTBridgeTooltip',

  props: {
    data: {
      type: Object as PropType<any>,
      require: true
    },

    srcChainName: {
      type: String as PropType<string>,
      require: true
    },

    dstChainName: {
      type: String as PropType<string>,
      require: true
    }
  },

  setup () {
    const { isDarkMode } = useGlobal()
    const { is4XL } = useCustomBreakpoints()

    function getFormattedValue (value: number): string {
      if (!value) {
        if (value === 0) return '0.00'
        return 'N/A'
      }
      return formatNumber(Number(value))
    }

    return { is4XL, isDarkMode, getFormattedValue }
  }
})
</script>

<style lang="scss" scoped>
.ubxt-bridge-tooltip {
  &__card {

    &--dark {
      box-shadow: 0px 0px 10px -1px #6AD0C8;
    }

    &--light {
      box-shadow: 0px 0px 10px -1px #5C708B;
    }

    @media(min-width: 768px) and (max-width: 1919px) {
      max-width: 380px;
    }

    @media(min-width: 1920px) and (max-width: 2499px) {
      max-width: 430px;
    }

    @media(min-width: 2500px) {
      max-width: 500px;
    }

    @media(max-width: 767px) {
      max-width: 300px;
    }
  }
}
</style>
