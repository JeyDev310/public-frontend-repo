<template>
  <AppCard class="my-bot-detailed-config relative flex flex-shrink-0 w-full md:p-14 lg:p-20">
    <!-- DESKTOP VIEW -->
    <mq-layout
      mq="lg+"
      class="my-bot-detailed-config__grid flex flex-col 2xl:grid 2xl:gap-x-20 space-y-14 2xl:space-y-0 w-full"
    >
      <!-- COL 1 -->
      <div
        class="
          my-bot-detailed-config__item-1
          flex
          flex-grow
          flex-col
          items-center
          border-b
          2xl:border-r
          border-blue-heeler
          dark:border-himalaya-sky
          pb-14
          xl:py-14
        "
      >
        <!-- TOTAL GAIN -->
        <p class="text-nile-blue dark:text-soaring-eagle font-medium 4xl:text-md mb-14">
          Total Gain
        </p>
        <div class="flex items-center">
          <AppFormatNumber
            :data="getTotalGain"
            :to-fixed="2"
            :is-math-symbols="false"
            text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
            class="text-bluster-blue dark:text-cloudless"
          />
          <p class="text-bluster-blue dark:text-cloudless text-2xl 4xl:text-4xl font-semibold leading-1 ml-4">
            {{ subscriptionBot?.quote ? subscriptionBot.quote : 'USDT' }}
          </p>
        </div>
      </div>

      <!-- COL 2 -->
      <div
        class="
          my-bot-detailed-config__item-2
          flex
          flex-col
          items-center
          border-b
          2xl:border-r
          border-blue-heeler
          dark:border-himalaya-sky
          pb-14
          xl:py-14
        "
      >
        <!-- 6 MONTHS PERF% -->
        <p class="text-nile-blue dark:text-soaring-eagle font-medium 4xl:text-md mb-14">
          6 Months Perf%
        </p>

        <AppFormatNumber
          :data="bot.perfSnapshots?.month6"
          percent
          text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
        />
      </div>

      <!-- COL 3 -->
      <div
        class="
          my-bot-detailed-config__item-3
          flex
          flex-grow
          flex-col
          items-center
          xl:py-14
        "
      >
        <!-- TOTAL PERF% -->
        <p class="text-nile-blue dark:text-soaring-eagle font-medium 4xl:text-md mb-14">
          Total Perf%
        </p>

        <AppFormatNumber
          :data="bot.perfSnapshots?.allmonths"
          percent
          text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
        />
      </div>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col w-full space-y-40">
      <!-- COL 1 -->
      <AppCard
        class="
          my-bot-detailed-config__mobile-item-1
          flex
          flex-col
          items-center
          justify-center
          relative
          w-full
          p-10
        "
        :class="getModeName"
      >
        <p class="text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-8">Total Gain</p>
        <div class="flex items-center">
          <AppFormatNumber
            :data="getTotalGain"
            :to-fixed="2"
            :is-math-symbols="false"
            text-size="text-md font-semibold leading-1"
            class="text-bluster-blue dark:text-cloudless"
          />
          <p class="text-bluster-blue dark:text-cloudless text-md font-semibold leading-1 ml-4">
            USDT
          </p>
        </div>
      </AppCard>

      <!-- COL 2 & COL 3 -->
      <div class="flex flex-col w-full space-y-40">
        <!-- COL 2 -->
        <AppCard
          class="
            my-bot-detailed-config__mobile-item-2
            flex
            flex-col
            items-center
            justify-center
            relative
            w-full
            p-10
          "
        >
          <p class="text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-8">6 Months Perf%</p>

          <AppFormatNumber
            :data="bot.perfSnapshots?.month6"
            text-size="text-md font-semibold leading-1"
            percent
          />
        </AppCard>

        <!-- COL 3 -->
        <AppCard
          class="
            my-bot-detailed-config__mobile-item-3
            flex
            flex-col
            items-center
            justify-center
            relative
            w-full
            p-10
          "
        >
          <p class="text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-8">Total Perf%</p>

          <AppFormatNumber
            :data="bot.perfSnapshots?.allmonths"
            text-size="text-md font-semibold leading-1"
            percent
          />
        </AppCard>
      </div>
    </mq-layout>
  </AppCard>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

export default defineComponent({
  name: 'MyBotDetailedConfiguration',

  setup () {
    const { getModeName } = useGlobal()
    const { bot, subscriptionBot, botPerfSubscriptionCycles } = useMyBotDetailed()

    const getTotalGain = computed((): number => {
      return botPerfSubscriptionCycles.value.reduce((acc, cur) => acc + (cur.realisedGain?.usd || 0), 0)
    })

    return { getModeName, bot, subscriptionBot, getTotalGain }
  }
})
</script>

<style lang="scss" scoped>
.my-bot-detailed-config {
  @media(min-width: 1440px) {
    &__grid {
      grid-template-columns: 1fr 2fr 1fr;
    }

    &__item-1,
    &__item-2 {
      border-bottom: none;
    }
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    min-height: 311px;
  }

  @media(min-width: 1024px) and (max-width: 1439px) {
    min-height: 355px;
  }

  @media(min-width: 1440px) and (max-width: 1919px) {
    min-height: 160px;
  }

  @media(min-width: 1920px) {
    min-height: 160px;
  }

  @media(max-width: 767px) {
    background: transparent;

    &.is-dark {
      background: transparent;
    }

    &__mobile-item-1,
    &__mobile-item-2,
    &__mobile-item-3 {
      min-height: 105px;
    }

    &__mobile-item-1 {
      &.is-light {
        @apply bg-white;
      }

      &.is-dark {
        background: linear-gradient(119.59deg, rgba(127, 134, 255, 0.71) 22.04%, rgba(45, 59, 80, 0.56) 94.24%);
      }
    }
  }
}
</style>
