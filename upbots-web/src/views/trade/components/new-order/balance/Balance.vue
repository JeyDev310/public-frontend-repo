<template>
  <AppCard
    class="flex flex-col flex-grow relative px-10 md:py-10 lg:py-20 overflow-y-auto custom-scrollbar"
    :is-default-background="isMD ? false : true"
  >
    <!-- LOADER -->
    <AppLoader v-if="portfolioLoading" size="md" />

    <!-- CONTENT -->
    <div class="flex flex-col flex-shrink-0 w-full">
      <!-- TITLE -->
      <mq-layout
        mq="xl+"
        class="flex items-center flex-shrink-0 text-beguiling-blue dark:text-blair text-left mb-14"
      >
        <span
          class="
            flex
            font-semibold
            4xl:font-normal
            text-beguiling-blue
            dark:text-blair
            4xl:text-lg
            leading-1
            mr-10
          "
        >
          Balance
        </span>

        <span class="flex flex-shrink-0 w-4 h-4 bg-beguiling-blue dark:bg-blair rounded-full mr-10" />

        <AppTruncatedTooltip
          class="text-beguiling-blue dark:text-blair leading-1"
          :content="`on (${defaultAccount.name ? defaultAccount.name : 'Account not detected'})`"
        />
      </mq-layout>

      <!-- LABELS -->
      <BalanceLabels :currency="getFavoriteCurrency.label" />
    </div>

    <!-- LIST ITEMS -->
    <div
      v-if="getBalanceData.length"
      class="flex flex-col flex-grow space-y-6 overflow-y-auto custom-scrollbar"
    >
      <BalanceItem v-for="(item, index) in getBalanceData" :key="index" :data="item" />
    </div>

    <!-- NO DATA STATE -->
    <div v-else class="flex flex-col flex-grow items-center justify-center w-full">
      <AppNoData
        class="
          text-base
          md:text-md2
          xl:text-xl
          lg:font-semibold
          text-nile-blue
          dark:text-let-it-snow
          lg:text-chicory-flower
          lg:dark:text-blair
        "
        :title="!isMD ? 'No data available' : 'No data'"
      />
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { IBalance } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import BalanceLabels from './BalanceLabels.vue'
import BalanceItem from './BalanceItem.vue'

export interface ISortedBalance {
  coin: string;
  amount: number;
  btc: number;
  usd: number;
  eur: number;
}

export default defineComponent({
  name: 'Balance',

  components: { BalanceLabels, BalanceItem },

  setup () {
    const { defaultAccount, getFavoriteCurrency } = useGlobal()
    const { isMD } = useCustomBreakpoints()
    const { accountBalance, portfolioLoading } = useTrade()

    const getSortedBalanceData = computed((): ISortedBalance[] => {
      if (!Object.keys(accountBalance.value).length) return []

      return Object.keys(accountBalance.value).map((key) => {
        return {
          coin: key,
          amount: accountBalance.value[key].currencyAmount,
          btc: accountBalance.value[key].btc,
          usd: accountBalance.value[key].usd,
          eur: accountBalance.value[key].eur
        }
      }).sort((a, b) => b.btc - a.btc)
    })

    const getBalanceData = computed((): IBalance[] => {
      if (!getSortedBalanceData.value.length) return []

      return getSortedBalanceData.value.map((x) => {
        return {
          coin: x.coin,
          amount: x.amount,
          btc: x.btc,
          value: getFavoriteCurrency.value.value === 'usd' ? x.usd : getFavoriteCurrency.value.value === 'eur' ? x.eur : 0
        }
      })
    })

    return {
      isMD,
      getFavoriteCurrency,
      portfolioLoading,
      defaultAccount,
      getBalanceData
    }
  }
})
</script>
