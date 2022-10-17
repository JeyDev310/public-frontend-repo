<template>
  <AppCard class="flex flex-col flex-grow w-full py-10 overflow-y-auto custom-scrollbar relative">
    <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- LOADING -->
      <AppLoader v-if="subscriptionAuditsLoading || botPerfSubscriptionCyclesLoading" />

      <!-- CONTENT -->
      <template v-else>
        <template v-if="botSubscriptionAudits.length">
          <AppCollapse
            v-model="mobileCollapseItems"
            :data="botSubscriptionAudits"
            class="flex flex-col w-full"
          >
            <AppCollapseItem
              v-for="(item, index) of botSubscriptionAudits"
              :key="index"
              :name="index.toString()"
              class="border-b border-solid border-tugce-silver dark:border-rushing-river-second mx-12"
              :class="!subscriptionBot.enabled && 'last:border-none' "
            >
              <!-- PREVIEW -->
              <template #header="{ collapsed }">
                <!-- COMPLETED ITEM -->
                <template v-if="item?.oTrackId?.completed">
                  <div
                    class="flex items-center justify-between space-x-10 py-20 pl-12 -ml-12 pr-50 -mr-12"
                    :class="getColor(collapsed)"
                  >
                    <div class="flex items-center space-x-10 pl-10">
                      <AppTruncatedTooltip
                        class="text-beguiling-blue dark:text-white capitalize text-sm"
                        :content="item.createdAt ? $filters.date(item.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A'"
                      />
                      <span class="text-nile-blue dark:text-white text-sm">-</span>
                      <span
                        :style="`width: ${emojiData.rocket.size}px`"
                        class="text-nile-blue dark:text-white"
                        v-html="emojiData.rocket.code"
                      />
                      <span
                        class="capitalize text-sm"
                        :class="item?.oTrackId?.ctxBot === 'open' ? 'text-spring-bouquet' : 'text-alexandria'"
                      >
                        {{ item?.oTrackId?.ctxBot === 'open' ? 'Opened' : 'Closed' }}
                      </span>
                    </div>

                    <AppFormatNumber
                      v-if="item.oTrackId.side === 'Sell' && getProfitTrade(item)"
                      :data="getProfitTrade(item).profitPercentage"
                      percent
                      text-size="text-sm"
                    />
                  </div>
                </template>

                <!-- INCOMPLETE ITEM -->
                <template v-else>
                  <div
                    class="flex items-center py-20 space-x-10 pl-20 -ml-12 pr-40 -mr-12"
                    :class="getColor(collapsed)"
                  >
                    <div
                      class="flex items-center flex-shrink-0 text-nile-blue dark:text-white text-sm xl:text-md2"
                    >
                      {{ item.createdAt ? $filters.date(item.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A' }}
                    </div>

                    <div class="flex text-nile-blue dark:text-white text-sm">-</div>
                    <div class="flex items-center space-x-10">
                      <span
                        :style="`width: ${emojiData.error.size}px`"
                        class="text-alexandria"
                        v-html="emojiData.error.code"
                      />
                      <span v-if="item.oTrackId && !item.oTrackId.completed" class="text-alexandria text-sm">
                        Error: Exchange issue
                      </span>
                      <span
                        v-else-if="item.errorReason === 'minCost' || item.errorReason === 'minEmount'"
                        class="text-alexandria text-sm"
                      >
                        Error: Not enough capital to trade
                      </span>
                      <span v-else class="text-alexandria text-sm">
                        Error: API code {{ item.errorReason ? item.errorReason : 'N/A' }}
                      </span>
                    </div>
                  </div>
                </template>
              </template>

              <!-- CONTENT ONLY FOR COMPLETED ITEM -->
              <template #content="{ collapsed }">
                <div
                  v-if="item?.oTrackId?.completed"
                  class="grid grid-cols-3 gap-10 pb-20 pl-12 -ml-12 pr-50 -mr-12"
                  :class="getColor(collapsed)"
                >
                  <!-- SIDE (FOR SELL & BUY) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Side
                    </span>
                    <AppTruncatedTooltip
                      class="text-beguiling-blue dark:text-white capitalize text-sm"
                      :content="item.oTrackId.side"
                    />
                  </div>

                  <!-- UBXT BALANCE (FOR SELL) -->
                  <div v-if="item.oTrackId.side === 'Sell'" class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      UBXT Balance
                    </span>
                    <span class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      {{
                        getPerformanceFee(item).remainedAmount ?
                          getPerformanceFee(item).remainedAmount.toFixed(2) :
                          0
                      }} UBXT
                    </span>
                  </div>

                  <!-- QUANTITY EXECUTED (FOR BUY & SELL) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Quantity executed
                    </span>
                    <span class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      {{ item?.oTrackId?.completion?.qExec ? item.oTrackId.completion.qExec.toFixed(6) : 'N/A' }}
                    </span>
                  </div>

                  <!-- PRICE EXECUTED (FOR BUY & SELL) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Price executed
                    </span>
                    <span class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      {{ item?.oTrackId?.completion?.pExec ? item.oTrackId.completion.pExec.toFixed(2) : 'N/A' }}
                    </span>
                  </div>

                  <!-- TOTAL (FOR BUY & SELL) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Total
                    </span>
                    <span class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      {{
                        item?.oTrackId?.completion?.cumulQuoteCost ?
                          item.oTrackId.completion.cumulQuoteCost.toFixed(2) :
                          'N/A'
                      }}
                    </span>
                  </div>

                  <!-- ORDER PLACED AT (FOR BUY & SELL) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Order placed at
                    </span>
                    <span class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      {{ item.oTrackId.orderType }}
                    </span>
                  </div>

                  <!-- EXCHANGE (FOR BUY & SELL) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Exchange
                    </span>
                    <span v-if="item" class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      {{ item?.oTrackId?.exch.toUpperCase() ? item.oTrackId.exch.toUpperCase() : 'N/A' }}
                    </span>
                  </div>

                  <!-- PAIR (BUY) -->
                  <div v-if="item.oTrackId.side === 'Buy'" class="flex flex-col text-center items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair font-medium text-sm">
                      Pair
                    </span>
                    <span v-if="item" class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      {{ item?.oTrackId?.sbl ? item.oTrackId.sbl : 'N/A' }}
                    </span>
                  </div>

                  <!-- QUANTITY ASKED (FOR BUY & SELL) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Quantity Asked
                    </span>
                    <span
                      v-if="item.oTrackId.side === 'Sell'"
                      class="text-beguiling-blue dark:text-white capitalize text-center text-sm"
                    >
                      {{ item?.oTrackId?.qtyBaseAsked ? item.oTrackId.qtyBaseAsked : 'N/A' }}
                    </span>
                    <span v-else class="text-beguiling-blue dark:text-white capitalize text-sm">
                      {{ item?.oTrackId?.completion?.qExec ? item.oTrackId.completion.qExec.toFixed(6) : 'N/A' }}
                    </span>
                  </div>

                  <!-- SIGNAL RECEIVED (FOR BUY & SELL) -->
                  <div class="flex flex-col items-center space-y-2">
                    <span class="text-beguiling-blue dark:text-blair text-center font-medium text-sm">
                      Signal
                    </span>
                    <span class="text-beguiling-blue dark:text-white text-center capitalize text-sm">
                      Received
                    </span>
                  </div>
                </div>

                <div v-else class="px-20 pb-20 -ml-12 -mr-12" :class="getColor(collapsed)">
                  <span v-if="item.oTrackId && !item.oTrackId.completed" class="text-alexandria text-sm">
                    The bot was not able to pass the order, could be due to
                    exchange connexion issue or api settings
                  </span>
                  <span
                    v-else-if="item.errorReason === 'minCost' || item.errorReason === 'minEmount'"
                    class="text-alexandria text-sm"
                  >
                    <span v-if="item?.balance || item?.currency">
                      Capital available: {{ item.balance }} ({{ item.currency }})
                    </span>
                    <span v-else>-</span>
                  </span>
                  <span v-else class="text-alexandria text-sm">
                    Wrong API - create a new one
                  </span>
                </div>
              </template>
            </AppCollapseItem>
          </AppCollapse>
        </template>

        <!-- NO DATA AVAILABLE -->
        <template v-if="!subscriptionBot.enabled && !botSubscriptionAudits.length"> <AppNoData /> </template>

        <div
          v-if="subscriptionBot.enabled"
          class="
          border-b
          border-solid
          border-tugce-silver
          dark:border-rushing-river-second
          last:border-none
          mx-12
        "
        >
          <div class="flex items-center space-x-10 py-20 pl-10">
            <span class="text-nile-blue dark:text-white text-sm">
              {{ $filters.date(subscriptionBot.createdAt, 'YYYY-MM-DD HH:mm:ss') }}
            </span>
            <span class="text-nile-blue dark:text-white text-sm">-</span>
            <span
              :style="`width: ${emojiData.bot.size}px`"
              class="text-nile-blue dark:text-white"
              v-html="emojiData.bot.code"
            />
            <span class="text-nile-blue dark:text-white text-sm">Bot activated</span>
          </div>
        </div>
      </template>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

import { collapsedItemColor } from '@/core/helpers'
import { IAlgobotsSubscriptionAudits } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

import { emojiData } from '@/components/algobots/data'

export default defineComponent({
  name: 'MyBotDetailedMyActivityMobile',

  setup () {
    const { isDarkMode } = useGlobal()
    const {
      subscriptionAuditsLoading,
      botPerfSubscriptionCyclesLoading,
      botSubscriptionAudits,
      subscriptionBot,
      botPerfSubscriptionCycles
    } = useMyBotDetailed()

    const state = reactive({
      mobileCollapseItems: [] as string[]
    })

    function getColor (collapsed: boolean): string {
      return collapsedItemColor(collapsed, isDarkMode.value)
    }

    function getProfitTrade (auditItem: IAlgobotsSubscriptionAudits) {
      return botPerfSubscriptionCycles.value.find((cycleEl) => cycleEl.cycleSequence === auditItem.cycleSequence)
    }

    function getPerformanceFee (auditItem: IAlgobotsSubscriptionAudits) {
      const item = getProfitTrade(auditItem)
      return Object.keys(botPerfSubscriptionCycles.value).length ? (item?.performanceFee || 0) : 0
    }

    return {
      ...toRefs(state),

      subscriptionAuditsLoading,
      botPerfSubscriptionCyclesLoading,
      emojiData,
      botSubscriptionAudits,
      subscriptionBot,
      getColor,
      getPerformanceFee,
      getProfitTrade
    }
  }
})
</script>
