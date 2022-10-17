<template>
  <div class="flex flex-col flex-grow w-full p-20 overflow-y-auto custom-scrollbar">
    <slot />

    <div class="flex flex-col items-center justify-center pb-40">
      <div class="mb-40">
        <img src="/img/tutorial/robot.svg" alt="robot">
      </div>

      <h2 class="tutorial-step1__title font-luckiest-guy text-white text-center mb-30">
        welcome to UPBOTS
      </h2>

      <p class="tutorial-step1__desc text-white text-center text-md2">
        Hi Captain! Welcome on board. I'm here to make your life easier during this flight.
        Let's get ready for take off.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-x-20 mt-auto">
      <div />

      <AppButton
        type="white-outlined"
        class="tutorial__btn w-full"
        @click="$emit('click', 'next')"
      >
        Next
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TutorialStep1',

  emits: ['click']
})
</script>

<style lang="scss" scoped>
.tutorial-step1 {
  &__title {
    max-width: 250px;
    font-size: 40px;
  }

  &__desc {
    max-width: 260px;
  }
}
</style>
