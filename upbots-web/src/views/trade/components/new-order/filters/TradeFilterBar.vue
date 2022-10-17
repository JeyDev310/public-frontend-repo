<template>
  <div class="flex flex-col md:flex-row md:flex-wrap flex-shrink-0 w-full">
    <div class="flex flex-col md:mr-20 mb-12 md:mb-0">
      <mq-layout mq="sm-md" class="mb-8">
        <h3 class="text-nile-blue dark:text-blair font-medium">Exchange</h3>
      </mq-layout>

      <!-- ACCOUNTS -->
      <AppSelect
        :model-value="defaultAccount"
        :options="getNotFutureAccounts"
        item-label="name"
        item-key="id"
        :size="!isMD ? 'md' : 'lg'"
        :disabled="!Object.keys(defaultAccount).length || accountsLoading"
        style="min-width: 220px;"
        @change="e => setAccount(e)"
      >
        <template #selection="{ value, hasInitialValue }">
          <template v-if="hasInitialValue">
            <div class="flex items-center">
              <img
                :src="`/img/cryptocoins/${value.exchange}.svg`"
                :alt="value.value"
                class="w-16 h-16 mr-5"
              >
              <p>{{ value.name }}</p>
            </div>
          </template>

          <template v-else>No accounts detected</template>
        </template>

        <template #options="{ item }">
          <div class="flex items-center">
            <img
              :src="`/img/cryptocoins/${item.exchange}.svg`"
              :alt="item.value"
              class="w-16 h-16 mr-5"
            >
            <p>{{ item.name }}</p>
          </div>
        </template>
      </AppSelect>
    </div>

    <!-- PAIR FILTERS -->
    <TradeFilterBarPair ref="filterBarPair" />

    <!-- BEST PAIRS (DESKTOP) -->
    <div
      v-if="getBestPairs.length && (isMD || !isLG)"
      class="flex items-center"
    >
      <p v-if="(isMD || !isLG)" class="text-beguiling-blue dark:text-blair font-medium mr-10">
        Favorite
      </p>
      <p v-else class="text-beguiling-blue dark:text-blair 4xl:text-md mr-10">Favorite:</p>

      <div class="flex items-center space-x-10">
        <AppTag
          v-for="(item, index) in getBestPairs"
          :key="index"
          type="secondary"
          :data="item.name"
          class="cursor-pointer"
          @click="setPair(item)"
        />
      </div>
    </div>

    <!-- BEST PAIRS (TABLET) -->
    <mq-layout v-if="getBestPairs.length" mq="lg" class="flex items-center">
      <AppFlyout
        ref="appFlyoutFavoritePair"
        placement="bottom-start"
        :offset="16"
        :open-delay="0"
        :close-delay="0"
        class="flex"
        popper-classes="bg-white dark:bg-primary-dark-radial shadow dark:shadow-100 rounded-xl"
      >
        <!-- PREVIEW -->
        <template #activator="{ isVisible }">
          <slot>
            <div class="flex items-center space-x-10 cursor-pointer">
              <span class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
                Favourite Pair
              </span>

              <AppIcon
                name="chevron-thin"
                size="14"
                class="transform text-beguiling-blue dark:text-cotton-ball-second transition duration-300"
                :class="isVisible && 'rotate-180'"
              />
            </div>
          </slot>
        </template>

        <!-- CONTENT -->
        <template #popper>
          <slot name="content">
            <div
              class="flex flex-col items-center space-y-20 p-20 overflow-y-auto custom-scrollbar"
              style="width: 120px"
            >
              <span
                v-for="(item, index) in getBestPairs"
                :key="index"
                class="text-beguiling-blue dark:text-cotton-ball-second font-semibold"
                @click="[setPair(item), appFlyoutFavoritePair.handleHidePopper(null, false)]"
              >
                {{ item.name }}
              </span>
            </div>
          </slot>
        </template>
      </AppFlyout>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import TradeFilterBarPair from '@/components/pair-bar/TradeFilterBarPair.vue'

export default defineComponent({
  name: 'TradeFilterBar',

  components: { TradeFilterBarPair },

  setup () {
    const { defaultPair, defaultAccount, getNotFutureAccounts, accountsLoading } = useGlobal()
    const { isMD, isLG } = useCustomBreakpoints()
    const { getBestPairs, setAccount, setPair } = useTrade()

    const appFlyoutFavoritePair = ref()

    return {
      isMD,
      isLG,
      appFlyoutFavoritePair,
      getNotFutureAccounts,
      defaultAccount,
      accountsLoading,
      getBestPairs,
      defaultPair,
      setAccount,
      setPair
    }
  }

})
</script>
