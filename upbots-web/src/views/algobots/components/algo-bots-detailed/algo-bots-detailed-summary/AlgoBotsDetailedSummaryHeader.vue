<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="flex flex-col w-full space-y-24 4xl:space-y-24">
    <div class="flex items-center w-full">
      <!-- BOT LOGO -->
      <div class="algobot-detailed-desc__img flex flex-shrink-0 rounded-full mr-14 lg:mr-24 overflow-hidden">
        <img
          :src="getBotLogoImg(bot)"
          :alt="bot.name"
          class="w-full h-full object-cover"
        >
      </div>

      <div class="flex flex-col w-full">
        <!-- BOT NAME -->
        <AppTruncatedTooltip
          :content="bot.name"
          class="text-nile-blue dark:text-white font-bold text-md2 4xl:text-lg mb-2"
        />

        <!-- BOT CREATOR -->
        <AppTruncatedTooltip
          :content="bot.creator"
          class="text-nile-blue dark:text-let-it-snow text-md2 4xl:text-lg"
        />

        <!-- BOT STATUS (ONLY FOR SUBSCRIPTED BOT) -->
        <div
          v-if="Object.keys(subscriptionBot).length"
          class="flex font-bold text-sm 4xl:text-base"
          :class="subscriptionBot.enabled ? 'text-spring-bouquet' : 'text-alexandria'"
        >
          {{ subscriptionBot.enabled ? 'ACTIVE' : 'PAUSED' }}
        </div>
      </div>
    </div>

    <!-- BOT DESCRIPTION -->
    <div class="text-base font-medium text-nile-blue dark:text-white">
      {{ bot.description }}
    </div>

    <!-- BOT TAGS -->
    <div class="grid grid-cols-3 gap-10 xl:gap-20">
      <AppTag
        v-for="(item, index) in getTags"
        :key="index"
        :data="item"
        size="md"
      />
    </div>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col items-center w-full">
    <!-- BOT LOGO -->
    <div class="algobot-detailed-desc__img flex relative mb-16 -mt-20">
      <div class="rounded-full overflow-hidden">
        <img
          :src="getBotLogoImg(bot)"
          :alt="bot.name"
          class="w-full h-full object-cover"
        >
      </div>

      <!-- BOT STATUS (ONLY FOR SUBSCRIPTED BOT) -->
      <div
        v-if="Object.keys(subscriptionBot).length"
        class="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden"
        :class="subscriptionBot.enabled ? 'bg-spring-bouquet' : 'bg-alexandria'"
      />
    </div>

    <!-- BOT NAME -->
    <AppTruncatedTooltip :content="bot.name" class="text-nile-blue dark:text-white text-md mb-2" />

    <!-- BOT CREATOR -->
    <AppTruncatedTooltip :content="bot.creator" class="text-nile-blue dark:text-let-it-snow mb-10" />

    <!-- BOT DESCRIPTION -->
    <div
      class="text-base font-medium text-nile-blue dark:text-white mb-20"
      :class="{ 'line-clamp-2' : !isDescShowMore }"
      @click="isDescShowMore = !isDescShowMore"
    >
      {{ bot.description }}
    </div>

    <!-- BOT TAGS -->
    <div class="grid grid-cols-3 w-full gap-10">
      <AppTag
        v-for="(item, index) in getTags"
        :key="index"
        :data="item"
        size="md"
      />
    </div>
  </mq-layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'

import { useAlgoBotsDetailed } from '../algo-bots-detailed.composition.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedSummaryHeader',

  setup () {
    const { getBotLogoImg } = useAlgoBots()
    const { bot, subscriptionBot } = useAlgoBotsDetailed()

    const state = reactive({
      isDescShowMore: false as boolean
    })

    const getFilteredTagsByBotRef = computed(() => {
      if (bot.value.botRef) {
        return bot.value.exchangesType
      }

      return []
    })

    const getTags = computed(() => {
      if (bot.value.base && bot.value.quote && bot.value.stratType) {
        const baseQuoteCurrency = (bot.value.base + bot.value.quote).toUpperCase()
        const startType = bot.value.stratType.toUpperCase()

        return [baseQuoteCurrency, startType, ...getFilteredTagsByBotRef.value]
      }

      return []
    })

    return {
      ...toRefs(state),
      bot,
      subscriptionBot,
      getTags,
      getBotLogoImg
    }
  }
})
</script>

<style lang="scss" scoped>
.algobot-detailed-desc {
  @media(min-width: 768px) {
    &__img {
      height: 70px;
      width: 70px;
    }
  }

  @media(min-width: 2500px) {
    &__img {
      height: 100px;
      width: 100px;
    }
  }

  @media(max-width: 767px) {
    &__img {
      height: 40px;
      width: 40px;
    }
  }
}
</style>
