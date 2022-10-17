<template>
  <div class="flex flex-col flex-grow w-full p-20 overflow-y-auto custom-scrollbar">
    <slot />

    <div class="flex flex-col items-center justify-center pb-40">
      <h2 class="tutorial-step5__title font-luckiest-guy text-white text-center mb-40">
        how to start
      </h2>

      <ul class="grid grid-cols-1 gap-y-20 relative">
        <div class="tutorial-step5__line absolute top-0 left-24 w-1 bg-white z-1" />

        <li v-for="(item, index) in steps" :key="index" class="flex z-10">
          <div
            class="
              flex
              flex-col
              items-center
              justify-center
              flex-shrink-0
              w-50
              h-50
              bg-white
              rounded-full
              overflow-hidden
            "
          >
            <span class="tutorial-step5__num font-bold text-2xl">{{ item.id }}</span>
          </div>

          <div class="flex flex-col ml-30">
            <span class="text-white text-lg font-bold mb-4">{{ item.title }}</span>
            <span class="text-white text-md">{{ item.desc }}</span>
          </div>
        </li>
      </ul>
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
  name: 'TutorialStep5',

  emits: ['click'],

  setup () {
    const steps = [
      { id: 1, title: 'Sign Up', desc: 'Create your account on mobile or desktop' },
      { id: 2, title: 'Add your exchange/s', desc: 'You can easily connect your exchange API key' },
      { id: 3, title: 'Make a UBXT Deposit', desc: 'Make a UBXT deposit to cover performance fees on your profits. Yes, we charge you only when you make a profit!' },
      { id: 4, title: 'Launch a bot', desc: 'Activate a bot of your choice and let the good times roll!' }
    ]

    return { steps }
  }
})
</script>

<style lang="scss" scoped>
.tutorial-step5 {
  &__title {
    max-width: 300px;
    font-size: 40px;
  }

  &__line {
    height: 90%;
  }

  &__num {
    color: #48A4BF;
  }
}
</style>
