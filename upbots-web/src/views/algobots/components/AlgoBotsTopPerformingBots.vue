<template>
  <div class="flex flex-col w-full px-12">
    <!-- TITLE -->
    <h2 class="text-heavy-metal-armor dark:text-blair text-md 4xl:text-2xl font-medium mb-10 md:mb-20 4xl:mb-24">
      Top Performing Bots
    </h2>

    <!-- DESKTOP | TABLET VIEWS -->
    <template v-if="!isMD && is2XL">
      <!-- LOADING -->
      <template v-if="allAndSubscriptedBotsLoading">
        <div
          class="algobots-rental-bot__card is-best-bot relative flex flex-col w-full rounded-xl"
          :class="getModeName"
        >
          <AppLoader class="rounded-xl" />
        </div>
      </template>

      <template v-else>
        <!-- LIST OF ITEMS-->
        <template v-if="getPerfBotsData.length">
          <AppSwiper
            :config="swiperBestBotConfig"
            :data="getPerfBotsData"
            :delay="false"
            :loading="allAndSubscriptedBotsLoading"
          >
            <template #content="{ index }">
              <AlgoBotsCard :data="getPerfBotsData[index]" :index="index" :type="EAlgoBotsCardType.BestBot" />
            </template>
          </AppSwiper>
        </template>

        <!-- NO DATA -->
        <AppNoData
          v-else
          class="algobots-rental-bot__card is-best-bot no-data w-full"
          color="text-nile-blue dark:text-let-it-snow"
          :class="getModeName"
        />
      </template>
    </template>

    <!-- DESKTOP LARGE | MOBILE VIEWS -->
    <template v-else>
      <!-- LOADING -->
      <template v-if="allAndSubscriptedBotsLoading">
        <div
          class="algobots-rental-bot__card is-best-bot relative flex flex-col w-full rounded-xl"
          :class="getModeName"
        >
          <AppLoader class="rounded-xl" :size="isMD ? 'xs' : 'lg'" />
        </div>
      </template>

      <template v-else>
        <!-- LIST OF ITEMS -->
        <div
          v-if="getPerfBotsData.length"
          class="flex flex-col space-y-20 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-24 3xl:gap-x-28"
        >
          <AlgoBotsCard
            v-for="(item, index) in getPerfBotsData"
            :key="item.id"
            :data="item"
            :index="index"
            :type="EAlgoBotsCardType.BestBot"
          />
        </div>

        <!-- NO DATA -->
        <AppNoData
          v-else
          class="algobots-rental-bot__card is-best-bot no-data w-full mx-auto"
          color="text-nile-blue dark:text-let-it-snow"
          :class="getModeName"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { IBotSnapshot, EAlgoBotsCardType } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import AlgoBotsCard from './AlgoBotsCard.vue'

export default defineComponent({
  name: 'AlgoBotsTopPerformingBots',

  components: { AlgoBotsCard },

  setup () {
    const { getModeName } = useGlobal()
    const { is2XL, isMD } = useCustomBreakpoints()
    const { getSortedBotsByPerf, botsLoading, allAndSubscriptedBotsLoading } = useBots()

    const swiperBestBotConfig: { breakpoint: number; slidesPerView: number; spaceBetween: number; }[] = [
      { breakpoint: 320, slidesPerView: 1, spaceBetween: 20 },
      { breakpoint: 1024, slidesPerView: 2, spaceBetween: 20 }
    ]

    const getPerfBotsData = computed((): IBotSnapshot[] => {
      return botsLoading.value ? [] : getSortedBotsByPerf.value.slice(0, 3)
    })

    return {
      EAlgoBotsCardType,
      is2XL,
      isMD,
      botsLoading,
      allAndSubscriptedBotsLoading,
      swiperBestBotConfig,
      getPerfBotsData,
      getModeName
    }
  }
})
</script>
