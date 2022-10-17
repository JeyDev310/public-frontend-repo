<template>
  <div class="flex flex-col flex-grow w-full">
    <!-- TITLE -->
    <p class="text-nile-blue dark:text-blair text-left text-md 4xl:text-lg font-medium mb-20 4xl:mb-24">
      Open a new account
    </p>

    <div class="grid grid-rows-1 md:grid-rows-none md:grid-cols-2 flex-grow gap-y-16 md:gap-20 4xl:gap-24">
      <!-- ACCOUNT ITEMS -->
      <AppCard
        v-for="(item, index) in accounts"
        :key="index"
        class="flex flex-col items-center justify-center"
      >
        <a
          :href="item.link"
          target="_blank"
          class="flex flex-col items-center justify-center w-full p-28 md:p-20"
        >
          <div class="account__img-wrap flex flex-col items-center justify-center">
            <img :src="item.img" :alt="item.alt" :style="item.size">
          </div>
          <!-- TODO: GET INFO FOR EACH EXCHANGE -->
          <!-- <p class="text-md text-bluster-blue dark:text-white text-center font-medium">{{ item.title }}</p> -->
        </a>
      </AppCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'ExchangeOpenNewAccount',

  setup () {
    const { isDarkMode } = useGlobal()

    const accounts = computed(() => {
      return [
        {
          img: '/img/keys/account-img/binance-dark-logo.png',
          alt: 'binance',
          title: '-10% on trading fees',
          size: 'height: 56px',
          link: 'https://www.binance.com/en/register?ref=40365219'
        },
        {
          img: '/img/keys/account-img/kucoin-dark-logo.png',
          alt: 'kucoin',
          title: '-10% on trading fees',
          size: 'height: 37px',
          link: 'https://www.kucoin.com/ucenter/signup?rcode=1ucK7sh'
        },
        {
          img: `/img/keys/account-img/ftx-${!isDarkMode.value ? 'light' : 'dark'}-logo.png`,
          alt: 'ftx',
          title: '$25 gift',
          size: 'height: 37px',
          link: 'https://ftx.com/#a=Upbots'
        },
        {
          img: `/img/keys/account-img/bitmex-${!isDarkMode.value ? 'light' : 'dark'}-logo.png`,
          alt: 'bitmex',
          title: '$25 gift',
          size: 'height: 24px',
          link: 'https://www.bitmex.com/register/l1uQdD'
        },
        {
          img: `/img/keys/account-img/okex-${!isDarkMode.value ? 'light' : 'dark'}-logo.png`,
          alt: 'okex',
          title: '-10% on trading fees',
          size: 'height: 37px',
          link: 'https://www.okex.com/join/3/2232856'
        },
        {
          img: `/img/keys/account-img/huobi-${!isDarkMode.value ? 'light' : 'dark'}-logo.png`,
          alt: 'huobi',
          title: '-10% on trading fees',
          size: 'height: 33px',
          link: 'https://www.huobi.com/en-us/topic/invited/?invite_code=ft4b6'
        }
      ]
    })

    return { isDarkMode, accounts }
  }
})
</script>

<style lang="scss" scoped>
.account {
  &__img-wrap {
    height: 56px;
  }
}
</style>
