<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-20">
    <div class="flex flex-col items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20">
        <img :src="getImg" alt="portfolio-screen" class="w-full h-full object-cover">
      </div>

      <p class="tutorial__paragraph w-full text-british-shorthair dark:text-blair text-center mx-auto mb-14 md:mb-30">
        Here you can track the evolution of all your assets to easily keep an eye on the
        big picture of your trading over time. But what
        about your historical trading situation?
        Our tool will enable you to upload your past situation too so your timeline and portfolio
        evolution is complete!
      </p>

      <AppButton class="tutorial__btn w-full" @click="$emit('next')">Next</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'TutorialModalStepFourth',

  emits: ['next'],

  setup () {
    // GLOBAL SETUP //
    const { isDarkMode } = useGlobal()

    /* WM */
    // const getImg = computed(() => isDarkMode.value
    //   ? '/img/winter-mode/portfolio-page-screen-dark-wm.png'
    //   : '/img/winter-mode/portfolio-page-screen-light-wm.png')

    /* Default mode */
    const getImg = computed(() => isDarkMode.value
      ? '/img/home/tutorial/portfolio-page-screen-dark.png'
      : '/img/home/tutorial/portfolio-page-screen-light.png')

    return { isDarkMode, getImg }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 551px;
    @media (max-width: 767px) {
      min-height: 564px;
    }
  }
}

.tutorial {
  &__paragraph {
    max-width: 480px;
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
