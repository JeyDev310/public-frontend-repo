import { vuex } from '@/store'
import { computed } from 'vue'

export const usePortfolio = () => {
  const getCexDistribution = computed(() => vuex.cex.getDistributionTable)
  const getDexDistribution = computed(() => vuex.dex.getDistributionTable)

  const getCexDistributionChart = computed(() => vuex.cex.getDistributionChart)
  const getDexDistributionChart = computed(() => vuex.dex.getDistributionChart)

  return {
    getCexDistribution,
    getDexDistribution,
    getCexDistributionChart,
    getDexDistributionChart
  }
}
