
<template>
  <div class="flex flex-col flex-grow relative w-full overflow-y-hidden custom-scrollbar">
    <!--TITLE -->
    <Portal to="h-title">
      <router-link :to="{ name: routeNames.myActiveBots }" class="flex items-center">
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

    <!-- LOADING -->
    <AppLoader v-if="botGlobalLoading" />

    <!-- CONTENT -->
    <template v-else>
      <!-- DESKTOP VIEW -->
      <!-- GRID -->
      <mq-layout
        mq="lg+"
        class="
          my-bot-detailed__grid
          grid
          w-full
          gap-x-20
          4xl:gap-x-24
          overflow-y-auto
          custom-scrollbar
        "
      >
        <!-- MY BOT DETAILED SUMMARY -->
        <MyBotDetailedSummary />

        <!-- RIGHT SIDE -->
        <div
          class="flex flex-grow flex-col w-full space-y-20 3xl:space-y-24 overflow-x-hidden custom-scrollbar"
        >
          <!-- CONFIGURATION -->
          <MyBotDetailedConfiguration />

          <!-- CHART -->
          <div class="flex flex-col w-full">
            <MyBotDetailedChart class="my-bot-detailed__chart" />
          </div>

          <!-- TABLES -->
          <AppCard class="my-bot-detailed__table flex flex-col pt-14 overflow-y-auto custom-scrollbar">
            <!-- TOGGLE TABS -->
            <AppButtonsGroup
              v-model="desktopTableActiveTab"
              :options="desktopTableTabs"
              type="underline"
              class="flex-shrink-0 space-x-14 lg:space-x-20 px-20 4xl:px-30 mb-20"
            />

            <!-- MY TRADE HISTORY TAB -->
            <template v-if="desktopTableActiveTab === desktopTableTabs[0].value">
              <MyBotDetailedMyTradeHistory />
            </template>

            <!-- MY ACTIVITY TAB -->
            <template v-if="desktopTableActiveTab === desktopTableTabs[1].value">
              <MyBotDetailedMyActivity />
            </template>

            <!-- WEBHOOKS TAB -->
            <template v-if="desktopTableActiveTab === desktopTableTabs[2].value">
              <MyBotDetailedWebhooks />
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

        <!-- SUMMARY | CHART TAB -->
        <div
          v-show="mobileActiveTab === mobileTabs[0].value"
          class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar"
        >
          <!-- SUMMARY -->
          <MyBotDetailedSummary />

          <!-- CHART -->
          <MyBotDetailedChart class="my-bot-detailed__chart" />
        </div>

        <!-- CONFIGURATION TAB -->
        <div
          v-show="mobileActiveTab === mobileTabs[1].value"
          class="flex flex-col flex-grow overflow-y-auto custom-scrollbar"
        >
          <MyBotDetailedConfiguration />
        </div>

        <!-- WEBHOOKS TAB -->
        <div
          v-show="mobileActiveTab === mobileTabs[2].value"
          class="flex flex-col flex-grow overflow-y-auto custom-scrollbar"
        >
          <AppCard class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
            <MyBotDetailedWebhooks />
          </AppCard>
        </div>

        <!-- HISTORY | ACTIVITY TAB -->
        <div
          v-show="mobileActiveTab === mobileTabs[3].value"
          class="flex flex-col flex-grow overflow-y-auto custom-scrollbar"
        >
          <!-- MY TRADE HISTORY -->
          <AppCard class="my-bot-detailed__history flex flex-col overflow-y-auto custom-scrollbar">
            <MyBotDetailedMyTradeHistory />
          </AppCard>

          <!-- ACTIVITY -->
          <MyBotDetailedMyActivityMobile class="my-bot-detailed__activity mt-20" />
        </div>
      </mq-layout>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

import { routeNames } from '@/router'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useMyBotDetailed } from '../my-bot-detailed.composition.setup'

import MyBotDetailedSummary from './my-bot-detailed-summary/MyBotDetailedSummary.vue'
import MyBotDetailedConfiguration from './my-bot-detailed-configuration/MyBotDetailedConfiguration.vue'
import MyBotDetailedChart from './my-bot-detailed-charts/MyBotDetailedChart.vue'
import MyBotDetailedWebhooks from './my-bot-detailed-tables/MyBotDetailedWebhooks.vue'
import MyBotDetailedMyTradeHistory from './my-bot-detailed-tables/MyBotDetailedMyTradeHistory.vue'
import MyBotDetailedMyActivity from './activity/MyBotDetailedMyActivity.vue'
import MyBotDetailedMyActivityMobile from './activity/MyBotDetailedMyActivityMobile.vue'

export default defineComponent({
  name: 'MyBotDetailedActiveInactive',

  components: {
    MyBotDetailedSummary,
    MyBotDetailedConfiguration,
    MyBotDetailedChart,
    MyBotDetailedWebhooks,
    MyBotDetailedMyTradeHistory,
    MyBotDetailedMyActivity,
    MyBotDetailedMyActivityMobile
  },

  setup () {
    const { isMD } = useCustomBreakpoints()
    const {
      botGlobalLoading,
      bot,
      subscriptionBot,
      getAccount,
      fetchBotPerformanceSubscriptionCyclesById,
      fetchBaseAvailable,
      fetchSubscriptionAuditsById,
      fetchWebhooksById
    } = useMyBotDetailed()

    /* STATE */
    const state = reactive({
      desktopTableActiveTab: 'bot-webhooks' as string,
      mobileActiveTab: 'summary' as string
    })

    /* STATIC DATA */
    const desktopTableTabs: { label: string; value: string; }[] = [
      { label: 'My Trade History', value: 'my-trade-history' },
      { label: 'My Activity', value: 'bot-activity' },
      { label: 'Webhooks', value: 'bot-webhooks' }
    ]

    const mobileTabs: { label: string; value: string; }[] = [
      { label: 'Summary', value: 'summary' },
      { label: 'Config', value: 'configuration' },
      { label: 'Webhooks', value: 'webhooks' },
      { label: 'History/Activity', value: 'history-activity' }
    ]

    function initData (): void {
      fetchBaseAvailable(getAccount.value?.id || '', subscriptionBot.value.quote || 'USDT')
      fetchSubscriptionAuditsById(subscriptionBot.value.botId)
      fetchBotPerformanceSubscriptionCyclesById(subscriptionBot.value.id)
      fetchWebhooksById(subscriptionBot.value.botId)
    }

    onMounted(() => { initData() })

    return {
      ...toRefs(state),
      routeNames,
      isMD,
      desktopTableTabs,
      mobileTabs,
      botGlobalLoading,
      subscriptionBot,
      bot
    }
  }
})
</script>

<style lang="scss" scoped>
.my-bot-detailed {
  &__grid {
    grid-template-columns: 1fr 1.5fr;
  }

  &__chart,
  &__history,
  &__activity {
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
