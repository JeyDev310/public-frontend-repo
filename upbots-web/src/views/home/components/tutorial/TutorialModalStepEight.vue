<template>
  <div class="modal__wrap relative flex flex-col px-10 md:px-20 pt-10">
    <div class="flex flex-col items-center overflow-y-auto custom-scrollbar md:overflow-visible">
      <!-- TITLE SLOT -->
      <slot />

      <div class="tutorial__img w-full mb-20">
        <!-- WM -->
        <!-- <img src="/img/winter-mode/hero-robot-wm.svg" alt="upbots-logo-wm" class="w-full h-full object-cover"> -->

        <!-- Default mode -->
        <img src="/img/home/tutorial/step-1-img.png" alt="upbots-logo" class="w-full h-full object-cover">
      </div>

      <div class="tutorial__paragraph flex flex-col items-center w-full leading-sm text-center mx-auto mb-30">
        <p class="text-british-shorthair dark:text-blair">
          And that concludes our 1st platform tour!
          We hope you have found this first introduction helpful. Don't forget to check out the
          other sections of the dash that are still under development and will be unlocked soon!
        </p>

        <p class="text-british-shorthair dark:text-blair mb-10 mt-5">
          If you have any questions or need assistance you can chat with Us directly using Telegram,
          Discord or via E-mail.
        </p>

        <div class="flex items-center mb-5">
          <p class="text-british-shorthair dark:text-blair mr-3">Telegram:</p>
          <a class="text-astral" href="https://t.me/Upbots">https://t.me/Upbots</a>
        </div>

        <div class="flex items-center mb-5">
          <p class="text-british-shorthair dark:text-blair mr-3">Discord:</p>
          <a class="text-astral" href="https://discord.gg/ZaX4FxF6">https://discord.gg/ZaX4FxF6</a>
        </div>

        <div class="flex items-center mb-5">
          <p class="text-british-shorthair dark:text-blair mr-3">E-mail:</p>
          <a class="text-astral" href="mailto:contact@upbots.com">contact@upbots.com</a>
        </div>

        <div class="flex items-center mt-10">
          <p class="text-british-shorthair dark:text-blair mr-3">
            UpBots - The first All-in-one DeFi and Crypto Trading Platform on the Blockchain.
          </p>
        </div>
      </div>

      <AppButton class="tutorial__btn w-full" @click="$emit('next')">Finish</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialModalStepEight',

  emits: ['next']
})
</script>

<style lang="scss" scoped>
.modal {
  &__wrap {
    min-height: 639px;
    @media (max-width: 767px) {
      min-height: 697px;
    }
  }
}
.tutorial {
  &__paragraph {
    max-width: 470px;
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
