<template>
  <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
    <RecycleScroller
      class="scroller custom-scrollbar"
      :items="data"
      :item-size="28"
      key-field="id"
    >
      <template #default="{ item, index }">
        <div class="grid grid-cols-3 gap-x-10">
          <!-- TIME -->
          <AppTruncatedTooltip
            :content="item.time"
            class="text-beguiling-blue dark:text-cotton-ball-second text-base md:text-sm 3xl:text-base"
          />

          <!-- PRICE -->
          <AppFormatNumber
            :data="item.price"
            format=""
            :to-fixed="formatNumber(item.price)"
            :is-math-symbols="false"
            :is-colored="false"
            class="z-1"
            :class="priceClasses(item, index)"
          >
            <template #value="{ data: value }">
              <AppTruncatedTooltip :content="value" class="text-base md:text-sm 3xl:text-base" />
            </template>
          </AppFormatNumber>

          <!-- AMOUNT -->
          <AppFormatNumber
            :data="item.amount"
            format=""
            :to-fixed="formatNumber(item.amount)"
            :is-math-symbols="false"
            text-size="text-base md:text-sm 3xl:text-base"
            :is-colored="false"
            class="z-1"
          >
            <template #value="{ data: value }">
              <AppTruncatedTooltip
                :content="value"
                class="text-beguiling-blue dark:text-cotton-ball-second text-base md:text-sm 3xl:text-base"
              />
            </template>
          </AppFormatNumber>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { IFormattedTradeHistory } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'

export default defineComponent({
  name: 'TradeHistoryItems',

  props: {
    data: {
      type: Array as PropType<IFormattedTradeHistory[]>,
      required: true
    }
  },

  setup (props) {
    const { formatNumber } = useTrade()

    function priceClasses (item: IFormattedTradeHistory, index: number): string {
      if (!props.data[index + 1]) return 'text-beguiling-blue dark:text-cotton-ball-second'
      return item.price <= props.data[index + 1].price
        ? 'text-alexandria'
        : 'text-spring-bouquet'
    }

    return { formatNumber, priceClasses }
  }
})
</script>
