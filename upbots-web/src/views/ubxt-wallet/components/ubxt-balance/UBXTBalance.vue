<template>
  <div class="flex flex-col flex-grow w-full space-y-20 md:space-y-28">
    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xl" />

    <!-- CONTENT -->
    <template v-else>
      <!-- DEPOSITE UBXT INFORMATION -->
      <DepositUBXTInfo v-if="!isDeposit" @on-deposit="isModalTopUpOpen = true" />

      <div class="flex flex-col w-full">
        <div class="flex flex-col lg:flex-row justify-between flex-shrink-0 w-full">
          <!-- TOTAL UBXT BALANCE -->
          <UBXTWalletSummaryCard
            title="Total UBXT Balance"
            :value="getPerfeesUserWalletAmount"
            class="ubxt-balance__summary-card px-40 py-20"
          >
            <!-- DROPDOWN SLOT -->
            <template v-if="isDeposit" #dropdown>
              <AppDropdown
                :actions="onDropdownAction"
                placement="left-start"
                dropdown-width="80px"
                @edit="isModalWithdrawOpen = true"
              >
                <template #preview>
                  <span class="flex items-center justify-center w-32 h-32 cursor-pointer">
                    <AppIcon name="dots" class="transform rotate-90 text-bluster-blue dark:text-let-it-snow" />
                  </span>
                </template>
              </AppDropdown>
            </template>

            <!-- DEFAULT SLOT CONTENT -->
            <div v-if="isDeposit" class="flex w-full justify-center items-center mt-10 space-x-10">
              <AppButton
                size="xs"
                class="ubxt-balance__button w-full"
                @click="isModalTopUpOpen = true"
              >
                Deposit
              </AppButton>
              <!-- if we need disable deposit please use this code -->
              <!--<AppTooltip
                :trigger="!isMD ? 'hover' : 'click'"
                placement="top"
                content="Due to maintenance work UBXT deposits are temporarily disabled."
                class="ubxt-balance__button flex flex-col w-full"
              >
                <AppButton
                  size="xs"
                  type="primary-border-filled"
                  class="w-full is-disabled"
                >
                  Deposit
                </AppButton>
              </AppTooltip>-->

              <router-link #default="{ navigate }" :to="{ name: routeNames.buyUBXT }" custom>
                <AppButton
                  size="xs"
                  type="grey-outlined"
                  class="ubxt-balance__button w-full"
                  @click="navigate()"
                >
                  BUY UBXT
                </AppButton>
              </router-link>
            </div>
          </UBXTWalletSummaryCard>

          <div class="self-center my-8 lg:my-0 lg:mx-12">
            <AppIcon name="equal" size="42" class="text-nile-blue dark:text-soaring-eagle" />
          </div>

          <!-- TOTAL ALLOCATED -->
          <UBXTWalletSummaryCard
            title="Total Allocated"
            :value="getPerfeesUserWalletAllocatedAmount"
            symbol="UBXT"
            class="ubxt-balance__summary-card p-20"
          />

          <div class="self-center my-8 lg:my-0 lg:mx-12">
            <AppIcon name="plus" size="30" class="text-nile-blue dark:text-soaring-eagle" />
          </div>

          <!-- TOTAL AVAILABLE -->
          <UBXTWalletSummaryCard
            title="Total Available"
            :value="getPerfeesUserWalletRealAvailableAmount"
            symbol="UBXT"
            class="ubxt-balance__summary-card p-20"
          >
            <!-- SECONDARY SLOT -->
            <template v-if="getBonusAmount > 0" #secondary>
              <div class="text-spring-bouquet mt-6">+ {{ getBonusAmount }} UBXT Bonus</div>
            </template>
          </UBXTWalletSummaryCard>
        </div>
      </div>

      <template v-if="isDeposit">
        <BotAllocationTable :data="activeBotAllocation" />

        <TransactionTable :data="getUserTransactionsData" />
      </template>

      <!-- TOT UP MODAL -->
      <AppModal v-model="isModalTopUpOpen" modal-width="700">
        <UBXTTopUpModal />
      </AppModal>

      <!-- WITHDRAW MODAL -->
      <AppModal v-model="isModalWithdrawOpen" modal-width="700">
        <UBXTWithdrawModal @hide-modal="() => isModalWithdrawOpen = false" />
      </AppModal>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { routeNames } from '@/router'

import { vuex } from '@/store'
import { EWalletStatuses, ETransactionTypes, ETransactionStatuses } from '@/types'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import UBXTWalletSummaryCard from '@/views/ubxt-wallet/components/UBXTWalletSummaryCard.vue'
import UBXTTopUpModal from '@/views/ubxt-wallet/components/ubxt-balance/UBXTTopUpModal.vue'
import BotAllocationTable from '@/views/ubxt-wallet/components/ubxt-balance/BotAllocationTable.vue'
import TransactionTable from '@/views/ubxt-wallet/components/TransactionTable.vue'
import UBXTWithdrawModal from '@/views/ubxt-wallet/components/ubxt-balance/UBXTWithdrawModal.vue'
import DepositUBXTInfo from '@/views/ubxt-wallet/components/DepositUBXTInfo.vue'

