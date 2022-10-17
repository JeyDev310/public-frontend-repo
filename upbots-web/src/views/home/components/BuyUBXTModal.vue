<template>
  <div class="md:pt-20">
    <div class="relative flex flex-col">
      <h2
        class="text-xl md:text-2xl
        text-seal-blue dark:text-white-lilac text-center font-semibold mb-32 md:mb-60"
      >
        Buy UBXT here:
      </h2>

      <div class="trade-btn__wrap grid grid-rows-1 md:grid-rows-none md:grid-cols-2 gap-y-24 md:gap-x-30">
        <a
          v-for="(item, index) in data"
          :key="index"
          :href="item.link"
          target="_blank"
          :class="item.class"
          class="flex w-full"
        >
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="trade-btn__item flex items-center justify-center w-full"
          >
            <img :src="item.img" :alt="item.title.toLowerCase()" class="trade-btn__item-img mr-10">
            <span>{{ item.title }}</span>
          </AppButton>
        </a>
      </div>
    </div>

    <div class="flex flex-col w-full mt-30 md:mt-60">
      <h2 class="text-seal-blue dark:text-white-lilac text-lg font-medium text-center mb-20 md:mb-40">
        Bridge ERC20 &#x3c;&#62; BEP20
      </h2>

      <a
        href="https://multichain.xyz/swap?pairID=UBXTv3&src=1&dest=56"
        target="_blank"
        class="trade-btn--multichain flex w-full mx-auto"
      >
        <AppButton
          type="primary-border-filled"
          size="xlg"
          class="trade-btn__item flex items-center justify-center w-full"
        >
          <img src="/img/home/buy-ubxt/buy-ubxt-multichain.png" alt="multichain" class="trade-btn__item-img mr-10">
          <span>Multichain</span>
        </AppButton>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type TBuyUBXT = { title: string; img: string; link: string; class: string; }

export default defineComponent({
  name: 'BuyUBXTModal',

  setup () {
    const data: TBuyUBXT[] = [
      {
        title: 'FTX',
        img: '/img/home/buy-ubxt/buy-ubxt-ftx.png',
        link: 'https://ftx.com/trade/UBXT/USD',
        class: 'trade-btn--ftx'
      },
      {
        title: 'Uniswap ',
        img: '/img/home/buy-ubxt/buy-ubxt-uniswap.png',
        link: 'https://app.uniswap.org/#/swap?inputCurrency=0x8564653879a18c560e7c0ea0e084c516c62f5653',
        class: 'trade-btn--uniswap'
      },
      {
        title: 'Sushiswap',
        img: '/img/home/buy-ubxt/buy-ubxt-sushiswap.png',
        link: 'https://app.sushi.com/swap#/swap?inputCurrency=0x8564653879a18c560e7c0ea0e084c516c62f5653&outputCurrency=ETH',
        class: 'trade-btn--sushiswap'
      },
      {
        title: 'Serum',
        img: '/img/home/buy-ubxt/buy-ubxt-serum.png',
        link: 'https://dex.projectserum.com/#/',
        class: 'trade-btn--serum'
      },
      {
        title: 'Kucoin',
        img: '/img/home/buy-ubxt/buy-ubxt-kucoin.png',
        link: 'https://trade.kucoin.com/UBXT-USDT',
        class: 'trade-btn--kucoin'
      },
      {
        title: 'PancakeSwap',
        img: '/img/home/buy-ubxt/buy-ubxt-pancakeswap.png',
        link: 'https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xBbEB90cFb6FAFa1F69AA130B7341089AbeEF5811',
        class: 'trade-btn--pancakeswap'
      }
    ]

    return { data }
  }
})
</script>

<style lang="scss" scoped>
.trade-btn {
  &__wrap {
    grid-auto-rows: minmax(min-content, max-content);
  }

  &--serum,
  &--kucoin,
  &--uniswap,
  &--multichain,
  &--pancakeswap,
  &--sushiswap,
  &--ftx {
    .trade-btn {
      &__item-img {
        @apply w-20;
      }
    }
  }

  @media(min-width: 768px) {
    &--multichain {
      max-width: 300px;
    }
  }
}
</style>
