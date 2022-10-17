<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+" class="flex flex-col flex-grow w-full relative overflow-y-auto custom-scrollbar">
    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xlg" />

    <!-- TABLE DATA -->
    <AppTable :dataset="data" :headers="openTradesHeaders" class="my-open-trades__table">
      <!-- TITLE -->
      <template #tableTitle>
        <mq-layout mq="lg+" class="flex justify-between items-center px-20 4xl:px-30 pb-14">
          <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
            Open Trades
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
          <AppTruncatedTooltip :content="`${row.pair[0]}/${row.pair[1]}`" class="ml-10" />
        </div>
      </template>

      <!-- DATE -->
      <template #date="{ row }">
        <AppTruncatedTooltip :content="row.date ? $filters.date(row.date) : '-'" />
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

      <!-- CURRENT PROFIT PERCENTAGE -->
      <template #currentProfitPercentage="{ row }">
        <AppFormatNumber :data="getCurrentProfitPercent(row)" percent />
      </template>

      <!-- CURRENT GAIN -->
      <template #currentGain="{ row }">
        <AppFormatNumber :data="getCurrentGain(row)" />
      </template>

      <!-- VIEW -->
      <template #view="{ row }">
        <router-link :to="{ name: getBotDetailedRedirectRoute(row.category), params: { id: row.botId, name: row.bot }}">
          <AppIcon
            name="eye"
            size="18"
            class="text-chicory-flower dark:text-blair cursor-pointer"
          />
        </router-link>
      </template>
    </AppTable>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <AppCard
      class="
        my-open-trades__table
        flex
        flex-col
        flex-grow
        w-full
        pt-20
        overflow-y-auto
        custom-scrollbar
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
        My Open Trades
      </p>

      <div
        class="flex flex-col relative w-full pb-10 overflow-y-auto custom-scrollbar"
        :class="{'flex-grow': !data.length}"
      >
        <!-- LOADER -->
        <AppLoader v-if="loading" size="sm" class="rounded-b-xlg" />

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
                <!-- BOT & PAIR -->
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

                <!-- CURRENT PROFIT -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium">Current Profit %</div>
                  <AppFormatNumber :data="getCurrentProfitPercent(item)" percent />
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
                  <!-- CURRENT GAIN -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Current Gain</div>
                    <AppFormatNumber :data="getCurrentGain(item)" />
                  </div>

                  <!-- AMOUNT -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Amount</div>
                    <AppTruncatedTooltip
                      :content="item.amount ? `${item.amount} ${item.pair[0]}` : 'N/A'"
                      class="text-beguiling-blue dark:text-white"
                    />
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

                  <!-- DATE -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Date</div>
                    <AppTruncatedTooltip
                      :content="item.date ? $filters.date(item.date) : '-'"
                      class="text-beguiling-blue dark:text-white capitalize"
                    />
                  </div>

                  <!-- REDIRECT BUTTON -->
                  <div class="col-span-2 mt-10">
                    <router-link
                      #default="{ navigate }"
                      :to="{
                        name: getBotDetailedRedirectRoute(item.category),
                        params: { id: item.botId, name: item.bot }
                      }"
                      custom
                    >
                      <AppButton
                        type="grey-outlined"
                        class="w-full"
                        rounded="lg"
                        @click="navigate()"
                      >
                        See more
                      </AppButton>
                    </router-link>
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

import { routeNames } from '@/router'

import { collapsedItemColor, formatNumber } from '@/core/helpers'

import { IMyOpenTrade } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'

export default defineComponent({
  name: 'MyOpenTrades',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    data: {
      type: Array as PropType<IMyOpenTrade[]>,
      required: true
    },

    coinPrices: {
      type: Object as PropType<{[pair: string]: number;}>,
      required: true
    }
  },

  setup (props) {
    const { isDarkMode } = useGlobal()
    const { getBotDetailedRedirectRoute } = useBots()

    const openTradesHeaders: {
      property: string;
      label: string;
      sortable: boolean;
      minWidth: number;
    }[] = [
      { property: 'bot', label: 'Bot', sortable: false, minWidth: 120 },
      // { property: 'side', label: 'Side', sortable: false }, Need to wait for API update
      { property: 'pair', label: 'Pair', sortable: false, minWidth: 160 },
      { property: 'date', label: 'Date', sortable: false, minWidth: 120 },
      { property: 'amount', label: 'Amount', sortable: false, minWidth: 120 },
      { property: 'totalExecuted', label: 'Total Executed', sortable: false, minWidth: 120 },
      { property: 'currentProfitPercentage', label: 'Current Profit %', sortable: false, minWidth: 120 },
      { property: 'currentGain', label: 'Current Gain', sortable: false, minWidth: 120 },
      { property: 'view', label: 'View', sortable: false, minWidth: 80 }
    ]

    const openedItems = ref<string[]>([])

    function getCurrentProfitPercent (item: IMyOpenTrade) {
      if (props.coinPrices && props.coinPrices[item.pairLabel]) {
        return (props.coinPrices[item.pairLabel] - item.entryPrice) * 100 / item.entryPrice
      }
      return 0
    }

    function getCurrentGain (item: IMyOpenTrade) {
      if (props.coinPrices && props.coinPrices[item.pairLabel]) {
        return (props.coinPrices[item.pairLabel] - item.entryPrice) * item.totalExecuted / item.entryPrice
      }
      return 0
    }

    return {
      isDarkMode,
      routeNames,
      openTradesHeaders,
      openedItems,
      formatNumber,
      collapsedItemColor,
      getCurrentProfitPercent,
      getCurrentGain,
      getBotDetailedRedirectRoute
    }
  }
})
</script>

<style lang="scss" scoped>
.my-open-trades {
  &__table {
    min-height: 300px;
    max-height: 500px;
  }
}
</style>
