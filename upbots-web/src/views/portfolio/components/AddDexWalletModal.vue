<template>
  <div class="relative">
    <h2 class="text-nile-blue dark:text-let-it-snow text-center sm:text-lg md:text-xl leading-tight mb-40">
      Add New Wallet
    </h2>

    <div
      class="
      grid
      grid-rows-1
      gap-y-36
      lg:gap-y-0
      lg:grid-cols-3
      lg:col-gap-20
      text-nile-blue
      dark:text-let-it-snow
      "
    >
      <!-- METAMASK -->
      <div
        class="
        flex
        flex-col
        flex-grow
        items-center
        justify-center
        lg:border-r
        lg:border-solid
        lg:border-chambray
        px-20
        "
      >
        <p class="sm:text-sm md:text-md text-center leading-md mb-20">
          Add your Metamask wallets and keep track of your assets evolution on Upbots.
        </p>

        <img src="/img/metamask/metamask.svg" alt="metamask" class="w-50 mb-20">

        <button
          :disabled="loading"
          class="connect-metamask-btn w-full mt-auto"
          :class="loading && 'is-disabled'"
          @click="onAddMetamaskWallet()"
        >
          Connect Wallet
        </button>
      </div>

      <!-- BINANCE CHAIN -->
      <div
        class="
        flex
        flex-col
        flex-grow
        items-center
        justify-center
        lg:border-r
        lg:border-solid
        lg:border-chambray
        px-20
        "
      >
        <p class="sm:text-sm md:text-md text-center leading-md mb-20">
          Add your Binance Chain wallets and keep track of your assets evolution on Upbots.
        </p>

        <img src="/img/binance-chain/binance-chain-wallet.png" alt="binance chain wallet" class="w-50 mb-20">

        <AppButton
          class="w-full mt-auto"
          :disabled="loading"
          @click="onAddBinanceChainWallet()"
        >
          Connect Wallet
        </AppButton>
      </div>

      <!-- DEX WALLET -->
      <div class="flex flex-col flex-grow items-center justify-center px-20">
        <p class="sm:text-sm md:text-md text-center leading-md mb-20">
          Add your DEX wallet using its address.
        </p>

        <Form
          :validation-schema="AddDexWalletSchema" class="w-full flex flex-col flex-grow space-y-30 bg-green"
          @submit="onAddNewWallet"
        >
          <AppInput
            name="label"
            label="Wallet Label"
            placeholder="Wallet Label"
            :disabled="loading"
            size="lg"
          />

          <AppInput
            name="address"
            label="Wallet Address"
            placeholder="Wallet Address"
            :disabled="loading"
            size="lg"
          />

          <!-- SUBMIT BUTTON -->
          <AppButton class="w-full mt-auto" :disabled="loading">Add Wallet</AppButton>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted } from 'vue'

import Web3 from 'web3'

import { truncString } from '@/core/helpers'

import { AddDexWalletSchema } from '@/schemas'
import { Form } from 'vee-validate'

import { vuex } from '@/store'
import { EErrorsMessage, TAddDexWallet } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'AddDexWalletModal',

  components: { Form },

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  emits: ['update:modelValue', 'success'],

  setup (_, { emit }) {
    let web3Metamask = new Web3()
    const web3BinanceChain = new Web3((window as any).BinanceChain)

    const loading = ref<boolean>(false)

    const getWallets = computed(() => vuex.dex.getWallets)

    const metamaskAccounts = ref<string[]>([])
    const binanceChainAccounts = ref<string[]>([])

    async function onAddNewWallet (wallet: TAddDexWallet) {
      const isExist = computed(() => vuex.dex.getWallets).value.find(({ address }) => address === wallet.address)

      if (isExist) {
        emit('success', true)
        appNotify({ type: 'info', message: `${wallet.label} already exists on your portfolio` })
      } else {
        loading.value = true

        const newWallet = {
          label: wallet.label,
          address: wallet.address
        }

        try {
          await vuex.dex.addNewWallet(newWallet)
          appNotify({ type: 'success', message: `${wallet.label} has been added to your portfolio` })
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          loading.value = false
          emit('success', true)
          emit('update:modelValue', false)
        }
      }
    }

    async function checkMetamaskAccounts () {
      web3Metamask = new Web3(web3Metamask.eth.givenProvider)
      metamaskAccounts.value = await web3Metamask.eth.givenProvider.request({ method: 'eth_requestAccounts' })
    }

    async function checkBinanceChainAccounts () {
      if ((window as any).BinanceChain) {
        await (window as any).BinanceChain.enable()
        binanceChainAccounts.value = await web3BinanceChain.eth.getAccounts()
      }
    }

    async function onAddMetamaskWallet () {
      await checkMetamaskAccounts()

      if (metamaskAccounts.value.length) {
        metamaskAccounts.value.forEach((account: string) => {
          const label = truncString(account)
          if (getWallets.value.find(({ address }) => address === account)) {
            appNotify({ type: 'info', message: `${label} already exists on your portfolio` })
          } else {
            onAddNewWallet({ label, address: account })
          }
        })
      } else {
        appNotify({ type: 'info', message: 'Please connect your MetaMask account' })
      }
    }

    async function onAddBinanceChainWallet () {
      await checkBinanceChainAccounts()

      if (binanceChainAccounts.value.length) {
        binanceChainAccounts.value.forEach((account: string) => {
          const label = truncString(account)

          if (getWallets.value.find(({ address }) => address === account)) {
            appNotify({ type: 'info', message: `${label} already exists on your portfolio` })
          } else {
            onAddNewWallet({ label, address: account })
          }
        })
      } else {
        appNotify({ type: 'info', message: 'Please connect your BinanceChain account' })
      }
    }

    async function onChangeMetamaskAccounts () {
      if (typeof web3Metamask.eth.givenProvider !== 'undefined') {
        web3Metamask.eth.givenProvider.on('accountsChanged', async () => {
          await checkMetamaskAccounts()
        })
      }
    }

    async function onChangeBinanceChainAccounts () {
      if (typeof web3Metamask.eth.givenProvider !== 'undefined') {
        web3Metamask.eth.givenProvider.on('accountsChanged', async () => {
          await checkMetamaskAccounts()
        })
      }
    }

    onMounted(async () => {
      await Promise.all([onChangeMetamaskAccounts(), onChangeBinanceChainAccounts()])
    })

    return {
      loading,
      AddDexWalletSchema,
      onAddMetamaskWallet,
      onAddBinanceChainWallet,
      onAddNewWallet
    }
  }
})
</script>

<style lang="scss" scoped>
  .connect-metamask-btn {
    @apply text-white font-semibold rounded-sm;
    background: linear-gradient(69.8deg, #E8821E 21.44%, #FFFFFF 357.38%);
    min-height: 36px;

    &:not(.is-disabled) {
      &:hover {
        background: linear-gradient(69.8deg, #E8821E 21.44%, #FFFFFF 250.38%);
      }
      &:active {
        background: linear-gradient(69.8deg, #E8821E 21.44%, #FFFFFF 250.38%);
      }
    }

    &.is-disabled {
      @apply cursor-not-allowed opacity-50;
    }
  }
</style>
