<template>
  <!-- WM (should add z-10) in default mode should remove z-10 -->
  <AppCard class="home-market-widget flex flex-col items-center justify-center text-white w-1/2 rounded-xl">
    <div class="grid grid-cols-3 gap-x-14 w-full rounded-xl px-20">
      <MarketValueCard
        v-for="item in cryptoList"
        :key="item.name"
        :crypto="item"
        :data="data"
      />
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { ICoinItem, ICoinPriceData } from '@/types/crypto.types'

import MarketValueCard from './MarketValueCard.vue'

export default defineComponent({
  name: 'MarketValueWidget',

  components: { MarketValueCard },

  props: {
    cryptoList: {
      type: Array as PropType<ICoinItem[]>,
      default: () => []
    },

    data: {
      type: Object as PropType<{[pair: string]: ICoinPriceData;}>,
      default: () => ({})
    }
  }
})
</script>

<style lang="scss" scoped>
.home-market-widget {
  @media(max-width: 1500px) {
    @apply w-3/5;
  }

  @media(max-width: 1279px) {
    height: 160px;
    @apply w-full;
  }
}
</style>
