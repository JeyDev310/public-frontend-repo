<template>
  <div class="flex flex-col flex-grow w-full p-20 overflow-y-auto custom-scrollbar">
    <slot />

    <div class="flex flex-col items-center justify-center pb-40">
      <div class="tutorial-step1__img-wrap mb-40">
        <img src="/img/tutorial/robot.svg" alt="robot">
      </div>

      <h2 class="tutorial-step7__title text-white text-center font-bold text-4xl mb-40">
        You are ready for take off now!
      </h2>

      <div class="tutorial-step7__divider h-2 w-full bg-white mb-40" />

      <div class="flex flex-col space-y-30">
        <div class="flex flex-col space-y-10">
          <p class="font-semibold text-lg text-white text-center">More Info</p>
          <a href="https://upbots.gitbook.io" target="_blank" class="text-lg font-medium text-white">
            https://upbots.gitbook.io
          </a>
        </div>

        <div class="flex flex-col space-y-10">
          <p class="font-semibold text-lg text-white text-center">24/7 Customer Support</p>

          <div class="flex flex-col items-center">
            <p class="flex items-center text-lg font-medium text-white mb-6">
              <span class="icon-telegram-share-link mr-6" />
              <a href="https://t.me/Upbots" target="_blank">https://t.me/Upbots</a>
            </p>

            <p class="flex items-center text-lg font-medium text-white">
              <span class="icon-email-share-link mr-6" />
              <a href="mailto:contact@upbots.com">contact@upbots.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center w-full mt-auto">
      <AppButton
        type="white-outlined"
        class="tutorial-step7__btn w-full"
        @click="$emit('click', 'finish')"
      >
        Let's Go
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialStep7',

  emits: ['click']
})
</script>

<style lang="scss" scoped>
.tutorial-step7 {
  &__title {
    max-width: 290px;
  }

  &__divider {
    max-width: 120px;
  }

  &__btn {
    &.button {
      max-width: 200px;
      @apply font-bold text-2xl min-h-60 border-2;
    }
  }
}
</style>
