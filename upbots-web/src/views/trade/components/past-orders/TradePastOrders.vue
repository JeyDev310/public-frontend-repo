<template>
  <div class="past-orders__order-history-table-wrap flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <MyOrders title="Orders History" is-filters :height="isMD ? '500' : ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import MyOrders from '@/views/trade/components/my-orders/MyOrders.vue'

export default defineComponent({
  name: 'TradePastOrders',

  components: { MyOrders },

  setup () {
    const { isMD } = useCustomBreakpoints()

    return { isMD }
  }
})
</script>

<style lang="scss" scoped>
.past-orders {
  &__order-history-table-wrap {
    min-height: 200px;
  }
}
</style>
