<template>
  <div class="staking-benefit relative flex w-full mx-auto rounded-xl p-20 4xl:p-24 mt-40">
    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xl" />

    <!-- CONTENT -->
    <mq-layout mq="lg+" class="flex flex-col justify-center mr-10 lg:mr-30">
      <!-- STAKING IMAGE -->
      <div class="staking-benefit__img flex-shrink-0">
        <img src="/img/staking/staking-benefit.png" alt="Staking Benefit" class="w-full h-full">
      </div>
    </mq-layout>

    <div class="flex flex-grow flex-col space-y-10 lg:space-y-16 4xl:space-y-20">
      <div class="flex items-center justify-center md:justify-start space-x-10">
        <!-- TITLE -->
        <h3 class="text-white md:text-lg 4xl:text-xl font-bold uppercase">Your Staking Benefits</h3>

        <!-- MORE INFO DESKTOP -->
        <mq-layout mq="xl+">
          <router-link #default="{ navigate }" :to="{ name: routeNames.ubxtStakingReward }" custom>
            <AppButton type="white-outlined" size="xs" @click="navigate()">More Info</AppButton>
          </router-link>
        </mq-layout>
      </div>

      <!-- UBXT AMOUNT -->
      <div class="flex items-center">
        <div class="text-white xl:text-md 4xl:text-lg mr-20 md:mr-40 lg:mr-50">UBXT Amount</div>
        <div
          class="staking-benefit__amount flex flex-grow justify-end items-center bg-white rounded-sm py-3 px-20 md:py-6"
        >
          <AppFormatNumber :data="stakingUBXTAmount" :is-math-symbols="false" :is-colored="false">
            <template #value="{ data }">
              <AppTruncatedTooltip :content="data" class="text-ball-blue font-semibold md:text-md 4xl:text-xl" />
            </template>
          </AppFormatNumber>

          <div class="text-ball-blue font-semibold md:text-md 4xl:text-xl ml-10 xl:ml-30">UBXT</div>
        </div>
      </div>

      <!-- YOUR REWARDS -->
      <div class="flex flex-wrap items-center">
        <div class="text-white md:text-md 4xl:text-lg mr-20 4xl:mr-50">Your Rewards</div>
        <!-- LEVEL -->
        <div class="flex lg:flex-col items-center">
          <span class="text-let-it-snow text-xl lg:text-2xl font-extrabold">Level</span>
          <span class="text-bachelor-button text-xl md:text-2xl font-extrabold ml-6 lg:ml-0">
            {{ stakingBenefit.latestLevel }}
          </span>
        </div>

        <!-- REWARD LIST -->
        <div class="flex lg:border-l lg:border-white lg:ml-24 4xl:ml-40">
          <ul
            v-if="stakingBenefit.latestLevel"
            class="list-disc text-white md:text-base 4xl:text-md lg:ml-24 4xl:ml-40"
          >
            <template v-if="stakingBenefit.accessCommunityBots">
              <li>Free access to<span class="font-bold ml-4">Community Bots</span></li>
            </template>

            <template v-if="stakingBenefit.currentFeeOff">
              <li>-{{ stakingBenefit.currentFeeOff }}% on performance fees</li>
            </template>
          </ul>

          <ul v-else class="text-white md:text-base 4xl:text-md lg:ml-24 4xl:ml-40">
            <li>Stake <span class="font-bold">5,000 UBXT</span> &amp; Get</li>
            <li>Free access to <span class="font-bold ml-4">Community Bots</span></li>
          </ul>
        </div>
      </div>

      <!-- MORE INFO MOBILE/TABLET -->
      <mq-layout mq="sm-lg" class="flex flex-col w-full">
        <router-link #default="{ navigate }" :to="{ name: routeNames.ubxtStakingReward }" custom>
          <AppButton type="white-outlined" size="xs" class="self-end" @click="navigate()">More Info</AppButton>
        </router-link>
      </mq-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { routeNames } from '@/router'

import { vuex } from '@/store'

export default defineComponent({
  name: 'StakingBenefit',

  setup () {
    const loading = ref<boolean>(true)

    const stakingBenefit = computed(() => vuex.staking.benefit)
    const stakingUBXTAmount = computed(() => vuex.staking.stakingAmountData.ubxtStakingAmount)

    async function initStakingBenefit () {
      try {
        await Promise.all([vuex.staking.fetchStakingBenefit(), vuex.staking.fetchStakingAmount()])
      } finally {
        loading.value = false
      }
    }
    initStakingBenefit()

    return { routeNames, loading, stakingBenefit, stakingUBXTAmount }
  }
})
</script>

<style lang="scss" scoped>
.staking-benefit {
  background: linear-gradient(128.47deg, #378C9C 21.26%, #8482D2 78.06%),
  linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
  max-width: 760px;

  &__img {
    max-width: 160px;
  }

  &__amount {
    max-width: 400px;
  }

  @media(min-width:2500px) {
    max-width: 1020px;

    &__amount {
      max-width: 480px;
    }
  }

  @media(min-width: 1280px) and (max-width: 1439px) {
    &__img {
      max-width: 140px;
    }
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    max-width: 500px;
  }
}
</style>
