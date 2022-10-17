<template>
  <!-- WM (should add relative) in default mode should remove relative -->
  <div class="home-hero flex flex-shrink-0 flex-col justify-between">
    <!-- WM -->
    <!-- <HeroWMSection /> -->

    <!-- WM (should add z-10) in default mode should remove z-10 -->
    <div class="home-hero__container flex flex-grow items-center xl:items-start w-full">
      <div class="flex flex-col flex-grow -mt-40 xl:mt-0">
        <!-- HERO TITLE -->
        <h2 class="flex flex-col text-4xl 3xl:text-5xl 4xl:text-6xl text-white mb-24">
          <p>Welcome On</p>
          <p class="flex items-center space-x-6">
            <span>UpBots</span>
            <AppTruncatedTooltip class="font-semibold" :content="firstname" />
          </p>
        </h2>

        <!-- HERO ACTION BUTTONS -->
        <div class="flex items-center">
          <router-link
            v-for="(item, index) in heroButtonsList"
            :key="index"
            #default="{ navigate }"
            :to="{ name: item.route }"
            custom
          >
            <AppButton
              :type="item.buttonType"
              size="md"
              rounded="md"
              class="home-hero__btn w-full mr-10 md:mr-24 last:mr-0"
              @click="navigate()"
            >
              {{ item.label }}
            </AppButton>
          </router-link>
        </div>
      </div>

      <!-- HERO ROBOT IMG -->
      <div class="home-hero__robot-img-wrap flex flex-col flex-shrink-0 mx-20">
        <!-- WM -->
        <!-- <img src="/img/winter-mode/hero-robot-wm.svg" alt="hero-robot-wm" class="w-full h-full"> -->

        <!-- Default mode -->
        <img src="/img/home/hero/hero-robot.svg" alt="hero-robot" class="w-full h-full">
      </div>

      <!-- HERO DATA -->
      <div class="flex flex-col items-end flex-grow space-y-14 4xl:space-y-24">
        <!-- MARKET CAP -->
        <div class="flex flex-col items-end">
          <span class="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-semibold text-white mb-4 4xl:mb-8">
            {{ ubxtData && marketCap ? `${getCurrencySymbol}${marketCap}M` : 'N/A' }}
          </span>
          <span class="text-white text-opacity-60 font-medium">Market Cap</span>
        </div>

        <!-- UBXT PRICE -->
        <div class="flex flex-col items-end">
          <span class="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-semibold text-white mb-4 4xl:mb-8">
            {{ ubxtData && price ? `${getCurrencySymbol}${price}` : 'N/A' }}
          </span>
          <span class="text-white text-opacity-60 font-medium">UBXT Price</span>
        </div>

        <!-- BOTS AVAILABLE -->
        <div class="flex flex-col items-end">
          <span class="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-semibold text-white mb-4 4xl:mb-8">
            {{ formatNumber(totalActiveBots) }}
          </span>
          <span class="text-white text-opacity-60 font-medium">Bots Available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRefs, onMounted } from 'vue'
import { routeNames } from '@/router'

import { formatNumber } from '@/core/helpers'

import { vuex } from '@/store'
import { ICoinPriceData } from '@/types/crypto.types'
import { EUBXTId } from '@/types'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

/* WM */
// import HeroWMSection from '@/components/winter-mode/HeroWMSection.vue'

export default defineComponent({
  name: 'HomeHero',

  props: {
    data: {
      type: Object as PropType<{[pair: string]: ICoinPriceData;}>,
      default: () => ({})
    }
  },

  setup (props) {
    const { totalActiveBots, fetchAlgoBotsTotalActiveBots } = useBots()
    const { getFavoriteCurrency, getCurrencySymbol } = useGlobal()

    const { firstname } = toRefs(vuex.auth.user)

    const heroButtonsList = [
      { label: 'Deposit UBXT', route: routeNames.ubxtWallet, buttonType: 'grey-filled-gradient' },
      { label: 'Buy UBXT', route: routeNames.buyUBXT, buttonType: 'white-outlined' }
    ]

    const ubxtId = EUBXTId.UBXTID
    const ubxtData = computed(() => props.data[`${ubxtId}/${getFavoriteCurrency.value.value}`])
    const price = computed(() => ubxtData.value.prices[ubxtData.value.prices.length - 1][1].toFixed(3))
    const marketCap = computed(() =>
      (Math.abs(Number(ubxtData.value.market_caps[ubxtData.value.market_caps.length - 1][1])) / 1.0e+6)
        .toFixed(2))

    function initData () {
      fetchAlgoBotsTotalActiveBots()
    }

    onMounted(() => { initData() })

    return {
      routeNames,
      firstname,
      heroButtonsList,
      ubxtData,
      price,
      marketCap,
      totalActiveBots,
      getCurrencySymbol,
      formatNumber
    }
  }
})
</script>

<style lang="scss" scoped>
.home-hero {
  border-radius: 0px 0px 24px 52px;
  background: url("/img/home/hero/hero-bg.jpg") no-repeat top center / cover,
  linear-gradient(180deg, rgba(0, 0, 0, 0.76) -8.62%, rgba(0, 0, 0, 0) 78.16%),
  linear-gradient(101.45deg, #60BCB5 22.36%, #7F86FF 93.31%) no-repeat top center / cover;

  &__container {
    padding-top: 145px;
  }

  &__btn {
    max-width: 160px;
  }

  @media(max-width: 2499px) {
    min-height: 410px;

    &__container {
      padding: 100px 70px 70px 95px;
    }

    /* WM */
    // &__robot-img-wrap {
    //   max-width: 150px;
    // }

    /* Default mode */
    &__robot-img-wrap {
      max-width: 180px;
    }
  }

  @media(max-width: 1279px) {
    &__container {
      @apply px-40 pb-60;
    }
  }

  @media(max-width: 1023px) {
    &__container {
      @apply px-20;
    }

    &__robot-img-wrap {
      max-width: 120px;
    }
  }

  @media(min-width: 2500px) {
    min-height: 520px;

    &__container {
      padding: 145px 70px 70px 95px;
    }
  }
}
</style>
