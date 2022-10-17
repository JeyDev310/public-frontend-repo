<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Manual Trade</h2>
    </Portal>

    <!-- TABS SWITCHER (TABLE - DESKTOP) -->
    <mq-layout mq="lg+">
      <Portal to="h-one">
        <AppButtonsGroup
          v-model="tradeTabValue"
          :options="tradeTabData"
          type="outlined"
          :size="is3XL ? 'sm' : !is4XL ? 'xlg' : 'md'"
          width="130px"
          class="md:ml-10 lg:ml-20 4xl:ml-24"
        />
      </Portal>
    </mq-layout>

    <!-- TRADE TABS (MOBILE) -->
    <mq-layout mq="sm-md" class="flex-shrink-0">
      <AppButtonsGroup
        v-model="tradeTabValue"
        :options="tradeTabData"
        type="underline"
        width="100%"
        class="mb-20"
      />
    </mq-layout>

    <div class="flex flex-col flex-grow w-full relative overflow-y-auto custom-scrollbar">
      <!-- NEW ORDER TAB -->
      <template v-if="tradeTabValue === tradeTabData[0].value">
        <TradeNewOrder />
      </template>

      <!-- PAST ORDERS TAB -->
      <template v-if="tradeTabValue === tradeTabData[1].value">
        <TradePastOrders />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import TradeNewOrder from './components/new-order/TradeNewOrder.vue'
import TradePastOrders from './components/past-orders/TradePastOrders.vue'

export default defineComponent({
  name: 'Trade',

  components: { TradeNewOrder, TradePastOrders },

  setup () {
    const { is3XL, is4XL } = useCustomBreakpoints()

    const tradeTabValue = ref<string>('new-order')
    const tradeTabData: { value: string; label: string; }[] = [
      { value: 'new-order', label: 'New Order' },
      { value: 'past-orders', label: 'Past Orders' }
    ]

    return { is3XL, is4XL, tradeTabValue, tradeTabData }
  }
})
</script>
