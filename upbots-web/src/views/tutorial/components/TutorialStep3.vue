<template>
  <div class="flex flex-col flex-grow w-full p-20 overflow-y-auto custom-scrollbar">
    <slot />

    <div class="flex flex-col items-center justify-center pb-40">
      <h2 class="tutorial-step3__title font-luckiest-guy text-white text-center mb-30">
        mobile & desktop
      </h2>

      <p class="tutorial-step3__desc text-white text-center text-md2 mb-30">
        Access the app on Desktop and Mobile for your convenience.
      </p>

      <div class="tutorial-step3__img-wrap">
        <img src="/img/tutorial/imac-screen.svg" alt="imac-screen">
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
  name: 'TutorialStep3',

  emits: ['click']
})
</script>

<style lang="scss" scoped>
.tutorial-step3 {
  &__title {
    max-width: 200px;
    font-size: 40px;
  }

  &__desc {
    max-width: 250px;
  }
}
</style>
