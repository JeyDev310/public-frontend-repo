<template>
  <div class="flex flex-col flex-grow w-full space-y-20 md:space-y-28">
    <div
      class="flex flex-col lg:flex-row justify-between flex-shrink-0 w-full space-y-20 lg:space-y-0 lg:space-x-40"
    >
      <!-- TOTAL UBXT GAINED -->
      <UBXTWalletSummaryCard
        title="Total UBXT Gained"
        :value="totalUbxtGained"
        :loading="useBotsStatsLoading"
        symbol="UBXT"
        class="bots-stats__summary-card"
      />

      <!-- TOTAL FOLLOWERS -->
      <UBXTWalletSummaryCard
        title="Total Followers"
        :value="totalFollowers"
        :loading="useBotsStatsLoading"
        class="bots-stats__summary-card"
      />

      <!-- TOTAL BOTS -->
      <UBXTWalletSummaryCard
        title="Total Bots"
        :value="totalBots"
        :loading="useBotsStatsLoading"
        class="bots-stats__summary-card"
      />
    </div>

    <MyRentedBotsTable :data="getUserBotsStatsData" :loading="useBotsStatsLoading" />

    <TransactionTable :data="getUserTransactionsData" :loading="transactionsLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

import { vuex } from '@/store'

import { useBots } from '@/global-setup/bots.composition.setup'

import MyRentedBotsTable from '@/views/ubxt-wallet/components/bots-stats/MyRentedBotsTable.vue'
import UBXTWalletSummaryCard from '@/views/ubxt-wallet/components/UBXTWalletSummaryCard.vue'
import TransactionTable from '@/views/ubxt-wallet/components/TransactionTable.vue'

export default defineComponent({
  name: 'BotsStats',

  components: { UBXTWalletSummaryCard, MyRentedBotsTable, TransactionTable },

  setup () {
    const { fetchAllAndSubscriptedBots } = useBots()

    const useBotsStatsLoading = ref<boolean>(false)
    const transactionsLoading = ref<boolean>(false)

    const getUserBotsStatsData = computed(() => vuex.ubxtWallet.userBotsStatsData)

    // TODO ADD TYPE //
    const totalUbxtGained = computed(() => {
      return getUserBotsStatsData.value.map((s) => s.totalRealisedUbxtGain).reduce((a: any, b: any) => a + b, 0)
    }) || 0

    // TODO ADD TYPE //
    const totalFollowers = computed(() => {
      return getUserBotsStatsData.value.map((s) => s.totalUsers).reduce((a, b) => a + b, 0)
    }) || 0

    // TODO ADD TYPE //
    const totalBots = computed(() => Number(getUserBotsStatsData.value.length)) || 0

    const getUserTransactionsData = computed(() => vuex.ubxtWallet.userTransactionsData.filter(
      (s) => s.botId && s.type === 'PERFORMANCE_FEE' &&
      (s.subType === 'DEVELOPER' || s.subType === 'GROUP'))
    )

    async function fetchUserBotsStatsData () {
      useBotsStatsLoading.value = true
      try {
        await vuex.ubxtWallet.fetchUserBotsStats()
        await fetchAllAndSubscriptedBots()
      } finally {
        useBotsStatsLoading.value = false
      }
    }

    async function fetchTransactions () {
      transactionsLoading.value = true

      try {
        await vuex.ubxtWallet.fetchUserTransactions()
      } finally {
        transactionsLoading.value = false
      }
    }

    async function initData () {
      await Promise.all([fetchUserBotsStatsData(), fetchTransactions()])
    }

    onMounted(() => { initData() })

    return {
      useBotsStatsLoading,
      getUserBotsStatsData,
      totalUbxtGained,
      totalFollowers,
      totalBots,
      transactionsLoading,
      getUserTransactionsData
    }
  }
})
</script>

<style lang="scss" scoped>
.bots-stats {
  &__summary-card {
    @apply justify-center p-20;
    height: 140px;
  }

  &__button {
    @apply
      border border-chicory-flower dark:border-hidden-sea-glass
      bg-chicory-flower bg-opacity-10 dark:bg-hidden-sea-glass dark:bg-opacity-10
      hover:bg-opacity-50 dark:hover:bg-opacity-30 ml-20 px-5 py-5
      text-chicory-flower dark:text-hidden-sea-glass rounded-full;
  }
}
</style>
