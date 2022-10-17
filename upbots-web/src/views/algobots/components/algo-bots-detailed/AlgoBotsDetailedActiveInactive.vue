<template>
  <div class="flex flex-col flex-grow w-full overflow-y-hidden custom-scrollbar">
    <!-- LOADING -->
    <AppLoader v-if="botGlobalLoading" />

    <!--TITLE -->
    <Portal to="h-title">
      <router-link
        :to="{ name: Object.keys(subscriptionBot).length ? routeNames.myActiveBots : routeNames.algoBots }"
        class="flex items-center"
      >
        <!-- DESKTOP VIEW -->
        <AppIcon
          name="back"
          :size="isMD ? '24' : '30'"
          class="text-nile-blue dark:text-tradewind"
        />
        <h2
          class="text-nile-blue dark:text-let-it-snow"
          :class="isMD ? 'font-semibold text-sm ml-8' : 'md:text-md 3xl:text-lg 4xl:text-xl ml-10'"
        >
          {{ isMD ? 'Back' : !botGlobalLoading ? bot.name : '' }}
        </h2>
      </router-link>
    </Portal>

    <!-- CONTENT -->
    <template v-if="!botGlobalLoading">
      <!-- DESKTOP VIEW -->
      <!-- GRID -->
      <mq-layout
        mq="lg+"
        class="
          algobot-detailed__grid
          grid
          w-full
          gap-x-20
          4xl:gap-x-24
          overflow-y-auto
          custom-scrollbar
        "
      >
        <!-- LEFT SIDE -->
        <!-- SUMMARY CARD -->
        <AlgoBotsDetailedSummary />

        <!-- RIGHT SIDE -->
        <div class="flex flex-grow flex-col w-full space-y-20 3xl:space-y-24 overflow-x-hidden custom-scrollbar">
          <!-- CONFIGURATION ONLY FOR SUBSCRIPTED BOTS -->
          <template v-if="Object.keys(subscriptionBot).length">
            <AlgoBotsDetailedActiveConfiguration />
          </template>
          <!-- CONFIGURATION ONLY FOR NOT SUBSCRIPTED BOTS -->
          <template v-else>
            <AlgoBotsDetailedInactiveConfiguration />
          </template>

          <!-- CHART -->
          <div class="flex flex-col w-full">
            <AlgoBotsDetailedChart class="algobot-detailed__chart" />
          </div>

          <!-- TABLES -->
          <AppCard
            class="pt-14 algobot-detailed__table flex flex-col overflow-y-auto custom-scrollbar"
          >
            <!-- VIEW ONLY FOR SUBSCRIPTED BOTS -->
            <template v-if="Object.keys(subscriptionBot).length">
              <!-- TOGGLE TABS -->
              <AppButtonsGroup
                v-model="desktopTableActiveTab"
                :options="desktopTableTabs"
                type="underline"
                class="flex-shrink-0 space-x-14 lg:space-x-20 px-20 4xl:px-30 mb-20"
              />

              <!-- MY TRADE HISTORY TAB -->
              <template v-if="desktopTableActiveTab === desktopTableTabs[0].value">
                <AlgoBotsDetailedMyTradeHistory />
              </template>

              <!-- BOT HISTORY TAB -->
              <template v-if="desktopTableActiveTab === desktopTableTabs[1].value">
                <AlgoBotsDetailedBotHistory />
              </template>

              <!-- MY ACTIVITY TAB -->
              <template v-if="desktopTableActiveTab === desktopTableTabs[2].value">
                <AlgoBotsDetailedMyActivity />
              </template>

              <!-- USER REVIEWS TAB (TODO) -->
              <!-- <template v-if="desktopTableActiveTab === desktopTableTabs[3].value">
                <AlgoBotsDetailedReview />
              </template> -->
            </template>

            <!-- VIEW ONLY FOR NOT SUBSCRIPTED BOTS -->
            <template v-else>
              <!-- TOGGLE TABS -->
              <AppButtonsGroup
                v-model="desktopTableActiveTab"
                :options="desktopTableTabsInactive"
                type="underline"
                class="flex-shrink-0 space-x-14 lg:space-x-20 px-20 4xl:px-30 mb-20"
              />

              <!-- BOT HISTORY TAB -->
              <template v-if="desktopTableActiveTab === desktopTableTabsInactive[0].value">
                <AlgoBotsDetailedBotHistory />
              </template>

              <!-- BOT HISTORY TAB (TODO) -->
              <!-- <template v-if="desktopTableActiveTab === desktopTableTabsInactive[1].value">
                <AlgoBotsDetailedReview />
              </template> -->
            </template>
          </AppCard>
        </div>
      </mq-layout>

      <!-- MOBILE VIEW -->
      <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
        <!-- MOBILE TABS -->
        <AppButtonsGroup
          v-model="mobileActiveTab"
          :options="mobileTabs"
          type="underline"
          width="100%"
          class="flex-shrink-0 mb-20"
        />

        <!-- SUMMARY TAB -->
        <div
          v-show="mobileActiveTab === mobileTabs[0].value"
          class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar"
        >
          <!-- SUMMARY -->
          <AlgoBotsDetailedSummary />

          <!-- CHART -->
          <AlgoBotsDetailedChart class="algobot-detailed__chart" />
        </div>

        <!-- CONFIGURATION TAB -->
        <div
          v-show="mobileActiveTab === mobileTabs[1].value"
          class="flex flex-col flex-grow overflow-y-auto custom-scrollbar"
        >
          <!-- CONFIGURATION ONLY FOR SUBSCRIPTED BOTS -->
          <template v-if="Object.keys(subscriptionBot).length">
            <AlgoBotsDetailedActiveConfiguration />
          </template>
          <!-- CONFIGURATION ONLY FOR NOT SUBSCRIPTED BOTS -->
          <template v-else>
            <AlgoBotsDetailedInactiveConfiguration />
          </template>
        </div>

        <!-- HISTORY TAB -->
        <div
          v-show="mobileActiveTab === mobileTabs[2].value"
          class="flex flex-col flex-grow overflow-y-auto custom-scrollbar"
        >
          <AppCard class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
            <!-- DROPDOWN TO CHANGE ACTIVE TAB -->
            <!-- CONFIGURATION ONLY FOR SUBSCRIPTED BOTS -->
            <template v-if="Object.keys(subscriptionBot).length">
              <div class="flex flex-col flex-shrink-0 py-10 px-20 mb-10">
                <AppDropdown v-model="mobileTableActiveTab" :actions="mobileTableTabs" dropdown-width="115px" />
              </div>
              <!-- MY BOT HISTORY -->
              <AlgoBotsDetailedMyTradeHistory v-if="mobileTableActiveTab.value === mobileTableTabs[0].value" />

              <!-- BOT HISTORY -->
              <AlgoBotsDetailedBotHistory v-if="mobileTableActiveTab.value === mobileTableTabs[1].value" />
            </template>

            <template v-else>
              <!-- BOT HISTORY -->
              <AlgoBotsDetailedBotHistory />
            </template>
          </AppCard>
        </div>

        <!-- REVIEWS TAB (TODO) -->
        <!-- <div
          v-show="mobileActiveTab === mobileTabs[3].value"
          class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar"
        >
          <AlgoBotsDetailedReview />
        </div> -->

        <!-- ACTIVITY TAB (ONLY FOR SUBSCRIPTED BOT) -->
        <div
          v-show="Object.keys(subscriptionBot).length && mobileActiveTab === mobileTabs[3].value"
          class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar"
        >
          <AlgoBotsDetailedMyActivityMobile />
        </div>
      </mq-layout>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { routeNames } from '@/router'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useAlgoBotsDetailed } from './algo-bots-detailed.composition.setup'

