<template>
  <mq-layout mq="lg+" class="flex flex-col mb-60">
    <!-- TITLE -->
    <h2 class="text-heavy-metal-armor dark:text-blair text-md 4xl:text-2xl font-medium mb-10">
      Top 10 Traders
    </h2>

    <!-- DESC -->
    <p class="text-nile-blue dark:text-let-it-snow mb-30">
      Congratulations to our top UpBots traders (profit % f the past 30d)
    </p>

    <!-- LOADING -->
    <template v-if="loading">
      <AppCard class="copy-trading-top-trades__card relative overflow-hidden">
        <AppLoader />
      </AppCard>
    </template>

    <template v-else>
      <!-- DATA -->
      <template v-if="getCopyBots.length">
        <AppCard
          class="
            copy-trading-top-trades__card
            grid
            grid-rows-3
            xl:grid-rows-2
            grid-cols-4
            xl:grid-cols-5
            gap-30
            p-30
          "
        >
          <CopyTradingTopTradesItem
            v-for="(item, index) in getCopyBots"
            :key="item.id"
            :data="item"
            :index="index"
          />
        </AppCard>
      </template>

      <!-- NO DATA -->
      <template v-else>
        <AppCard class="copy-trading-top-trades__card flex items-center justify-center p-30">
          <AppNoData />
        </AppCard>
      </template>
    </template>
  </mq-layout>

  <mq-layout mq="sm-md" class="flex flex-col flex-grow relative">
    <!-- DESC -->
    <p class="text-nile-blue dark:text-let-it-snow text-center mb-20">
      Congratulations to our top UpBots traders (profit % f the past 30d)
    </p>

    <!-- LOADING -->
    <template v-if="loading">
      <AppCard class="flex flex-col flex-grow relative overflow-hidden">
        <AppLoader />
      </AppCard>
    </template>

    <template v-else>
      <!-- DATA -->
      <template v-if="getCopyBots.length">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-30 sm:gap-x-20">
          <AppCard v-for="(item, index) in getCopyBots" :key="item.id" class="py-10 px-20">
            <CopyTradingTopTradesItem :data="item" :index="index" />
          </AppCard>
        </div>
      </template>

      <!-- NO DATA -->
      <template v-else>
        <AppCard class="flex flex-col flex-grow items-center justify-center p-30">
          <AppNoData />
        </AppCard>
      </template>
    </template>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useCopyTrading } from '../../copy-trading.composition.setup'

import CopyTradingTopTradesItem from './CopyTradingTopTradesItem.vue'

export default defineComponent({
  name: 'CopyTradingTopTrades',

  components: { CopyTradingTopTradesItem },

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup () {
    const { getCopyBots } = useCopyTrading()

    return { getCopyBots }
  }
})
</script>

<style lang="scss" scoped>
.copy-trading-top-trades {
  @media(min-width: 768px) {
    &__card {
      min-height: 200px;
    }
  }
}
</style>
