<template>
  <div class="flex flex-col flex-grow w-full overflow-y-hidden custom-scrollbar">
    <!--TITLE -->
    <Portal to="h-title">
      <router-link :to="{ name: routeNames.algoBots }" class="flex">
        <!-- DESKTOP VIEW -->
        <mq-layout mq="lg+" class="flex items-center">
          <AppIcon
            name="back"
            size="30"
            class="text-nile-blue dark:text-tradewind"
          />
          <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl text-center ml-10">
            {{ getPerfBotCyclesDataById?.name }}
          </h2>
        </mq-layout>

        <!-- MOBILE VIEW -->
        <mq-layout mq="sm-md" class="flex items-center">
          <AppIcon
            name="back"
            size="24"
            class="text-nile-blue dark:text-tradewind"
          />

          <span class="text-nile-blue dark:text-let-it-snow text-sm font-semibold ml-8">Back</span>
        </mq-layout>
      </router-link>
    </Portal>

    <mq-layout
      mq="lg+"
      class="
        algobot-detailed-activated__grid
        grid
        4xl:flex-grow
        w-full
        gap-x-20
        4xl:gap-x-24
        overflow-y-auto
        custom-scrollbar
      "
    >
      <!-- INFO CARD -->
      <!-- PRIVATE BOT -->
      <AlgoBotsDetailedActiveInfoPrivate
        v-if="isPrivateBot"
        :base-available="baseAvailable"
        :base-available-loading="baseAvailableLoading"
      />
      <!-- RENTAL BOT -->
      <AlgoBotsDetailedActiveInfo
        v-else
        :base-available="baseAvailable"
        :base-available-loading="baseAvailableLoading"
      />

      <div
        class="flex flex-grow flex-col w-full space-y-20 3xl:space-y-24 overflow-x-hidden custom-scrollbar"
      >
        <AlgoBotsDetailedActiveConfig :base-available="baseAvailable" :base-available-loading="baseAvailableLoading" />

        <!-- CHART CARD -->
        <div class="flex flex-col w-full 4xl:h-1/2 space-y-20 3xl:space-y-24">
          <AlgoBotsDetailedActiveChart
            class="algobot-detailed-activated__chart 4xl:h-full"
            :bot-history="performanceBotCycles"
            :loading="loading"
          />
        </div>

        <!-- TABS WRAP -->
        <AppCard
          class="algobot-detailed-activated__table flex flex-col pt-20 overflow-y-auto custom-scrollbar"
        >
          <!-- TOGGLE TAB -->
          <AppButtonsGroup
            v-model="activeTab"
            :options="activeTabOptions"
            type="underline"
            class="flex-shrink-0 space-x-14 lg:space-x-20 px-20 4xl:px-30 mb-20"
          />

          <!-- TABLE CARD -->
          <template v-if="activeTab === 'my-trade-history'">
            <AlgoBotsDetailedActiveTable :loading="loading" />
          </template>

          <!-- TABLE CARD -->
          <template v-if="activeTab === 'bot-history'">
            <AlgoBotsDetailedActiveBotHistory />
          </template>

          <!--  ACTIVITY TAB -->
          <template v-if="activeTab === 'bot-activity'">
            <AlgoBotsDetailedActiveActivity />
          </template>

          <!--  WEBHOOK TAB -->
          <template v-if="activeTab === 'web-hook'">
            <AlgoBotsDetailedWebHook />
          </template>

          <!--  REVIEW TAB -->
          <template v-if="activeTab === 'user-reviews'">
            <AlgoBotsDetailedReview />
          </template>
        </AppCard>
      </div>
    </mq-layout>

    <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- TABS SELECT -->
      <AppButtonsGroup
        v-model="configTab"
        :options="configTabs"
        type="underline"
        width="100%"
        class="flex-shrink-0 mb-20"
      />

      <!-- SUMMARY TAB -->
      <template v-if="configTab === 'summary'">
        <div class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar">
          <AlgoBotsDetailedActiveInfoPrivate
            v-if="isPrivateBot"
            :base-available="baseAvailable"
            :base-available-loading="baseAvailableLoading"
          />
          <AlgoBotsDetailedActiveInfo
            v-else
            :base-available="baseAvailable"
            :base-available-loading="baseAvailableLoading"
          />

          <AlgoBotsDetailedActiveChart
            class="algobot-detailed-activated__chart"
            :bot-history="performanceBotCycles"
            :loading="loading"
          />
        </div>
      </template>

      <!-- CONFIGURATION TAB -->
      <template v-if="configTab === 'configuration'">
        <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
          <AlgoBotsDetailedActiveConfig
            :base-available="baseAvailable"
            :base-available-loading="baseAvailableLoading"
          />
        </div>
      </template>

      <!-- BOT HISTORY & MY BOT HISTORY TABS -->
      <template v-if="configTab === 'history'">
        <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
          <AppCard class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
            <!-- DROPDOWN TO CHANGE ACTIVE TAB -->
            <div class="flex flex-col flex-shrink-0 py-10 px-20 mb-10">
              <AppDropdown v-model="sourceValue" :actions="sourceData" dropdown-width="115px" />
            </div>
            <!-- BOT HISTORY -->
            <AlgoBotsDetailedActiveBotHistory v-if="sourceValue.value === 'bot-history'" />
            <!-- MY BOT HISTORY -->
            <AlgoBotsDetailedActiveTable v-else :loading="loading" />
          </AppCard>
        </div>
      </template>

      <!-- ACTIVITY TAB -->
      <template v-if="configTab === 'activity'">
        <AlgoBotDetailedActiveActivityMobile />
      </template>

      <!-- ACTIVITY TAB -->
      <template v-if="configTab === 'web-hook'">
        <AlgoBotsDetailedWebHook />
      </template>

      <!-- ACTIVITY TAB -->
      <template v-if="configTab === 'reviews'">
        <AlgoBotsDetailedReview />
      </template>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { routeNames, useRoute } from '@/router'

