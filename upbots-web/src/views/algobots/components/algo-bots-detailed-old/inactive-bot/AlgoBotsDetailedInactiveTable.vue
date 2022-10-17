<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- LOADING -->
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center w-full px-20"
      style="max-height: 384px;"
    >
      <AppSkeleton type="table" view-box="0 0 1000 550" class="h-full w-full" />
    </div>

    <!-- CONTENT -->
    <template v-else>
      <AppTable
        v-model:dataset="data"
        :headers="tableHeaders"
        class="flex-col pb-20"
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
        <!-- TODO: Create a func to check minimum digits of entry/price -->
        <template #entryPrice="{ row }">
          <AppTruncatedTooltip :content="row?.entryPrice ?
            row.entryPrice < 0.01 ? row.entryPrice.toFixed(8) :
            row.entryPrice.toFixed(2) : '-'"
          />
        </template>

        <!-- CLOSE PRICE -->
        <template #closePrice="{ row }">
          <AppTruncatedTooltip :content="row?.closePrice ?
            row.closePrice < 0.01 ? row.closePrice.toFixed(8) :
            row.closePrice.toFixed(2) : '-'"
          />
        </template>

        <!-- PRIFIT PERCENTAGE -->
        <template #profitPercentage="{ row }">
          <AppFormatNumber
            :data="row?.profitPercentage"
            percent
            text-size="text-md"
            :is-show-zero="false"
          />
        </template>

        <!-- OPEN AT -->
        <template #openAt="{ row }">
          <AppTruncatedTooltip :content="row.openAt ? $filters.date(row.openAt) : '-'" />
        </template>

        <!-- CLOSE AT -->
        <template #closeAt="{ row }">
          <AppTruncatedTooltip :content="row.closeAt ? $filters.date(row.closeAt) : '-'" />
        </template>
      </AppTable>
    </template>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <AppCard class="flex flex-col flex flex-col flex-grow w-full relative overflow-y-auto custom-scrollbar">
      <!-- MOBILE LOADING -->
      <AppLoader v-if="loading" />

      <!-- MOBILE CONTENT -->
      <template v-else>
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
                class="grid grid-cols-4 gap-x-10 py-20 pl-12 -ml-12 pr-40 -mr-12"
                :class="collapsedItemColor(collapsed)"
              >
                <!-- OPEN DATE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Date</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white text-sm capitalize"
                    :content="item.openAt ? $filters.date(item.openAt, 'DD/MM/YY') : '-'"
                  />
                </div>

                <!-- SIDE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Side</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.stratType"
                  />
                </div>

                <!-- STATUS -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Status</span>
                  <div :class="item.open ? 'text-green-200' : 'text-gull-gray'" class="text-sm">
                    {{ item.open ? "OPEN" : "CLOSED" }}
                  </div>
                </div>

                <!-- PROFIT -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Profit</span>
                  <AppFormatNumber
                    :data="item?.profitPercentage"
                    percent
                    text-size="text-sm"
                    :is-show-zero="false"
                  />
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div
                class="grid grid-cols-3 gap-10 pb-20 pl-12 -ml-12 pr-40 -mr-12"
                :class="collapsedItemColor(collapsed)"
              >
                <!-- PAIR -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Pair</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.sbl"
                  />
                </div>

                <!-- ENTRY PRICE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Entry Price</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item?.entryPrice ?
                      item.entryPrice < 0.01 ? item.entryPrice.toFixed(8) :
                      item.entryPrice.toFixed(2) : '-'"
                  />
                </div>

                <!-- CLOSE PRICE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Close Price</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item?.closePrice ?
                      item.closePrice < 0.01 ? item.closePrice.toFixed(8) :
                      item.closePrice.toFixed(2) : '-'"
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
            </template>
          </AppCollapseItem>
        </AppCollapse>
      </template>
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { IPerformanceBotCycles } from '@/types'

export default defineComponent({
  name: 'AlgoBotsDetailedInactiveTable',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    botHistory: {
      type: Array as PropType<IPerformanceBotCycles[]>,
      required: true
    }
  },

  setup (props) {
    // MODE //
    const { isDarkMode } = useGlobal()

    const data = computed(() => props.botHistory)

    // TABLE HEADERS //
    const tableHeaders = [
      { property: 'sbl', label: 'Pair', minWidth: 130 },
      { property: 'status', label: 'Status', minWidth: 100 },
      { property: 'stratType', label: 'Side', minWidth: 100 },
      { property: 'entryPrice', label: 'Entry Price', minWidth: 100 },
      { property: 'closePrice', label: 'Close Price', minWidth: 100 },
      { property: 'profitPercentage', label: 'Profit/Loss', width: 100 },
      { property: 'openAt', label: 'Started', minWidth: 150 },
      { property: 'closeAt', label: 'Completed', minWidth: 150 }
    ]

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

    return {
      data,
      tableHeaders,
      openedItems,
      collapsedItemColor
    }
  }
})
</script>
