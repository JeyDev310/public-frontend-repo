<template>
  <div class="flex flex-col w-full overflow-y-auto custom-scrollbar">
    <RecycleScroller
      #default="{ item }"
      class="scroller custom-scrollbar"
      :items="getData"
      :item-size="32"
      key-field="symbolForData"
    >
      <div
        class="grid items-center justify-between gap-x-10 md:gap-x-20"
        :class="getGridClasses"
      >
        <div class="flex items-center space-x-10">
          <!-- IS FAVOURITE -->
          <div class="relative text-grey-cl-400 cursor-pointer mr-3" @click="setFavouritePair(item)">
            <AppIcon
              name="star"
              size="14"
              :class="item.isFavourite ? 'text-deep-aquamarine' : 'text-beguiling-blue dark:text-blair'"
            />
          </div>

          <!-- PAIR -->
          <div class="flex cursor-pointer" @click="onSetPair(item)">
            <AppTruncatedTooltip
              :content="item?.baseCurrency"
              class="text-deep-aquamarine dark:text-cotton-ball-second font-semibold text-sm"
            />
            <AppTruncatedTooltip
              :content="item && '/'"
              class="text-beguiling-blue dark:text-blair font-semibold text-sm"
            />
            <AppTruncatedTooltip
              :content="item?.quoteCurrency"
              class="text-beguiling-blue dark:text-blair font-semibold text-sm"
            />
          </div>
        </div>

        <!-- LAST PRICE -->
        <div v-if="showLastPrice" class="flex justify-center">
          <AppFormatNumber
            :data="priceSummary[item?.symbolForData]?.price?.last"
            format=""
            :to-fixed="formatNumber(priceSummary[item?.symbolForData]?.price?.last)"
            :is-math-symbols="false"
            text-size="text-sm"
            :is-colored="false"
            class="text-beguiling-blue dark:text-cotton-ball-second font-semibold"
          />
        </div>

        <!-- PERCENTAGE -->
        <div v-if="showChange" class="flex justify-end">
          <AppFormatNumber
            :data="priceSummary[item?.symbolForData]?.price?.change?.percentage"
            format=""
            :to-fixed="formatNumber(priceSummary[item?.symbolForData]?.price?.change?.percentage)"
            text-size="text-sm"
            class="font-semibold"
          />
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject, Ref } from 'vue'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { ITradingSettingsPair } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'TradeFilterBarPairItems',

  props: {
    data: {
      type: Array as PropType<ITradingSettingsPair[]>,
      required: true
    }
  },

  emits: ['on-change'],

  setup (props, { emit }) {
    /* INJECT VALUES */
    const showLastPrice = inject('showLastPrice') as Ref<boolean>
    const showChange = inject('showChange') as Ref<boolean>

    /* USE TRADE SETUP */
    const { priceSummary, formatNumber, setFavouritePair, setPair } = useTrade()

    /* USE GLOBAL SETUP */
    const { defaultPair } = useGlobal()

    /* FILTER ITEM WITH UNDEFIED PRICE */
    const getData = computed((): ITradingSettingsPair[] =>
      props.data.filter((item) => priceSummary.value[item?.symbolForData]?.price?.last))

    const getGridClasses = computed((): string => {
      if (!showLastPrice.value && !showChange.value) {
        return 'grid-cols-1'
      } else if ((showLastPrice.value && !showChange.value) || (showChange.value && !showLastPrice.value)) {
        return 'grid-cols-2'
      } else {
        return 'grid-cols-3'
      }
    })

    function onSetPair (item: ITradingSettingsPair): void {
      setPair(item)
      emit('on-change')
    }

    return {
      showLastPrice,
      showChange,
      getGridClasses,
      defaultPair,
      priceSummary,
      formatNumber,
      setFavouritePair,
      onSetPair,
      getData
    }
  }
})
</script>
