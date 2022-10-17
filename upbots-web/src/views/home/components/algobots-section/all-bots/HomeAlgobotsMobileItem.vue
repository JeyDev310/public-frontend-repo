<template>
  <div class="flex flex-col flex-shrink-0 w-full overflow-x-hidden">
    <!-- LOADER -->
    <template v-if="loading">
      <AppCard class="algobots-rental-bot__card relative flex flex-col">
        <AppLoader class="rounded-xl" size="xs'" />
      </AppCard>
    </template>

    <!-- CONTENT -->
    <template v-else>
      <template v-if="Object.keys(data).length">
        <router-link
          #default="{ navigate }"
          :to="{ name: getBotDetailedRedirectRoute(data.category), params: { id: data.id, name: data.name } }"
          custom
        >
          <AppExpand
            v-model="expandItem"
            preview-classes="items-start"
            content-classes="flex flex-col"
            class="relative"
          >
            <!-- PREVIEW -->
            <template #preview>
              <div class="flex items-start justify-between w-full space-x-20">
                <div class="flex w-full">
                  <div class="flex flex-col flex-shrink-0 w-24 h-24 rounded-full overflow-hidden mr-12">
                    <img :src="getBotLogoImg(data)" :alt="data.name" class="w-full h-full object-cover">
                  </div>

                  <div class="flex items-center space-x-10 w-full">
                    <div class="flex flex-col items-start">
                      <div class="flex items-center">
                        <AppTruncatedTooltip
                          :content="data.name"
                          class="text-nile-blue dark:text-let-it-snow font-semibold"
                        />
                      </div>

                      <AppTruncatedTooltip
                        :content="data.creator"
                        class="text-nile-blue dark:text-let-it-snow text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div v-if="data.perfSnapshots?.allmonths" class="flex items-center flex-shrink-0">
                  <div v-if="data.followers" class="flex space-x-10 justify-end items-center">
                    <AppIcon name="followers" size="22" class="text-hidden-sea-glass" />
                    <span class="text-hidden-sea-glass font-medium text-lg">
                      {{ formatNumber(data.followers) }}
                    </span>
                  </div>

                  <div v-else-if="data.perfSnapshots?.allmonths" class="flex flex-col justify-end">
                    <AppFormatNumber
                      :data="data.perfSnapshots?.allmonths"
                      percent
                      text-size="font-medium leading-1"
                    />
                    <span
                      class="font-medium text-sm self-end mt-2"
                      :class="data.perfSnapshots?.allmonths >= 0 ? 'text-spring-bouquet' : 'text-alexandria'"
                    >
                      Tot Perf.
                    </span>
                  </div>
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <!-- CHART -->
              <div class="algobots-rental-bot__chart-wrap w-full mb-5">
                <SingleColoredChart
                  :index="index"
                  :labels="data.perfSnapshots?.charts?.weeklyChart?.labels"
                  :data="[{ name: data.base, data: data.perfSnapshots?.charts?.weeklyChart?.data }]"
                />
              </div>

              <!-- ACTION BUTTON -->
              <AppButton
                :type="isDarkMode ? 'white-outlined' : 'grey-outlined'"
                size="xlg"
                class="mb-20"
                @click="navigate()"
              >
                See more
              </AppButton>

              <!-- TAGS -->
              <div class="grid grid-cols-3 gap-10">
                <div class="algobots-rental-bot__mobile-tag-wrap">
                  <span class="text-sm text-nile-blue dark:text-let-it-snow">Perf 3M%</span>
                  <AppTag>
                    <AppFormatNumber
                      :data="data.perfSnapshots?.month3"
                      percent
                      text-size="text-sm"
                    />
                  </AppTag>
                </div>

                <div class="algobots-rental-bot__mobile-tag-wrap">
                  <span class="text-sm text-nile-blue dark:text-let-it-snow">MDD</span>
                  <AppTag
                    :data="data.perfSnapshots?.maxDrawdown ? data.perfSnapshots?.maxDrawdown.toFixed(2) : 'N/A'"
                  />
                </div>

                <div class="algobots-rental-bot__mobile-tag-wrap">
                  <span class="text-sm text-nile-blue dark:text-let-it-snow">Strat</span>
                  <AppTag :data="data.stratType ? data.stratType : 'N/A'" />
                </div>

                <div class="algobots-rental-bot__mobile-tag-wrap">
                  <span class="text-sm text-nile-blue dark:text-let-it-snow">Perf 6M%</span>
                  <AppTag>
                    <AppFormatNumber
                      :data="data.perfSnapshots?.month6"
                      percent
                      text-size="text-sm"
                    />
                  </AppTag>
                </div>

                <div class="algobots-rental-bot__mobile-tag-wrap">
                  <span class="text-sm text-nile-blue dark:text-let-it-snow">#trade</span>
                  <AppTag :data="data.avgtrades ? String(data.avgtrades) : 'N/A'" />
                </div>

                <div class="algobots-rental-bot__mobile-tag-wrap">
                  <span class="text-sm text-nile-blue dark:text-let-it-snow">Fees</span>
                  <AppTag :data="`${data.perfFees ? `From ${getMinFeePercent(data.perfFees.percent)}` : '0'}%`" />
                </div>
              </div>
            </template>
          </AppExpand>
        </router-link>
      </template>

      <!-- NO DATA FOUND STATE -->
      <template v-else>
        <AppCard class="algobots-rental-bot__card flex flex-col items-center justify-center p-10">
          <AppNoData
            class="font-semibold text-center"
            color="text-nile-blue dark:text-let-it-snow"
          />
        </AppCard>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType, reactive, toRefs } from 'vue'
import { routeNames } from '@/router'

import { formatNumber } from '@/core/helpers'

import { IBotSnapshot } from '@/types'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const SingleColoredChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleColoredChart.vue' /* webpackChunkName: "SingleColoredChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'HomeAlgobotsMobileItem',

  components: { SingleColoredChart },

  props: {
    data: {
      type: Object as PropType<IBotSnapshot>,
      default: () => ({})
    },

    index: {
      type: Number as PropType<number>,
      required: true
    },

    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup () {
    const { isDarkMode } = useGlobal()
    const { getMinFeePercent, getBotDetailedRedirectRoute } = useBots()
    const { getBotLogoImg } = useAlgoBots()

    /* STATE */
    const state = reactive({
      expandItem: false as boolean
    })

    return {
      ...toRefs(state),
      routeNames,
      isDarkMode,
      formatNumber,
      getMinFeePercent,
      getBotLogoImg,
      getBotDetailedRedirectRoute
    }
  }
})
</script>

<style lang="scss" scoped>
.algobots-rental-bot {
  &__card {
    min-height: 62px;
  }

  &__chart-wrap {
    height: 120px;
  }
}
</style>