import { vuex } from '@/store'
import { algoBotsService } from '@/services'
import { IPerformanceBotCycles } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'
import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'

import AlgoBotsDetailedActiveInfo from '@/views/algobots/components/algo-bots-detailed/active-bot/AlgoBotsDetailedActiveInfo.vue'
import AlgoBotsDetailedActiveInfoPrivate from '@/views/algobots/components/algo-bots-detailed/active-bot/AlgoBotsDetailedActiveInfoPrivate.vue'
import AlgoBotsDetailedActiveConfig from '@/views/algobots/components/algo-bots-detailed/active-bot/AlgoBotsDetailedActiveConfig.vue'

import AlgoBotsDetailedActiveTable from '@/views/algobots/components/algo-bots-detailed/active-bot/AlgoBotsDetailedActiveTable.vue'
import AlgoBotsDetailedActiveBotHistory from '@/views/algobots/components/algo-bots-detailed/active-bot/AlgoBotsDetailedActiveBotHistory.vue'
import AlgoBotsDetailedActiveChart from '@/views/algobots/components/algo-bots-detailed/active-bot/AlgoBotsDetailedActiveChart.vue'
import AlgoBotsDetailedActiveActivity from '@/views/algobots/components/algo-bots-detailed/active-bot/my-activity/AlgoBotsDetailedActiveActivity.vue'
import AlgoBotsDetailedReview from '@/views/algobots/components/algo-bots-detailed/AlgoBotsDetailedReview.vue'
import AlgoBotsDetailedWebHook from '@/views/algobots/components/algo-bots-detailed/active-bot/my-activity/AlgoBotsDetailedWebHook.vue'
import AlgoBotDetailedActiveActivityMobile from '@/views/algobots/components/algo-bots-detailed/active-bot/my-activity/AlgoBotsDetailedActiveActivityMobile.vue'

// TODO SET GENERAL TYPE FOR DROPDOWN
type TSourceDropdown = {value: string; label: string;}

