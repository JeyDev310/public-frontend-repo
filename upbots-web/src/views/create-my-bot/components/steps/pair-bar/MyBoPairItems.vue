<template>
  <div class="flex flex-col w-full overflow-y-auto custom-scrollbar">
    <RecycleScroller
      #default="{ item }"
      class="scroller custom-scrollbar"
      :items="getData"
      :item-size="32"
      key-field="symbolForData"
    >
      <div class="grid grid-cols-1 items-center justify-between gap-x-10 md:gap-x-20">
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
      </div>
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { ITradingSettingsPair } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useCreateMyBot } from '@/views/create-my-bot/create-my-bot.setup'

export default defineComponent({
  name: 'MyBoPairItems',

  props: {
    data: {
      type: Array as PropType<ITradingSettingsPair[]>,
      required: true
    }
  },

  emits: ['on-change'],

  setup (props, { emit }) {
    const { formatNumber } = useTrade()
    const { myBotPriceSummary, setPair, setFavouritePair } = useCreateMyBot()

    const getData = computed((): ITradingSettingsPair[] => {
      if (!Object.keys(myBotPriceSummary).length) return []
      return props.data.filter((item) => {
        return myBotPriceSummary.value[item?.symbolForData]?.price?.last
      })
    })

    function onSetPair (item: ITradingSettingsPair): void {
      setPair(item)
      emit('on-change')
    }

    return {
      getData,
      formatNumber,
      setFavouritePair,
      onSetPair
    }
  }
})
</script>
