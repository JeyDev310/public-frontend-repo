<template>
  <AppCard
    class="algo-bot-detailed-desc flex flex-col relative pb-20 px-20 md:p-14 lg:p-20 mt-20 md:mt-0"
  >
    <!-- DESKTOP VIEW -->
    <mq-layout mq="lg+">
      <!-- CONTENT -->
      <div class="flex flex-col w-full space-y-24 lg:space-y-30">
        <div class="flex items-center w-full">
          <!-- BOT LOGO -->
          <div class="algobot-detailed-desc__img flex flex-shrink-0 rounded-full mr-14 lg:mr-24 overflow-hidden">
            <img
              v-if="getPerfBotCyclesDataById"
              :src="getBotLogoImg(getPerfBotCyclesDataById)"
              :alt="getPerfBotCyclesDataById.name"
              class="w-full h-full object-cover"
            >
          </div>

          <div class="flex flex-col w-full">
            <!-- BOT NAME -->
            <AppTruncatedTooltip
              class="text-nile-blue dark:text-white font-bold text-md2 mb-2"
              :content="getPerfBotCyclesDataById?.name"
            />

            <!-- BOT CREATOR -->
            <AppTruncatedTooltip
              class="text-nile-blue dark:text-let-it-snow text-md2"
              :content="getPerfBotCyclesDataById?.creator"
            />
          </div>
        </div>

        <!-- BOT DESCRIPTION -->
        <div class="text-base font-medium text-nile-blue dark:text-white">
          {{ getPerfBotCyclesDataById?.description }}
        </div>

        <!-- BOT TAGS -->
        <div class="grid grid-cols-3 gap-10 xl:gap-20">
          <AppTag
            v-for="(item, index) in getFilteredTags"
            :key="index"
            :data="item"
            size="md"
          />
        </div>

        <div class="flex flex-col space-y-12">
          <!-- TOTAL TRADES -->
          <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
            <div class="text-nile-blue dark:text-white">Trade / month:</div>
            <div class="text-nile-blue dark:text-tradewind text-md font-medium">
              <span v-if="getPerfBotCyclesDataById">
                {{ getPerfBotCyclesDataById.lastMonthTrades }}
              </span>
              <span v-else>-</span>
            </div>
          </div>

          <!-- RUNNING DAYS -->
          <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
            <div class="text-nile-blue dark:text-white">Max Drawdown:</div>
            <div class="text-nile-blue dark:text-tradewind text-md font-medium">
              <span v-if="getPerfBotCyclesDataById?.perfSnapshots?.maxDrawdown">
                {{ getPerfBotCyclesDataById.perfSnapshots?.maxDrawdown.toFixed(1) }}
              </span>
              <span v-else>-</span>
            </div>
          </div>

          <!-- PERFS FEES -->
          <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
            <div class="text-nile-blue dark:text-white 4xl:text-md">Perf fees:</div>
            <div
              v-if="getPerfBotCyclesDataById"
              class="flex items-center space-x-6 text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium"
            >
              {{ `From ${( getMinFeePercent(getPerfBotCyclesDataById?.perfFees?.percent || 0))}%` }}
            </div>
          </div>

          <!-- MY FEES -->
          <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
            <div class="text-nile-blue dark:text-white 4xl:text-md">My fees:</div>
            <div class="flex-col">
              <div
                v-if="getPerfBotCyclesDataById"
                class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium"
              >
                {{ `${( getPerfBotCyclesDataById?.perfFees?.percent) || '0'}%` }}
              </div>

              <!-- STAKING REWARD INFO -->
              <router-link #default="{ navigate }" :to="{ name: routeNames.ubxtStakingReward }" custom>
                <div
                  class="text-nile-blue dark:text-white text-xs underline cursor-pointer"
                  @click="navigate()"
                >
                  How to get lower fee ?
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- PERF DATA -->
        <div class="flex flex-col space-y-12">
          <!-- PERF 3M -->
          <div class="algobot-detailed-desc__perfs">
            <div>
              <AppFormatNumber
                :data="getPerfBotCyclesDataById.perfSnapshots?.month3"
                percent
                :is-show-zero="false"
                text-size="text-lg"
                class="algobot-detailed-desc__perfs-value"
              />
            </div>
            <p class="algobot-detailed-desc__perfs-title">Perf 3M</p>
          </div>

          <!-- PERF 6M -->
          <div class="algobot-detailed-desc__perfs">
            <div>
              <AppFormatNumber
                :data="getPerfBotCyclesDataById.perfSnapshots?.month6"
                percent
                text-size="text-lg"
                :is-show-zero="false"
                class="algobot-detailed-desc__perfs-value"
              />
            </div>
            <p class="algobot-detailed-desc__perfs-title">Perf 6M</p>
          </div>

          <!-- PERF TOTAL -->
          <div class="algobot-detailed-desc__perfs">
            <div>
              <AppFormatNumber
                :data="getPerfBotCyclesDataById.perfSnapshots?.allmonths"
                percent
                text-size="text-lg"
                :is-show-zero="false"
                class="algobot-detailed-desc__perfs-value"
              />
            </div>
            <p class="algobot-detailed-desc__perfs-title">Perf Total</p>
          </div>
        </div>
      </div>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col w-full -mt-20">
      <div
        class="algobot-detailed-desc__img flex flex-shrink-0 rounded-full mx-auto mb-16 overflow-hidden"
      >
        <img
          v-if="getPerfBotCyclesDataById"
          :src="getBotLogoImg(getPerfBotCyclesDataById)"
          :alt="getPerfBotCyclesDataById.name"
          class="w-full h-full object-cover"
        >
      </div>

      <div class="flex flex-col w-full mb-20">
        <!-- BOT NAME -->
        <AppTruncatedTooltip
          class="text-nile-blue dark:text-white font-medium text-md text-center mb-5"
          :content="getPerfBotCyclesDataById?.name"
        />

        <!-- BOT CREATOR -->
        <AppTruncatedTooltip
          class="text-nile-blue dark:text-let-it-snow text-center mb-5"
          :content="getPerfBotCyclesDataById?.creator"
        />

        <!-- BOT DESCRIPTION -->
        <div
          class="text-base font-medium text-nile-blue dark:text-white text-center cursor-pointer"
          @click="toggleDescription =! toggleDescription"
        >
          {{ expandText({ isOpen: toggleDescription, value: getPerfBotCyclesDataById?.description }) }}
        </div>
      </div>

      <!-- BOT TAGS -->
      <div class="grid grid-cols-3 gap-10 xl:gap-20 mb-20">
        <AppTag
          v-for="(item, index) in getFilteredTags"
          :key="index"
          :data="item"
          size="md"
        />
      </div>

      <div class="grid grid-cols-3 gap-10 mb-20">
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white text-center">Trade / month:</div>
          <div class="text-nile-blue dark:text-tradewind font-medium">
            <span v-if="getPerfBotCyclesDataById">
              {{ getPerfBotCyclesDataById.lastMonthTrades }}
            </span>
            <span v-else>-</span>
          </div>
        </div>

        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white text-center">Max Drawdown:</div>
          <div class="text-nile-blue dark:text-tradewind font-medium">
            <span v-if="getPerfBotCyclesDataById?.perfSnapshots?.maxDrawdown">
              {{ getPerfBotCyclesDataById.perfSnapshots?.maxDrawdown.toFixed(1) }}
            </span>
            <span v-else>-</span>
          </div>
        </div>

        <!-- PERFS FEES -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white">Perf fees:</div>
          <div v-if="getPerfBotCyclesDataById" class="text-nile-blue dark:text-tradewind font-medium">
            {{ `From ${( getMinFeePercent(getPerfBotCyclesDataById?.perfFees?.percent || 0))}%` }}
          </div>
        </div>

        <!-- MY FEES -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white text-center">My Fees:</div>
          <div class="flex space-x-4 items-center text-nile-blue dark:text-tradewind font-medium">
            <div v-if="getPerfBotCyclesDataById">
              {{ `${(getPerfBotCyclesDataById?.perfFees?.percent) || '0'}%` }}
            </div>

            <!-- STAKING REWARD INFO -->
            <router-link #default="{ navigate }" :to="{ name: routeNames.ubxtStakingReward }" custom>
              <AppIcon
                name="info-circle"
                size="18"
                class="text-lg text-nile-blue dark:text-tradewind"
                @click="navigate()"
              />
            </router-link>
          </div>
        </div>

        <div class="flex flex-col items-center space-y-5">
          <p class="text-nile-blue dark:text-white">Perf 3M</p>

          <div>
            <AppFormatNumber
              :data="getPerfBotCyclesDataById.perfSnapshots?.month3"
              percent
              text-size="text-base font-medium"
              :is-show-zero="false"
            />
          </div>
        </div>

        <div class="flex flex-col items-center space-y-5">
          <p class="text-nile-blue dark:text-white">Perf 6M</p>

          <div>
            <AppFormatNumber
              :data="getPerfBotCyclesDataById.perfSnapshots?.month6"
              percent
              text-size="text-base font-medium"
              :is-show-zero="false"
            />
          </div>
        </div>

        <div class="flex flex-col items-center space-y-5">
          <p class="text-nile-blue dark:text-white">Perf Total</p>

          <div>
            <AppFormatNumber
              :data="getPerfBotCyclesDataById.perfSnapshots?.allmonths"
              percent
              text-size="text-base font-medium"
              :is-show-zero="false"
            />
          </div>
        </div>
      </div>
    </mq-layout>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { routeNames } from '@/router'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedInactiveInfo',

  setup () {
    /* USE BOTS SETUP */
    const { getMinFeePercent } = useBots()

    /* USE ALGO BOTS SETUP */
    const { getBotLogoImg, getPerfBotCyclesDataById } = useAlgoBots()

    /* USE ALGO BOTS DETAILED SETUP */
    const { getFilteredTags, expandText } = useAlgoBotsDetailed()

    const toggleDescription = ref<boolean>(false)

    return {
      routeNames,
      getBotLogoImg,
      getMinFeePercent,

      getPerfBotCyclesDataById,
      getFilteredTags,

      toggleDescription,
      expandText
    }
  }
})
</script>

<style lang="scss" scoped>
.algobot-detailed-desc {
  &__perfs {
    @apply
      grid
      grid-cols-2
      gap-x-20
      items-center
      h-50
      py-10
      px-10
      bg-azureish-white
      bg-opacity-60
      dark:bg-opacity-100
      dark:bg-into-the-stratosphere;
  }

  &__perfs-value {
    @apply font-medium;
  }

  &__perfs-title {
    @apply flex justify-end text-beguiling-blue dark:text-blue-thistle;
  }

  @media(min-width: 768px) {
    &__img {
      height: 70px;
      width: 70px;
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
