<template>
  <AppCard class="w-full h-full relative">
    <!-- LOADER -->
    <AppLoader v-if="getLoading" class="rounded-xlg" />

    <!-- TITLE -->
    <h3
      v-if="title"
      class="text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair mb-6 4xl:mb-12"
    >
      Portfolio Evolution
    </h3>

    <!-- CHART -->
    <LineChartTwoYAxis
      v-if="Object.keys(getData).length && getData.labels.length && getData.datasets.length && !getLoading"
      :labels="getData.labels"
      :data="getData.datasets"
      custom-class="flex flex-col flex-grow w-full"
      :padding-config="paddingConfig"
      :show-axis-line="screenWidth >= 768"
    >
      <template #toolbar="{
        legends,
        selected,
        events: {
          legendHighlight,
          legendDownplay,
          legendToggle
        }
      }"
      >
        <!-- TOOLBAR -->
        <div ref="toolbar" class="flex items-center justify-between" :class="toolbarClasses">
          <div class="flex">
            <button
              v-for="legend of legends"
              :key="legend.name"
              class="flex items-center m-10"
              :class="!isToolbarSmall ? 'mr-10' : 'mr-5'"
              @mouseenter="legendHighlight(legend.name)"
              @mouseout="legendDownplay(legend.name)"
              @click="legendToggle(legend.name)"
            >
              <Compute
                #default="{ dotBg }"
                :dotBg="selected.includes(legend.name) ? legend.itemStyle.color : null"
              >
                <div class="flex w-10 h-10" :class="!isToolbarSmall ? 'mr-10' : 'mr-5'">
                  <div v-if="dotBg" class="rounded-full w-full h-full" :style="{ backgroundColor: dotBg }" />
                  <AppIcon v-else name="notify-error" size="10" />
                </div>
                <p class="font-medium text-chicory-flower dark:text-let-it-snow">{{ legend.name }}</p>
              </Compute>
            </button>
          </div>

          <AppButtonsGroup
            v-if="!isToolbarSmall"
            v-model="currentFilter"
            :options="dateFilters"
            type="badge"
            @click="handleFilterChange"
          />

          <AppSelect
            v-else
            v-model="currentFilter"
            :options="dateFilters"
            returnSingleValue
            size="sm"
            class="mr-10"
            @change="handleFilterChange"
          />
        </div>
      </template>
    </LineChartTwoYAxis>

    <!-- NO DATA STATE -->
    <template v-else>
      <!-- STATE IF EMPTY DATA -->
      <template v-if="!getPortfolioCEXsError">
        <div class="flex flex-col w-full h-full pt-20">
          <!-- TITLE -->
          <mq-layout mq="sm-md">
            <h3
              v-if="title"
              class="text-lg font-medium text-chicory-flower dark:text-blair text-center md:text-start mb-12 md:ml-20"
            >
              Portfolio Evolution
            </h3>
          </mq-layout>

          <div class="flex flex-grow w-full items-center justify-center">
            <!-- ADD NEW PORTFOLIO -->
            <template v-if="addKeyLink">
              <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
                <AppButton
                  type="primary-border-filled"
                  size="md"
                  @click="navigate()"
                >
                  Add New Portfolio
                </AppButton>
              </router-link>
            </template>

            <!-- TEXT LOADER -->
            <AppTextLoader v-if="getLoading" class="text-beguiling-blue dark:text-cotton-ball-second" />

            <!-- NO DATA -->
            <AppNoData v-if="!addKeyLink && !getLoading" color="text-chicory-flower dark:text-let-it-snow" />
          </div>
        </div>
      </template>

      <!-- STATE IF BAD REQUEST -->
      <!-- TODO -->
      <template v-else>
        <div
          class="
            flex
            flex-col
            flex-grow
            items-center
            justify-center
            text-xl
            font-semibold
            text-chicory-flower
            dark:text-let-it-snow
          "
        >
          N/A
        </div>
      </template>
    </template>
  </AppCard>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, computed, PropType } from 'vue'

import { routeNames } from '@/router'

import { useElementBounding, useWindowSize } from '@vueuse/core'

import { vuex } from '@/store'
import { IPortfolioEvolutionChart } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const LineChartTwoYAxis = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/LineChartTwoYAxis.vue' /* webpackChunkName: "LineChart" */),
  loadingComponent: ChartSkeleton
})

type TTabName = 'cex' | 'dex' | 'summary'

export default defineComponent({
  name: 'PortfolioEvolutionChart',

  components: { LineChartTwoYAxis },

  props: {
    title: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    toolbarClasses: {
      type: String as PropType<string>,
      default: ''
    },

    data: {
      type: Object as PropType<IPortfolioEvolutionChart>,
      required: true
    },

    addKeyLink: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    tabName: {
      type: String as PropType<TTabName>,
      required: true
    }
  },

  setup (props) {
    const { setFilterChartByDate, getPortfolioCEXsError, filterChartByDate } = useGlobal()

    const toolbar = ref(null)
    const { width } = useElementBounding(toolbar)

    const screenWidth = useWindowSize().width

    const paddingConfig = {
      left: '20px',
      right: '20px',
      bottom: screenWidth.value >= 768 ? '20px' : '10px',
      top: screenWidth.value >= 768 ? '20px' : '10px'
    }

    const dateFilters: { value: string; label: string; }[] = [
      { value: 'all', label: 'All' },
      { value: '1,year', label: 'Year' },
      { value: '6,months', label: '6M' },
      { value: '3,months', label: '3M' },
      { value: '1,month', label: '1M' },
      { value: '2,weeks', label: '2W' },
      { value: '1,week', label: '1W' },
      { value: '1,day', label: '1D' }
    ]

    const isToolbarSmall = computed((): boolean => width.value <= 560)

    const initialFilter = computed((): string => filterChartByDate.value)

    const currentFilter = ref<string>(initialFilter.value)

    const getData = computed((): IPortfolioEvolutionChart => props.data)

    const getLoading = computed((): boolean => {
      if (props.tabName === 'summary') return vuex.cex.loading
      return vuex[props.tabName].loading
    })

    async function handleFilterChange (): Promise<void> {
      setFilterChartByDate(currentFilter.value)
      await vuex.cex.fetchPortfolioEvolution()
      vuex.dex.generateEvolutionChart()
    }

    return {
      toolbar,
      screenWidth,
      isToolbarSmall,
      paddingConfig,
      getData,
      dateFilters,
      currentFilter,
      routeNames,
      getLoading,
      getPortfolioCEXsError,
      handleFilterChange
    }
  }
})
</script>
