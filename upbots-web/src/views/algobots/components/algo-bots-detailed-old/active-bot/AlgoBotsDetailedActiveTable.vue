<template>
  <mq-layout mq="lg+" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- LOADING -->
    <div
      v-if="loading || algoBotsDetailedLoading"
      class="flex flex-col items-center justify-center w-full h-full px-20"
    >
      <AppSkeleton type="table" view-box="0 0 1000 550" class="h-full w-full" />
    </div>

    <!-- CONTENT -->
    <template v-else>
      <AppTable
        v-model:dataset="getPerfSubscriptionCyclesData"
        :headers="tableHeaders"
        class="flex-col"
        sort-front-side
        :is-table-wrap-styled="false"
      >
        <!-- STATUS -->
        <template #status="{ row }">
          <div :class="row.open ? 'text-green-200' : 'text-gull-gray'">
            {{ row.open ? "OPEN" : "CLOSED" }}
          </div>
        </template>

        <!-- ENTRY PRICE -->
        <template #entryPrice="{ row }">
          <AppTruncatedTooltip :content="row?.entryPrice ?
            row.entryPrice < 0.01 ? row.entryPrice.toFixed(8) :
            row.entryPrice.toFixed(getPriceDecimal) : '-'"
          />
        </template>

        <!-- CLOSE PRICE -->
        <template #closePrice="{ row }">
          <AppTruncatedTooltip :content="row?.closePrice ?
            row.closePrice < 0.01 ? row.closePrice.toFixed(8) :
            row.closePrice.toFixed(getPriceDecimal) : '-'"
          />
        </template>

        <!-- REALISED GAIN -->
        <template #realisedGain="{ row }">
          <AppFormatNumber :data="row?.realisedGain?.usd" :is-show-zero="false" />
        </template>

        <!-- PRIFIT PERCENTAGE -->
        <template #profitPercentage="{ row }">
          <AppFormatNumber :data="row?.profitPercentage" percent :is-show-zero="false" />
        </template>

        <!-- OPEN AT -->
        <template #openAt="{ row }">
          <AppTruncatedTooltip :content="row.openAt ? $filters.date(row.openAt) : '-'" />
        </template>

        <!-- CLOSE AT -->
        <template #closeAt="{ row }">
          <AppTruncatedTooltip :content="row.closeAt ? $filters.date(row.closeAt) : '-'" />
        </template>

        <!-- ACTION CLOSE -->
        <!-- ACTION CLOSE -->
        <template #actions="{ row }">
          <AppButton
            v-if="row.open"
            size="xs"
            class="flex flex-col items-center justify-center h-full"
            @click="closeTrading"
          >
            Close
          </AppButton>
        </template>
      </AppTable>
    </template>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full relative overflow-y-auto custom-scrollbar">
    <!-- MOBILE LOADING -->
    <AppLoader v-if="loading" />

    <!-- MOBILE CONTENT -->
    <template v-else>
      <AppCollapse v-model="openedItems" :data="getPerfSubscriptionCyclesData" class="flex flex-col flex-grow w-full">
        <AppCollapseItem
          v-for="(item, index) of getPerfSubscriptionCyclesData"
          :key="index"
          :name="index.toString()"
          class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
        >
          <!-- PREVIEW -->
          <template #header="{ collapsed }">
            <div
              class="grid grid-cols-4 gap-x-10 py-20 pl-12 -ml-12 pr-40 -mr-12"
              :class="collapsedItemColor(collapsed)"
            >
              <div class="flex flex-col items-center space-y-2">
                <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Date</span>
                <AppTruncatedTooltip
                  class="text-beguiling-blue dark:text-white text-sm capitalize"
                  :content="item.openAt ? $filters.date(item.openAt, 'DD/MM/YY') : '-'"
                />
              </div>

              <div class="flex flex-col items-center space-y-2">
                <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Side</span>
                <AppTruncatedTooltip
                  class="text-beguiling-blue dark:text-white capitalize text-sm"
                  :content="item.stratType"
                />
              </div>

              <div class="flex flex-col items-center space-y-2">
                <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Status</span>
                <div :class="item.open ? 'text-green-200' : 'text-gull-gray'" class="text-sm">
                  {{ item.open ? "OPEN" : "CLOSED" }}
                </div>
              </div>

              <div class="flex flex-col items-center space-y-2">
                <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Profit</span>
                <AppFormatNumber
                  :data="item?.profitPercentage"
                  percent
                  :is-show-zero="false"
                  text-size="text-sm"
                />
              </div>
            </div>
          </template>

          <!-- CONTENT -->
          <template #content="{ collapsed }">
            <div class="flex flex-col pb-20 pl-12 -ml-12 pr-40 -mr-12" :class="collapsedItemColor(collapsed)">
              <div class="grid grid-cols-3 gap-10">
                <!-- PAIR -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Pair</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.sbl"
                  />
                </div>

                <!-- RIALISED GAIN -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-center text-sm">
                    Realised Gain (USDT)
                  </div>
                  <AppFormatNumber :data="item?.realisedGain?.usd" :is-show-zero="false" text-size="text-SM" />
                </div>

                <!-- ENTRY PRICE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Entry Price</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item?.entryPrice ?
                      item.entryPrice < 0.01 ? item.entryPrice.toFixed(8) :
                      item.entryPrice.toFixed(getPriceDecimal) : '-'"
                  />
                </div>

                <!-- CLOSE PRICE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Close Price</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item?.closePrice ?
                      item.closePrice < 0.01 ? item.closePrice.toFixed(8) :
                      item.closePrice.toFixed(getPriceDecimal) : '-'"
                  />
                </div>

                <!-- COMPLETED -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Completed</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.closeAt ? $filters.date(item.closeAt, 'DD/MM/YY') : '-'"
                  />
                </div>
              </div>

              <!-- ACTION CLOSE -->
              <div v-if="item.open" class="grid grid-cols-2 mt-20">
                <AppButton
                  class="flex flex-col items-center justify-center h-full"
                  type="grey-outlined"
                  @click="closeTrading"
                >
                  Close
                </AppButton>
              </div>
            </div>
          </template>
        </AppCollapseItem>
      </AppCollapse>
    </template>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch } from 'vue'