import AlgoBotsDetailedSummary from './algo-bots-detailed-summary/AlgoBotsDetailedSummary.vue'
import AlgoBotsDetailedActiveConfiguration from './algo-bots-detailed-configuration/AlgoBotsDetailedActiveConfiguration.vue'
import AlgoBotsDetailedInactiveConfiguration from './algo-bots-detailed-configuration/AlgoBotsDetailedInactiveConfiguration.vue'
import AlgoBotsDetailedChart from './algo-bots-detailed-charts/AlgoBotsDetailedChart.vue'
import AlgoBotsDetailedBotHistory from './algo-bots-detailed-tables/AlgoBotsDetailedBotHistory.vue'
import AlgoBotsDetailedMyTradeHistory from './algo-bots-detailed-tables/AlgoBotsDetailedMyTradeHistory.vue'
import AlgoBotsDetailedMyActivity from './activity/AlgoBotsDetailedMyActivity.vue'
import AlgoBotsDetailedMyActivityMobile from './activity/AlgoBotsDetailedMyActivityMobile.vue'
// import AlgoBotsDetailedReview from './AlgoBotsDetailedReview.vue'

export default defineComponent({
  name: 'AlgoBotsDetailedActiveInactive',

  components: {
    AlgoBotsDetailedSummary,
    AlgoBotsDetailedActiveConfiguration,
    AlgoBotsDetailedInactiveConfiguration,
    AlgoBotsDetailedChart,
    AlgoBotsDetailedBotHistory,
    AlgoBotsDetailedMyTradeHistory,
    AlgoBotsDetailedMyActivity,
    AlgoBotsDetailedMyActivityMobile
  },

  setup () {
    /* USE ROUTE */
    // const route = useRoute()

    const { isMD } = useCustomBreakpoints()
    const {
      botGlobalLoading,
      bot,
      subscriptionBot,
      getAccount,
      fetchBotPerformanceSubscriptionSnapshotById,
      fetchBotPerformanceSubscriptionCyclesById,
      fetchPerformanceBotCyclesById,
      fetchSubscriptionAuditsById,
      fetchBaseAvailable
    } = useAlgoBotsDetailed()

    const state = reactive({
      // TODO
      // desktopTableActiveTab: (
      //   route.path.endsWith('/review')
      //     ? 'user-reviews'
      //     : (Object.keys(subscriptionBot.value).length ? 'my-trade-history' : 'bot-history')
      // ) as string,
      // mobileActiveTab: (route.path.endsWith('/review') ? 'reviews' : 'summary') as string,
      desktopTableActiveTab: Object.keys(subscriptionBot.value).length ? 'my-trade-history' : 'bot-history' as string,
      mobileActiveTab: 'summary' as string,
      mobileTableActiveTab: { value: 'my-trade-history', label: 'My Trade History' } as { value: string; label: string; }
    })

    const defaultMobileTabs: { label: string; value: string; }[] = [
      { label: 'Summary', value: 'summary' },
      { label: 'Config', value: 'configuration' },
      { label: 'History', value: 'history' }
      // { label: 'Reviews', value: 'reviews' }
    ]

    const mobileTabs = computed((): { value: string; label: string; }[] => {
      /* tabs for subscription bots */
      if (Object.keys(subscriptionBot.value).length) {
        return [...defaultMobileTabs, { label: 'Activity', value: 'activity' }]
      }

      return [...defaultMobileTabs]
    })

    const mobileTableTabs: { value: string; label: string; }[] = [
      { value: 'my-trade-history', label: 'My Trade History' },
      { value: 'bot-history', label: 'Bot History' }
    ]

    const desktopTableTabs: { label: string; value: string; }[] = [
      { label: 'My Trade History', value: 'my-trade-history' },
      { label: 'Bot History', value: 'bot-history' },
      { label: 'My Activity', value: 'bot-activity' }
      // { label: 'User Reviews', value: 'user-reviews' }
    ]

    const desktopTableTabsInactive: { label: string; value: string; }[] = [
      { label: 'Bot History', value: 'bot-history' }
      // { label: 'User Reviews', value: 'user-reviews' }
    ]

    function initData (): void {
      fetchPerformanceBotCyclesById(bot.value.id)

      /* FETCH DATA ONLY FOR SUBSCRIPTED BOTS */
      if (Object.keys(subscriptionBot.value).length) {
        fetchBaseAvailable(getAccount.value?.id || '', subscriptionBot.value.quote || 'USDT')
        fetchSubscriptionAuditsById(subscriptionBot.value.botId)
        fetchBotPerformanceSubscriptionSnapshotById(subscriptionBot.value.id)
        fetchBotPerformanceSubscriptionCyclesById(subscriptionBot.value.id)
      }
    }

    onMounted(() => { initData() })

    return {
      ...toRefs(state),
      routeNames,
      isMD,
      botGlobalLoading,
      bot,
      subscriptionBot,
      desktopTableTabs,
      desktopTableTabsInactive,
      mobileTableTabs,
      mobileTabs
    }
  }
})

</script>

<style lang="scss" scoped>
.algobot-detailed {
  &__grid {
    grid-template-columns: 1fr 1.5fr;
  }

  &__chart {
    min-height: 350px;
    height: 350px;
    max-height: 350px;
  }

  &__table {
    max-height: 350px;
    height: 350px;
    min-height: 350px;
  }

  @media(min-width: 1024px) {
    &__grid {
      grid-template-columns: 1fr 2fr;
    }
  }

  @media(min-width: 1440px) {
    &__grid {
      grid-template-columns: 1fr 2.8fr;
    }
  }
}
</style>
