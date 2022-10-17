<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">UBXT Bridge</h2>
    </Portal>

    <!-- METAMASK BUTTON -->
    <Portal to="h-two">
      <AppMetamaskButton
        :is-metamask-connected="isMetamaskConnected"
        :address="metamaskAccountLink"
        :is-correct-network="isCorrectNetwork"
        network-error-message="Wrong Network"
        @connect="connectMetamask()"
        @disconnect="disconnectMetamask()"
      />
    </Portal>

    <!-- DESKTOP -->
    <div class="flex flex-col xl:flex-row items-center xl:items-start space-y-20 md:space-y-0">
      <!-- SWAP DESCRIPTION -->
      <div class="flex flex-row xl:flex-col flex-shrink-0 md:space-x-20 xl:space-x-0 xl:space-y-20 md:mb-20 xl:mb-0">
        <MessageWidget icon-name="bulb" class="bridge-card__info-widget w-full">
          <p class="flex flex-col">
            <span class="font-semibold 4xl:text-xl">
              Move your UBXT from one blockchain to the other with UBXT Bridge.
            </span>
            <span class="4xl:text-xl">
              Convert your UBXT from Ethereum or BSC and receive them on same wallet
              <a
                target="_blank"
                href="https://upbots.gitbook.io/upbots/getting-started/ubxt-bridge"
                class="underline hover:no-underline"
              >
                More info.
              </a>
            </span>
          </p>
        </MessageWidget>

        <mq-layout mq="lg+" class="flex flex-col flex-grow w-full">
          <MessageWidget icon-name="bulb" class="bridge-card__info-widget w-full">
            <span class="4xl:text-xl">
              Depending on the network situation, it may take up to 2 hours to validate the transaction.
            </span>
          </MessageWidget>
        </mq-layout>
      </div>

      <!-- BRIDGE CARD -->
      <div class="flex flex-col flex-grow items-center w-full">
        <AppCard class="bridge-card flex flex-col w-full py-24 px-12 md:p-40 4xl:p-50">
          <UBXTBridgeConvertCard
            title="from"
            :address="metamaskAccountLink"
            :chaine-name="srcChainName"
            :readonly="false"
            :info-icon="true"
            :convert-value="ubxtAmountToTx"
            :minAmount="minUbxtAmountToTx"
            :maxAmount="maxUbxtAmountToTx"
            :crypto-currency-value="srcUbxtBalance"
            crypto-currency-name="ubxt"
            :crypto-currency-detail="bridgeWay ? 'ERC20' : 'BEP20'"
            @input="updateInput"
          >
            <AppTooltip :placement="isMD ? 'bottom-end' : 'left-start'" hideArrow>
              <AppIcon
                name="info-circle"
                :size="!is4XL ? '30' : '24'"
                class="cursor-pointer"
              />
              <template #content>
                <UBXTBridgeTooltip
                  v-if="swapInfo"
                  :data="swapInfo"
                  :src-chain-name="srcChainName"
                  :dst-chain-name="dstChainName"
                />
              </template>
            </AppTooltip>
          </UBXTBridgeConvertCard>

          <!-- TODO: SWAP BUTTON ADD FUNCTIONALITY -->
          <div class="flex flex-col justify-center items-center my-20 md:my-22 3xl:my-24">
            <AppIcon
              name="swap"
              :size="is3XL ? '24' : !is4XL ? '35' : '27'"
              class="
                block
                text-identity
                dark:text-blair
                p-10
                transform
                rotate-90
                md:hover:-rotate-90
                md:transition
                md:duration-300
                cursor-pointer
              "
              @click="setBridgeWay"
            />
          </div>

          <UBXTBridgeConvertCard
            title="to"
            :address="metamaskAccountLink"
            :chaine-name="dstChainName"
            :readonly="true"
            :convert-value="acceptedUbxtAmount"
            :minAmount="0"
            :maxAmount="maxUbxtAmountToTx"
            :crypto-currency-value="dstUbxtBalance"
            crypto-currency-name="ubxt"
            :crypto-currency-detail="bridgeWay ? 'BEP20' : 'ERC20'"
          />

          <!-- CONNECT WALLET -->
          <AppButton
            v-if="metamaskAccountLink"
            :disabled="!canTransfer"
            type="primary-border-filled"
            :size="is3XL ? 'md' : !is4XL ? 'xlg' : 'lg'"
            class="max-w-300 w-full mx-auto mt-32"
            @click="transferUBXT()"
          >
            Transfer
          </AppButton>
          <AppButton
            v-else
            type="primary-border-filled"
            :size="is3XL ? 'md' : !is4XL ? 'xlg' : 'lg'"
            class="max-w-300 w-full mx-auto mt-32"
            @click="connectMetamask()"
          >
            Connect Wallet
          </AppButton>
        </AppCard>
      </div>

      <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full">
        <MessageWidget icon-name="bulb" class="bridge-card__info-widget w-full">
          Depending on the network situation, it may take up to 2 hours to validate the transaction.
        </MessageWidget>
      </mq-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

