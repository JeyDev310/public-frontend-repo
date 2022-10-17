<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-10">
    <div class="flex flex-col items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20 overflow-hidden">
        <img :src="getImg" alt="algobots-screen" class="w-full h-full object-cover">
      </div>

      <div
        class="
          tutorial__paragraph
          flex
          flex-col
           w-full
          text-british-shorthair
          dark:text-blair
          text-center
          mx-auto
          mb-14
          md:mb-30
        "
      >
        <span>
          And we arrive to the corner stone of why you are going to fall in love with Upbots.
          The Upbots Marketplace. Here you will be able
          to:
        </span>
        <span>- rent algos (developed by the UpBot’s community ) on a performance fee basis,</span>
        <span>- access courses on every aspect of trading (whatever flavour you prefer best)</span>
        <span>- the best signal provider subscriptions in the marketplace</span>
        <span>- DeFi Solutions: direct swaps and more</span>
        <span>- Access liquidity pools or other staking options via our partners</span>
      </div>

      <AppButton class="tutorial__btn w-full" @click="$emit('next')">Next</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'TutorialModalStepSeventh',

  emits: ['next'],

  setup () {
    // GLOBAL SETUP //
    const { isDarkMode } = useGlobal()

    /* WM */
    // const getImg = computed(() => isDarkMode.value
    //   ? '/img/winter-mode/algobots-page-screen-dark-wm.png'
    //   : '/img/winter-mode/algobots-page-screen-light-wm.png')

    /* Default mode */
    const getImg = computed(() => isDarkMode.value
      ? '/img/home/tutorial/algobots-page-screen-dark.png'
      : '/img/home/tutorial/algobots-page-screen-light.png')

    return { isDarkMode, getImg }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 630px;
    @media (max-width: 767px) {
      &__img {
        min-height: 632px;
      }
    }
  }
}

.tutorial {
  &__paragraph {
    max-width: 470px;
  }

  &__img {
    max-width: 390px;
    min-height: 280px;
    max-height: 280px;
  }

  &__btn {
    max-width: 280px;
  }

  @media (max-width: 767px) {
    &__img {
      min-height: 180px;
      max-height: 180px;
    }
  }
}
</style>
