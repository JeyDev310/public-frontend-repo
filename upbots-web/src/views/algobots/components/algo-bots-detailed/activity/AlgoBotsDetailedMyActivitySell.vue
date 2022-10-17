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
        <span v-if="activityData" class="text-alexandria text-sm xl:text-md2 font-medium">
          Position {{ getPositionLabel(activityData?.oTrackId?.ctxBot) }}
        </span>
      </div>
    </div>

    <!-- LINE 2 -->
    <div class="flex items-center space-x-10">
      <span class="text-nile-blue dark:text-white text-sm xl:text-md2">Profit trade:</span>
      <AppFormatNumber
        v-if="activityData"
        :data="getProfiteTrade.profitPercentage"
        percent
        text-size="font-medium text-sm xl:text-md2"
      />
    </div>

    <!-- LINE 3 -->
    <div class="grid grid-cols-3 xl:grid-cols-none xl:flex items-center space-x-10">
      <div
        class="flex flex-col xl:flex-row items-center
        border-r border-blue-heeler dark:border-himalaya-sky space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">
          Perf Fees rate:
        </span>
        <span class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{ getBotPerfFees }}%
        </span>
      </div>

      <div
        class="flex flex-col xl:flex-row items-center
        border-r border-blue-heeler dark:border-himalaya-sky space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Perf Fees due:</span>
        <span class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{
            getPerformanceFee.paidAmount ?
              getPerformanceFee.paidAmount.toFixed(2) :
              0
          }} UBXT
        </span>
      </div>

      <div
        class="flex flex-col xl:flex-row items-center space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">UBXT Balance:</span>
        <span class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{
            getPerformanceFee.remainedAmount ?
              getPerformanceFee.remainedAmount.toFixed(2) :
              0
          }} UBXT
        </span>
      </div>
    </div>

    <!-- LINE 4 -->
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
        <!-- <span class="text-white">{{ activityData.currency }}</span> -->
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
        <!-- <span class="text-white">{{ activityData.oTrackId.sbl.split("/")[1] }}</span> -->
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
        <span :style="`width: ${emojiData.chart.size}px`" v-html="emojiData.chart.code" />
      </div>

      <div class="flex">
        <span v-if="activityData" class="text-alexandria text-sm xl:text-md2 font-medium">
          {{ activityData.oTrackId.side }} order placed at {{ activityData.oTrackId.orderType }}
        </span>
        <span v-else>-</span>
      </div>
    </div>

    <!-- LINE 6 -->
    <div class="grid grid-cols-3 xl:grid-cols-none xl:flex items-center space-x-10">
      <div
        class="flex flex-col xl:flex-row items-center
        border-r border-blue-heeler dark:border-himalaya-sky space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Exchange:</span>
        <span v-if="activityData" class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{ activityData?.oTrackId?.exch.toUpperCase() ? activityData.oTrackId.exch.toUpperCase() : 'N/A' }}
        </span>
      </div>

      <div
        class="flex flex-col xl:flex-row items-center space-y-5 xl:space-y-0 xl:space-x-10 pr-10"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2 text-center">Quantity Asked:</span>
        <span v-if="activityData" class="text-nile-blue dark:text-white font-medium text-sm xl:text-md2">
          {{ activityData?.oTrackId?.qtyBaseAsked ? activityData.oTrackId.qtyBaseAsked : 'N/A' }}
        </span>
        <!-- TODO -->
        <!-- <span class="text-white">{{ activityData.currency }}</span> -->
      </div>
    </div>

    <!-- LINE 7 -->
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
        <span v-if="activityData" class="text-alexandria text-sm xl:text-md2 font-medium">
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

import { useAlgoBotsDetailed } from '../algo-bots-detailed.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedMyActivitySell',

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

  setup (props) {
    const { bot, botPerfSubscriptionCycles } = useAlgoBotsDetailed()

    const getProfiteTrade = computed(() => {
      return botPerfSubscriptionCycles.value.find((el) => {
        return el.cycleSequence === props.activityData.cycleSequence
      })
    })

    const getPerformanceFee = computed(() => {
      if (!getProfiteTrade.value || !getProfiteTrade.value.performanceFee) return {}
      return getProfiteTrade.value.performanceFee
    })

    const getBotPerfFees = computed(() => !bot.value ? 0 : bot.value?.perfFees?.percent)

    function getPositionLabel (position: string): string {
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
