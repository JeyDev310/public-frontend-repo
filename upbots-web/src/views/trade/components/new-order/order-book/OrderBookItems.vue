<template>
  <div class="flex flex-col h-full overflow-y-auto custom-scrollbar">
    <RecycleScroller
      #default="{ item }"
      class="scroller custom-scrollbar"
      :items="data"
      :item-size="28"
      key-field="id"
    >
      <div class="relative grid grid-cols-3 gap-x-10">
        <!-- PERCENTAGE LINE -->
        <span
          class="absolute right-0 top-0 h-full bg-opacity-20 z-10"
          :class="item.progressBarColor === 'toxic-sludge' ? 'bg-toxic-sludge' : 'bg-artful-red'"
          :style="`width: ${item.percentage < 10 ? 10 : item.percentage}%`"
        />

        <!-- AMOUNT -->
        <AppFormatNumber
          :data="item.amount"
          format=""
          :to-fixed="formatNumber(item.amount)"
          :is-math-symbols="false"
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

        <!-- TOTAL -->
        <AppFormatNumber
          :data="item.total"
          format=""
          :to-fixed="formatNumber(item.total)"
          :is-math-symbols="false"
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

        <!-- PRICE -->
        <AppFormatNumber
          :data="item.price"
          format=""
          :to-fixed="formatNumber(item.price)"
          :is-math-symbols="false"
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
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { IFormattedOrderBook } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'

export default defineComponent({
  name: 'OrderBookItems',

  props: {
    data: {
      type: Array as PropType<IFormattedOrderBook[]>,
      required: true
    }
  },

  setup () {
    const { formatNumber } = useTrade()

    return { formatNumber }
  }
})
</script>
