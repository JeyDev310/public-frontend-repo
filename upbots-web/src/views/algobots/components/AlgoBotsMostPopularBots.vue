<template>
  <div class="flex flex-col w-full px-12">
    <!-- TITLE -->
    <h2 class="text-heavy-metal-armor dark:text-blair text-md 4xl:text-2xl font-medium mb-10 md:mb-20 4xl:mb-24">
      Most Popular Bots
    </h2>

    <!-- DESKTOP | TABLET VIEWS -->
    <template v-if="!isMD">
      <!-- LOADING -->
      <template v-if="mostPopularBotsLoading">
        <div
          class="algobots-rental-bot__card is-popular-bot relative flex flex-col w-full rounded-xl"
          :class="getModeName"
        >
          <AppLoader class="rounded-xl" />
        </div>
      </template>

      <!-- LIST OF ITEMS -->
      <template v-else>
        <template v-if="filteredMostPopularBots.length">
          <AppSwiper :config="swiperPopularBotConfig" :data="filteredMostPopularBots">
            <template #content="{ item, index }">
              <AlgoBotsCard :data="item" :index="index" :type="EAlgoBotsCardType.PopularBot" />
            </template>
          </AppSwiper>
        </template>

        <!-- NO DATA -->
        <AppNoData
          v-else
          class="algobots-rental-bot__card is-popular-bot no-data w-full mx-auto"
          color="text-nile-blue dark:text-let-it-snow"
          :class="getModeName"
        />
      </template>
    </template>

    <!--MOBILE VIEW -->
    <template v-else>
      <!-- LOADING -->
      <template v-if="mostPopularBotsLoading">
        <div
          class="algobots-rental-bot__card is-popular-bot relative flex flex-col w-full rounded-xl"
          :class="getModeName"
        >
          <AppLoader class="rounded-xl" :size="isMD ? 'xs' : 'lg'" />
        </div>
      </template>

      <template v-else>
        <!-- LIST OF ITEMS -->
        <div
          v-if="filteredMostPopularBots.length"
          class="flex flex-col space-y-20 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-24 3xl:gap-x-28"
        >
          <AlgoBotsCard
            v-for="(item, index) in filteredMostPopularBots"
            :key="item.id"
            :data="item"
            :index="index"
            :type="EAlgoBotsCardType.PopularBot"
          />
        </div>

        <!-- NO DATA -->
        <AppNoData
          v-else
          class="algobots-rental-bot__card is-popular-bot no-data w-full"
          color="text-nile-blue dark:text-let-it-snow"
          :class="getModeName"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { ECategory, EAlgoBotsCardType } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'

import AlgoBotsCard from './AlgoBotsCard.vue'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'AlgoBotsMostPopularBots',

  components: { AlgoBotsCard },

  setup () {
    /* USE GLOBAL | USE CUSTOM BREAKPOINTS | USE BOTS SETUP */
    const { getModeName } = useGlobal()
    const { isMD } = useCustomBreakpoints()
    const { mostPopularBots, mostPopularBotsLoading } = useBots()

    const filteredMostPopularBots = computed(() => {
      return mostPopularBots.value.filter(bot => bot.category === ECategory.AlgoBot)
    })

    const swiperPopularBotConfig: { breakpoint: number; slidesPerView: number; spaceBetween: number; }[] = [
      { breakpoint: 320, slidesPerView: 1, spaceBetween: 20 },
      { breakpoint: 1024, slidesPerView: 2, spaceBetween: 24 },
      { breakpoint: 1440, slidesPerView: 3, spaceBetween: 24 },
      { breakpoint: 1920, slidesPerView: 4, spaceBetween: 24 },
      { breakpoint: 2500, slidesPerView: 4, spaceBetween: 28 }
    ]

    return {
      EAlgoBotsCardType,
      swiperPopularBotConfig,
      filteredMostPopularBots,
      isMD,
      mostPopularBotsLoading,
      getModeName
    }
  }
})
</script>
