<template>
  <mq-layout
    mq="sm-md"
    class="order__buy-sell-mobile-wrap fixed bottom-0 left-0 right-0 flex flex-col w-full"
    :class="orderView === 'buy' || orderView === 'sell' ? 'visible z-10' : 'invisible'"
  >
    <!-- BACKDROP -->
    <transition
      enter-active-class="transition duration-200 in-expo"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100 "
      leave-active-class="transform duration-100 transition out-expo delay-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="orderView"
        class="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full"
        :class="orderView === 'buy' || orderView === 'sell' && 'z-10'"
        @click="$emit('on-close', '')"
      />
    </transition>

    <!-- ORDER BUY -->
    <OrderCardBuy
      class="order__buy-sell-mobile z-10"
      :class="[{'is-active': orderView === 'buy'}, orderView === 'buy' ? 'order-1' : 'order-2']"
      @on-close="$emit('on-close', '')"
    />

    <!-- ORDER SELL -->
    <OrderCardSell
      class="order__buy-sell-mobile z-10"
      :class="[{'is-active': orderView === 'sell'}, orderView === 'sell' ? 'order-1' : 'order-2']"
      @on-close="$emit('on-close', '')"
    />
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import OrderCardBuy from './OrderCardBuy.vue'
import OrderCardSell from './OrderCardSell.vue'

export default defineComponent({
  name: 'OrderBuySellMobile',

  components: { OrderCardBuy, OrderCardSell },

  props: {
    orderView: {
      type: String as PropType<string>,
      default: ''
    }
  },

  emits: ['on-close']
})
</script>

<style lang="scss" scoped>
.order {
  &__buy-sell-mobile-wrap {
    height: 58px;
  }

  &__buy-sell-mobile {
    &.is-active {
      transition: transform 0.3s ease-in-out 0s;
      transform: translate3d(0px, -100%, 0px);
    }
  }
}
</style>
