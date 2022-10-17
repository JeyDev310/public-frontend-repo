<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">API Keys</h2>
    </Portal>

    <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- MY EXCHANGES KEYS -->
      <MyExchangeKeys class="my-exchanges-keys flex flex-col mb-20 4xl:mb-24" />

      <div class="flex flex-col xl:flex-row flex-grow w-full space-y-24 xl:space-y-0 xl:space-x-20 4xl:space-x-24">
        <!-- CONNECT NEW EXCHANGES -->
        <ConnectNewExchanges />

        <!-- EXCHANGE OPEN NEW ACCOUNT -->
        <ExchangeOpenNewAccount />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MyExchangeKeys from '@/views/keys/components/MyExchangeKeys.vue'
import ConnectNewExchanges from '@/views/keys/components/ConnectNewExchanges.vue'
import ExchangeOpenNewAccount from '@/views/keys/components/ExchangeOpenNewAccount.vue'

export default defineComponent({
  name: 'Keys',

  components: {
    ConnectNewExchanges,
    MyExchangeKeys,
    ExchangeOpenNewAccount
  }
})
</script>

<style lang="scss" scoped>
.my-exchanges-keys {
  @media(min-width: 768px) {
    max-height: 240px;
  }

  @media(min-width: 2500px) {
    max-height: 315px;
  }

  @media(max-width: 767px) {
    max-height: 435px;
  }
}
</style>
