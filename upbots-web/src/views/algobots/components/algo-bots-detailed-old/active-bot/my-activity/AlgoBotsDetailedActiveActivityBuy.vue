<template>
  <div class="flex flex-col space-y-10">
    <!-- LINE 1 -->
    <div class="flex items-center space-x-10">
      <div v-if="activityData" class="flex items-center text-nile-blue dark:text-white text-sm xl:text-md2">
        {{ activityData.createdAt ? $filters.date(activityData.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A' }}
      </div>

      <div class="flex text-nile-blue dark:text-white text-sm xl:text-md2">
        <span>-</span>
      </div>

      <div class="flex">
        <span :style="`width: ${emojiData.rocket.size}px`" v-html="emojiData.rocket.code" />
      </div>

      <div class="flex">
        <span v-if="activityData" class="text-spring-bouquet text-sm xl:text-md2 font-medium">
          Position {{ getPositionLabel(activityData.oTrackId.ctxBot) }}
        </span>
        <span v-else>-</span>
      </div>
    </div>

    <!-- LINE 2 -->
    <div class="grid grid-cols-3 xl:grid-cols-none xl:flex items-center space-x-10">
      <div
        class="flex flex-col xl:flex-row items-center
        border-r border-blue-heeler dark:border-himalaya-sky space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Quantity executed:</span>
        <span v-if="activityData" class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{ activityData?.oTrackId?.completion?.qExec ? activityData.oTrackId.completion.qExec.toFixed(6) : 'N/A' }}
        </span>
        <!-- TODO -->
        <!-- <span class="text-white">{{ item.oTrackId.sbl.split("/")[0] }}</span> -->
      </div>

      <div
        class="flex flex-col xl:flex-row items-center
        border-r border-blue-heeler dark:border-himalaya-sky space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Price executed:</span>
        <span v-if="activityData" class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{ activityData?.oTrackId?.completion?.pExec ? activityData.oTrackId.completion.pExec.toFixed(2) : 'N/A' }}
        </span>
        <!-- TODO -->
        <!-- <span class="text-white">{{ item.currency }}</span> -->
      </div>

      <div
        class="flex flex-col xl:flex-row items-center space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Total:</span>
        <span v-if="activityData" class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{
            activityData?.oTrackId?.completion?.cumulQuoteCost ?
              activityData.oTrackId.completion.cumulQuoteCost.toFixed(2) :
              'N/A'
          }}
        </span>
      </div>
    </div>

    <!-- LINE 3 -->
    <div class="flex items-center space-x-10">
      <div
        v-if="activityData"
        class="flex items-center flex-shrink-0 text-nile-blue dark:text-white text-sm xl:text-md2"
      >
        {{ activityData.updatedAt ? $filters.date(activityData.updatedAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A' }}
      </div>

      <div class="flex text-nile-blue dark:text-white text-sm xl:text-md2">
        <span>-</span>
      </div>

      <div class="flex">
        <span :style="`width: ${emojiData.chart.size}px`" v-html="emojiData.chart.code" />
      </div>

      <div class="flex">
        <span v-if="activityData" class="text-spring-bouquet text-sm xl:text-md2 font-medium">
          {{ activityData.oTrackId.side }} order placed at {{ activityData.oTrackId.orderType }}
        </span>
        <span v-else>-</span>
      </div>
    </div>

    <!-- LINE 4 -->
    <div class="grid grid-cols-3 xl:grid-cols-none xl:flex items-center space-x-10">
      <div
        class="flex flex-col xl:flex-row items-center
        border-r border-blue-heeler dark:border-himalaya-sky space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Exchange:</span>
        <span v-if="activityData" class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{ activityData?.oTrackId?.exch.toUpperCase() ? activityData.oTrackId.exch.toUpperCase() : '' }}
        </span>
      </div>

      <div
        class="flex flex-col xl:flex-row items-center
        border-r border-blue-heeler dark:border-himalaya-sky space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Pair:</span>
        <span
          v-if="activityData"
          class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2 text-center"
        >
          {{ activityData?.oTrackId?.sbl ? activityData.oTrackId.sbl : 'N/A' }}
        </span>
      </div>

      <div
        class="flex flex-col xl:flex-row items-center space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Quantity asked:</span>
        <span v-if="activityData" class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{ activityData?.oTrackId?.completion?.qExec ? activityData.oTrackId.completion.qExec.toFixed(6) : 'N/A' }}
        </span>
      </div>
    </div>

    <!-- LINE 5 -->
    <div class="flex items-center space-x-10">
      <div
        v-if="activityData"
        class="flex items-center flex-shrink-0 text-nile-blue dark:text-white text-sm xl:text-md2"
      >
        {{ activityData.updatedAt ? $filters.date(activityData.updatedAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A' }}
      </div>

      <div class="flex text-nile-blue dark:text-white text-sm xl:text-md2">
        <span>-</span>
      </div>

      <div class="flex">
        <span :style="`width: ${emojiData.bell.size}px`" v-html="emojiData.bell.code" />
      </div>

      <div class="flex">
        <span v-if="activityData" class="text-spring-bouquet text-sm xl:text-md2 font-medium">
          {{ activityData.oTrackId.side }} Signal Received
        </span>
        <span v-else>-</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import { IAlgobotsSubscriptionAudits } from '@/types'

import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedActiveActivityBuy',

  props: {
    activityData: {
      type: Object as PropType<IAlgobotsSubscriptionAudits>,
      required: true
    },

    emojiData: {
      type: Object,
      required: true
    }
  },

  setup () {
    /* USE ALGO BOTS DETAILED SETUP */
    const { getPerfSubscriptionCyclesData } = useAlgoBotsDetailed()

    /* USE ALGO BOTS SETUP */
    const { getPerfBotCyclesDataById } = useAlgoBots()

    // GET PROFITE TRADE //
    function getProfiteTrade (auditItem: any) {
      return getPerfSubscriptionCyclesData.value.find((cycleEl: any) => {
        return cycleEl.cycleSequence === auditItem.cycleSequence
      })
    }

    // GER PERFORMANCE FEE VALUE //
    function getPerformanceFee (auditItem: IAlgobotsSubscriptionAudits) {
      const item: any = getProfiteTrade(auditItem)
      if (!item || !item.performanceFee) return {}
      return item.performanceFee
    }

    // GET BOT PER FEES VALUE //
    const getBotPerfFees = computed(() => {
      if (!getPerfBotCyclesDataById.value) return 0
      return getPerfBotCyclesDataById.value?.perfFees?.percent
    })

    // GET POSITION MAPPING //
    function getPositionLabel (position: string) {
      if (position === 'open') {
        return 'Opened'
      } else if (position === 'close') {
        return 'Closed'
      } else {
        return 'N/A'
      }
    }

    return {
      getProfiteTrade,
      getBotPerfFees,
      getPerformanceFee,
      getPositionLabel
    }
  }
})
</script>
