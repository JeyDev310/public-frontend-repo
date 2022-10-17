<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Buy UBXT</h2>
    </Portal>

    <!-- CONTENT -->
    <AppCard
      class="
        flex
        flex-col
        md:flex-row
        flex-grow
        divide-y
        md:divide-y-0
        md:divide-x
        divide-beguiling-blue
        dark:divide-cold-heights
        dark:divide-opacity-20
        p-20
        md:p-20
        lg:p-40
        xl:p-70
        overflow-y-auto
        custom-scrollbar
      "
    >
      <!-- CREDIT CARD VIEW -->
      <BuyUBXTCreditCard />

      <!-- EXCHANGE PLATFORMS VIEW -->
      <BuyUBXTExchanges />
    </AppCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BuyUBXTCreditCard from '@/views/buy-ubxt/components/BuyUBXTCreditCard.vue'
import BuyUBXTExchanges from '@/views/buy-ubxt/components/BuyUBXTExchanges.vue'

export default defineComponent({
  name: 'BuyUBXT',

  components: { BuyUBXTCreditCard, BuyUBXTExchanges }
})
</script>
