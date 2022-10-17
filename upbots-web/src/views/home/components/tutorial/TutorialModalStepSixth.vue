<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-10">
    <div class="flex flex-col items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20">
        <img src="/img/home/tutorial/step-6-img.png" alt="img" class="w-full h-full object-cover">
      </div>

      <p class="tutorial__paragraph w-full text-british-shorthair dark:text-blair text-center mx-auto mb-14 md:mb-30">
        Now that you have mastered the main areas of the Upbots interface,
        it’s time to create your own bots, with your signals and your
        strategy. Good news! We have made this really simple!
        You can link your strategy from tradingview and follow its performance easily.
      </p>

      <AppButton class="tutorial__btn w-full" @click="$emit('next')">Next</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialModalStepSixth',

  emits: ['next']
})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 529px;
    @media (max-width: 767px) {
      min-height: 498px;
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
      min-height: 180px;
    }
  }
}
</style>
