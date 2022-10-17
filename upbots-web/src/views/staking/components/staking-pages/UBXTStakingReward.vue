<template>
  <div class="flex flex-col items-center flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- GO BACK TO STAKING MAIN PAGE -->
    <Portal to="h-title">
      <router-link :to="{ name: routeNames.staking }" class="flex items-center">
        <AppIcon
          name="back"
          size="30"
          class="text-nile-blue dark:text-tradewind"
        />
        <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl text-center ml-10">
          Go Back
        </h2>
      </router-link>
    </Portal>

    <!-- TITLE -->
    <h2
      class="text-chicory-flower dark:text-white font-bold md:text-lg xl:text-3xl 3xl-text-4xl mb-14 md:mb-20 leading-1"
    >
      UBXT Staking Rewards
    </h2>

    <!-- REWARD INTRO -->
    <div
      class="
        ubxt-staking-reward__description
        text-chicory-flower
        dark:text-white
        text-sm
        md:text-base
        3xl:text-md2
        self-center
        text-center
      "
    >
      Staking in the UBXT staking pool on ETH or BSC gives you lucrative APR rewards but this is just the start!
      We also offer you the access to our Community Bots and a significant discount on performance fees.
      In other words - the more you stake the higher the rewards!
      <p class="mt-4 md:mt-10">Check it out now:</p>
    </div>

    <!-- STAKE BUTTON -->
    <div class="flex justify-center my-16 md:my-20 lg:my-40">
      <router-link #default="{ navigate }" :to="{ name: routeNames.staking }" custom>
        <AppButton class="flex space-x-8 items-center px-10 md:px-20 md:py-10" type="blue-gradient" @click="navigate()">
          <img
            src="/img/cryptocoins/ubxt.svg"
            alt="ubxt"
            class="w-20 md:w-26 h-20 md:h-26 flex-shrink-0 object-cover"
          >
          <span class="text-sm md:text-base">Stake Now</span>
        </AppButton>
      </router-link>
    </div>

    <!-- REWARD TABLE -->
    <AppCard class="ubxt-staking-reward__table pt-20 w-full mb-20 xl:mb-40">
      <!-- HEADERS -->
      <div
        class="
          ubxt-staking-reward__table-labels
          grid
          gap-x-10
          md:gap-x-20
          flex-shrink-0
          px-20
          pb-6
          md:pb-12
          border-b
          border-gull-gray
          border-opacity-20
        "
      >
        <span
          v-for="(label, index) in rewardLabels"
          :key="index"
          class="text-chicory-flower dark:text-white font-semibold text-sm md:text-base xl:text-md text-center"
        >
          {{ label }}
        </span>
      </div>

      <!-- REWARD ITEMS -->
      <div class="grid auto-rows-fr grid-flow-row">
        <div
          v-for="{ level, minUBXT, currentFeeOff } of rewards"
          :key="level"
          class="
            ubxt-staking-reward__table-items
            border-b
            border-gull-gray
            border-opacity-20
            grid
            gap-x-20
            px-20
            py-10
            md:py-14
            last:border-none
          "
        >
          <!-- LEVEL -->
          <span class="text-ball-blue text-sm md:text-base xl:text-md font-bold text-center self-center">
            L{{ level }}
          </span>

          <!-- MIN UBXT -->
          <div class="flex justify-center">
            <AppFormatNumber
              :data="minUBXT"
              :is-math-symbols="false"
              :is-colored="false"
              text-size="text-sm md:text-base xl:text-md"
              class="text-chicory-flower dark:text-white "
            />
          </div>

          <!-- REWARD -->
          <div class="flex flex-col items-center text-sm md:text-base xl:text-md">
            <AppTruncatedTooltip class="text-chicory-flower dark:text-white" content="Access to community bots" />

            <div v-if="currentFeeOff" class="flex">
              <span class="text-ball-blue font-bold">-{{ currentFeeOff }}%</span>
              <AppTruncatedTooltip class="text-chicory-flower dark:text-white ml-4" content="on performance fees" />
            </div>
          </div>
        </div>
      </div>
    </AppCard>

    <!-- REWARD INFO -->
    <div class="ubxt-staking-reward__description">
      <MessageWidget icon-name="info-circle" class="text-sm md:text-base 3xl:text-md2">
        <div>If you are staking in both eth and bsc pool, the highest level will be taken into account</div>
      </MessageWidget>
    </div>

    <!-- REWARD IMAGE -->
    <mq-layout mq="2xl+">
      <div class="ubxt-staking-reward__img flex-shrink-0 fixed left-80 bottom-20">
        <img src="/img/staking/staking-benefit.png" alt="UBXT Staking Rewards" class="w-full h-full">
      </div>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routeNames } from '@/router'
import { IStakingReward } from '@/types'

import MessageWidget from '@/components/MessageWidget.vue'

export default defineComponent({
  name: 'UBXTStakingReward',

  components: { MessageWidget },

  setup () {
    const rewardLabels: string[] = ['Level', 'Min UBXT', 'Rewards']

    const rewards: IStakingReward[] = [
      { level: 1, minUBXT: 2500, currentFeeOff: 0 },
      { level: 2, minUBXT: 30000, currentFeeOff: 5 },
      { level: 3, minUBXT: 100000, currentFeeOff: 10 },
      { level: 4, minUBXT: 250000, currentFeeOff: 20 },
      { level: 5, minUBXT: 1000000, currentFeeOff: 35 },
      { level: 6, minUBXT: 2000000, currentFeeOff: 50 },
      { level: 7, minUBXT: 5000000, currentFeeOff: 65 }
    ]

    return { routeNames, rewardLabels, rewards }
  }
})
</script>

<style lang="scss" scoped>
.ubxt-staking-reward {
  &__description,
  &__table {
    max-width: 700px;
  }

  &__img {
    width: 260px;
  }

  @media(min-width: 1920px) {
    &__description,
    &__table {
      max-width: 800px;
    }

    &__img {
      width: 300px;
    }
  }

  @media(min-width: 768px) and (max-width: 1439px) {
    &__description,
    &__table {
      max-width: 600px;
    }

    &__img {
      width: 200px;
    }
  }

  @media(min-width: 768px) {
    &__table-labels,
    &__table-items {
      grid-template-columns: 1fr 1fr 2fr;
    }
  }

  @media(max-width: 767px) {
    &__table-labels,
    &__table-items {
      grid-template-columns: 1fr 1fr 2.4fr;
    }
  }
}
</style>
