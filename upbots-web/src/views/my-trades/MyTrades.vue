<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">My Trades</h2>
    </Portal>

    <div class="flex flex-col space-y-20 md:space-y-30">
      <div class="grid grid-cols-1 xl:grid-cols-4">
        <!-- TOTAL PROFIT -->
        <div
          class="
            flex
            xl:flex-col
            justify-center
            items-center
            relative
            space-x-20
            xl:space-x-0
            xl:space-y-20
            mb-20
            xl:mb-0
            mr-10
            lg:mr-20
            3xl:mr-60
          "
        >
          <p class="text-nile-blue dark:text-let-it-snow lg:text-lg font-semibold flex-shrink-0">
            {{ !isXL ? 'Total Profit' : 'Total Profit:' }}
          </p>

          <div class="flex items-center">
            <!-- DESKTOP -->
            <template v-if="!isXL">
              <!-- LOADER -->
              <template v-if="myTradesLoading">
                <AppLoader size="xs" class="rounded-xlg" />
              </template>
              <!-- DATA -->
              <template v-else>
                <AppFormatNumber
                  :data="getTotalProfit"
                  :to-fixed="3"
                  text-size="text-md lg:text-xl"
                  not-available-classes="text-ball-blue dark:text-hidden-sea-glass"
                  negative-classes="text-ball-blue dark:text-hidden-sea-glass"
                  positive-classes="text-ball-blue dark:text-hidden-sea-glass"
                  class="text-ball-blue dark:text-hidden-sea-glass font-semibold"
                />
                <span class="text-ball-blue dark:text-hidden-sea-glass font-semibold text-md lg:text-xl ml-4">USD</span>
              </template>
            </template>

            <!-- TABLET / MOBILE -->
            <template v-else>
              <!-- LOADER -->
              <template v-if="myTradesLoading">
                <!-- TODO ADD COMPONENT FOR TEXT LOADING -->
                <span class="text-nile-blue dark:text-let-it-snow font-semibold md:text-md">Loading...</span>
              </template>

              <!-- DATA -->
              <template v-else>
                <AppFormatNumber
                  :data="getTotalProfit"
                  :to-fixed="3"
                  text-size="text-md lg:text-xl"
                  not-available-classes="text-ball-blue dark:text-hidden-sea-glass"
                  negative-classes="text-ball-blue dark:text-hidden-sea-glass"
                  positive-classes="text-ball-blue dark:text-hidden-sea-glass"
                  class="text-ball-blue dark:text-hidden-sea-glass font-semibold"
                />
                <span class="text-ball-blue dark:text-hidden-sea-glass font-semibold text-md lg:text-xl ml-4">USD</span>
              </template>
            </template>
          </div>
        </div>

        <!-- TRADE CARDS -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-y-0 lg:gap-x-20 xl:col-span-3 3xl:gap-x-60">
          <!-- TOTAL PROFIT -->
          <MyTradesCard title="7 days profit ($)">
            <!-- LOADER -->
            <template v-if="myTradesLoading">
              <AppLoader size="xs" class="rounded-xlg" />
            </template>

            <!-- DATA -->
            <template v-else>
              <AppFormatNumber
                :data="get7daysProfit"
                :to-fixed="3"
                text-size="text-md md:text-lg lg:text-4xl"
                not-available-classes="text-white"
                negative-classes="text-white"
                positive-classes="text-white"
                class="justify-center lg:justify-start font-semibold"
              />
            </template>
          </MyTradesCard>

          <!-- OPEN TRADES -->
          <MyTradesCard title="Open Trades">{{ getFilteredOpenTrades.length }}</MyTradesCard>

          <!-- ACTIVE BOTS -->
          <MyTradesCard title="Active Bots">
            <!-- LOADER -->
            <template v-if="activeBotsLoading">
              <AppLoader size="xs" class="rounded-xlg" />
            </template>

            <!-- DATA -->
            <template v-else>
              <span>{{ getSubscribedBots }}</span>
              <span class="text-md2 lg:text-md text-let-it-snow ml-0">/{{ totalActiveBots }}</span>
            </template>
          </MyTradesCard>

          <!-- COMPLETED TRADES -->
          <MyTradesCard title="Completed trades">
            <!-- LOADER -->
            <template v-if="myTradesLoading">
              <AppLoader size="xs" class="rounded-xlg" />
            </template>

            <!-- DATA -->
            <template v-else>
              {{ getTradeHistory.length }}
            </template>
          </MyTradesCard>
        </div>
      </div>

      <!-- OPEN TRADES -->
      <MyOpenTrades :data="getFilteredOpenTrades" :coin-prices="prices" :loading="myTradesLoading" />

      <!-- TRADE HISTORY -->
      <MyTradeHistory :data="getTradeHistory" :loading="myTradesLoading" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'

import { useMyTrades } from '@/views/my-trades/my-trades.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'

import MyTradesCard from '@/views/my-trades/components/MyTradesCard.vue'
import MyOpenTrades from '@/views/my-trades/components/MyOpenTrades.vue'
import MyTradeHistory from '@/views/my-trades/components/MyTradeHistory.vue'

export default defineComponent({
  name: 'MyTrades',

  components: { MyTradesCard, MyOpenTrades, MyTradeHistory },

  setup () {
    const { subscriptedBots, totalActiveBots } = useBots()
    const { isXL } = useCustomBreakpoints()
    const {
      myTradesLoading,
      activeBotsLoading,
      getOpenTrades,
      prices,
      getTradeHistory,
      getTotalProfit,
      get7daysProfit,
      getSubscribedBots,
      initMyTradesData
    } = useMyTrades()

    /**
     * FILTER: We need only trades related to the subscribed bots
     */
    const getFilteredOpenTrades = computed(() => {
      const subscribedBotIds = subscriptedBots.value.map((bot) => bot.botId)
      return getOpenTrades.value.filter((trade) => subscribedBotIds.includes(trade.botId))
    })

    /* INIT MY TRADES DATA */
    onMounted(() => { initMyTradesData() })

    return {
      isXL,
      myTradesLoading,
      activeBotsLoading,
      prices,
      totalActiveBots,
      getTradeHistory,
      getTotalProfit,
      get7daysProfit,
      getFilteredOpenTrades,
      getSubscribedBots
    }
  }
})
</script>
