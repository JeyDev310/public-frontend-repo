<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+" class="flex flex-col flex-grow w-full relative overflow-y-auto custom-scrollbar">
    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xlg" />

    <AppTable :dataset="data" :headers="tradeHistoryHeaders" class="my-trade-history__table">
      <!-- TITLE -->
      <template #tableTitle>
        <mq-layout mq="lg+" class="flex justify-between items-center px-20 4xl:px-30 pb-14">
          <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
            Trade History
          </p>
        </mq-layout>
      </template>

      <!-- PAIR -->
      <template #pair="{ row }">
        <div class="flex items-center">
          <template v-for="(token, tokenIndex) in row.pair" :key="tokenIndex">
            <AppCryptoCoinChecker
              v-if="token"
              :icon-name="token"
              :icon-size="1.2"
              :img-size="18"
              class="first:-ml-0 -ml-10"
              :style="tokenIndex >= 1 && `z-index: ${tokenIndex};`"
            />
          </template>
          <AppTruncatedTooltip :content="`${row.pair[0]}/${row.pair[1]}`" class="ml-4" />
        </div>
      </template>

      <!-- STARTED -->
      <template #started="{ row }">
        <AppTruncatedTooltip :content="row.started ? $filters.date(row.started) : '-'" />
      </template>

      <!-- COMPLETED -->
      <template #completed="{ row }">
        <AppTruncatedTooltip :content="row.completed ? $filters.date(row.completed) : '-'" />
      </template>

      <!-- AMOUNT -->
      <template #amount="{ row }">
        <AppTruncatedTooltip :content="row.amount ? `${row.amount} ${row.pair[0]}` : 'N/A'" />
      </template>

      <!-- TOTAL EXECUTED -->
      <template #totalExecuted="{ row }">
        <AppTruncatedTooltip
          :content="row.totalExecuted ?
            `${formatNumber(row.totalExecuted)} ${row.pair[1]}`
            : 'N/A'"
        />
      </template>

      <!-- TOTAL GAINED -->
      <template #totalGained="{ row }">
        <AppFormatNumber :data="row.totalGained" />
      </template>

      <!-- PROFIT PERCENTAGE -->
      <template #profitPercentage="{ row }">
        <AppFormatNumber :data="row.profitPercentage" percent />
      </template>
    </AppTable>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <AppCard
      class="
        my-trade-history__table
        flex
        flex-col
        flex-grow
        w-full
        pt-20
        overflow-y-auto
        custom-scrollbar
        relative
      "
    >
      <!-- TITLE -->
      <p
        class="
          flex
          justify-center
          flex-shrink-0
          w-full
          text-md
          font-medium
          text-nile-blue
          dark:text-blair
          px-30
          mb-10
        "
      >
        My Trade History
      </p>

      <div
        class="flex flex-col relative w-full pb-10 overflow-y-auto custom-scrollbar"
        :class="{'flex-grow': !data.length}"
      >
        <!-- LOADER -->
        <AppLoader v-if="loading" size="sm" class="rounded-b-xl" />

        <!-- CONTENT -->
        <AppCollapse v-model="openedItems" :data="data" class="flex flex-col flex-grow w-full">
          <AppCollapseItem
            v-for="(item, index) of data"
            :key="index"
            :name="index.toString()"
            class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
          >
            <!-- PREVIEW -->
            <template #header="{ collapsed }">
              <div
                class="grid grid-cols-2 gap-x-10 py-20 pl-12 -ml-12 pr-40 -mr-12"
                :class="collapsedItemColor(collapsed, isDarkMode)"
              >
                <!-- BOT -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium">Algo Bot</div>
                  <div class="flex items-center space-x-5">
                    <div class="flex items-center">
                      <template v-for="(token, tokenIndex) in item.pair" :key="tokenIndex">
                        <AppCryptoCoinChecker
                          v-if="token"
                          :icon-name="token"
                          :icon-size="1.2"
                          :img-size="18"
                          class="first:-ml-0 -ml-10"
                          :style="tokenIndex >= 1 ? `z-index: ${tokenIndex};` : ''"
                        />
                      </template>
                    </div>
                    <AppTruncatedTooltip
                      :content="item.bot ? item.bot : '-'"
                      class="text-beguiling-blue dark:text-white text-base"
                    />
                  </div>
                </div>

                <!-- PROFIT PERCENTAGE -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium">Profit %</div>
                  <AppFormatNumber :data="item.profitPercentage" percent />
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div
                class="pb-20 pl-12 -ml-12 -mr-12 pr-40 space-y-20"
                :class="collapsedItemColor(collapsed, isDarkMode)"
              >
                <div class="grid grid-cols-2 gap-10">
                  <!-- TOTAL GAIN -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Total Gained</div>
                    <AppFormatNumber :data="item.totalGained" />
                  </div>

                  <!-- TOTAL EXECUTED -->
                  <div class="flex flex-col items-center space-y-2">
                    <AppTruncatedTooltip
                      content="Total Executed"
                      class="text-beguiling-blue dark:text-blair font-medium"
                    />
                    <AppTruncatedTooltip
                      :content="item.totalExecuted ? `${formatNumber(item.totalExecuted)} ${item.pair[1]}` : 'N/A'"
                      class="text-beguiling-blue dark:text-white"
                    />
                  </div>

                  <!-- AMOUNT -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Amount</div>
                    <AppTruncatedTooltip
                      :content="item.amount ? `${item.amount} ${item.pair[0]}` : 'N/A'"
                      class="text-beguiling-blue dark:text-white"
                    />
                  </div>

                  <!-- STARTED DATE -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Started</div>
                    <AppTruncatedTooltip
                      :content="item.started ? $filters.date(item.started) : '-'"
                      class="text-beguiling-blue dark:text-white capitalize"
                    />
                  </div>

                  <!-- COMPLETED DATE -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Completed</div>
                    <AppTruncatedTooltip
                      :content="item.completed ? $filters.date(item.completed) : '-'"
                      class="text-beguiling-blue dark:text-white capitalize"
                    />
                  </div>
                </div>
              </div>
            </template>
          </AppCollapseItem>
        </AppCollapse>
      </div>
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import { collapsedItemColor, formatNumber } from '@/core/helpers'

import { IMyTradeHistory } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'MyTradeHistory',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    data: {
      type: Array as PropType<IMyTradeHistory[]>,
      required: true
    }
  },

  setup () {
    const { isDarkMode } = useGlobal()

    const tradeHistoryHeaders: {
      property: string;
      label: string;
      sortable: boolean;
      minWidth: number;
    }[] = [
      { property: 'bot', label: 'Bot', sortable: false, minWidth: 120 },
      { property: 'pair', label: 'Pair', sortable: false, minWidth: 150 },
      { property: 'started', label: 'Started', sortable: false, minWidth: 120 },
      { property: 'completed', label: 'Completed', sortable: false, minWidth: 120 },
      { property: 'amount', label: 'Amount', sortable: false, minWidth: 120 },
      { property: 'totalExecuted', label: 'Total Executed', sortable: false, minWidth: 100 },
      { property: 'totalGained', label: 'Total Gained', sortable: false, minWidth: 100 },
      { property: 'profitPercentage', label: 'Profit %', sortable: false, minWidth: 100 }
    ]

    const openedItems = ref<string[]>([])

    return {
      isDarkMode,
      tradeHistoryHeaders,
      openedItems,
      collapsedItemColor,
      formatNumber
    }
  }
})
</script>

<style lang="scss" scoped>
.my-trade-history {
  &__table {
    min-height: 300px;
    max-height: 500px;
  }
}
</style>
