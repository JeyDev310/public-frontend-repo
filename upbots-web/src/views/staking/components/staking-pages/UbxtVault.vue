<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <router-link :to="{ name: routeNames.staking }">
        <!-- DESKTOP -->
        <mq-layout mq="lg+" class="flex items-center">
          <AppIcon
            name="back"
            size="30"
            class="transition duration-300 text-nile-blue dark:text-tradewind"
          />
          <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl ml-10">
            USDT Vault
          </h2>
        </mq-layout>

        <!-- MOBILE -->
        <mq-layout mq="sm-md" class="flex items-cetner">
          <AppIcon
            name="back"
            size="24"
            class="text-nile-blue dark:text-tradewind"
          />

          <span class="text-nile-blue dark:text-let-it-snow text-sm font-semibold ml-8">Back</span>
        </mq-layout>
      </router-link>
    </Portal>

    <!-- WALLET BUTTON -->
    <Portal to="h-two">
      <StakingWallet
        :connectedWallet="connectedWallet"
        :onWalletConnected="onWalletConnected"
        :isIncorrectNetwork="isIncorrectNetwork"
      />
    </Portal>

    <!-- MIBLE PAGE TITLE -->
    <mq-layout mq="sm-md">
      <span class="text-nile-blue dark:text-let-it-snow text-base font-semibold">USDT Vault</span>
    </mq-layout>

    <!-- CONTENT -->
    <div class="flex flex-col w-full pb-20 mt-20 md:mt-10 overflow-y-auto custom-scrollbar">
      <!-- OVERVIEW CARDS -->
      <div
        class="
        flex
        flex-col
        md:flex-row
        md:items-center
        justify-center
        space-y-20
        mt-20
        md:space-x-20
        4xl:space-x-24
        md:space-y-0
        "
      >
        <StakingSummaryCard
          v-for="(item, index) in summaryData"
          :key="index"
          :data="item"
          class="ubxt-value__summary-card w-full"
        />
      </div>

      <!-- DETAIL CARDS -->
      <div
        class="
        flex
        flex-col
        lg:flex-row
        items-center
        lg:items-stretch
        lg:justify-center
        space-y-40
        lg:space-y-0
        lg:space-x-20
        4xl:space-x-24
        mt-40
        "
      >
        <StakingEarnCard :data="ubxtEarnedData" class="ubxt-value__card w-full">
          <div class="block w-full mx-auto mt-40">
            <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="claimUBXT">
              Claim
            </AppButton>
          </div>
        </StakingEarnCard>

        <StakingEarnCard :data="usdtStakedData" class="ubxt-value__card w-full">
          <div v-if="isApproved" class="flex items-center justify-center mt-40 space-x-16">
            <AppButton
              type="primary-border-filled"
              size="xlg"
              class="w-full"
              @click="buyModalOpen = true"
            >
              Deposit
            </AppButton>
            <AppButton
              type="primary-border-filled"
              size="xlg"
              class="w-full"
              @click="withdrawModalOpen = true"
            >
              Withdraw
            </AppButton>
          </div>
          <div v-else class="block w-full mx-auto mt-40">
            <AppButton
              type="primary-border-filled"
              size="xlg"
              class="w-full"
              @click="approveUSDTContract"
            >
              Approve
            </AppButton>
          </div>
        </StakingEarnCard>
      </div>

      <!-- FOOTER -->
      <StakingFooter />

      <!-- BUY USDT MODAL -->
      <AppModal v-model="buyModalOpen">
        <div class="flex items-center justify-center mb-36">
          <img
            src="/img/cryptocoins/usdt.svg"
            alt="usdt" class="w-36 h-36 rounded-full mr-8"
          >
          <h2 class="text-seal-blue dark:text-white text-center text-xl">Vault Deposit</h2>
        </div>

        <div class="flex items-center mb-36">
          <div class="flex items-center justify-center mr-16">
            <img
              src="/img/cryptocoins/usdt.svg"
              alt="usdt" class="w-24 h-24 rounded-full"
            >
            <span class="text-seal-blue dark:text-white font-semibold">USDT: </span>
          </div>
          <AppInputNumber v-model="buyUSDTValue" size="sm" class="w-full">
            <template #append>
              <div class="flex items-center justify-center absolute px-10 h-full cursor-pointer text-white"
                   style="right: 36px"
                   @click="setMaxUSDT"
              >
                <span class="text-shakespeare underline text-sm">Max</span>
              </div>
            </template>
          </AppInputNumber>
        </div>

        <div class="w-full">
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="w-full"
            @click="depositUSDT"
          >
            Deposit USDT
          </AppButton>
        </div>
      </AppModal>

      <!-- WITHDRAW USDT MODAL -->
      <AppModal v-model="withdrawModalOpen">
        <div class="flex items-center justify-center mb-36">
          <img
            src="/img/cryptocoins/usdt.svg"
            alt="usdt" class="w-46 h-36 rounded-full mr-8"
          >
          <h2 class="text-seal-blue dark:text-white text-center text-xl">Withdraw USDT</h2>
        </div>

        <div class="flex items-center mb-36">
          <div class="flex items-center justify-center mr-16">
            <img
              src="/img/cryptocoins/usdt.svg"
              alt="usdt" class="w-24 h-24 rounded-full"
            >
            <span class="text-seal-blue dark:text-white font-semibold">USDT: </span>
          </div>
          <AppInputNumber v-model="withdrawUSDTValue" size="sm" class="w-full" />
        </div>

        <div class="flex space-x-16">
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="w-full"
            @click="withdrawUSDT"
          >
            Withdraw
          </AppButton>
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="w-full"
            @click="withdrawAllUSDT"
          >
            Withdraw all
          </AppButton>
        </div>
      </AppModal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { routeNames } from '@/router'
