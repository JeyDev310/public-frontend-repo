<template>
  <div class="flex flex-col flex-grow w-full p-20 overflow-y-auto custom-scrollbar">
    <slot />

    <div class="flex flex-col items-center justify-center pb-40">
      <h2 class="tutorial-step2__title font-luckiest-guy text-white text-center mb-30">
        track your capital
      </h2>

      <p class="tutorial-step2__desc text-white text-center text-md2 mb-40">
        With UpBots you can keep track of your wallets in one single place.
      </p>

      <div class="grid grid-cols-2 gap-20 w-full">
        <div
          v-for="(item, index) in exchanges"
          :key="index"
          class="flex flex-col items-center justify-center h-60 bg-white rounded-sm w-full p-5"
        >
          <img :src="item.img" :alt="item.name">
        </div>
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
  name: 'TutorialStep2',

  emits: ['click'],

  setup () {
    const exchanges = [
      { name: 'binance', img: '/img/tutorial/exchanges/binance-logo.svg' },
      { name: 'okex', img: '/img/tutorial/exchanges/okex-logo.svg' },
      { name: 'ftx', img: '/img/tutorial/exchanges/ftx-logo.svg' },
      { name: 'kucoin', img: '/img/tutorial/exchanges/kucoin-logo.svg' },
      { name: 'huobi', img: '/img/tutorial/exchanges/huobi-logo.svg' },
      { name: 'bitmex', img: '/img/tutorial/exchanges/bitmex-logo.svg' }
    ]

    return { exchanges }
  }
})
</script>

<style lang="scss" scoped>
.tutorial-step2 {
  &__title {
    max-width: 250px;
    font-size: 40px;
  }

  &__desc {
    max-width: 260px;
  }
}
</style>
