<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-20">
    <div class="flex flex-col items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20">
        <img :src="getImg" alt="home-screen" class="w-full h-full object-cover">
      </div>

      <p class="tutorial__paragraph w-full text-british-shorthair dark:text-blair text-center mx-auto mb-14 md:mb-30">
        Here on the main page of the dashboard, you get a quick summary of your situation,
        an overview of your activities, and quick access
        to the marketplace tools
      </p>

      <AppButton class="tutorial__btn w-full" @click="$emit('next')">Next</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'TutorialModalStepSecond',

  emits: ['next'],

  setup () {
    // GLOBAL SETUP //
    const { isDarkMode } = useGlobal()

    /* WM */
    // const getImg = computed(() => isDarkMode.value
    //   ? '/img/winter-mode/home-page-screen-dark-wm.png'
    //   : '/img/winter-mode/home-page-screen-light-wm.png')

    /* Default mode  */
    const getImg = computed(() => isDarkMode.value
      ? '/img/home/tutorial/home-page-screen-dark.png'
      : '/img/home/tutorial/home-page-screen-light.png')

    return { isDarkMode, getImg }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 631px;
    @media (max-width: 767px) {
      min-height: 567px;
    }
  }
}

.tutorial {
  &__paragraph {
    max-width: 470px;
  }

  &__img {
    max-width: 390px;
    min-height: 245px;
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
