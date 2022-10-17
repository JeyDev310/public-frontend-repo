<template>
  <AppCard
    class="flex flex-col px-10 md:py-10 lg:py-20 flex-grow relative overflow-y-auto custom-scrollbar"
    :is-default-background="isMD ? false : true"
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
        Trade History
      </mq-layout>

      <!-- LABELS -->
      <TradeHistoryLabels />
    </div>

    <!-- ITEMS -->
    <template v-if="toDisplay.length">
      <TradeHistoryItems :data="toDisplay" />
    </template>

    <!-- NO DATA AVAILABLE STATE -->
    <template v-else>
      <div class="flex flex-col flex-grow items-center justify-center w-full">
        <AppNoData
          class="
            text-base
            lg:text-xl
            lg:font-semibold
            text-nile-blue
            dark:text-let-it-snow
            lg:text-chicory-flower
            lg:dark:text-blair
            text-center
          "
          :title="!isMD ? 'No data available' : 'No data'"
        />
      </div>
    </template>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import dayjs from 'dayjs'

import { TIndexedArray } from '@/types'

import { IFormattedTradeHistory } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import TradeHistoryItems from './TradeHistoryItems.vue'
import TradeHistoryLabels from './TradeHisotryLabels.vue'

// TIndexedArray<number>>
export default defineComponent({
  name: 'TradeHistory',

  components: { TradeHistoryItems, TradeHistoryLabels },

  setup () {
    const { isMD } = useCustomBreakpoints()
    const { tradeHistory } = useTrade()

    function formattedData (data: TIndexedArray<number>): IFormattedTradeHistory[] {
      const toReturn = data.map((el: number[], index: number) => {
        return {
          id: index,
          time: dayjs(el[1] * 1000).format('D-MMM, h:mm:ss A'),
          price: el[2],
          amount: el[3]
        }
      })
      return toReturn
    }

    const toDisplay = computed((): TIndexedArray<number> => tradeHistory.value ? formattedData(tradeHistory.value) : [])

    return { isMD, toDisplay }
  }
})
</script>

<style lang="scss" scoped>
.scroller {
  height: 100%;
}
</style>
