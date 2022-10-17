
<template>
  <div class="home-hero-mobile flex px-20 pb-10 space-x-10 mb-10">
    <div class="flex-col flex-grow">
      <AppImage
        src="/img/logos/logo-full-secondary.png"
        alt="robot"
        width="120"
        height="78"
        class="home-hero-mobile__robot-img"
        img-class="object-cover"
      />
    </div>

    <div class="flex-col">
      <!-- TOTAL BALANCE LOADER -->
      <AppTextLoader v-if="loading" text="" class="text-white text-3xl" />

      <!-- TOTAL BALANCE VALUE -->
      <template v-else>
        <AppFormatNumber
          :data="getCurrencyValue"
          :currency-symbol="getCurrencySymbol"
          :is-math-symbols="false"
          text-size="text-3xl font-medium"
          not-available-classes="text-white"
          negative-classes="text-white"
          positive-classes="text-white"
        />
      </template>

      <!-- TOTAL BALANCE TITLE -->
      <p class="text-white mt-4">Total Balance</p>

      <router-link
        #default="{ navigate }"
        :to="{ name: routeNames.portfolioSummary }"
      >
        <AppButton
          type="purple-outlined"
          size="xs"
          rounded="full"
          class="mt-10"
          @click="navigate()"
        >
          View
        </AppButton>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { routeNames } from '@/router'

import { useGlobal } from '@/global-setup/global.composition.setup'

import { IBtcAmount } from '@/types'

export default defineComponent({
  name: 'HomeHeroMobile',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    value: {
      required: true,
      type: Object as PropType<IBtcAmount>
    }
  },

  setup (props) {
    /* USE GLOBAL SETUP */
    const { getCurrencySymbol, getTotalBalance, getConvertedCurrency } = useGlobal()

    const getCurrencyValue = computed(() => {
      return !props.value?.btc && !getCurrencySymbol.value ? 0 : getConvertedCurrency(props.value.btc)
    })

    return { routeNames, getCurrencyValue, getCurrencySymbol, getTotalBalance }
  }
})
</script>

<style lang="scss" scoped>
.home-hero-mobile {
  min-height: 220px;
  border-radius: 0px 0px 40px 40px;
  background: url("/img/home/hero/hero-bg-mobile.jpg") no-repeat top center / cover,
  linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1696) 78.16%),
  linear-gradient(101.45deg, #60BCB5 22.36%, #7F86FF 93.31%) no-repeat top center / cover;
  padding-top: 84px;

  &__robot-img {
    max-width: 120px;
  }
}
</style>
