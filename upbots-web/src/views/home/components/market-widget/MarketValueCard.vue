<template>
  <div v-if="priceHistoryData" class="relative flex flex-row items-center w-1/4 w-full">
    <div class="flex flex-col w-full">
      <div class="flex flex-row items-center text-white mb-14">
        <AppCryptoCoinChecker
          v-if="crypto.symbol"
          :icon-name="crypto.symbol"
          :icon-size="1.2"
          :img-size="20"
          class="mr-5"
        />
        <p
          class="font-semibold text-base leading-tight text-industrial-revolution dark:text-let-it-snow"
        >
          {{ crypto.title }}
        </p>
      </div>

      <h3 v-if="latestPrice" class="text-md2 mb-14 text-industrial-revolution dark:text-let-it-snow">
        {{ `${getCurrencySymbol}${formatNumber(latestPrice)}` }}
      </h3>

      <AppFormatNumber :data="percent" />
    </div>

    <div class="chart__container absolute top-14 right-0 flex w-1/2 z-1">
      <SingleLineChart :data="priceList" :labels="labelList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, defineAsyncComponent } from 'vue'

import dayjs from 'dayjs'

import { formatNumber, formatPrice } from '@/core/helpers'

import { ICoinItem, ICoinPriceData } from '@/types/crypto.types'

import { useGlobal } from '@/global-setup/global.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const SingleLineChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleLineChart.vue' /* webpackChunkName: "SingleLineChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'MarketValueCard',

  components: { SingleLineChart },

  props: {
    crypto: {
      type: Object as PropType<ICoinItem>,
      default: () => ({})
    },

    data: {
      type: Object as PropType<{[pair: string]: ICoinPriceData;}>,
      default: () => ({})
    }
  },

  setup (props) {
    /* USE GLOBAL SETUP */
    const { getFavoriteCurrency, getCurrencySymbol } = useGlobal()

    const priceHistoryData = computed(() => props.data[`${props.crypto.name}/${getFavoriteCurrency.value.value}`])

    const latestPrice = computed(() => priceHistoryData.value.prices[priceHistoryData.value.prices.length - 1][1])

    const percent = computed(() => latestPrice.value / (priceHistoryData.value.prices[0][1] / 100) - 100)

    const priceList = computed(() => {
      if (latestPrice.value > 100) {
        return priceHistoryData.value.prices.map((c: any) => formatPrice(c[1], 2))
      } else {
        return priceHistoryData.value.prices.map((c: any) => formatPrice(c[1], 5))
      }
    })

    const labelList = computed(() => priceHistoryData.value.prices.map((c: any) => dayjs(c[0]).format('D-MMM, h:mm:ss A')))

    return {
      formatNumber,
      latestPrice,
      priceHistoryData,
      percent,
      priceList,
      labelList,
      getCurrencySymbol
    }
  }
})
</script>

<style lang="scss" scoped>
.chart__container {
  height: 75%;
}
</style>
