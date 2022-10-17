<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-20">
    <div class="flex flex-col items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20">
        <img :src="getImg" alt="keys-screen" class="w-full h-full object-cover">
      </div>

      <p class="tutorial__paragraph w-full text-british-shorthair dark:text-blair text-center mx-auto mb-14 md:mb-30">
        Upbots will connect you to all the markets from digital (Crypto/DeFi) to traditional (Forex, Commodities, etc).
        To start trading,
        you will need to add an account to Upbots.
        You can easily do that from the homepage, the portfolio monitoring section or the API key
        management section in the top menu
      </p>

      <AppButton class="tutorial__btn w-full" @click="$emit('next')">Next</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'TutorialModalStepThird',

  emits: ['next'],

  setup () {
    // GLOBAL SETUP //
    const { isDarkMode } = useGlobal()

    /* WM */
    // const getImg = computed(() => isDarkMode.value
    //   ? '/img/winter-mode/keys-page-screen-dark-wm.png'
    //   : '/img/winter-mode/keys-page-screen-light-wm.png')

    /* Default mode */
    const getImg = computed(() => isDarkMode.value
      ? '/img/home/tutorial/keys-page-screen-dark.png'
      : '/img/home/tutorial/keys-page-screen-light.png')

    return { isDarkMode, getImg }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 597px;
    @media (max-width: 767px) {
      min-height: 540px;
    }
  }
}

.tutorial {
  &__paragraph {
    max-width: 470px;
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
      min-height: 178px;
    }
  }
}
</style>