// eslint-disable-next-line import/no-named-default
import { default as Web3 } from 'web3'
import { BigNumber } from 'bignumber.js'
import { http } from '@/services'
import { appNotify } from '@/components/stateless/notifications'

import StakingEarnCard from '@/views/staking/components/StakingEarnCard.vue'
import StakingFooter from '@/views/staking/components/StakingFooter.vue'
import StakingWallet from '@/views/staking/components/StakingWallet.vue'
import StakingSummaryCard from '@/views/staking/components/StakingSummaryCard.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vaultAbi = require('@/utils/contract/abivault.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const erc20Abi = require('@/utils/contract/abi.json')

const vaultAddress = '0xeD1e97E62730E83F1d56459C9025eB88F7F1E576'
const erc20Address = '0x55d398326f99059ff775485246999027b3197955'

export default defineComponent({
  name: 'UbxtVault',

  components: {
    StakingEarnCard,
    StakingFooter,
    StakingWallet,
    StakingSummaryCard
  },

  setup () {
    const connectedWallet = ref('')
    const web3Modal = ref<any>(null)
    const isIncorrectNetwork = ref(false)
    const web3 = ref<Web3 | null>(null)
    const isApproved = ref(false)
    const buyModalOpen = ref(false)
    const withdrawModalOpen = ref(false)
    const vaultFarmAPY = ref(3)
    const poolTotal = ref(0)
    const poolUserOwned = ref(0)
    const ubxtEarned = ref(0)
    const usdtStaked = ref(0)
    const maxUSDT = ref(0)
    const buyUSDTValue = ref(0)
    const withdrawUSDTValue = ref(0)

    const vaultContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(vaultAbi, vaultAddress)
      }
      return null
    })
    const usdtContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(erc20Abi, erc20Address)
      }
      return null
    })

    const summaryData = computed(() => [
      { title: 'Total staked in the pool', value: poolTotal.value },
      { title: 'APY', value: vaultFarmAPY.value, type: 'percent' },
      { title: 'Your % in the pool', value: poolUserOwned.value, type: 'percent' }
    ])
    const ubxtEarnedData = computed(() => ({
      title: 'UBXT EARNED',
      coin: 'ubxt',
      value: ubxtEarned.value
    }))
    const usdtStakedData = computed(() => ({
      title: 'USDT STAKED',
      coin: 'usdt',
      value: usdtStaked.value
    }))

    const fetchPoolStats = async () => {
      if (vaultContract.value != null) {
        ubxtEarned.value =
          (await vaultContract.value.methods.currentRewards(
            connectedWallet.value
          ).call()) / Math.pow(10, 18)
        usdtStaked.value =
          (await vaultContract.value.methods
            .stakedTokens(connectedWallet.value)
            .call()) / Math.pow(10, 18)
        poolTotal.value =
          (await vaultContract.value.methods._stakedTokenPool().call()) /
          Math.pow(10, 18)
        if (poolTotal.value && usdtStaked.value) {
          poolUserOwned.value = (usdtStaked.value / poolTotal.value) * 100
        }
      }
    }

    const fetchApprovedStatus = async () => {
      if (usdtContract.value != null) {
        const allowedBalance = await usdtContract.value.methods
          .allowance(connectedWallet.value, vaultAddress)
          .call()
        isApproved.value = !new BigNumber(allowedBalance).isZero()
      }
    }

    const fetchMaxUSDT = async () => {
      if (usdtContract.value != null) {
        maxUSDT.value =
          (await usdtContract.value.methods.balanceOf(connectedWallet.value).call()) /
          Math.pow(10, 18)
      }
    }

    const setMaxUSDT = async () => {
      buyUSDTValue.value = maxUSDT.value
    }

    const onWalletDisconnected = () => {
      connectedWallet.value = ''
      web3.value = null
      if (web3Modal.value) {
        web3Modal.value.clearCachedProvider()
      }
    }

    const fetchWalletData = async () => {
      if (web3.value != null) {
        try {
          const accounts = await web3.value.eth.getAccounts()
          if (accounts.length !== 0) {
            isIncorrectNetwork.value = (await web3.value.eth.net.getId()) !== 56
            connectedWallet.value = accounts[0]
            fetchPoolStats()
            fetchApprovedStatus()
            fetchMaxUSDT()
          } else {
            onWalletDisconnected()
          }
        } catch {
          appNotify({
            type: 'warning',
            message: "Couldn't fetch wallet details"
          })
        }
      }
    }

    const onWalletConnected = (provider: any, modal: any) => {
      if (modal != null) {
        web3Modal.value = modal
      }
      if (provider != null) {
        provider.on('accountsChanged', fetchWalletData)
        provider.on('chainChanged', fetchWalletData)
        provider.on('disconnect', onWalletDisconnected)
        web3.value = new Web3(provider)
        fetchWalletData()
      } else {
        onWalletDisconnected()
      }
    }

    const fetchApr = async () => {
      try {
        const { data }: { data: any; } = await http.get(
          'https://s.belt.fi/info/all.json'
        )
        const info = data.info.BSC.vaultPools.find((e: any) => e.name === '4Belt')
        vaultFarmAPY.value = info ? info.totalAPR * 0.89 : 0
      } catch (error) {
        appNotify({ type: 'error', message: "Couldn't fetch APR for vault" })
      }
    }

    onMounted(fetchApr)

    const approveUSDTContract = () => {
      if (usdtContract.value != null) {
        usdtContract.value.methods
          .approve(
            vaultAddress,
            `0x${new BigNumber(2).pow(256).minus(1).toString(16)}`
          )
          .send({
            from: connectedWallet.value,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          })
          .on('receipt', () => {
            isApproved.value = true
            appNotify({
              type: 'success',
              message: 'Approved successfully!'
            })
          })
          .on('error', () => {
            appNotify({
              type: 'error',
              message: 'Approval process failed!'
            })
          })
      }
    }

    const depositUSDT = () => {
      if (vaultContract.value != null && buyUSDTValue.value !== 0) {
        const depositValue = new BigNumber(buyUSDTValue.value).multipliedBy(
          Math.pow(10, 18)
        )

        vaultContract.value.methods
          .deposit(`0x${depositValue.toString(16)}`)
          .send({
            from: connectedWallet.value,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          })
          .on('receipt', () => {
            appNotify({
              type: 'success',
              message: 'Deposit successfull!'
            })
            fetchWalletData()
          })
          .on('error', () => {
            appNotify({
              type: 'error',
              message: 'Deposit failed!'
            })
          })
      } else {
        appNotify({
          type: 'warning',
          message: 'Deposit failed, please check if you\'re trying to deposit 0'
        })
      }
    }

    const withdrawUSDT = () => {
      if (
        withdrawUSDTValue.value > 0 &&
        withdrawUSDTValue.value < usdtStaked.value &&
        vaultContract.value != null
      ) {
        const withdrawValue = new BigNumber(withdrawUSDTValue.value).multipliedBy(
          Math.pow(10, 18)
        )
        vaultContract.value.methods
          .withdraw(`0x${withdrawValue.toString(16)}`)
          .send({
            from: connectedWallet.value,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          })
          .on('receipt', () => {
            appNotify({
              type: 'success',
              message: 'Withdrawal successfull!'
            })
            fetchWalletData()
          })
          .on('error', () => {
            appNotify({
              type: 'error',
              message: 'Withdrawal failed!'
            })
          })
      } else {
        appNotify({
          type: 'error',
          message: 'Incorrect input!'
        })
      }
    }

    const withdrawAllUSDT = () => {
      if (vaultContract.value != null) {
        vaultContract.value.methods
          .withdrawAll()
          .send({
            from: connectedWallet.value,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          })
          .on('receipt', () => {
            appNotify({
              type: 'success',
              message: 'Withdrawal successfull!'
            })
            fetchWalletData()
          })
          .on('error', () => {
            appNotify({
              type: 'error',
              message: 'Withdrawal failed!'
            })
          })
      }
    }

    const claimUBXT = async () => {
      if (vaultContract.value != null) {
        const claimValue = await vaultContract.value.methods.currentRewards(
          connectedWallet.value
        ).call()
        vaultContract.value.methods
          .claimUBXT(claimValue)
          .send({
            from: connectedWallet.value,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          })
          .on('receipt', () => {
            appNotify({
              type: 'success',
              message: 'Withdrawal successfull!'
            })
            fetchWalletData()
          })
          .on('error', () => {
            appNotify({
              type: 'error',
              message: 'Withdrawal failed!'
            })
          })
      }
    }

    return {
      routeNames,

      connectedWallet,
      isIncorrectNetwork,
      onWalletConnected,
      isApproved,
      buyModalOpen,
      withdrawModalOpen,
      poolTotal,
      vaultFarmAPY,
      poolUserOwned,
      ubxtEarnedData,
      usdtStakedData,
      approveUSDTContract,
      depositUSDT,
      withdrawUSDT,
      withdrawAllUSDT,
      claimUBXT,
      summaryData,
      buyUSDTValue,
      setMaxUSDT,
      withdrawUSDTValue
    }
  }
})
</script>

<style lang="scss" scoped>
.vault {
  &__card {
    height: 100px;
  }
  &__button {
    max-width: 280px;
  }
}

.ubxt-vault {
  @media(min-width: 768px) {
    &__card,
    &__summary-card {
      max-width: 500px;
    }
  }
}
</style>
