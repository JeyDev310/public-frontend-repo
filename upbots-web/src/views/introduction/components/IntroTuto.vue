<template>
  <div class="intro-tuto flex flex-col flex-grow w-full">
    <!-- ITEMS GRID -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-y-60 md:gap-y-0 gap-x-20">
      <!-- ITEM -->
      <a
        v-for="(item, index) in data"
        :key="index"
        :href="item.href"
        target="_blank"
        class="flex flex-col flex-grow cursor-pointer"
      >
        <AppCard class="flex flex-col flex-grow items-center pb-10 lg:pb-20 px-10 lg:px-20">
          <!-- IMG -->
          <div class="intro-tuto__img-wrap flex flex-col items-center justify-center">
            <div class="w-full h-full">
              <img :src="item.img" :alt="item.img" class="h-full object-cover">
            </div>
          </div>

          <!-- TITLE -->
          <p class="text-chicory-flower lg:text-md font-medium dark:text-white text-center mt-20">
            {{ item.title }}
          </p>
        </AppCard>
      </a>
    </div>

    <!-- LINK -->
    <div class="ml-auto mt-20 md:pr-3">
      <a
        href="https://upbots.gitbook.io/upbots/"
        target="_blank"
        class="group flex items-center text-tradewind"
      >
        <span class="font-medium md:text-md mr-6 md:mr-10">Check out our Gitbook</span>
        <AppIcon
          name="arrow-long"
          :size="isLG ? '18' : '22'"
          class="block transform md:group-hover:translate-x-3 md:duration-300 rotate-180"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

interface ITuto {
  id: number;
  title: string;
  href: string;
  img: string;
  alt: string;
}

export default defineComponent({
  name: 'IntroTuto',

  setup () {
    const { isLG } = useCustomBreakpoints()

    const data: ITuto[] = [
      {
        id: 1,
        title: 'How to connect an API key?',
        href: 'https://upbots.gitbook.io/upbots/2.-features/wallets-manager/connect-an-exchange',
        img: '/img/introduction/api-key.svg',
        alt: 'api key'
      },
      {
        id: 2,
        title: 'How to deposit UBXT?',
        href: 'https://upbots.gitbook.io/upbots/2.-features/ubxt-wallet',
        img: '/img/introduction/deposit.svg',
        alt: 'deposit'
      },
      {
        id: 3,
        title: 'How to activate a bot ?',
        href: 'https://upbots.gitbook.io/upbots/2.-features/algo-rental/connect-an-algo',
        img: '/img/introduction/activate-bot.svg',
        alt: 'activate bot'
      },
      {
        id: 4,
        title: 'How to stake my UBXT?',
        href: 'https://upbots.gitbook.io/upbots/2.-features/ubxt-staking/staking-ubxt',
        img: '/img/introduction/stake.svg',
        alt: 'stake'
      }
    ]

    return { isLG, data }
  }
})
</script>

<style lang="scss" scoped>
.intro-tuto {
  @media(min-width: 1024px) {
    padding-top: 55px;
    margin-top: 100px;

    &__img-wrap {
      margin-top: -55px;
      height: 110px;
    }
  }

  @media(max-width: 1023px) {
    @apply mt-60;
    padding-top: 35px;

    &__img-wrap {
      @apply h-70;
      margin-top: -35px;
    }
  }
}
</style>
