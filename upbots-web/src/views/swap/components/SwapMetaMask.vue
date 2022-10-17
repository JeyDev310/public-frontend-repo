<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="flex flex-col flex-grow w-full lg:w-1/3">
    <AppCard class="metamask-card flex flex-col flex-grow p-20 3xl:p-30">
      <!-- METAMASK CONNECTED CONTENT -->
      <template v-if="isMetamaskConnected">
        <!-- CARD CONTENT -->
        <div class="flex flex-col flex-grow w-full">
          <!-- WALLET ADDRESS -->
          <div class="flex flex-col mb-20">
            <div class="label-text-color text-md 2xl:text-lg 4xl:text-3xl font-medium mb-10">Address</div>
            <div class="flex justify-between space-x-30 lg:space-x-40 xl:space-x-70">
              <div class="flex items-center space-x-20">
                <span class="label-text-color w-full 4xl:text-xl 4xl:leading-1">
                  {{ formattedMetamaskAccountLink }}
                </span>

                <AppIcon
                  name="copy"
                  :size="is4XL ? '16' : '22'"
                  class="text-ball-blue dark:text-hidden-sea-glass cursor-pointer"
                  @click="copyAddress()"
                />
              </div>

              <div>
                <div
                  class="
                    flex
                    items-center
                    justify-center
                    w-50
                    h-50
                    lg:w-40
                    lg:h-40
                    4xl:w-80
                    4xl:h-80
                    bg-catskill-white
                    dark:bg-apocyan
                    dark:bg-opacity-20
                    rounded-full
                  "
                >
                  <img src="/img/metamask/metamask.svg" alt="metamask" class="w-26 h-26 4xl:h-32 4xl:w-32">
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col mb-22 4xl:mb-30">
            <!-- ETH BALANCE -->
            <div class="flex items-center justify-between gap-20 mb-20">
              <span class="label-text-color 3xl:text-md2 4xl:text-xl font-medium">ETH balance:</span>
              <span class="text-ball-blue dark:text-hidden-sea-glass 4xl:text-lg">
                {{ toDefaultFixed(balance) }}
              </span>
            </div>

            <!-- UBXT BALANCE -->
            <div class="flex items-center justify-between gap-20">
              <span class="label-text-color 3xl:text-md2 4xl:text-xl font-medium">UBXT balance:</span>
              <span class="text-ball-blue dark:text-hidden-sea-glass 4xl:text-lg">
                {{ toDefaultFixed(ubxtBalance) }}
              </span>
            </div>
          </div>

          <!-- REFRESH BALANCES -->
          <div class="flex">
            <AppButton
              type="primary-border-filled"
              :size="!is5XL ? 'md' : is6XL ? 'xlg' : 'lg'"
              @click="connectMetamask()"
            >
              Refresh
            </AppButton>
          </div>
        </div>
      </template>

      <!-- METAMASK NOT CONNECTED PREVIEW -->
      <template v-else>
        <div class="flex flex-col items-center flex-grow">
          <p class="label-text-color md:line-clamp-6 xl:text-md2 4xl:text-xl text-center mb-12 4xl:mb-20">
            Welcome to our decentralized exchange aggregator! Enter the trade
            you want to make on decentralized exchanges and our tools will scan multiple DEXs
            to give you the best price and combination for your transaction!
          </p>

          <img
            src="/img/metamask/metamask.svg"
            alt="metamask"
            class="w-34 3xl:w-40 4xl:w-50 mx-auto mb-12 4xl:mb-20"
          >

          <!-- CONNECT METAMASK -->
          <div class="flex justify-center w-full mt-auto">
            <AppButton
              class="w-full"
              :size="is5XL ? 'md' : is6XL ? 'xlg' : 'lg'"
              @click="connectMetamask()"
            >
              Connect Wallet
            </AppButton>
          </div>
        </div>
      </template>
    </AppCard>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="mb-20">
    <template v-if="isMetamaskConnected">
      <AppCard class="flex flex-col w-full px-20 py-12">
        <div class="flex items-center w-full">
          <div class="flex items-center w-full space-x-24 mr-20">
            <div class="flex items-center justify-center w-24 h-24">
              <img src="/img/metamask/metamask.svg" alt="metamask" class="w-full h-full">
            </div>

            <p class="text-nile-blue dark:text-blair">{{ formattedMetamaskAccountLink }}</p>
            <AppIcon
              name="copy"
              size="16"
              class="text-ball-blue dark:text-hidden-sea-glass cursor-pointer"
              @click="copyAddress()"
            />
          </div>

          <AppIcon
            name="chevron-thin"
            size="15"
            class="text-nile-blue dark:text-blair transition duration-300"
            :class="isMoreInfo && 'transform rotate-180'"
            @click="isMoreInfo = !isMoreInfo"
          />
        </div>

        <div v-if="isMoreInfo" class="flex flex-col w-full mt-20">
          <!-- ETH BALANCE -->
          <div class="flex items-center justify-between space-x-20 mb-20">
            <span class="label-text-color font-medium">ETH balance:</span>
            <span class="text-ball-blue dark:text-hidden-sea-glass">{{ toDefaultFixed(balance) }}</span>
          </div>

          <!-- UBXT BALANCE -->
          <div class="flex items-center justify-between space-x-20">
            <span class="label-text-color font-medium">UBXT balance:</span>
            <span class="text-ball-blue dark:text-hidden-sea-glass">{{ toDefaultFixed(ubxtBalance) }}</span>
          </div>

          <!-- REFRESH BALANCES -->
          <div class="flex mt-20 self-end">
            <AppButton type="primary-border-filled" size="md" @click="connectMetamask()">
              Refresh
            </AppButton>
          </div>
        </div>
      </AppCard>
    </template>

    <template v-else>
      <AppCard class="flex items-center justify-center w-full px-20 py-12" @click="connectMetamask()">
        <div class="flex items-center justify-center w-24 h-24 mr-18">
          <img src="/img/metamask/metamask.svg" alt="metamask" class="w-full h-full">
        </div>

        <p class="text-base font-semibold dark:text-white text-chicory-flower">Connect Wallet</p>
      </AppCard>
    </template>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import Web3 from 'web3'