export default defineComponent({
  name: 'UBXTBalance',

  components: {
    UBXTWalletSummaryCard,
    UBXTTopUpModal,
    BotAllocationTable,
    TransactionTable,
    UBXTWithdrawModal,
    DepositUBXTInfo
  },

  setup () {
    const { isMD } = useCustomBreakpoints()
    const { bots, subscriptedBots, fetchAllAndSubscriptedBots } = useBots()

    const onDropdownAction = [{ label: 'Withdraw', method: 'edit' }]

    const loading = ref<boolean>(false)

    const isModalTopUpOpen = ref<boolean>(false)
    const isModalWithdrawOpen = ref<boolean>(false)

    const getPerfeesUserWalletAvailableAmount = computed((): number => {
      return vuex.ubxtWallet.perfeesUserWalletData?.availableAmount || 0
    })

    const getPerfeesUserWalletRealAvailableAmount = computed((): number => {
      const realAvailableAmount = (vuex.ubxtWallet.perfeesUserWalletData?.availableAmount || 0) -
      (vuex.ubxtWallet.perfeesUserWalletData?.debtAmount) || 0
      return realAvailableAmount
    })

    const getBonusAmount = computed((): number => vuex.ubxtWallet.perfeesUserWalletData?.creditAmount || 0)

    const getPerfeesBotWalletsData = computed(() => vuex.algobots.perfeesBotWalletsData)

    // TODO REFACTOR //
    const activeBotAllocation = computed(() => {
      // IF WE DON'T HAVE ANY BOTS WE RETURN EMPTY DATA //
      if (!bots.value) return []

      const userActiveBots = subscriptedBots.value.map((botSub: any) => {
        return bots.value.find((algobot) => algobot.id === botSub.botId)
      }).filter((bot: any | undefined) => bot !== undefined)
      /**
       * Replaced the above code block with the following,
       * cuz we need to join the bot wallet with full bots list rather than subscribed bots.
       */
      // const userActiveBots = bots.value.filter((bot: any | undefined) => bot !== undefined)

      const activeBotAllocation = getPerfeesBotWalletsData.value
        .filter((allocation) => userActiveBots.find((bot) => bot?.id === allocation.botId))
        .map((allocation) => {
          const algoBot = userActiveBots.find((bot) => bot?.id === allocation.botId)
          const algobotsSubscription = subscriptedBots.value.find((algobot) =>
            algobot.botId === allocation.botId)
          if (algoBot) {
            allocation.botRef = algoBot.botRef
            allocation.botName = algoBot.name
            allocation.status = algobotsSubscription?.enabled === false
              ? EWalletStatuses.DISABLED : EWalletStatuses.ENABLED
          }
          return allocation
        })
      return activeBotAllocation.filter((allocation) => allocation.botRef !== 'AVAXUSDT1' && allocation.botRef !== 'TOMOLO1')
    })

    // TODO REFACTOR //
    const getPerfeesUserWalletAllocatedAmount = computed((): number => {
      if (vuex.ubxtWallet?.perfeesUserWalletData?.allocatedAmount) {
        // return vuex.ubxtWallet.perfeesUserWalletData.allocatedAmount
        return (activeBotAllocation.value as any[]).reduce((acc, val) => {
          return acc + val.amount
        }, 0)
      } else {
        return 0
      }
    })

    // TODO REFACTOR //
    const getPerfeesUserWalletAmount = computed((): number => {
      if (vuex.ubxtWallet?.perfeesUserWalletData?.amount) {
        // return vuex.ubxtWallet.perfeesUserWalletData.amount
        return getPerfeesUserWalletAllocatedAmount.value + getPerfeesUserWalletAvailableAmount.value
      } else {
        return 0
      }
    })

    const getUserTransactionsData = computed(() => vuex.ubxtWallet.userTransactionsData)

    const isDeposit = computed((): boolean => {
      const data = getUserTransactionsData.value.find((item) =>
        item.type === ETransactionTypes.DEPOSIT && item.status === ETransactionStatuses.COMPLETED)
      return !!data
    })

    async function initData (): Promise<void> {
      loading.value = true
      try {
        await Promise.all([fetchAllAndSubscriptedBots(), vuex.algobots.fetchBotWallets()])
        await vuex.ubxtWallet.fetchUserWallet()
        await vuex.ubxtWallet.fetchUserTransactions()
      } finally {
        loading.value = false
      }
    }

    onMounted(() => { initData() })

    return {
      routeNames,
      isMD,
      isModalTopUpOpen,
      loading,
      getPerfeesUserWalletAmount,
      getBonusAmount,
      getPerfeesUserWalletAllocatedAmount,
      getPerfeesUserWalletAvailableAmount,
      getPerfeesUserWalletRealAvailableAmount,
      activeBotAllocation,
      getUserTransactionsData,
      isModalWithdrawOpen,
      onDropdownAction,
      isDeposit
    }
  }
})
</script>

<style lang="scss" scoped>
.ubxt-balance {
  &__summary-card {
    @apply justify-center;
    height: 140px;
  }

  &__button {
    max-width: 100px;
  }
}
</style>
