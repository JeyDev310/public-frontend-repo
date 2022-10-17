<template>
  <div class="flex flex-col flex-shrink-0 w-full md:px-20">
    <mq-layout mq="lg+">
      <h2 class="
        tracking-tightest
        text-heavy-metal-armor
        dark:text-cashmere-blue
        text-xl
        4xl:text-2xl
        uppercase
        font-semibold
        mb-20
        4xl:mb-24
      "
      >
        APPS
      </h2>
    </mq-layout>

    <div
      class="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-5
        gap-y-12
        md:gap-y-20
        xl:gap-y-0
        gap-x-12
        md:gap-x-20
        4xl:gap-x-28
      "
    >
      <router-link
        v-for="item in data"
        :key="item.route"
        #default="{ navigate }"
        :to="{ name: item.route }"
        custom
      >
        <AppCard
          class="home-apps__card flex flex-col items-center justify-center p-10 cursor-pointer"
          @click="navigate()"
        >
          <div
            class="home-apps__card-img relative flex flex-col items-center justify-start w-full"
          >
            <div
              :style="$mq === 'sm' || $mq === 'md'
                ? `max-width: ${item.size.mobile}`
                : `max-width: ${item.size.desktop}`"
              class="w-full"
            >
              <img
                :src="item.img"
                :alt="item.alt"
                class="object-cover w-full h-full mx-auto"
              >
            </div>
          </div>

          <p class="w-full text-sargasso-sea dark:text-white text-center mt-14">
            {{ item.title }}
            <span v-if="item.comingSoon" class="text-deep-aquamarine">Soon</span>
          </p>
        </AppCard>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'HomeTools',

  setup () {
    const { isDarkMode } = useGlobal()

    const data = computed(() => {
      return [
        {
          id: 1,
          title: 'Algo Rental',
          comingSoon: false,
          img: `/img/home/tools/algo-rental-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'algo-rental',
          route: 'algo-bots',
          size: {
            desktop: '150px',
            mobile: '97px'
          }
        },
        {
          id: 2,
          title: 'Trade',
          comingSoon: false,
          img: `/img/home/tools/signal-providers-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'manual-trade',
          route: 'manual-trade',
          size: {
            desktop: '130px',
            mobile: '90px'
          }
        },
        {
          id: 3,
          title: 'Staking',
          comingSoon: false,
          img: `/img/home/tools/staking-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'staking',
          route: 'staking',
          size: {
            desktop: '120px',
            mobile: '85px'
          }
        },
        {
          id: 4,
          title: 'Bridge',
          comingSoon: false,
          img: `/img/home/tools/copytrading-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'bridge',
          route: 'ubxt-bridge',
          size: {
            desktop: '130px',
            mobile: '95px'
          }
        },
        {
          id: 5,
          title: 'Copy Trading',
          comingSoon: true,
          img: `/img/home/tools/learning-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'copytrading',
          route: 'copy-trading',
          size: {
            desktop: '140px',
            mobile: '95px'
          }
        }
        // {
        //   id: 3,
        //   title: 'Swap',
        //   comingSoon: false,
        //   img: `/img/home/tools/swap-ill${!isDarkMode.value ? '-light' : ''}.svg`,
        //   alt: 'swap',
        //   route: 'swap',
        //   size: {
        //     desktop: '100px',
        //     mobile: '70px'
        //   }
        // },
      ]
    })

    return { data, isDarkMode }
  }
})
</script>

<style lang="scss" scoped>
.home-apps {
  &__card {
    height: 260px;
  }

  @media (max-width: 767px) {
    &__card {
      height: 150px;
    }
  }

  @media (min-width: 769px) {
    &__card-img {
      height: 120px;
    }
  }
}
</style>
