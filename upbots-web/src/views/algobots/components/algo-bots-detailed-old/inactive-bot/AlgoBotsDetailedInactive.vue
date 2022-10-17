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

    <!-- DESKTOP VIEW -->
    <mq-layout
      mq="lg+"
      class="algobot-detailed-inactive__grid grid w-full gap-x-20 4xl:gap-x-24 overflow-y-auto custom-scrollbar"
    >
      <!-- INFO CARD -->
      <AlgoBotsDetailedInactiveInfo />

      <div
        class="flex flex-grow flex-col w-full space-y-20 4xl:space-y-24 overflow-x-hidden custom-scrollbar"
      >
        <AlgoBotsDetailedInactiveConfig />

        <!-- CHART CARD -->
        <div class="flex flex-col w-full space-y-20 4xl:space-y-24">
          <AlgoBotsDetailedInactiveChart
            class="algobot-detailed-inactive__chart"
            :bot-history="performanceBotCycles"
            :loading="loading"
          />
        </div>

        <AppCard
          class="algobot-detailed-inactive__table flex flex-col pt-20 overflow-y-auto custom-scrollbar"
        >
          <!-- TOGGLE TAB -->
          <AppButtonsGroup
            v-model="activeTab"
            :options="activeTabOptions"
            type="underline"
            class="flex-shrink-0 space-x-14 lg:space-x-20 px-20 4xl:px-30 mb-20"
          />

          <!--  BOT HISTORY TAB -->
          <template v-if="activeTab === 'bot-history'">
            <AlgoBotsDetailedInactiveTable
              :bot-history="performanceBotCycles"
              :loading="loading"
            />
          </template>

          <!--  REVIEW TAB -->
          <template v-if="activeTab === 'user-reviews'">
            <AlgoBotsDetailedReview />
          </template>
        </AppCard>
      </div>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- TABS SELECT -->
      <AppButtonsGroup
        v-model="configTab"
        :options="configTabs"
        type="underline"
        width="100%"
        class="flex-shrink-0 mb-20"
      />

      <template v-if="configTab === 'summary'">
        <div class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar">
          <AlgoBotsDetailedInactiveInfo />

          <AlgoBotsDetailedInactiveChart
            class="algobot-detailed-inactive__chart"
            :bot-history="performanceBotCycles"
            :loading="loading"
          />
        </div>
      </template>

      <template v-if="configTab === 'configuration'">
        <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
          <AlgoBotsDetailedInactiveConfig />
        </div>
      </template>

      <template v-if="configTab === 'history'">
        <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
          <AlgoBotsDetailedInactiveTable
            :bot-history="performanceBotCycles"
            :loading="loading"
          />
        </div>
      </template>

      <template v-if="configTab === 'reviews'">
        <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
          <AlgoBotsDetailedReview />
        </div>
      </template>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { routeNames, useRoute } from '@/router'

import { algoBotsService } from '@/services'
import { IPerformanceBotCycles } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

import AlgoBotsDetailedInactiveInfo from '@/views/algobots/components/algo-bots-detailed/inactive-bot/AlgoBotsDetailedInactiveInfo.vue'
import AlgoBotsDetailedInactiveConfig from '@/views/algobots/components/algo-bots-detailed/inactive-bot/AlgoBotsDetailedInactiveConfig.vue'
import AlgoBotsDetailedInactiveChart from '@/views/algobots/components/algo-bots-detailed/inactive-bot/AlgoBotsDetailedInactiveChart.vue'
import AlgoBotsDetailedInactiveTable from '@/views/algobots/components/algo-bots-detailed/inactive-bot/AlgoBotsDetailedInactiveTable.vue'
import AlgoBotsDetailedReview from '@/views/algobots/components/algo-bots-detailed/AlgoBotsDetailedReview.vue'

export default defineComponent({
  name: 'AlgoBotsDetailedInactive',
  components: {
    AlgoBotsDetailedInactiveInfo,
    AlgoBotsDetailedInactiveChart,
    AlgoBotsDetailedInactiveTable,
    AlgoBotsDetailedReview,
    AlgoBotsDetailedInactiveConfig
  },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE ALGO BOTS SETUP */
    const { getPerfBotCyclesDataById } = useAlgoBots()

    // LOADING //
    const loading = ref<boolean>(false)
    // DATA  //
    const performanceBotCycles = ref<IPerformanceBotCycles[]>([])

    // DATA FOR TOOGLE TAB (MY TRADE HISTORY & BOT ACTIVITY) //
    const activeTab = ref<string>(route.path.endsWith('/review') ? 'user-reviews' : 'bot-history')
    const activeTabOptions = computed(() => {
      return [
        { label: 'Bot History', value: 'bot-history' },
        { label: 'User Reviews', value: 'user-reviews' }
      ]
    })

    const configTab = ref<string>(route.path.endsWith('/review') ? 'reviews' : 'summary')
    const configTabs = [
      { label: 'Summary', value: 'summary' },
      { label: 'Config', value: 'configuration' },
      { label: 'History', value: 'history' },
      { label: 'Reviews', value: 'reviews' }
    ]

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
    fetchPerformanceBotCycles()

    return {
      routeNames,
      loading,
      performanceBotCycles,
      getPerfBotCyclesDataById,

      activeTab,
      activeTabOptions,
      configTab,
      configTabs
    }
  }
})

</script>

<style lang="scss" scoped>
.algobot-detailed-inactive {
  &__grid {
    grid-template-columns: 1fr 1.5fr;
  }

  &__chart {
    min-height: 350px;
    max-height: 350px;
  }

  &__table {
    max-height: 350px;
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
