<template>
  <div class="home-algobots flex flex-col flex-shrink-0 w-full px-20">
    <!-- TITLE -->
    <h2
      class="
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
      ALGOBOTS
    </h2>

    <!-- LOADING -->
    <template v-if="loading">
      <AppCard
        class="home-algobots__card relative flex flex-col w-full rounded-xl"
      >
        <AppLoader class="rounded-xl" />
      </AppCard>
    </template>

    <!-- CONTENT -->
    <template v-else>
      <template v-if="getData.length">
        <AppSwiper :config="swiperConfig" :data="getData" loop>
          <template #content="{ item, index }">
            <router-link
              #default="{ navigate }"
              :to="{ name: getBotDetailedRedirectRoute(item.category), params: { id: item.id, name: item.name } }"
              custom
            >
              <AppCard class="home-algobots__card flex flex-col items-center relative px-24 py-30">
                <!-- LOADER -->
                <AppLoader v-if="loading" class="rounded-xlg" />

                <!-- COIN -->
                <AppCryptoCoinChecker
                  v-if="item.base"
                  :icon-name="item.base"
                  :icon-size="2.2"
                  :img-size="35"
                  class="mb-14"
                />

                <!-- NAME -->
                <AppTruncatedTooltip
                  :content="item.name"
                  class="text-bluster-blue dark:text-misty-mountains font-semibold text-md mb-24 cursor-pointer"
                  @click="navigate()"
                />

                <!-- CHART -->
                <div class="home-algobots__card-chart flex flex-col flex-grow w-full text-center mb-16">
                  <template v-if="Object.keys(item.perfSnapshots).length">
                    <SingleColoredChart
                      :labels="item.perfSnapshots?.charts['monthlyChart']?.labels"
                      :data="[{ name: item.base, data: item.perfSnapshots?.charts['monthlyChart']?.data }]"
                      :index="index"
                      :padding-config="{left: '0px', right: '0px', top: '0px', bottom: '0px'}"
                    />
                  </template>

                  <!-- NO AVAILABLE CHART STATE -->
                  <template v-else>
                    <AppNoData title="Chart not available" />
                  </template>
                </div>

                <!-- TOT PERF -->
                <div class="flex items-center space-x-10 mt-auto">
                  <p class="text-shadow-blue dark:text-faded-lilac">Tot Perf:</p>
                  <AppFormatNumber :data="item.perfSnapshots?.allmonths" percent />
                </div>
              </AppCard>
            </router-link>
          </template>
        </AppSwiper>
      </template>

      <template v-else>
        <AppCard
          class="home-algobots__card relative flex flex-col w-full rounded-xl"
        >
          <AppNoData />
        </AppCard>
      </template>
    </template>

    <!-- SEE MORE BTN -->
    <div class="flex flex-col items-end w-full mt-20">
      <router-link #default="{ navigate }" :to="{ name: routeNames.algoBots }" custom>
        <AppButton type="grey-outlined" rounded="lg" @click="navigate()">See more</AppButton>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType, computed } from 'vue'

import { routeNames } from '@/router'

import { ECategory } from '@/types'

import { useBots } from '@/global-setup/bots.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const SingleColoredChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleColoredChart.vue' /* webpackChunkName: "SingleColoredChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'HomeAlgobots',

  components: { SingleColoredChart },

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup () {
    const { getSortedBotsByPerf, getBotDetailedRedirectRoute } = useBots()

    const getData = computed(() => getSortedBotsByPerf.value.filter((el) => {
      return el.category !== ECategory.CopyBot && el.category !== ECategory.UserBot
    }))

    const swiperConfig: { breakpoint: number; slidesPerView: number; spaceBetween: number; }[] = [
      { breakpoint: 320, slidesPerView: 1, spaceBetween: 20 },
      { breakpoint: 500, slidesPerView: 2, spaceBetween: 20 },
      { breakpoint: 1024, slidesPerView: 3, spaceBetween: 20 },
      { breakpoint: 1280, slidesPerView: 4, spaceBetween: 20 },
      { breakpoint: 1440, slidesPerView: 5, spaceBetween: 20 },
      { breakpoint: 2500, slidesPerView: 5, spaceBetween: 24 }
    ]

    return { routeNames, getData, swiperConfig, getBotDetailedRedirectRoute }
  }
})
</script>

<style lang="scss">
.home-algobots {
  &__card {
    height: 325px;
  }

  &__card-chart {
    height: 120px;
  }
}
</style>
