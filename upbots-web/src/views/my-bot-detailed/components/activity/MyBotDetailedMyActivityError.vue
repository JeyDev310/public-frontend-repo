<template>
  <div class="flex flex-col space-y-20">
    <!-- IF COMPLETED -->
    <!-- v-if="activityData.oTrackId && !activityData.oTrackId.completed" -->
    <div class="flex flex-col space-y-10">
      <div class="flex items-center space-x-10">
        <!-- v-if="activityData" -->
        <div
          class="flex items-center flex-shrink-0 text-nile-blue dark:text-white text-sm xl:text-md2"
        >
          {{ activityData?.createdAt ? $filters.date(activityData?.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A' }}
        </div>

        <div class="flex text-nile-blue dark:text-white text-sm xl:text-md2">
          <span>-</span>
        </div>

        <div class="flex items-center space-x-10">
          <span
            :style="`width: ${emojiData.error.size}px`"
            class="text-alexandria"
            v-html="emojiData.error.code"
          />
          <span class="text-alexandria text-sm xl:text-md2">
            {{ message.title }}
            <!-- Error: Exchange issue -->
          </span>
        </div>
      </div>

      <div class="flex text-alexandria text-sm xl:text-md2 font-medium">
        {{ message.description }}
        <!-- {{ activityData.oTrackId.error }} -->
        <!-- The bot was not able to pass the order, could be due to exchange connexion issue or api settings -->
      </div>
    </div>

    <!-- IF ELSE ERROR REASON === MIN COST OR MIN EMOUNT -->
    <!-- <div
      v-else-if="activityData.errorReason === 'minCost' || activityData.errorReason === 'minEmount'"
      class="flex flex-col space-y-10"
    >
      <div class="flex items-center space-x-10">
        <div
          v-if="activityData"
          class="flex items-center flex-shrink-0 text-nile-blue dark:text-white text-sm xl:text-md2"
        >
          {{ activityData.createdAt ? $filters.date(activityData.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A' }}
        </div>

        <div class="flex text-nile-blue dark:text-white text-sm xl:text-md2">
          <span>-</span>
        </div>

        <div class="flex items-center space-x-10">
          <span :style="`width: ${emojiData.error.size}px`" v-html="emojiData.error.code" />
          <span class="text-alexandria text-sm xl:text-md2">Error: Not enough capital to trade</span>
        </div>
      </div>

      <div class="flex text-alexandria text-sm xl:text-md2 font-medium">
        <span v-if="activityData?.balance || activityData?.currency">
          Capital available: {{ activityData.balance }} ({{ activityData.currency }})
        </span>
        <span v-else>-</span>
      </div>
    </div> -->

    <!-- ELSE -->
    <!-- <div v-else class="flex flex-col space-y-10">
      <div class="flex items-center space-x-10">
        <div
          v-if="activityData"
          class="flex text-nile-blue flex-shrink-0 dark:text-white text-sm xl:text-md2"
        >
          {{ activityData.createdAt ? $filters.date(activityData.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A' }}
        </div>

        <div class="flex text-nile-blue dark:text-white text-sm xl:text-md2">-</div>

        <div class="flex items-center space-x-10">
          <span :style="`width: ${emojiData.error.size}px`" v-html="emojiData.error.code" />
          <span v-if="activityData" class="text-alexandria text-sm xl:text-md2">
            Error: API code {{ activityData.errorReason ? activityData.errorReason : 'N/A' }}
          </span>
        </div>
      </div>

      <div class="flex text-alexandria text-sm xl:text-md2 font-medium">Wrong API - create a new one</div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { algobotTradingErrorMessage } from '@/components/algobots/data'

export default defineComponent({
  name: 'MyBotDetailedMyActivityError',

  props: {
    activityData: {
      type: Object,
      required: true
    },

    emojiData: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const message = computed(() => algobotTradingErrorMessage(props.activityData))

    return { message }
  }
})

</script>
