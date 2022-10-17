<template>
  <AppCard class="flex flex-col p-20 2xl:p-30">
    <!-- TITLE -->
    <h3
      class="
        md:text-lg
        2xl:text-xl
        3xl:text-2xl
        font-bold
        text-chicory-flower
        dark:text-white
        text-center
        leading-1
        mb-20
      "
    >
      Deposit UBXT - Trade with Bots
    </h3>

    <!-- IMAGE / BACKGROUND IMAGE -->
    <div class="deposit-ubxt-info__bg flex justify-center items-center md:py-10 lg:py-20 2xl:py-30 mb-20">
      <div class="deposit-ubxt-info__img flex" :class="getModeName">
        <img
          :src="`/img/ubxt-wallet/ubxt-info-robot-${isDarkMode ? 'dark' : 'light'}.svg`"
          alt="Robot"
          class="flex-shrink-0 w-full object-cover"
        >
      </div>
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col space-y-20 2xl:space-y-40 md:px-20 2xl:px-40">
      <div class="flex flex-col space-y-20 2xl:space-y-30">
        <div class="flex flex-col space-y-8">
          <span class="2xl:text-md 3xl:text-lg text-nile-blue dark:text-blair font-medium">
            Follow a bot & only pay when you are in profit
          </span>

          <span class="text-sm 2xl:text-base 3xl:text-md text-chicory-flower dark:text-white">
            To use Bots you must 1st transfer UBXT to your UpBots wallet.
            Then you will allocate UBXT (manually or automatically) to your chosen bot.
          </span>
        </div>

        <div class="flex flex-col space-y-8">
          <span class="2xl:text-md 3xl:text-lg text-nile-blue dark:text-blair font-medium">
            Earn virtual credits when your bot loses
          </span>

          <span class="text-sm 2xl:text-base 3xl:text-md text-chicory-flower dark:text-white">
            When your bot loses you receive UBXT so UpBots &amp; the bot dev also share your loss.
            <br v-if="!isLG">In this way everyone wins, or nobody does.
          </span>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="flex space-x-20 justify-center md:justify-start">
        <AppButton
          :size="isLG ? 'sm' : 'md'"
          type="blue-gradient"
          class="deposit-ubxt-info__btn w-full"
          @click="$emit('on-deposit')"
        >
          Deposit Now
        </AppButton>

        <router-link #default="{ navigate }" :to="{ name: routeNames.buyUBXT }" custom>
          <AppButton
            :size="isLG ? 'sm' : 'md'"
            type="grey-outlined"
            class="deposit-ubxt-info__btn w-full"
            @click="navigate()"
          >
            Buy UBXT
          </AppButton>
        </router-link>
      </div>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { routeNames } from '@/router'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'DepositUBXTInfo',

  emits: ['on-deposit'],

  setup () {
    const { isDarkMode, getModeName } = useGlobal()
    const { isLG } = useCustomBreakpoints()

    return { isLG, isDarkMode, getModeName, routeNames }
  }
})
</script>

<style lang="scss" scoped>
.deposit-ubxt-info {
  &__bg {
    background: url("/img/ubxt-wallet/deposit-ubxt-bg.svg") no-repeat top center / cover;
  }

  &__img {
    @media(min-width: 1920px) {
      width: 369px;
      height: 356px;
    }

    @media(min-width: 768px) and (max-width: 1919px) {
      width: 250px;
      height: 245px;
    }

    @media(min-width: 768px) and (max-width: 1439px) {
      width: 180px;
      height: 175px;
    }

    @media(max-width: 767px) {
      width: 140px;
      height: 135px;
    }
  }

  &__btn {
    max-width: 200px;
  }
}
</style>
