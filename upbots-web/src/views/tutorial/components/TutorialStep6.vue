<template>
  <div class="flex flex-col flex-grow w-full p-20 overflow-y-auto custom-scrollbar">
    <slot />

    <div class="flex flex-col items-center justify-center pb-40">
      <h2 class="tutorial-step6__title font-luckiest-guy text-white text-center mb-40">
        invite friends and earn
      </h2>

      <ul class="grid grid-cols-1 gap-y-20 relative">
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
              border
              border-solid
              border-white
              rounded-full
              overflow-hidden
            "
          >
            <span class="font-bold text-white text-2xl">{{ item.id }}</span>
          </div>

          <div class="flex flex-col ml-30">
            <p>
              <span v-if="item.preTitle" class="font-bold text-white mr-5">{{ item.preTitle }}</span>
              <span class="tutorial-step6__list-title text-white font-bold mb-4">{{ item.title }}</span>
            </p>
            <p class="text-white text-xl font-bold uppercase">{{ item.desc }}</p>
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
  name: 'TutorialStep6',

  emits: ['click'],

  setup () {
    const steps = [
      { id: 1, preTitle: '', title: '200', desc: 'UBXT for you AND your friend' },
      { id: 2, preTitle: 'UP TO', title: '10%', desc: "of your friend's fees!" },
      { id: 3, preTitle: '', title: '2%', desc: "of your friend's friend fees!" }
    ]

    return { steps }
  }
})
</script>

<style lang="scss" scoped>
.tutorial-step6 {
  &__title {
    max-width: 290px;
    font-size: 40px;
  }

  &__list-title {
    font-size: 40px;
  }
}
</style>