import { routeNames } from '@/router'

import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import BN from 'bn.js'

import { useWindowSize } from '@vueuse/core'
import { fixedDecimal } from '@/core/helpers'

import { vuex } from '@/store'
import { EChainID, EthNetLink, BscNetLink } from '@/types/ubxt-bridge.types'

import erc20AbiFile from '@/utils/contract/erc20Abi.json'
import ethUbxtContractAbiFile from '@/utils/contract/abiubxt.json'
import bscUbxtContractAbiFile from '@/utils/contract/abiubxt-bsc.json'

import { useWeb3 } from '@/global-setup/web3/web3.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import UBXTBridgeConvertCard from '@/views/ubxt-bridge/components/UBXTBridgeConvertCard.vue'
import UBXTBridgeTooltip from '@/views/ubxt-bridge/components/UBXTBridgeTooltip.vue'
import AppMetamaskButton from '@/components/stateless/AppMetamaskButton.vue'
import MessageWidget from '@/components/MessageWidget.vue'

export default defineComponent({
  name: 'UbxtBridge',

  components: {
    UBXTBridgeConvertCard,
    UBXTBridgeTooltip,
    AppMetamaskButton,
    MessageWidget
  },

  /* REDIRECT TO 404 IF DAPP NOT DETECTED */
  beforeRouteEnter (to, from, next) {
    const { width } = useWindowSize()
    const { isDAppBrowser } = useWeb3()

    if (width.value <= 479) {
      if (!isDAppBrowser.value) {
        return next({ name: routeNames.notFound })
      }
    }
    next()
  },

  emits: ['set-error'],

  setup (_, { emit }) {
    const { isMD, is3XL, is4XL } = useCustomBreakpoints()

    /** DATA */
    let web3 = new Web3()
    let ethWeb3 = new Web3()
    let bscWeb3 = new Web3()
    const isMetamaskConnected = ref(false)
    const isMetamaskEnabled = ref(false)
    const balance = ref('')
    const ubxtBalance = ref('')
    const metamaskAccountLink = ref('')
    const formattedMetamaskAccountLink = ref('')
    const erc20Abi = erc20AbiFile
    const ethUbxtContractAbi = ethUbxtContractAbiFile
    const bscUbxtContractAbi = bscUbxtContractAbiFile
    const contractAddress = `${process.env.VUE_APP_WEB3_UBXTOKEN_PROXY_CONTRACT_ADDRESS}`
    const decimals = ref(18)
    const ubxtAmountToTx = ref(0)
    const ethUbxtBalance = ref(0)
    const bscUbxtBalance = ref(0)
    const loading = ref(false)
    const showTransactionHistory = ref(false)
    const transTransactionHash = ref('')
    const transTransactionResult = ref(true)
    const ethUbxtContractAddress = ref('0x8564653879a18C560E7C0Ea0E084c516C62F5653')
    const bscUbxtContractAddress = ref('0xbbeb90cfb6fafa1f69aa130b7341089abeef5811')
    const eth2bscDepositAddress = ref('0x533e3c0e6b48010873B947bddC4721b1bDFF9648')

    /** GETTERS */
    const bridgeWay = computed(() => vuex.ubxtBridge.getBridgeWay)
    const networkId = computed(() => vuex.ubxtBridge.getNetworkId)
    const serverInfo = computed(() => vuex.ubxtBridge.getServerInfo)

    /** COMPUTED */
    const isCorrectNetwork = computed((): boolean => {
      if (bridgeWay.value && Number(networkId.value) === EChainID.CHAIN_ETH) {
        return true
      } else if (!bridgeWay.value && Number(networkId.value) === EChainID.CHAIN_BSC) {
        return true
      }
      return false
    })

    const swapInfo = computed(() => {
      return bridgeWay.value ? serverInfo.value.SrcToken : serverInfo.value.DestToken
    })

    const srcChainName = computed((): string => {
      return bridgeWay.value ? 'eth' : 'bsc'
    })

    const dstChainName = computed((): string => {
      return bridgeWay.value ? 'bsc' : 'eth'
    })

    const srcUbxtBalance = computed((): number => {
      return bridgeWay.value
        ? fixedDecimal(ethUbxtBalance.value) as number
        : fixedDecimal(bscUbxtBalance.value) as number
    })

    const dstUbxtBalance = computed((): number => {
      return bridgeWay.value
        ? fixedDecimal(bscUbxtBalance.value) as number
        : fixedDecimal(ethUbxtBalance.value) as number
    })

    const minUbxtAmountToTx = computed((): number => {
      if (!serverInfo.value.SrcToken || !serverInfo.value.DestToken) {
        return 0
      }
      return bridgeWay.value ? serverInfo.value.SrcToken.MinimumSwap : serverInfo.value.DestToken.MinimumSwap
    })

    const maxUbxtAmountToTx = computed((): number => {
      if (!serverInfo.value.SrcToken || !serverInfo.value.DestToken) {
        return 0
      }

      const serverMaxValue = bridgeWay.value ? serverInfo.value.SrcToken.MaximumSwap
        : serverInfo.value.DestToken.MaximumSwap
      return Math.min(srcUbxtBalance.value, serverMaxValue)
    })

    const canTransfer = computed((): boolean => {
      if (!metamaskAccountLink.value || !isCorrectNetwork.value) {
        return false
      }
      if (ubxtAmountToTx.value < minUbxtAmountToTx.value || ubxtAmountToTx.value > maxUbxtAmountToTx.value) {
        return false
      }
      return true
    })

    const acceptedUbxtAmount = computed((): number => {
      if (!canTransfer.value) {
        return 0
      }

      if (!serverInfo.value.SrcToken || !serverInfo.value.DestToken) {
        return 0
      }

      let txFee = ubxtAmountToTx.value * (swapInfo.value?.SwapFeeRate || 0)
      txFee = Math.max(txFee, (swapInfo.value?.MinimumSwapFee || 0))
      txFee = Math.min(txFee, (swapInfo.value?.MaximumSwapFee || 0))

      const acceptedAmount = Math.floor(ubxtAmountToTx.value - txFee)

      return acceptedAmount
    })

    /** METHODS */
    async function getEthBalance (): Promise<void> {
      const contract = new ethWeb3.eth.Contract(ethUbxtContractAbi as any, ethUbxtContractAddress.value)
      ethUbxtBalance.value = await contract.methods.balanceOf(metamaskAccountLink.value).call()
      ethUbxtBalance.value = ethUbxtBalance.value / Math.pow(10, decimals.value)
      Promise.resolve(ethUbxtBalance.value)
    }

    async function getBscBalance (): Promise<void> {
      const contract = new bscWeb3.eth.Contract(bscUbxtContractAbi as any, bscUbxtContractAddress.value)
      bscUbxtBalance.value = await contract.methods.balanceOf(metamaskAccountLink.value).call()
      bscUbxtBalance.value = bscUbxtBalance.value / Math.pow(10, decimals.value)
      Promise.resolve(bscUbxtBalance.value)
    }

    async function checkAccounts (): Promise<void> {
      if (web3 === null) return
      try {
        const accounts = await (web3 as any).eth.getAccounts()
        metamaskAccountLink.value = accounts[0]
        await getEthBalance()
        await getBscBalance()
      } catch {
        emit('set-error')
      }
    }

    async function connectMetamask (): Promise<void> {
      isMetamaskEnabled.value = false
      web3 = new Web3(window.ethereum as any)
      ethWeb3 = new Web3(EthNetLink)
      bscWeb3 = new Web3(BscNetLink)
      try {
        await (window.ethereum as any).enable()
        isMetamaskEnabled.value = true
        isMetamaskConnected.value = true
        checkAccounts()
      } catch {
        isMetamaskEnabled.value = false
      }
    }

    async function disconnectMetamask (): Promise<void> {
      isMetamaskConnected.value = false
      metamaskAccountLink.value = ''
      vuex.ubxtBridge.setBridgeWay(true)
      vuex.ubxtBridge.setNetworkId(1)
      ubxtAmountToTx.value = 0
      ethUbxtBalance.value = 0
      bscUbxtBalance.value = 0
    }

    async function checkMetamaskEnabled (): Promise<void> {
      if (typeof window.ethereum !== 'undefined') {
        const provider = await detectEthereumProvider() as any
        if (provider) {
          provider.on('accountsChanged', async () => {
            await checkAccounts()
          })
          provider.on('networkChanged', async (networkId: any) => {
            vuex.ubxtBridge.setNetworkId(networkId)
            if (provider.isConnected()) {
              await checkAccounts()
            }
          })
          if (provider.isConnected()) {
            await connectMetamask()
          }
        }
      } else {
        emit('set-error')
      }
    }

    function isValidAddress (address: string): boolean {
      return web3.utils.isAddress(address)
    }

    function parseNumber (amount: number, decimal: number) {
      const decimalb = 10 ** decimal
      const decimals = new BN(decimalb.toString())
      return new BN(new BN(amount).mul(decimals))
    }

    async function getBalance (): Promise<number> {
      const web3Balance = await web3.eth.getBalance(metamaskAccountLink.value)
      return parseInt(web3Balance) / 10 ** decimals.value
    }

    async function depositUBXT (): Promise<void> {
      const depositValue = Math.floor(Number(ubxtAmountToTx.value))
      const depositBalance = parseNumber(depositValue, decimals.value)
      const contract = new web3.eth.Contract(ethUbxtContractAbi as any, ethUbxtContractAddress.value)

      const minGasFee = 0.002203
      const ethBalance = await getBalance()
      if (ethBalance < minGasFee) {
        // const eventText = "You don't have enought ETH to make the transaction"
        // this.$notify({ text: eventText, duration: 15000, type: 'error' })
        return
      }

      try {
        if (!isValidAddress(metamaskAccountLink.value)) {
          await vuex.ubxtBridge.registerAccount(metamaskAccountLink.value)
        }
      } catch (error) {
        return
      }

      loading.value = true
      showTransactionHistory.value = true
      transTransactionHash.value = ''
      transTransactionResult.value = true
      contract.methods
        .transfer(eth2bscDepositAddress.value, depositBalance)
        .send({
          from: metamaskAccountLink.value,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        })
        .on('transactionHash', (hash: any) => {
          transTransactionHash.value = hash
          transTransactionResult.value = true
          loading.value = false
        })
        .on('receipt', async () => {
          // this.$notify({ text: 'UBXT Swapping is Success!', type: 'success' })
          await getEthBalance()
          await getBscBalance()
        })
        .on('error', async () => {
          transTransactionHash.value = 'failed'
          transTransactionResult.value = false
          loading.value = false
          // this.$notify({ text: 'UBXT Swapping is Failed!', type: 'error' })
        })
    }

    async function withdrawUBXT (): Promise<void> {
      const withdrawValue = Math.floor(Number(ubxtAmountToTx.value))
      const withdrawBalance = parseNumber(withdrawValue, decimals.value)
      const contract = new web3.eth.Contract(bscUbxtContractAbi as any, bscUbxtContractAddress.value)

      try {
        if (!isValidAddress(metamaskAccountLink.value)) {
          await vuex.ubxtBridge.registerAccount(metamaskAccountLink.value)
        }
      } catch (error) {
        return
      }

      loading.value = true
      showTransactionHistory.value = true
      transTransactionHash.value = ''
      transTransactionResult.value = true

      contract.methods
        .Swapout(withdrawBalance, metamaskAccountLink.value)
        .send({
          from: metamaskAccountLink.value,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        })
        .on('transactionHash', (hash: any) => {
          transTransactionHash.value = hash
          transTransactionResult.value = true
          loading.value = false
        })
        .on('receipt', async () => {
          // this.$notify({ text: 'UBXT Swapping is Success!', type: 'success' })
          await getEthBalance()
          await getBscBalance()
        })
        .on('error', async () => {
          transTransactionHash.value = 'failed'
          transTransactionResult.value = false
          loading.value = false
          // this.$notify({ text: 'UBXT Swapping is Failed!', type: 'error' })
        })
    }

    async function transferUBXT (): Promise<void> {
      if (bridgeWay.value) {
        await depositUBXT()
      } else {
        await withdrawUBXT()
      }
    }

    async function setBridgeWay (): Promise<void> {
      vuex.ubxtBridge.setBridgeWay(!bridgeWay.value)
    }

    function updateInput (input: number): void {
      ubxtAmountToTx.value = input
    }
    // Mounted
    onMounted(async () => {
      await checkMetamaskEnabled()
      vuex.ubxtBridge.fetchServerInfo()
      if (isMetamaskEnabled.value) connectMetamask()
    })

    return {
      isMD,
      is3XL,
      is4XL,
      web3,
      isMetamaskConnected,
      isMetamaskEnabled,
      balance,
      ubxtBalance,
      metamaskAccountLink,
      formattedMetamaskAccountLink,
      erc20Abi,
      contractAddress,
      srcChainName,
      dstChainName,
      ubxtAmountToTx,
      acceptedUbxtAmount,
      minUbxtAmountToTx,
      maxUbxtAmountToTx,
      srcUbxtBalance,
      dstUbxtBalance,
      bridgeWay,
      connectMetamask,
      checkMetamaskEnabled,
      transferUBXT,
      canTransfer,
      setBridgeWay,
      disconnectMetamask,
      swapInfo,
      isCorrectNetwork,
      updateInput
    }
  }

})
</script>

<style lang="scss" scoped>
.bridge-card {
  @media(min-width: 2500px) {
    max-width: 800px;
    margin-left: -700px;

    &__info-widget {
      max-width: 700px;
    }
  }

  @media(min-width: 1920px) and (max-width: 2499px) {
    max-width: 522px;
    margin-left: -400px;
  }

  @media(min-width: 768px) and (max-width: 2499px) {
    &__info-widget {
      max-width: 400px;
    }
  }

  @media(min-width: 1440px) and (max-width: 1919px) {
    margin-left: -400px;
  }

  @media(min-width: 1280px) and (max-width: 1439px) {
    margin-left: -200px;
  }

  @media(min-width: 768px) and (max-width: 1919px) {
    max-width: 480px;
  }

  @media(max-width: 767px) {
    max-width: 450px;
  }
}
</style>
