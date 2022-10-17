<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Coming Soon</h2>
    </Portal>

    <!-- CONTNET -->
    <div class="flex flex-col space-y-20 xl:space-y-28">
      <div
        class="coming-soon__wrap grid grid-cols-2 lg:grid-cols-4 gap-30
        flex-grow overflow-y-auto custom-scrollbar"
      >
        <AppCard
          v-for="item in data"
          :key="item.route"
          class="coming-soon__card flex flex-col items-center justify-center relative p-20"
        >
          <!-- IMAGE -->
          <div
            class="coming-soon__card-img flex flex-col items-center justify-center w-full"
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

          <!-- TITLE -->
          <p class="w-full text-sargasso-sea dark:text-white  md:text-md text-center mt-14">
            {{ item.title }}
          </p>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'ComingSoon',

  setup () {
    // MODE //
    const { isDarkMode } = useGlobal()

    // DATA //
    const data = computed(() => {
      return [
        {
          id: 1,
          title: 'Signal Providers',
          img: `/img/home/tools/signal-providers-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'signal-providers',
          route: 'signal-providers',
          size: {
            desktop: '130px',
            mobile: '99px'
          }
        },
        {
          id: 2,
          title: 'Copy Trading',
          img: `/img/home/tools/copytrading-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'copytrading',
          route: 'copy-trading',
          size: {
            desktop: '140px',
            mobile: '93px'
          }
        },

        {
          id: 3,
          title: 'Learning',
          img: `/img/home/tools/learning-ill${!isDarkMode.value ? '-light' : ''}.svg`,
          alt: 'learning',
          route: 'learning',
          size: {
            desktop: '130px',
            mobile: '98px'
          }
        }
      ]
    })

    return { data, isDarkMode }
  }
})
</script>

<style lang="scss" scoped>
.coming-soon {
  &__card {
    height: 220px;
  }

  @media (max-width: 767px) {
    &__card {
      height: 150px;
    }

    &__card-img {
      min-height: 82px;
    }
  }

  @media (min-width: 768px) {
    &__card-img {
      min-height: 115px;
    }
  }
}
</style>
