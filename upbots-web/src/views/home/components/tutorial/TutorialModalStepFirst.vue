<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-20">
    <div class="flex flex-col flex-grow items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20">
        <!-- WM -->
        <!-- <img src="/img/winter-mode/hero-robot-wm.svg" alt="upbots-logo-wm" class="w-full h-full object-cover"> -->

        <!-- Default mode -->
        <img src="/img/home/tutorial/step-1-img.png" alt="upbots-logo" class="w-full h-full object-cover">
      </div>

      <p class="tutorial__paragraph w-full text-british-shorthair dark:text-blair text-center mx-auto mb-14 md:mb-30">
        Hey captain, we are delighted to welcome you on Upbots and to unveil a preview of its interface.
      </p>

      <AppButton class="tutorial__btn w-full mt-auto" @click="$emit('next')">
        Start The Tour
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialModalStepFirst',

  emits: ['next']

})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 367px;
  }
}

.tutorial {
  &__paragraph {
    max-width: 450px;
  }

  &__img {
    max-width: 123px;
    min-height: 160px;
  }

  &__btn {
    max-width: 280px;
  }
}
</style>
