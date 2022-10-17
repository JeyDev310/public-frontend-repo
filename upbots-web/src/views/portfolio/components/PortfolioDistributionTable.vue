<template>
  <div class="flex flex-col relative">
    <!-- LOADER -->
    <AppLoader v-if="getLoading" class="rounded-xlg" />

    <!-- TABLE -->
    <AppTable
      v-if="getTableData.length"
      v-model:dataset="getTableData"
      :headers="tableHeaders"
      :style="`max-height: ${maxHeight}px`"
      sort-front-side
      :is-mobile-view-list="false"
      :is-table-wrap-styled="!isMD ? true : false"
      class="flex flex-col flex-grow w-full pt-10 md:py-20"
    >
      <!-- TITLE -->
      <template #tableTitle>
        <mq-layout mq="lg+" class="flex justify-between items-center px-20 4xl:px-30 pb-14">
          <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
            Portfolio Distribution Table
          </p>
        </mq-layout>
      </template>

      <!-- COIN -->
      <template #coin="{ row }">
        <div class="flex items-center space-x-10">
          <AppCryptoCoinChecker
            v-if="row.coin"
            :icon-name="row.coin"
            :icon-size="1.2"
            :img-size="20"
            :class="row.coin === 'UBXT' ? 'ml-2': ''"
          />
          <p>
            <span>{{ row.coin }}</span>
            <span v-if="row.blockchain" class="text-sm">{{ row.blockchain === "bsc" ? ' on BSC' : '' }}</span>
          </p>
        </div>
      </template>

      <!-- AMOUNT -->
      <template #amount="{ row }">
        <AppTruncatedTooltip :content="row.amount ? formatPrice(row.amount) : 'N/A'" />
      </template>

      <!-- BTC -->
      <template #btc="{ row }">
        <AppTruncatedTooltip :content="row.btc ? formatPrice(row.btc) : 'N/A'" />
      </template>

      <!-- CURRENCY VALUE -->
      <template #value="{ row }">
        <AppTruncatedTooltip :content="row.value ? formatPrice(row.value) : 'N/A'" />
      </template>
    </AppTable>

    <!-- NO DATA STATE -->
    <template v-else>
      <AppCard class="w-full h-full pt-20 px-30">
        <mq-layout mq="lg+">
          <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
            Portfolio Distribution Table
          </p>
        </mq-layout>
        <div class="flex flex-grow items-center justify-center h-full">
          <AppNoData color="text-chicory-flower dark:text-let-it-snow" />
        </div>
      </AppCard>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { vuex } from '@/store'
import { IDistributionTableData } from '@/types'

import { formatPrice } from '@/core/helpers'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

type TTabName = 'cex' | 'dex' | 'summary'

interface ITableHeaders {
  property: string;
  label: string;
  sortable: boolean;
  minWidth: number;
}

export default defineComponent({
  name: 'PortfolioDistributionTable',

  props: {
    data: {
      type: Array as PropType<IDistributionTableData[]>,
      required: true
    },

    maxHeight: {
      type: String as PropType<string>,
      default: ''
    },

    tabName: {
      type: String as PropType<TTabName>,
      required: true
    }
  },

  setup (props) {
    const { getFavoriteCurrency, getConvertedCurrency } = useGlobal()
    const { isMD } = useCustomBreakpoints()

    const tableHeaders = computed((): ITableHeaders[] => [
      { property: 'coin', label: 'Coin', sortable: true, minWidth: 140 },
      { property: 'amount', label: 'Amount', sortable: true, minWidth: 120 },
      { property: 'btc', label: 'BTC value', sortable: true, minWidth: 120 },
      { property: 'value', label: `${getFavoriteCurrency.value.label} value`, sortable: true, minWidth: 120 }
    ])

    const getLoading = computed((): boolean => {
      if (props.tabName === 'summary') return false
      return vuex[props.tabName].loading
    })

    const getTableData = computed({
      get () {
        return props.data.map((x: any) => {
          return {
            coin: x.coin,
            amount: x.amount,
            btc: x.btc,
            value: getConvertedCurrency(x.btc),
            blockchain: x.blockchain
          }
        })
      },
      set (value: any) {
        return value
      }
    })

    return { isMD, tableHeaders, getTableData, getLoading, formatPrice }
  }
})
</script>
