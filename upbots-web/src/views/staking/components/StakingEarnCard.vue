<template>
  <AppCard class="staking-earning-card flex flex-grow flex-col w-full pb-24 px-30">
    <div class="flex justify-center w-full -mt-20">
      <img
        :src="`/img/cryptocoins/${data.coin}.svg`"
        :alt="data.coin" class="w-60 h-60 bg-white rounded-full -ml-20 first:ml-0"
      >
    </div>

    <div
      class="w-full font-medium text-lg 2xl:text-xl text-beguiling-blue dark:text-white text-center mt-24 mb-16"
    >
      {{ data.title }}
    </div>

    <div class="flex justify-center mt-30">
      <div
        class="
        font-semibold
        text-xl
        xl:text-lg
        2xl:text-3xl
        text-beguiling-blue
        dark:text-white
        flex
        justify-center
        items-center"
        :class="getClass"
      >
        {{ !isNaN(data.value) ? formatNumber(data.value) : 'N/A' }}
        <span
          v-if="displayValueUsd"
          class="
          text-beguiling-blue
          dark
          font-semibold
          text-base
          ml-8"
        >
          ${{ formatNumber(data.valueUsd) }}
        </span>
      </div>
    </div>

    <slot />
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { IStakingData } from '@/types'
import { formatNumber } from '@/core/helpers'

export default defineComponent({
  name: 'StakingEarnCard',

  props: {
    data: {
      type: Object as PropType<IStakingData>,
      required: true
    }
  },

  setup (props) {
    const getClass = computed(() => {
      if (props.data.value >= 0) return 'text-amazon-parrot'
      return 'text-beguiling-blue dark:text-white'
    })

    const displayValueUsd = computed(() => {
      // HOT-FIX: Disable USD converted value for 'UBXT-BUSD LP STAKED' and 'UBXT-ETH LP STAKED'
      if (props.data.title === 'UBXT-BUSD LP STAKED' || props.data.title === 'UBXT-ETH LP STAKED') return false
      else {
        if (props.data.valueUsd || props.data.valueUsd === 0) return true
        return false
      }
    })

    return { getClass, formatNumber, displayValueUsd }
  }
})
</script>

<style lang="scss" scoped>
.staking-earning-card {
  max-width: 500px;
}
</style>
