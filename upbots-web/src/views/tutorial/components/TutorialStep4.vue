<template>
  <div class="flex flex-col flex-grow w-full p-20 overflow-y-auto custom-scrollbar">
    <slot />

    <div class="flex flex-col items-center justify-center pb-40">
      <h2 class="tutorial-step4__title font-luckiest-guy text-white text-center mb-30">
        a marketplace full of bots
      </h2>

      <p class="tutorial-step4__desc text-white text-center text-md2 mb-30">
        Automate your trades and chose one or many of our bots.
      </p>

      <div class="tutorial-step4__img-wrap">
        <img src="/img/tutorial/iphone-screen.svg" alt="iphone-screen">
      </div>
    </div>

    <div class="grid grid-cols-2 gap-x-20 mt-auto">
      <AppButton
        type="white-outlined"
        class="tutorial__btn w-full"
        @click="$emit('click', 'prev')"
      >
        Previous
      </AppButton>

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
  name: 'TutorialStep4',

  emits: ['click']
})
</script>

<style lang="scss" scoped>
.tutorial-step4 {
  &__title {
    max-width: 300px;
    font-size: 40px;
  }

  &__desc {
    max-width: 250px;
  }
}
</style>
