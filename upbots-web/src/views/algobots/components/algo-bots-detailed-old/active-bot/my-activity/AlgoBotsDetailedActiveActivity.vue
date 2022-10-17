<template>
  <div class="flex flex-col flex-grow relative pt-20 md:pt-0 px-30 overflow-y-scroll custom-scrollbar">
    <!-- LOADING -->
    <AppLoader v-if="loading || algoBotsDetailedLoading" />

    <!-- CONTENT -->
    <div
      v-else
      class="flex flex-col flex-grow space-y-20 pb-20 overflow-y-scroll custom-scrollbar"
    >
      <div
        v-for="(item, index) in getSubscriptionAuditsData"
        :key="index"
        class="border-b border-blue-heeler dark:border-himalaya-sky last:border-none pb-20 last:pb-0"
      >
        <!-- COMPLETED ITEM -->
        <template v-if="item?.oTrackId?.completed">
          <!-- SELL ITEM -->
          <template v-if="item.position === 'close'">
            <AlgoBotsDetailedActiveActivitySell :activity-data="item" :emoji-data="emojiData" />
          </template>

          <!-- BUY ITEM -->
          <template v-if="item.position === 'open'">
            <AlgoBotsDetailedActiveActivityBuy :activity-data="item" :emoji-data="emojiData" />
          </template>
        </template>

        <!-- INCOMPLETE ITEM -->
        <template v-else>
          <AlgoBotsDetailedActiveActivityError :activity-data="item" :emoji-data="emojiData" />
        </template>
      </div>

      <!-- ENABLED ITEM -->
      <div
        v-if="getAlgobotsSubscriptionById.enabled"
        class="flex items-center space-x-10 border-b border-blue-heeler dark:border-himalaya-sky last:border-none"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2">
          {{ $filters.date(getAlgobotsSubscriptionByBotId.createdAt, 'YYYY-MM-DD HH:mm:ss') }}
        </span>
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2">-</span>
        <span :style="`width: ${emojiData.bot.size}px`" v-html="emojiData.bot.code" />
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2">Bot activated</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import { vuex } from '@/store'

import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

import AlgoBotsDetailedActiveActivitySell from
  '@/views/algobots/components/algo-bots-detailed/active-bot/my-activity/AlgoBotsDetailedActiveActivitySell.vue'
import AlgoBotsDetailedActiveActivityBuy from
  '@/views/algobots/components/algo-bots-detailed/active-bot/my-activity/AlgoBotsDetailedActiveActivityBuy.vue'
import AlgoBotsDetailedActiveActivityError from
  '@/views/algobots/components/algo-bots-detailed/active-bot/my-activity/AlgoBotsDetailedActiveActivityError.vue'

export default defineComponent({
  name: 'AlgoBotsDetailedActiveActivity',

  components: {
    AlgoBotsDetailedActiveActivitySell,
    AlgoBotsDetailedActiveActivityBuy,
    AlgoBotsDetailedActiveActivityError
  },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE ALGO BOTS DETAILED SETUP */
    const {
      algoBotsDetailedLoading,
      getAlgobotsSubscriptionByBotId,
      getSubscriptionAuditsData
    } = useAlgoBotsDetailed()

    /* USE ALGO BOTS SETUP */
    const { getAlgobotsSubscriptionById } = useAlgoBots()

    // LOADING //
    const loading = ref<boolean>(false)

    // EMOJI DUMMY DATA //
    const emojiData = {
      rocket: { code: '🚀', size: '18' },
      chart: { code: '📈', size: '18' },
      bell: { code: '🔔', size: '18' },
      bot: { code: '🤖', size: '18' },
      error: { code: '⚠️', size: '18' }
    }

    // INIT ACTIVITY DATA //
    async function initBotActivityData () {
      loading.value = true
      try {
        await vuex.algobots.fetchSubscriptionsAuditsById(route.params.id as string)
      } finally {
        loading.value = false
      }
    }
    initBotActivityData()

    return {
      getAlgobotsSubscriptionById,

      algoBotsDetailedLoading,
      getAlgobotsSubscriptionByBotId,

      loading,
      getSubscriptionAuditsData,
      emojiData
    }
  }
})
</script>
