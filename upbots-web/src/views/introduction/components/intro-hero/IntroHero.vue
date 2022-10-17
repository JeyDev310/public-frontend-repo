<template>
  <div class="relative w-full" :class="!isLG && 'grid grid-cols-2 gap-x-20'">
    <div class="flex flex-col items-start">
      <!-- TITLE -->
      <h2
        class="
          font-semibold
          text-md
          md:text-2xl
          lg:text-4xl
          text-chicory-flower
          dark:text-blair
          mb-10
        "
      >
        Get Started!
      </h2>

      <!-- DESCRIPTION -->
      <p class="md:text-lg lg:text-xl text-bluster-blue dark:text-white mb-20 md:mb-40">
        Welcome to UpBots ! You are a few steps away of your trading journey:
      </p>

      <!-- STEPS -->
      <IntroHeroSteps />
    </div>

    <!-- IMAGES -->
    <mq-layout mq="xl+" class="flex flex-col self-end">
      <div class="intro-hero__img relative self-end">
        <AppCryptoCoinChecker
          icon-name="btc"
          :icon-size="1.9"
          class="intro-hero__btn-icon absolute"
        />
        <img
          :src="`/img/introduction/robot-wave-img${isDarkMode ? '-dark' : ''}.svg`"
          alt="robot-wave"
          class="object-cover ml-auto"
        >
        <AppCryptoCoinChecker
          icon-name="eth"
          :icon-size="1.9"
          class="intro-hero__eth-icon absolute"
        />
      </div>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import IntroHeroSteps from './intro-hero-steps/IntroHeroSteps.vue'

export default defineComponent({
  name: 'IntroHero',

  components: { IntroHeroSteps },

  setup () {
    const { isDarkMode } = useGlobal()
    const { isLG } = useCustomBreakpoints()

    return { isDarkMode, isLG }
  }
})
</script>

<style lang="scss" scoped>
.intro-hero {
  &__img-wrap {
    max-height: 540px;
  }

  &__btn-icon {
    bottom: 23%;
    left: 34%;
  }

  &__eth-icon {
    top: 34%;
    right: 8%;
  }
}
</style>
