<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow mmd:text-md 3xl:text-lg 4xl:text-xl">Swap</h2>
    </Portal>

    <!-- DESKTOP VIEW -->
    <mq-layout
      mq="lg+"
      class="
        swap__content
        flex
        flex-col
        3xl:grid
        3xl:grid-rows-1
        flex-grow
        space-y-20
        3xl:space-y-0
        3xl:gap-y-24
        4xl:gap-y-40
        overflow-y-auto
        custom-scrollbar
      "
    >
      <div
        class="
          swap__top-side
          flex
          flex-col
          lg:flex-row
          flex-shrink-0
          w-full
          space-y-20
          lg:space-y-0
          lg:space-x-20
          3xl:space-x-24
          4xl:space-x-40
        "
      >
        <!-- FIND A TRADE CARD -->
        <SwapFindTrade />

        <!-- METAMASK CARD -->
        <SwapMetaMask />
      </div>

      <!-- BOTTOM SIDE -->
      <div
        class="
          swap__bottom-side
          flex
          flex-col
          lg:flex-row
          flex-shrink-0
          space-y-20
          lg:space-y-0
          lg:space-x-20
          3xl:space-x-24
          4xl:space-x-40
          overflow-y-auto
          custom-scrollbar
        "
      >
        <!-- EXCHANGES -->
        <SwapExchanges />

        <!-- TABLE -->
        <AppCard
          class="swap__table flex flex-col flex-grow relative py-20 3xl:py-30 overflow-y-hidden custom-scrollbar"
        >
          <SwapTable class="flex flex-col overflow-y-hidden custom-scrollbar" />
        </AppCard>
      </div>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <div v-if="!isResultShowed" class="flex flex-col w-full overflow-y-auto custom-scrollbar">
        <!-- METAMASK CARD -->
        <SwapMetaMask />

        <!-- FIND A TRADE CARD -->
        <SwapFindTrade @handle-open-result="isResultShowed = true" />
      </div>

      <template v-else>
        <!-- GO TO FIND TRADE -->
        <div class="flex items-center justify-between flex-shrink-0 mb-20">
          <div
            class="flex items-center text-nile-blue dark:text-blair"
            @click="isResultShowed ? isResultShowed = !isResultShowed : null"
          >
            <AppIcon name="chevron-right" size="24" class="transform rotate-180" />

            <span class="text-md font-medium ml-10">Results</span>
          </div>
        </div>

        <!-- SEARCH RESULT -->
        <div class="flex flex-col w-full space-y-16 overflow-y-auto custom-scrollbar">
          <template v-if="tableData.length">
            <SwapItemMobile
              v-for="(item, index) in tableData"
              :key="index"
              :item="item"
            />
          </template>

          <!-- NO DATA STATE -->
          <template v-else>
            <AppCard class="flex flex-col flex-grow items-center justify-center w-full p-20">
              <span class="text-nile-blue dark:text-let-it-snow">No data</span>
            </AppCard>
          </template>
        </div>
      </template>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import { routeNames } from '@/router'

import { useWindowSize } from '@vueuse/core'

import { useSwap } from '@/views/swap/swap.setup'
import { useWeb3 } from '@/global-setup/web3/web3.composition.setup'

import SwapTable from '@/views/swap/components/table/SwapTable.vue'
import SwapFindTrade from '@/views/swap/components/SwapFindTrade.vue'
import SwapExchanges from '@/views/swap/components/SwapExchanges.vue'
import SwapMetaMask from '@/views/swap/components/SwapMetaMask.vue'
import SwapItemMobile from '@/views/swap/components/mobile/SwapItemMobile.vue'

export default defineComponent({
  name: 'Swap',

  components: { SwapTable, SwapMetaMask, SwapFindTrade, SwapExchanges, SwapItemMobile },

  /* REDIRECT TO 404 IF DAPP NOT DETECTED */
  beforeRouteEnter (to, from, next) {
    const { width } = useWindowSize()
    const { isDAppBrowser } = useWeb3()

    if (width.value <= 479) {
      if (!isDAppBrowser.value) {
        return next({ name: routeNames.notFound })
      }
    }
    next()
  },

  setup () {
    const { initProviderSdk, tableData } = useSwap()

    const isResultShowed = ref<boolean>(false)

    onMounted(() => { initProviderSdk() })

    return { isResultShowed, tableData }
  }
})
</script>

<style lang="scss" scoped>
.label-text-color {
  @apply text-nile-blue dark:text-blair;
}

.swap {
  @media (min-width: 1024px) and (max-width: 1919px) {
    &__top-side {
      height: 280px;
    }

    &__bottom-side {
      height: 420px;
    }
  }

  @media (min-width: 1920px) {
    &__content {
      grid-template-rows: 1fr 2fr;
    }
  }

  @media(max-width: 1023px) {
    &__table {
      height: 350px;
    }
  }
}
</style>