export default defineComponent({
  name: 'AlgoBotsDetailedActive',

  components: {
    AlgoBotsDetailedActiveInfo,
    AlgoBotsDetailedActiveInfoPrivate,
    AlgoBotsDetailedActiveConfig,
    AlgoBotsDetailedActiveTable,
    AlgoBotsDetailedActiveBotHistory,
    AlgoBotsDetailedActiveChart,
    AlgoBotsDetailedActiveActivity,
    AlgoBotDetailedActiveActivityMobile,
    AlgoBotsDetailedReview,
    AlgoBotsDetailedWebHook
  },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE ALGO BOTS DETAILED SETUP */
    const {
      getAlgobotsSubscriptionByBotId,
      getAccount,
      isPrivateBot
    } = useAlgoBotsDetailed()

    /* USE ALGO BOTS SETUP */
    const { getAlgobotsSubscriptionById, getPerfBotCyclesDataById } = useAlgoBots()

    // LOADING //
    const loading = ref<boolean>(false)
    const baseAvailableLoading = ref<boolean>(false)
    const performanceBotCycles = ref<IPerformanceBotCycles[]>([])

    // DATA FOR TOOGLE TAB (MY TRADE HISTORY & BOT ACTIVITY) //
    const activeTab = ref<string>(route.path.endsWith('/review') ? 'user-reviews' : 'my-trade-history')
    const activeTabOptions = computed(() => {
      if (!isPrivateBot.value) {
        return [
          { label: 'My Trade History', value: 'my-trade-history' },
          { label: 'Bot History', value: 'bot-history' },
          { label: 'Bot Activity', value: 'bot-activity' },
          { label: 'User Reviews', value: 'user-reviews' }
        ]
      } else {
        return [
          { label: 'My Trade History', value: 'my-trade-history' },
          { label: 'Bot History', value: 'bot-history' },
          { label: 'Bot Activity', value: 'bot-activity' },
          { label: 'Web Hook', value: 'web-hook' },
          { label: 'User Reviews', value: 'user-reviews' }
        ]
      }
    })

    const configTab = ref<string>(route.path.endsWith('/review') ? 'reviews' : 'summary')
    const configTabs = computed(() => {
      if (!isPrivateBot.value) {
        return [
          { label: 'Summary', value: 'summary' },
          { label: 'Config', value: 'configuration' },
          { label: 'History', value: 'history' },
          { label: 'Activity', value: 'activity' },
          { label: 'Reviews', value: 'reviews' }
        ]
      } else {
        return [
          { label: 'Summary', value: 'summary' },
          { label: 'Perf', value: 'configuration' },
          { label: 'History', value: 'history' },
          { label: 'Activity', value: 'activity' },
          { label: 'Web Hook', value: 'web-hook' },
          { label: 'Reviews', value: 'reviews' }
        ]
      }
    })

    const sourceData: TSourceDropdown[] = [
      { value: 'my-bot-history', label: 'My Bot History' },
      { value: 'bot-history', label: 'Bot History' }
    ]

    const sourceValue = ref<TSourceDropdown>(sourceData[0])

    // FETCH TRADE BALANCE
    const selectedAccountDist: any = reactive({
      state: {}
    })
    const baseAvailable = ref<number>(0)

    async function fetchBaseAvailable () {
      try {
        baseAvailableLoading.value = true
        const res = await algoBotsService.getPortfolioTradeBalance(getAccount.value?.id || '')

        if (Object.keys(res.data).length && Object.keys(res.data.freeBalances).length) {
          selectedAccountDist.state = res.data
          baseAvailable.value = selectedAccountDist.state.freeBalances?.USDT || 0
        }
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
      } finally {
        baseAvailableLoading.value = false
      }
    }

    // FETCH DATA FOR TABLE & CHART //
    async function fetchChartTableData () {
      loading.value = true
      try {
        await Promise.all([
          vuex.algobots.fetchPerformanceSubscriptionCyclesById(
            { id: getAlgobotsSubscriptionById.value?.id as string }
          ),
          vuex.algobots.fetchBotPerformanceSubscriptionSnapshotById(getAlgobotsSubscriptionByBotId.value?.id as string),
          vuex.algobots.fetchBotWallets()
        ])
      } finally {
        loading.value = false
      }
    }

    async function fetchPerformanceBotCycles () {
      loading.value = true
      try {
        const res = await algoBotsService.getPerformanceBotCycles(route.params.id as string)
        if (res.data.find(elem => elem.botVer === '2')) {
          performanceBotCycles.value = res.data.filter(elem => elem.botVer === '2' && !elem.open)
        } else {
          performanceBotCycles.value = res.data.filter(elem => !elem.open)
        }
      } catch (err) {
        appNotify({ type: 'error', message: err?.response?.data?.message || 'Something went wrong' })
      } finally {
        loading.value = false
      }
    }

    function initData () {
      fetchChartTableData()
      fetchBaseAvailable()
      fetchPerformanceBotCycles()
    }

    initData()

    return {
      routeNames,

      getPerfBotCyclesDataById,
      performanceBotCycles,
      loading,
      activeTab,
      activeTabOptions,
      configTab,
      configTabs,
      sourceValue,
      sourceData,
      baseAvailableLoading,
      baseAvailable,

      isPrivateBot
    }
  }
})

</script>

<style lang="scss" scoped>
.algobot-detailed-activated {
  &__grid {
    grid-template-columns: 1fr 1.5fr;
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

  @media(min-width: 2500px) {
    &__table {
      @apply h-1/2;
    }
  }

  @media(max-width: 2499px) {
    &__chart {
      min-height: 350px;
      max-height: 350px;
    }

    &__table {
      max-height: 350px;
      min-height: 350px;
    }
  }
}
</style>
