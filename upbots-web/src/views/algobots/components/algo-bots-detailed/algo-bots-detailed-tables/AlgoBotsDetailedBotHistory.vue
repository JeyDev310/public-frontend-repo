<template>
  <!-- DESKTOP VIEW -->
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- LOADING -->
    <div
      v-if="botPerformanceCyclesLoading"
      class="flex flex-col items-center justify-center w-full h-full px-20"
    >
      <AppSkeleton type="table" view-box="0 0 1000 550" class="h-full w-full" />
    </div>

    <!-- CONTENT -->
    <template v-else>
      <template v-if="!isMD">
        <AppTable
          v-model:dataset="botPerformanceCycles"
          :headers="tableHeaders"
          class="flex-col pb-20"
          sort-front-side
          :is-table-wrap-styled="false"
        >
          <!-- TITLE -->
          <template v-if="isTableTitle" #tableTitle>
            <p class="text-md 4xl:text-lg text-nile-blue dark:text-blair font-medium px-20 4xl:px-30 py-14">
              Bot History
            </p>
          </template>

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

          <!-- PRIFIT PERCENTAGE -->
          <template #profitPercentage="{ row }">
            <AppFormatNumber
              :data="row?.profitPercentage"
              percent
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

      <!-- MOBILE VIEW -->
      <template v-else>
        <AppCollapse
          v-model="mobileCollapseItems"
          :data="botPerformanceCycles"
          class="flex flex-col flex-grow w-full"
        >
          <AppCollapseItem
            v-for="(item, index) of botPerformanceCycles"
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
                    :is-show-zero="false"
                    text-size="text-sm"
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
                <!-- TODO: Create a func to check minimum digits of entry/price -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Entry Price</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item?.entryPrice ?
                      item.entryPrice < 0.01 ?
                        item.entryPrice.toFixed(8):
                        item.entryPrice.toFixed(getPriceDecimal) : '-'"
                  />
                </div>

                <!-- CLOSE PRICE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Close Price</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item?.closePrice ?
                      item.closePrice < 0.01 ?
                        item.closePrice.toFixed(8):
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
            </template>
          </AppCollapseItem>
        </AppCollapse>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useAlgoBotsDetailed } from '../algo-bots-detailed.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedBotHistory',

  props: {
    isTableTitle: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup () {
    const { isDarkMode } = useGlobal()
    const { isMD } = useCustomBreakpoints()
    const { bot, botPerformanceCycles, botPerformanceCyclesLoading } = useAlgoBotsDetailed()

    const state = reactive({
      mobileCollapseItems: [] as string[]
    })

    const getPriceDecimal = computed((): number => {
      // const decimal = getFilteredTagsByBotRef.value?.priceDecimal || 2
      const decimal = bot.value?.priceDecimal || 2
      return decimal
    })

    const tableHeaders: { property: string; label: string; width?: number; minWidth?: number; }[] = [
      { property: 'sbl', label: 'Pair', minWidth: 130 },
      { property: 'status', label: 'Status', minWidth: 100 },
      { property: 'stratType', label: 'Side', minWidth: 100 },
      { property: 'entryPrice', label: 'Entry Price', minWidth: 100 },
      { property: 'closePrice', label: 'Close Price', minWidth: 100 },
      { property: 'profitPercentage', label: 'Profit/Loss', width: 100 },
      { property: 'openAt', label: 'Started', minWidth: 150 },
      { property: 'closeAt', label: 'Completed', minWidth: 150 }
    ]

    function collapsedItemColor (collapsed: boolean): string {
      if (!collapsed && isDarkMode.value) {
        return 'bg-crow-black-second bg-opacity-40'
      } else if (!collapsed && !isDarkMode.value) {
        return 'bg-azureish-white bg-opacity-40'
      } else {
        return ''
      }
    }

    return {
      ...toRefs(state),
      isMD,
      botPerformanceCycles,
      botPerformanceCyclesLoading,
      tableHeaders,
      getPriceDecimal,
      collapsedItemColor
    }
  }
})
</script>
