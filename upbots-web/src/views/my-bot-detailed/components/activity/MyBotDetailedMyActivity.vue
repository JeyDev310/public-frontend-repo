<template>
  <div class="flex flex-col flex-grow relative pt-20 md:pt-0 px-30 overflow-y-scroll custom-scrollbar">
    <!-- LOADING -->
    <AppLoader v-if="subscriptionAuditsLoading || botPerfSubscriptionCyclesLoading" />

    <!-- CONTENT -->
    <div
      v-else
      class="flex flex-col flex-grow space-y-20 pb-20 overflow-y-scroll custom-scrollbar"
    >
      <template v-if="botSubscriptionAudits.length">
        <div
          v-for="(item, index) in botSubscriptionAudits"
          :key="index"
          class="border-b border-blue-heeler dark:border-himalaya-sky last:border-none pb-20 last:pb-0"
        >
          <!-- COMPLETED ITEM -->
          <template v-if="item.oTrackId?.completed">
            <!-- SELL ITEM -->
            <template v-if="item.position === 'close'">
              <MyBotDetailedMyActivitySell :activity-data="item" :emoji-data="emojiData" />
            </template>

            <!-- BUY ITEM -->
            <template v-if="item.position === 'open'">
              <MyBotDetailedMyActivityBuy :activity-data="item" :emoji-data="emojiData" />
            </template>
          </template>

          <!-- INCOMPLETE ITEM -->
          <template v-else>
            <MyBotDetailedMyActivityError :activity-data="item" :emoji-data="emojiData" />
          </template>
        </div>
      </template>

      <!-- NO DATA AVAILABLE -->
      <template v-if="!subscriptionBot.enabled && !botSubscriptionAudits.length"> <AppNoData /> </template>

      <!-- ENABLED ITEM -->
      <div
        v-if="subscriptionBot.enabled"
        class="flex items-center space-x-10 border-b border-blue-heeler dark:border-himalaya-sky last:border-none"
      >
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2">
          {{ $filters.date(subscriptionBot.createdAt, 'YYYY-MM-DD HH:mm:ss') }}
        </span>
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2">-</span>
        <span :style="`width: ${emojiData.bot.size}px`" v-html="emojiData.bot.code" />
        <span class="text-nile-blue dark:text-white text-sm xl:text-md2">Bot activated</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

import { emojiData } from '@/components/algobots/data'

import MyBotDetailedMyActivitySell from './MyBotDetailedMyActivitySell.vue'
import MyBotDetailedMyActivityBuy from './MyBotDetailedMyActivityBuy.vue'
import MyBotDetailedMyActivityError from './MyBotDetailedMyActivityError.vue'

export default defineComponent({
  name: 'MyBotDetailedMyActivity',

  components: {
    MyBotDetailedMyActivitySell,
    MyBotDetailedMyActivityBuy,
    MyBotDetailedMyActivityError
  },

  setup () {
    const {
      subscriptionBot,
      botSubscriptionAudits,
      subscriptionAuditsLoading,
      botPerfSubscriptionCyclesLoading
    } = useMyBotDetailed()

    return {
      emojiData,
      subscriptionBot,
      botSubscriptionAudits,
      subscriptionAuditsLoading,
      botPerfSubscriptionCyclesLoading
    }
  }
})
</script>
