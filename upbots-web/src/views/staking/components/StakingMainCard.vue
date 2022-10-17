<template>
  <AppCard class="staking-card flex flex-grow flex-col w-full pb-40 px-20">
    <div class="flex justify-center w-full -mt-20">
      <img
        v-for="coin in data.coinList" :key="coin"
        :src="`/img/cryptocoins/${coin}.svg`"
        :alt="coin" class="w-60 h-60 rounded-full -ml-20 first:ml-0"
      >
    </div>

    <div
      class="w-full font-medium text-lg 2xl:text-xl text-beguiling-blue dark:text-white text-center mt-24 mb-16"
    >
      {{ data.title }}
    </div>

    <div
      class="staking-card__desc w-full text-base xl:text-sm 2xl:text-md text-beguiling-blue
    dark:text-light-steel-blue text-center line-clamp-2"
    >
      {{ data.description }}
    </div>

    <div class="flex md:flex-col lg:flex-row justify-around space-x-10 md:space-y-20 lg:space-y-0 mt-0">
      <!-- APR -->
      <div class="flex flex-col items-center">
        <div class="font-semibold text-xl xl:text-lg 2xl:text-3xl text-center" :class="getClass">
          {{ data.percentAPY != null ? `${data.percentAPY.toFixed(2)}%` : 'N/A' }}
        </div>

        <div
          class="flex space-x-4"
        >
          <div class="font-normal md:text-base 2xl:text-md text-beguiling-blue dark:text-light-steel-blue">
            APY (unstable)
          </div>

          <AppTooltip
            placement="top"
            hide-arrow
            :trigger="!isMD ? 'hover' : 'click'"
            class="flex"
          >
            <AppIcon
              name="info-circle"
              size="22"
              class="cursor-pointer self-center text-beguiling-blue dark:text-light-steel-blue"
            />

            <template #content>
              <AppCard
                class="
                  staking-card__tooltip
                  flex flex-col
                  text-sm
                  md:text-base
                  text-beguiling-blue
                  dark:text-white
                  p-10
                  md:p-20
                "
              >
                <p>Theorical APY is based on a daily reinvestment.</p>
                <p>That reinvestment should be done by the investor.</p>
                <p class="mt-16 font-semibold">How do you convert APR to APY?</p>
                <p>APY = (1 + APR / n)<sup>n</sup>- 1</p>
                <p class="mt-16">where:</p>
                <p>APR = annual percentage rate</p>
                <p>n = number of periods</p>
                <p class="mt-16 font-semibold">Example:</p>
                <p>APY (%) = (1 + APR/365 )<sup>365</sup> – 1</p>
              </AppCard>
            </template>
          </AppTooltip>
        </div>
      </div>

      <!-- TOTAL STAKED -->
      <div class="flex flex-col items-center">
        <div class="font-semibold text-xl xl:text-lg 2xl:text-3xl text-beguiling-blue dark:text-white">
          {{ data.coinStakedTotal != null ? formatNumber(data.coinStakedTotal) : 'N/A' }}
        </div>

        <div
          class="font-normal md:text-base 2xl:text-md text-beguiling-blue dark:text-light-steel-blue text-center"
        >
          Staked in the pool
        </div>
      </div>
    </div>

    <router-link :to="data.pages[configTab]" class="staking-card__select-button block w-full mx-auto mt-40">
      <AppButton type="primary-border-filled" size="xlg" class="w-full">Select</AppButton>
    </router-link>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { formatNumber } from '@/core/helpers'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'StakingMainCard',

  props: {
    configTab: {
      type: String,
      required: true
    },

    data: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD } = useCustomBreakpoints()

    const getClass = computed((): string => {
      if (props.data.percentAPY != null) return 'text-amazon-parrot'
      return 'text-beguiling-blue dark:text-white'
    })

    return { isMD, getClass, formatNumber }
  }
})
</script>

<style lang="scss" scoped>
.staking-card {
  &__desc {
    min-height: 54px;
  }

  &__select-button {
    max-width: 280px;
  }

  &__tooltip {
    max-width: 500px;
    overflow-wrap: break-word;
  }

  @media(min-width: 768px) {
    max-width: 500px;
  }

  @media (max-width: 768px) {
    &__tooltip {
      max-width: 260px;
    }
  }
}
</style>