import { algoBotsService } from '@/services'
import { vuex } from '@/store'
import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedActiveTable',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup () {
    /* USE GLOBAL SETUP */
    const { isDarkMode } = useGlobal()

    /* USE ALGO BOTS DETAILED SETUP */
    const {
      getBotDummyTagsData,
      algoBotsDetailedLoading,
      getPerfSubscriptionCyclesData
    } = useAlgoBotsDetailed()

    /* USE ALGO BOTS SETUP */
    const { getAlgobotsSubscriptionById } = useAlgoBots()

    // LOADING //
    const loading = ref<boolean>(false)

    // MOBILE OPENED ITEMS //
    const openedItems = ref<string[]>([])

    function collapsedItemColor (collapsed: boolean) {
      if (!collapsed && isDarkMode.value) {
        return 'bg-crow-black-second bg-opacity-40'
      } else if (!collapsed && !isDarkMode.value) {
        return 'bg-azureish-white bg-opacity-40'
      } else {
        return ''
      }
    }

    const getPriceDecimal = computed((): number => {
      const decimal = getBotDummyTagsData?.value?.priceDecimal || 2
      return decimal
    })

    // TABLE HEADERS //
    const tableHeaders = [
      { property: 'sbl', label: 'Pair', minWidth: 130 },
      { property: 'status', label: 'Status', minWidth: 100 },
      { property: 'stratType', label: 'Side', width: 100 },
      { property: 'entryPrice', label: 'Entry Price', minWidth: 100 },
      { property: 'closePrice', label: 'Close Price', minWidth: 100 },
      { property: 'realisedGain', label: 'Realised Gain (USDT)', minWidth: 170 },
      { property: 'profitPercentage', label: 'Profit/Loss', width: 100 },
      { property: 'openAt', label: 'Started', minWidth: 150 },
      { property: 'closeAt', label: 'Completed', minWidth: 150 },
      { property: 'actions', label: '', minWidth: 100 }
    ]

    // Fetch Performance Cycles Data
    async function fetchPerformanceSubscriptionCyclesById () {
      try {
        const subId = getAlgobotsSubscriptionById.value?.id
        await vuex.algobots.fetchPerformanceSubscriptionCyclesById({ id: subId as string, isNotify: true })
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
      }
    }
    watch(() => vuex.algobots.performanceCyclesUpdated, () => {
      fetchPerformanceSubscriptionCyclesById()
    })

    // Close Trade //
    async function closeTrading () {
      const perfeeRes: any = await algoBotsService.getCurrentPerformanceFee({ botId: getAlgobotsSubscriptionById.value?.botId || '', botSubId: getAlgobotsSubscriptionById.value?.id || '' })
      const currentPerfee = perfeeRes?.data?.result || 0
      const perfeesBotDeletionText = `Hey, if you close the trading now, ${currentPerfee.toFixed(4)}
                                      UBXT will be deducted from your balance to pay for the performance fees`

      const isAllow = await appConfirm({
        title: 'Are you sure?',
        body: perfeesBotDeletionText,
        actionsName: ['Cancel', 'Close']
      })
      if (isAllow && getAlgobotsSubscriptionById.value) {
        loading.value = true
        try {
          await algoBotsService.closeBotOrder({ botId: getAlgobotsSubscriptionById.value?.botId || '', botSubId: getAlgobotsSubscriptionById.value?.id || '' })
        } catch (error) {
          appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
        } finally {
          loading.value = false
        }
      }
    }

    return {
      algoBotsDetailedLoading,
      getPerfSubscriptionCyclesData,

      getPriceDecimal,
      openedItems,
      tableHeaders,
      collapsedItemColor,
      closeTrading
    }
  }
})
</script>
