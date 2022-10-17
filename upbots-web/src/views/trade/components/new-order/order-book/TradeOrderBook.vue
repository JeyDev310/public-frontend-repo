<template>
  <AppCard
    class="flex flex-col flex-grow px-12 md:py-10 lg:py-20 overflow-y-auto custom-scrollbar"
    :is-default-background="!isMD"
  >
    <div class="flex flex-col flex-shrink-0 w-full">
      <!-- TITLE -->
      <mq-layout
        mq="xl+"
        class="
          flex
          flex-shrink-0
          text-beguiling-blue
          dark:text-blair
          font-semibold
          4xl:font-normal
          4xl:text-lg
          text-left
          leading-1
          mb-14
        "
      >
        Order Book {{ defaultPair.name }}
      </mq-layout>

      <!-- LABELS -->
      <OrderBookLabels />
    </div>

    <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <!-- ORDER BOOK BIDS ITEMS -->
      <template v-if="bidsOrderBook?.length">
        <OrderBookItems :data="bidsOrderBook" />
      </template>

      <!-- N/A STATE -->
      <div
        v-else
        class="flex flex-col items-center justify-center h-full w-full relative overflow-y-auto custom-scrollbar"
      >
        <AppNoData
          class="
            text-base
            lg:text-xl
            lg:font-semibold
            text-nile-blue
            dark:text-let-it-snow
            lg:text-chicory-flower
            lg:dark:text-blair
          "
          title="N/A"
        />
      </div>
      <!-- LAST PRICE -->
      <div
        class="
          flex
          items-center
          justify-center
          border-t
          border-b
          border-beguiling-blue
          dark:border-cold-heights
          dark:border-opacity-20
          mt-6
          mb-4
        "
      >
        <template v-if="bidsOrderBook?.length && asksOrderBook?.length">
          <AppTruncatedTooltip
            :class="getLastPriceData.color"
            :content="getLastPriceData.price"
            class="font-bold"
          />
          <AppIcon
            v-if="getLastPriceData.rotate"
            name="buy-sell-arrow"
            size="14"
            class="ml-8"
            :class="[getLastPriceData.color, getLastPriceData.rotate]"
          />
        </template>

        <span v-else class="text-beguiling-blue dark:text-let-it-snow">N/A</span>
      </div>

      <!-- ORDER BOOK ASKS ITEMS -->
      <template v-if="asksOrderBook?.length">
        <OrderBookItems :data="asksOrderBook" />
      </template>

      <!-- N/A STATE -->
      <div
        v-else
        class="flex flex-col items-center justify-center h-full w-full relative overflow-y-auto custom-scrollbar"
      >
        <AppNoData
          class="
            text-base
            lg:text-xl
            lg:font-semibold
            text-nile-blue
            dark:text-let-it-snow
            lg:text-chicory-flower
            lg:dark:text-blair
          "
          title="N/A"
        />
      </div>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { IFormattedOrderBook } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import OrderBookItems from './OrderBookItems.vue'
import OrderBookLabels from './OrderBookLabels.vue'

export default defineComponent({
  name: 'TradeOrderBook',

  components: { OrderBookItems, OrderBookLabels },

  setup () {
    const { defaultPair } = useGlobal()
    const { isMD } = useCustomBreakpoints()
    const { orderBook, currentPairPrice, formatNumber } = useTrade()

    function orderBookToDisplay (data: IFormattedOrderBook[]): IFormattedOrderBook[] {
      const max = Math.max(...data.map((i) => i.total))
      return data.map((el) => { return { ...el, percentage: (100 * el.total) / max } })
    }

    function formattedData (data: [number, number][], progressCollor: string): IFormattedOrderBook[] {
      const formattedData = data.map((el: number[], index: number) => {
        return {
          id: index,
          amount: Number(el[1]),
          price: Number(el[0]),
          total: Number(el[0]) * Number(el[1]),
          progressBarColor: progressCollor
        }
      })
      return orderBookToDisplay(formattedData)
    }

    const bidsOrderBook = computed((): IFormattedOrderBook[] => {
      return orderBook.value.bids ? formattedData(orderBook.value.bids, 'toxic-sludge') : []
    })

    const asksOrderBook = computed((): IFormattedOrderBook[] => {
      return orderBook.value.asks ? formattedData(orderBook.value.asks, 'artful-red') : []
    })

    let price = 0
    const getLastPriceData = computed(() => {
      let color = ''
      let rotate = '0'

      const buyData: any = orderBook.value.bids ? formattedData(orderBook.value.bids, '') : []
      const sellData: any = orderBook.value.asks ? formattedData(orderBook.value.asks, '') : []
      const data = [...buyData, ...sellData][0].price

      if (data > price) {
        color = 'text-spring-bouquet'
      }

      if (data < price) {
        color = 'text-alexandria'
        rotate = 'transform rotate-180'
      }

      if (data === price) {
        color = 'text-beguiling-blue dark:text-let-it-snow'
        rotate = ''
      }
      price = data

      return { price, color, rotate }
    })

    return {
      isMD,
      defaultPair,
      currentPairPrice,
      asksOrderBook,
      bidsOrderBook,
      getLastPriceData,
      formatNumber
    }
  }
})
</script>
