<template>
  <!-- CHART -->
  <AppCard class="flex flex-col relative w-full p-10 md:p-14 lg:p-20">
    <div class="flex flex-col flex-grow w-full h-full">
      <!-- LOADER -->
      <AppLoader v-if="loading" class="rounded-xlg" />

      <div class="flex justify-between">
        <!-- TITLE -->
        <h3 class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
          Active User Evolution Chart
        </h3>

        <!-- PERIOD -->
        <AppSelect
          v-model="activePeriod"
          :options="dateFilters"
          returnSingleValue
          size="sm"
          class="mr-10"
          @change="handleActivePeriodUpdate"
        />
      </div>

      <!-- CHART -->
      <div class="active-user-chart-wrap">
        <SingleColoredChart
          :index="0"
          :labels="getLabels"
          :data="getData"
          :padding-config="{ left: '25px', right: '25px', top: '25px', bottom: '25px' }"
          :display-labels="true"
        />
      </div>

      <!-- NO DATA STATE -->
      <AppNoData v-if="!getLabels.length" class="absolute left-0 top-40 right-0 bottom-0" />
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, computed } from 'vue'

import { vuex } from '@/store'
import { IActivePeriod } from '@/views/admin/admin.types'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const SingleColoredChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleColoredChart.vue' /* webpackChunkName: "SingleColoredChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'ActiveUserChart',

  components: { SingleColoredChart },

  setup () {
    const dateFilters: IActivePeriod[] = [
      { value: '1,week', label: '1W' },
      { value: '2,weeks', label: '2W' },
      { value: '1,month', label: '1M' },
      { value: '3,months', label: '3M' },
      { value: '6,months', label: '6M' }
    ]

    const loading = computed((): boolean => vuex.admin.getLoadingActiveUserChart)

    const getLabels = computed((): string[] => vuex.admin.getActiveUserChart.labels)

    const getData = computed(() => {
      return [
        {
          name: 'Total active users',
          data: vuex.admin.getActiveUserChart.data
        }
      ]
    })

    const activePeriod = computed({
      get () {
        return vuex.admin.activePeriod
      },
      set (value: string) {
        return value
      }
    })

    function handleActivePeriodUpdate (period: IActivePeriod) {
      vuex.admin.updateActivePeriod(period.value)
    }

    return {
      loading,
      activePeriod,
      getLabels,
      getData,
      dateFilters,
      handleActivePeriodUpdate
    }
  }
})
</script>

<style lang="scss" scoped>
.active-user-chart-wrap  {
  min-height: 240px;
 }
</style>
