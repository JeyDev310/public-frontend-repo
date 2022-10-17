<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- LOADING -->
    <div
      v-if="loading || botPerfSubscriptionCyclesLoading"
      class="flex flex-col items-center justify-center w-full h-full px-20"
    >
      <AppSkeleton type="table" view-box="0 0 1000 550" class="h-full w-full" />
    </div>

    <!-- CONTENT -->
    <template v-else>
      <!-- DESKTOP VIEW -->
      <template v-if="!isMD">
        <AppTable
          v-model:dataset="botPerfSubscriptionCycles"
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
            <AppTruncatedTooltip :content="row.entryPrice ?
              row.entryPrice < 0.01 ? row.entryPrice.toFixed(8) :
              row.entryPrice.toFixed(getPriceDecimal) : '-'"
            />
          </template>

          <!-- CLOSE PRICE -->
          <template #closePrice="{ row }">
            <AppTruncatedTooltip :content="row.closePrice ?
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
            <AppTruncatedTooltip :content="row?.openAt ? $filters.date(row.openAt) : '-'" />
          </template>

          <!-- CLOSE AT -->
          <template #closeAt="{ row }">
            <AppTruncatedTooltip :content="row?.closeAt ? $filters.date(row.closeAt) : '-'" />
          </template>

          <!-- ACTION CLOSE -->
          <template #actions="{ row }">
            <AppButton
              v-if="row.open"
              size="xs"
              class="flex flex-col items-center justify-center h-full"
              @click="closeTrading(row.stratType)"
            >
              Close
            </AppButton>
          </template>
        </AppTable>
      </template>

      <!-- MOBILE VIEW -->
      <template v-else>
        <AppCollapse
          v-model="mobileCollapseItems"
          :data="botPerfSubscriptionCycles"
          class="flex flex-col flex-grow w-full"
        >
          <AppCollapseItem
            v-for="(item, index) of botPerfSubscriptionCycles"
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
                      Realised Gain
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
                    type="primary-border-filled"
                    @click="closeTrading(item.stratType)"
                  >
                    Close
                  </AppButton>
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
import { defineComponent, computed, reactive, toRefs } from 'vue'

import { algoBotsService } from '@/services'
import { EErrorsMessage, TStratType } from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

import { botTags } from '@/components/algobots/data'

export default defineComponent({
  name: 'MyBotDetailedMyTradeHistory',

  setup () {
    const { isDarkMode } = useGlobal()
    const { isMD } = useCustomBreakpoints()
    const {
      bot,
      subscriptionBot,
      botPerfSubscriptionCycles,
      botPerfSubscriptionCyclesLoading,
      fetchBotPerformanceSubscriptionCyclesById
    } = useMyBotDetailed()

    /* STATE */
    const state = reactive({
      loading: false as boolean,
      mobileCollapseItems: [] as string[]
    })

    const tableHeaders: { property: string; label: string; width?: number; minWidth?: number; }[] = [
      { property: 'sbl', label: 'Pair', minWidth: 130 },
      { property: 'status', label: 'Status', minWidth: 100 },
      { property: 'stratType', label: 'Side', width: 100 },
      { property: 'entryPrice', label: 'Entry Price', minWidth: 100 },
      { property: 'closePrice', label: 'Close Price', minWidth: 100 },
      { property: 'realisedGain', label: 'Realised Gain', minWidth: 170 },
      { property: 'profitPercentage', label: 'Profit/Loss', width: 100 },
      { property: 'openAt', label: 'Started', minWidth: 150 },
      { property: 'closeAt', label: 'Completed', minWidth: 150 },
      { property: 'actions', label: '', minWidth: 100 }
    ]

    const getBotTag = computed(() => botTags.find((tag) => tag.botRef === (bot.value?.botRef || '')))

    const getPriceDecimal = computed((): number => getBotTag.value?.priceDecimal || 2)

    function collapsedItemColor (collapsed: boolean): string {
      if (!collapsed && isDarkMode.value) {
        return 'bg-crow-black-second bg-opacity-40'
      } else if (!collapsed && !isDarkMode.value) {
        return 'bg-azureish-white bg-opacity-40'
      } else {
        return ''
      }
    }

    async function closeTrading (stratType: TStratType): Promise<void> {
      const isAllow = await appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to close the trade?',
        actionsName: ['Cancel', 'Submit']
      })

      if (isAllow) {
        state.loading = true
        try {
          await algoBotsService.closeBotOrder(
            {
              botId: subscriptionBot.value.botId,
              botSubId: subscriptionBot.value.id,
              stratType
            }
          )
          await fetchBotPerformanceSubscriptionCyclesById(subscriptionBot.value.id)
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          state.loading = false
        }
      }
    }

    return {
      ...toRefs(state),
      isMD,
      botPerfSubscriptionCycles,
      botPerfSubscriptionCyclesLoading,
      getPriceDecimal,
      tableHeaders,
      closeTrading,
      collapsedItemColor
    }
  }
})
</script>
