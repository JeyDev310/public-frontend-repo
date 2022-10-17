<template>
  <SkeletonWrapper v-bind="$attrs">
    <component :is="skeletonComponent" v-if="skeletonComponent" />

    <template v-else>
      <rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" />
    </template>
  </SkeletonWrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import SkeletonWrapper from './skeletons/SkeletonWrapper.vue'
import SkeletonCard from './skeletons/SkeletonCard.vue'
import SkeletonLineChart from './skeletons/SkeletonLineChart.vue'
import SkeletonPieChart from './skeletons/SkeletonPieChart.vue'
import SkeletonTable from './skeletons/SkeletonTable.vue'

type TSkeletonTypes = 'pieChart' | 'lineChart' | 'card' | 'table'

const loaders = Object.freeze({
  card: 'SkeletonCard',
  table: 'SkeletonTable',
  pieChart: 'SkeletonPieChart',
  lineChart: 'SkeletonLineChart'
})

export default defineComponent({
  name: 'AppSkeleton',

  components: {
    SkeletonWrapper,
    SkeletonCard,
    SkeletonLineChart,
    SkeletonPieChart,
    SkeletonTable
  },

  props: {
    type: {
      type: String as PropType<TSkeletonTypes>,
      default: ''
    }
  },

  setup (props) {
    const skeletonComponent = loaders[props.type]

    return { skeletonComponent }
  }
})
</script>
