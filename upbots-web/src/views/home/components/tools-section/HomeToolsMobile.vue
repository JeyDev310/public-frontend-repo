
<template>
  <div class="flex flex-shrink-0 w-full space-x-20 px-10 mb-20 overflow-x-auto custom-scrollbar">
    <router-link
      v-for="item in data"
      :key="item.route"
      #default="{ navigate }"
      :to="{ name: item.route }"
      custom
    >
      <div
        class="home-tools__card flex flex-col rounded-md p-20 cursor-pointer"
        :class="item.class"
        @click="navigate()"
      >
        <!-- TOOLS IMG -->
        <div class="home-tools__card-img relative flex flex-col items-center justify-start w-full">
          <div :style="`max-width: ${item.size.width}px`" class="w-full">
            <AppImage
              :src="item.img"
              :alt="item.alt"
              class="flex flex-col h-full"
              img-class="flex xl:flex-col w-full h-full object-cover"
              :width="item.size.width"
              :height="item.size.height"
            />
          </div>
        </div>

        <!-- TOOLS TEXT -->
        <div class="flex flex-col flex-grow w-full mt-14">
          <span class="text-white text-center mb-6">{{ item.title }}</span>
          <span class="text-white text-center text-sm">{{ item.subtitle }}</span>
        </div>

        <!-- TOOLS BUTTON -->
        <AppButton
          type="custom"
          rounded="md"
          size="sm"
          class="home-tools__card-btn relative bg-white mt-auto"
        >
          <span class="font-medium">Start Now</span>
          <AppIcon
            name="back"
            size="30"
            class="absolute top-1/2 right-10 transform -translate-y-1/2 rotate-180"
          />
        </AppButton>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type TSize = { width: number; height: number; }

interface ITools {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  alt: string;
  route: string;
  class: string;
  size: TSize;
}

export default defineComponent({
  name: 'HomeToolsMobile',

  setup () {
    const data: ITools[] = [
      {
        id: 1,
        title: 'Algo',
        subtitle: 'Let the power of algorithms manage your capital',
        img: '/img/home/tools/algo-rental-ill.svg',
        alt: 'algo-rental',
        route: 'algo-bots',
        class: 'home-tools__algo',
        size: {
          width: 110,
          height: 77
        }
      },
      {
        id: 2,
        title: 'Earn passive income',
        subtitle: 'Refer UpBots to your friends and earn up to 10% of the performance fees they will pay',
        img: '/img/home/tools/signal-providers-ill.svg',
        alt: 'refferal',
        route: 'referral',
        class: 'home-tools__referral',
        size: {
          width: 100,
          height: 77
        }
      },
      {
        id: 3,
        title: 'Stake',
        subtitle: 'Farm UBXT and reduce your performance fee rates',
        img: '/img/home/tools/staking-ill.svg',
        alt: 'staking',
        route: 'staking',
        class: 'home-tools__stake',
        size: {
          width: 100,
          height: 83
        }
      },
      {
        id: 4,
        title: 'Trade',
        subtitle: 'Buy and Sell directly on our interface via the manual trade feature',
        img: '/img/home/tools/copytrading-ill.svg',
        alt: 'trade',
        route: 'manual-trade',
        class: 'home-tools__trade',
        size: {
          width: 95,
          height: 72
        }
      }
    ]

    return { data }
  }
})
</script>

<style lang="scss" scoped>
.home-tools {
  &__card {
    min-height: 290px;
    min-width: 230px;
    max-width: 230px;
  }

  &__card-img {
    min-height: 85px;
  }

  /* We don't need to use Tailwind for these colors, it used only once */
  &__algo {
    background:
    linear-gradient(114.51deg, #8482D2 16.18%, rgba(46, 5, 77, 0.56) 124.51%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%);

    .home-tools {
      &__card-btn {
        color: #8482D2;
        border: 1px solid #8482D2;
      }
    }
  }

  &__trade {
    background:
    linear-gradient(114.51deg, #3196AF 16.18%, rgba(31, 96, 112, 0.56) 124.51%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%);

    .home-tools {
      &__card-btn {
        color: #3196AF;
        border: 1px solid #3196AF;
      }
    }
  }

  &__referral {
    background:
    linear-gradient(114.51deg, #F7931A 16.18%, rgba(118, 61, 22, 0.56) 124.51%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%);

    .home-tools {
      &__card-btn {
        @apply text-miami-marmalade border border-solid border-miami-marmalade;
      }
    }
  }

  &__stake {
    background:
    linear-gradient(114.51deg, #C84DA6 16.18%, rgba(200, 77, 166, 0.56) 124.51%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%);

    .home-tools {
      &__card-btn {
        color: #C84DA6;
        border: 1px solid #C84DA6;
      }
    }
  }
}
</style>
