<template>
  <div
    class="
      flex
      flex-col
      flex-shrink-0
      md:flex-shrink
      items-start
      w-full
      pt-40
      md:pt-0
      md:pl-20
      lg:pl-40
      xl:pl-70
      overflow-y-auto
      custom-scrollbar
    "
  >
    <div class="buy-ubxt-exchanges__container w-full">
      <!-- CENTRALIZED EXCHANGES -->
      <div class="flex flex-col w-full mb-40 lg:mb-70">
        <h2
          class="text-left md:text-md font-medium text-nile-blue dark:text-blair leading-1 mb-20 lg:mb-40"
        >
          On Centralized Exchanges:
        </h2>

        <div class="flex flex-col w-full">
          <div
            class="trade-btn__wrap flex flex-col lg:flex-row items-center space-y-20 lg:space-y-0 lg:space-x-20"
          >
            <a
              v-for="(item, index) in centralizedExch"
              :key="index"
              :href="item.link"
              target="_blank"
              class="trade-btn__link flex w-full"
            >
              <AppButton
                type="primary-border-filled"
                :size="isMD ? 'md' : 'xlg'"
                class="flex items-center justify-center w-full"
              >
                <img :src="item.img" :alt="item.title.toLowerCase()" class="w-20 mr-10">
                <span>{{ item.title }}</span>
              </AppButton>
            </a>
          </div>
        </div>
      </div>

      <!-- DECENTRALIZED EXCHANGES -->
      <div class="flex flex-col w-full mb-40 lg:mb-70">
        <h3
          class="text-left md:text-md font-medium text-nile-blue dark:text-blair leading-1 mb-20 lg:mb-40"
        >
          On Decentralized Exchanges:
        </h3>

        <div class="flex flex-col">
          <div
            class="trade-btn__wrap grid
            grid-rows-1 lg:grid-rows-none lg:grid-cols-2 gap-y-20 lg:gap-x-20"
          >
            <a
              v-for="(item, index) in decentralizedExch"
              :key="index"
              :href="item.link"
              target="_blank"
              class="trade-btn__link flex w-full mx-auto md:mx-0"
            >
              <AppButton
                type="primary-border-filled"
                :size="isMD ? 'md' : 'xlg'"
                class="flex items-center justify-center w-full"
              >
                <img :src="item.img" :alt="item.title.toLowerCase()" class="w-20 mr-10">
                <span>{{ item.title }}</span>
              </AppButton>
            </a>
          </div>
        </div>
      </div>

      <!-- INFO AND INPUT ADDRESS -->
      <div class="flex flex-col w-full">
        <div class="flex flex-col w-full mb-20 lg:mb-40">
          <h4 class="font-medium text-industrial-revolution dark:text-let-it-snow">
            When done, send UBXT on your UpBots wallet (eth or bsc).
          </h4>

          <h4 class="font-medium text-industrial-revolution dark:text-let-it-snow">
            Step by step guide
            <a
              href="https://upbots.gitbook.io/upbots/2.-features/ubxt-wallet"
              target="_blank"
              class="underline hover:no-underline text-astral cursor-pointer"
            >
              here
            </a>
          </h4>
        </div>

        <AppInput
          v-if="getDepositEthAddress"
          v-model="getDepositEthAddress"
          readonly
          allow-copy
          size="xlg"
          @on-copy="e => (copyToClipboard({value: e}))"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { vuex } from '@/store'

import { copyToClipboard } from '@/core/helpers'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

type TBuyUBXT = { title: string; img: string; link: string;}

export default defineComponent({
  name: 'BuyUBXTExchanges',

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD } = useCustomBreakpoints()

    const decentralizedExch: TBuyUBXT[] = [
      {
        title: 'Uniswap',
        img: '/img/home/buy-ubxt/buy-ubxt-uniswap.png',
        link: 'https://app.uniswap.org/#/swap?inputCurrency=0x8564653879a18c560e7c0ea0e084c516c62f5653'
      },
      {
        title: 'Sushiswap',
        img: '/img/home/buy-ubxt/buy-ubxt-sushiswap.png',
        link: 'https://app.sushi.com/swap#/swap?inputCurrency=0x8564653879a18c560e7c0ea0e084c516c62f5653&outputCurrency=ETH'
      },
      {
        title: 'Serum',
        img: '/img/home/buy-ubxt/buy-ubxt-serum.png',
        link: 'https://dex.projectserum.com/#/'
      },
      {
        title: 'PancakeSwap',
        img: '/img/home/buy-ubxt/buy-ubxt-pancakeswap.png',
        link: 'https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xBbEB90cFb6FAFa1F69AA130B7341089AbeEF5811'
      }
    ]

    const centralizedExch: TBuyUBXT[] = [
      {
        title: 'FTX',
        img: '/img/home/buy-ubxt/buy-ubxt-ftx.png',
        link: 'https://ftx.com/trade/UBXT/USD'
      },
      {
        title: 'Kucoin',
        img: '/img/home/buy-ubxt/buy-ubxt-kucoin.png',
        link: 'https://trade.kucoin.com/UBXT-USDT'
      }
    ]

    const getDepositEthAddress = computed((): string => vuex.ubxtWallet?.perfeesUserWalletData?.depositAddressETH || '')

    return {
      isMD,
      centralizedExch,
      decentralizedExch,
      getDepositEthAddress,
      copyToClipboard
    }
  }
})
</script>

<style lang="scss" scoped>
.buy-ubxt-exchanges {
  &__container {
    max-width: 640px;
  }
}

.trade-btn {
  &__wrap {
    grid-auto-rows: minmax(min-content, max-content);
  }

  @media(max-width: 767px) {
    &__link {
      max-width: 300px;
    }
  }
}
</style>
