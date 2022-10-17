<template>
  <div class="flex flex-col w-full space-y-12 md:space-y-20 4xl:space-y-24">
    <AaveProjectDetails title="Aave" :project="projects.aave" img="aave.svg" />
    <GeneralProjectDetails title="Curve" :project="projects.curve" img="curve.svg" />
    <GeneralProjectDetails title="Uniswap V2" :project="projects.uniswapV2" img="uniswap.png" />
    <GeneralProjectDetails title="Pancake Swap" :project="projects.pancakeswap" img="pancakeswap.svg" />
    <GeneralProjectDetails title="Balancer" :project="projects.balancer" img="balancer.svg" />
    <GeneralProjectDetails title="SushiSwap" :project="processSushiswapData" img="sushiswap.svg" />
    <CompoundProjectDetails title="Compound" :project="projects.compound" img="compound.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { vuex } from '@/store'

import GeneralProjectDetails from '@/views/portfolio/components/projects/GeneralProjectDetails.vue'
import AaveProjectDetails from '@/views/portfolio/components/projects/AaveProjectDetails.vue'
import CompoundProjectDetails from '@/views/portfolio/components/projects/CompoundProjectDetails.vue'

export default defineComponent({
  name: 'PortfolioProjects',

  components: {
    GeneralProjectDetails,
    AaveProjectDetails,
    CompoundProjectDetails
  },

  setup () {
    const projectHeaders = [
      { property: 'title', label: 'Pool', width: 100 },
      { property: 'coin', label: 'Coin', width: 200 },
      { property: 'balance', label: 'Balance', width: 200 },
      { property: 'usdValue', label: 'USD Value', width: 200 }
    ]

    const projects = computed(() => vuex.dex.getProjectsData)

    const processSushiswapData = computed(() => {
      if (!projects.value.sushiswap) return []
      return [{
        tokens: [{
          tickerSymbol: projects.value.sushiswap.stake.tickerSymbol,
          balance: projects.value.sushiswap.stake.balance
        }],
        totalUsdValue: projects.value.sushiswap.stake.usdValue
      }]
    })

    return { projectHeaders, projects, processSushiswapData }
  }
})
</script>

<style lang="scss" scoped>
  .portfolio-projects-table {
    height: 200px;
  }
</style>
