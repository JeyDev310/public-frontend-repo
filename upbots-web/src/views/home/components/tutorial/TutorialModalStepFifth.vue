<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-20">
    <div class="flex flex-col items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20">
        <img :src="getImg" alt="manual-trade-screen" class="w-full h-full object-cover">
      </div>

      <p class="tutorial__paragraph w-full text-british-shorthair dark:text-blair text-center mx-auto mb-14 md:mb-30">
        Once you have connected your account, you can enter your trading room and start a manual trade.
        Two modes are available. Simple
        Trade, to quickly buy and sell, and Advanced Trade,
        with a lot exceptional features like the multiple entries, targets and stops,
        safeties, trailing profits and stops, a risk management tool and much more to come.
      </p>

      <AppButton class="tutorial__btn w-full" @click="$emit('next')">Next</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'TutorialModalStepFifth',

  emits: ['next'],

  setup () {
    // GLOBAL SETUP //
    const { isDarkMode } = useGlobal()

    /* WM */
    // const getImg = computed(() => isDarkMode.value
    //   ? '/img/winter-mode/manual-trade-page-screen-dark-wm.png'
    //   : '/img/winter-mode/manual-trade-page-screen-light-wm.png')

    /* Default mode */
    const getImg = computed(() => isDarkMode.value
      ? '/img/home/tutorial/manual-trade-page-screen-dark.png'
      : '/img/home/tutorial/manual-trade-page-screen-light.png')

    return { isDarkMode, getImg }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 673px;
    @media (max-width: 767px) {
      min-height: 618px;
    }
  }
}

.tutorial {
  &__paragraph {
    max-width: 475px;
  }

  &__img {
    max-width: 390px;
    min-height: 243px;
  }

  &__btn {
    max-width: 280px;
  }

  @media (max-width: 767px) {
    &__img {
      min-height: 180px;
    }
  }
}
</style>