import erc20AbiFile from '@/views/swap/erc20Api.json'
import { SwapErrors } from '@/views/swap/swap.data'

import { copyToClipboard } from '@/core/helpers'

import { appNotify } from '@/components/stateless/notifications'

import { useSwap } from '@/views/swap/swap.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'SwapMetaMask',

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is5XL, is6XL } = useCustomBreakpoints()

    /* USE SWAP SETUP */
    const { toDefaultFixed } = useSwap()

    let web3 = new Web3()

    const isMetamaskConnected = ref<boolean>(false)
    const isMetamaskEnabled = ref<boolean>(false)
    const balance = ref<string>('')
    const ubxtBalance = ref<string>('')
    const metamaskAccountLink = ref<string>('')
    const formattedMetamaskAccountLink = ref<string>('')
    const erc20Abi: any = erc20AbiFile
    const contractAddress = `${process.env.VUE_APP_WEB3_UBXTOKEN_PROXY_CONTRACT_ADDRESS}`
    const isMoreInfo = ref<boolean>(false)

    function formatAddress (address: string): string {
      return address.substring(0, 8) + '.....' + address.substring(address.length - 6)
    }

    async function getERC20Balance (): Promise<void> {
      const contract = new web3.eth.Contract(erc20Abi, contractAddress)
      const decimals = await contract.methods.decimals().call()
      const balance = await contract.methods.balanceOf(metamaskAccountLink.value).call()
      const adjustedBalance = balance / Math.pow(10, decimals)
      ubxtBalance.value = adjustedBalance.toString()
      isMetamaskConnected.value = true
    }

    async function checkAccounts (): Promise<void> {
      if (web3 === null) return
      try {
        const accounts = await web3.eth.getAccounts()
        metamaskAccountLink.value = accounts[0]

        if (metamaskAccountLink.value) {
          formattedMetamaskAccountLink.value = formatAddress(metamaskAccountLink.value)
          const wei = await web3.eth.getBalance(metamaskAccountLink.value)
          balance.value = web3.utils.fromWei(wei, 'ether')
          getERC20Balance()
        }
      } catch {
        appNotify({ type: 'error', message: SwapErrors.METAMASK_MISSING_ERROR })
      }
    }

    async function connectMetamask (): Promise<void> {
      isMetamaskEnabled.value = false

      web3 = new Web3(web3.eth.givenProvider)
      try {
        const accounts = await web3.eth.givenProvider.request({ method: 'eth_requestAccounts' })
        if (accounts?.length) {
          isMetamaskEnabled.value = true
        } else {
          isMetamaskEnabled.value = false
        }
      } catch {
        isMetamaskEnabled.value = false
      }
      if (isMetamaskEnabled.value) {
        checkAccounts()
      }
    }

    async function checkMetamaskEnabled (): Promise<void> {
      if (typeof web3.eth.givenProvider !== 'undefined') {
        if (web3.eth.givenProvider) {
          web3.eth.givenProvider.on('accountsChanged', async () => {
            await checkAccounts()
          })

          web3.eth.givenProvider.on('chainChanged', async () => {
            if (web3.eth.givenProvider.isConnected()) {
              await checkAccounts()
            }
          })

          if (web3.eth.givenProvider.isConnected()) {
            await connectMetamask()
          }
        }
      } else {
        appNotify({ type: 'error', message: SwapErrors.METAMASK_MISSING_ERROR })
      }
    }

    async function copyAddress (): Promise<void> {
      const accounts = await web3.eth.givenProvider.request({ method: 'eth_requestAccounts' })
      if (accounts?.length) {
        const tempInput = document.createElement('input')
        tempInput.value = accounts[0]
        copyToClipboard({ value: tempInput.value })
      }
    }

    onMounted(async () => {
      await checkMetamaskEnabled()
      if (isMetamaskEnabled.value) connectMetamask()
    })

    return {
      is4XL,
      is5XL,
      is6XL,

      isMetamaskConnected,
      isMetamaskEnabled,
      balance,
      ubxtBalance,
      metamaskAccountLink,
      formattedMetamaskAccountLink,
      connectMetamask,
      isMoreInfo,
      toDefaultFixed,
      copyAddress
    }
  }
})
</script>

<style lang="scss" scoped>
.metamask-card {
  @media(max-width: 1023px) {
    min-height: 270px;
  }
}

.label-text-color {
  @apply text-nile-blue dark:text-blair;
}
</style>
