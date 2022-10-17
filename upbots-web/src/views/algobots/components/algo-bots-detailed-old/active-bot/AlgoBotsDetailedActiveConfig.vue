<template>
  <AppCard class="algobot-detailed-config relative flex flex-shrink-0 w-full md:p-14 lg:p-20">
    <!-- CONTENT -->
    <mq-layout
      mq="lg+"
      class="flex flex-col 2xl:grid 2xl:gap-x-20 space-y-14 2xl:space-y-0 w-full"
      :class="isPrivateBot ? 'algobot-detailed-config__grid--private' : 'algobot-detailed-config__grid--rental'"
    >
      <!-- LOADER -->
      <AppLoader v-if="loading || baseAvailableLoading" class="rounded-t-xlg rounded-b-sm md:rounded-xlg" />

      <!-- TOTAL GAIN -->
      <div
        class="
          algobot-detailed-config__item-1
          flex
          flex-grow
          flex-col
          items-center
          border-b
          2xl:border-r
          border-blue-heeler
          dark:border-himalaya-sky
          pb-14
          xl:py-14
        "
      >
        <div class="text-nile-blue dark:text-soaring-eagle font-medium 4xl:text-md mb-14">Total Gain</div>
        <div class="flex items-center">
          <AppFormatNumber
            :data="getTotalRealisedGain"
            :to-fixed="2"
            :is-math-symbols="false"
            text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
            class="text-bluster-blue dark:text-cloudless"
          />

          <p class="text-bluster-blue dark:text-cloudless text-2xl 4xl:text-4xl font-semibold leading-1 ml-4">
            USDT
          </p>
        </div>
      </div>

      <!-- FOR PRIVATE BOT -->
      <template v-if="isPrivateBot">
        <!-- PERF 3M -->
        <div
          class="
            algobot-detailed-config__item-2
            flex
            flex-grow
            flex-col
            items-center
            border-b
            2xl:border-r
            border-blue-heeler
            dark:border-himalaya-sky
            pb-14
            xl:py-14
          "
        >
          <div class="text-nile-blue dark:text-soaring-eagle font-medium 4xl:text-md mb-14">Perf 3M</div>
          <div class="flex items-center">
            <AppFormatNumber
              :data="getAlgobotByBotId.perfSnapshots?.month3"
              :to-fixed="2"
              :is-colored="false"
              text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
              class="text-bluster-blue dark:text-cloudless"
              percent
            />
          </div>
        </div>

        <!-- PERF 6M -->
        <div class="flex flex-grow flex-col items-center pb-14 xl:py-14">
          <div class="text-nile-blue dark:text-soaring-eagle font-medium 4xl:text-md mb-14">Perf 6M</div>
          <div class="flex items-center">
            <AppFormatNumber
              :data="getAlgobotByBotId.perfSnapshots?.month6"
              :to-fixed="2"
              :is-colored="false"
              text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
              class="text-bluster-blue dark:text-cloudless"
              percent
            />
          </div>
        </div>
      </template>

      <!-- FOR RENTAL BOT -->
      <template v-else>
        <!-- UBXT ALLOCATION BALANCE | UBXT BALANCE -->
        <div
          class="
            algobot-detailed-config__item-2
            flex
            flex-col
            items-center
            border-b
            2xl:border-r
            border-blue-heeler
            dark:border-himalaya-sky
            pb-14
            xl:py-14
          "
        >
          <div>
            <div class="flex items-start justify-center mb-14">
              <div class="flex flex-col text-nile-blue dark:text-soaring-eagle 4xl:text-md font-medium mr-4">
                {{ !getPerfeesBotWalletsById?.autoRefill ? 'UBXT Allocation Balance' : 'UBXT Balance' }}
              </div>

            <!-- TODO TEXT -->
            <!-- <div class="flex">
              <AppIcon
                name="question-circle"
                size="14"
                class="text-nile-blue dark:text-blair"
              />
            </div> -->
            </div>

            <div class="flex items-center">
              <div class="w-24 4xl:w-30 h-24 4xl:h-30 rounded-full mr-20 overflow-hidden">
                <img src="/img/cryptocoins/ubxt.svg" alt="ubxt" class="w-full h-full object-cover">
              </div>

              <div class="flex flex-col mr-10 xl:mr-28">
                <AppFormatNumber
                  :data="getUBXTBalanceValue"
                  :to-fixed="2"
                  :is-math-symbols="false"
                  text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
                  :class="
                    !getPerfeesBotWalletsById?.autoRefill
                      ? !isTradableAmount
                        ? 'text-alexandria'
                        : 'text-nile-blue dark:text-tradewind'
                      : 'text-nile-blue dark:text-tradewind'
                  "
                />
              </div>

              <!-- IS REFILL FALSE -->
              <template v-if="!getPerfeesBotWalletsById?.autoRefill">
                <div class="flex items-center space-x-12">
                  <!--TODO: NEED STATES AND DESIGN FOR LIGHT MODE -->
                  <div
                    class="algobot-detailed-config__allocation-btn algobot-detailed-config__allocation-btn--minus"
                    :class="!isMinButtonEnable ? 'is-disabled' : 'cursor-pointer'"
                    @click="showTransferModal('minus')"
                  >
                    <AppIcon name="minus" size="14" class="text-white" />
                  </div>

                  <div
                    class="
                  algobot-detailed-config__allocation-btn
                  algobot-detailed-config__allocation-btn--plus
                  cursor-pointer
                "
                    @click="showTransferModal('plus')"
                  >
                    <AppIcon name="plus" size="14" class="text-white" />
                  </div>
                </div>
              </template>

              <!-- IS REFILL TRUE -->
              <template v-if="getPerfeesBotWalletsById?.autoRefill">
                <AppButton size="xs" type="grey-outlined" @click="isModalTopUpOpen = true">
                  Add Token
                </AppButton>
              </template>
            </div>

            <div v-if="getPerfeesBotWalletsById" class="flex mt-14">
              <AppTooltip
                placement="top"
                content="I agree that the UBXT of my main balance will be automatically
               used in case of insufficient funds on my active bots"
              >
                <AppCheckbox
                  v-model="getPerfeesBotWalletsById.autoRefill"
                  type="secondary"
                  @input="handleAutoRefill()"
                >
                  <span>Automatic Refill</span>
                </AppCheckbox>
              </AppTooltip>
            </div>
          </div>
        </div>

        <!-- VIRTUAL CREDIT -->
        <div class="algobot-detailed-config__item-3 flex flex-grow flex-col items-center xl:py-14">
          <div class="flex items-start mb-14">
            <span class="text-nile-blue dark:text-soaring-eagle 4xl:text-md font-medium mr-4">
              Virtual Credit
            </span>

          <!-- TODO TEXT -->
          <!-- <AppIcon
            name="question-circle"
            size="14"
            class="text-nile-blue dark:text-blair"
          /> -->
          </div>

          <AppFormatNumber
            :data="getPerfeesBotWalletsById?.creditAmount"
            :to-fixed="2"
            :is-math-symbols="false"
            text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
            :class="
              getPerfeesBotWalletsById?.creditAmount
                ? 'text-spring-bouquet'
                : 'text-bluster-blue dark:text-cloudless'
            "
          />
        </div>
      </template>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col w-full">
      <AppCard
        class="
          algobot-detailed-config__mobile-item-3
          flex
          flex-col
          items-center
          justify-center
          flex-shrink-0
          relative
          w-full
          p-10
        "
        :class="getModeName"
      >
        <!-- LOADER -->
        <AppLoader v-if="loading || baseAvailableLoading" class="rounded-xlg" />

        <!-- CONTENT -->
        <div class="text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-8">Total Gain</div>
        <div class="flex items-center">
          <AppFormatNumber
            :data="getTotalRealisedGain"
            :to-fixed="2"
            :is-math-symbols="false"
            text-size="text-md font-semibold leading-1"
            class="text-bluster-blue dark:text-cloudless"
          />

          <p class="text-bluster-blue dark:text-cloudless text-md font-semibold leading-1 ml-4">
            USDT
          </p>
        </div>
      </AppCard>

      <!-- FOR PRIVATE BOT -->
      <div v-if="isPrivateBot" class="flex flex-col w-full space-y-12 mt-12">
        <!-- PERF 3M -->
        <AppCard
          class="
            algobot-detailed-config__mobile-item-1
            flex
            flex-col
            items-center
            justify-center
            flex-shrink-0
            relative
            w-full
            p-10
          "
        >
          <div class="text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-8">Perf 3M</div>
          <div class="flex items-center">
            <AppFormatNumber
              :data="getAlgobotByBotId.perfSnapshots?.month3"
              :to-fixed="2"
              :is-math-symbols="false"
              text-size="text-md font-semibold leading-1"
              class="text-bluster-blue dark:text-cloudless"
              percent
            />
          </div>
        </AppCard>

        <!-- PERF 6M -->
        <AppCard
          class="
            algobot-detailed-config__mobile-item-1
            flex
            flex-col
            items-center
            justify-center
            flex-shrink-0
            relative
            w-full
            p-10
          "
        >
          <div class="text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-8">Perf 6M</div>
          <div class="flex items-center">
            <AppFormatNumber
              :data="getAlgobotByBotId.perfSnapshots?.month6"
              :to-fixed="2"
              :is-math-symbols="false"
              text-size="text-md font-semibold leading-1"
              class="text-bluster-blue dark:text-cloudless"
              percent
            />
          </div>
        </AppCard>
      </div>

      <!-- FOR RENTAL BOT -->
      <div v-else class="flex flex-col w-full space-y-40 mt-40">
        <div class="flex flex-col space-y-12">
          <AppCard
            class="
            algobot-detailed-config__mobile-item-1
            flex
            flex-col
            justify-center
            flex-shrink-0
            relative
            w-full
            p-10
          "
          >
            <!-- LOADER -->
            <AppLoader v-if="loading" class="rounded-xlg" />

            <!-- CONTENT -->

            <!-- UBXT ALLOCATION BALANCE | UBXT BALANCE -->
            <div class="flex items-start justify-center mb-8">
              <div class="flex flex-col text-nile-blue dark:text-soaring-eagle text-sm font-medium mr-4">
                {{ !getPerfeesBotWalletsById?.autoRefill ? 'UBXT Allocation Balance' : 'UBXT Balance' }}
              </div>

            <!-- TODO TEXT -->
            <!-- <div class="flex">
              <AppIcon name="question-circle" size="14" class="text-nile-blue dark:text-blair" />
            </div> -->
            </div>

            <div class="flex items-center justify-center">
              <div class="w-20 h-20 rounded-full mr-10 overflow-hidden">
                <img src="/img/cryptocoins/ubxt.svg" alt="ubxt logo" class="w-full h-full object-cover">
              </div>

              <div class="flex flex-col">
                <AppFormatNumber
                  :data="getUBXTBalanceValue"
                  :to-fixed="2"
                  :is-math-symbols="false"
                  text-size="text-md font-semibold leading-1"
                  :class="
                    !getPerfeesBotWalletsById?.autoRefill
                      ? !isTradableAmount
                        ? 'text-alexandria'
                        : 'text-nile-blue dark:text-tradewind'
                      : 'text-nile-blue dark:text-tradewind'
                  "
                />
              </div>

              <!-- IS REFILL TRUE -->
              <template v-if="getPerfeesBotWalletsById?.autoRefill">
                <AppButton size="xs" type="grey-outlined" class="ml-20" @click="isModalTopUpOpen = true">
                  Add Token
                </AppButton>
              </template>
            </div>

            <div v-if="getPerfeesBotWalletsById" class="flex justify-end mt-10">
              <AppTooltip
                placement="top"
                content="I agree that the UBXT of my main balance will be automatically
              used in case of insufficient funds on my active bots"
              >
                <AppCheckbox
                  v-model="getPerfeesBotWalletsById.autoRefill"
                  type="secondary"
                  @input="handleAutoRefill()"
                >
                  <span>Automatic Refill</span>
                </AppCheckbox>
              </AppTooltip>
            </div>
          </AppCard>

          <!-- PLUS ICON -->
          <div class="flex justify-center flex-shrink-0">
            <AppIcon name="plus" size="32" class="text-nile-blue dark:text-soaring-eagle" />
          </div>

          <!-- VIRTUAL CREDIT -->
          <AppCard
            class="
            algobot-detailed-config__mobile-item-2
            flex
            flex-col
            items-center
            justify-center
            flex-shrink-0
            relative
            w-full
            p-10
          "
          >
            <!-- LOADER -->
            <AppLoader v-if="loading || baseAvailableLoading" class="rounded-xlg" />

            <!-- CONTENT -->

            <!-- VIRTUAL CREADIT -->
            <div class="flex items-start mb-8">
              <span class="text-nile-blue dark:text-soaring-eagle text-smfont-medium mr-4">Virtual Credit</span>

            <!-- TODO TEXT -->
            <!-- <AppIcon name="question-circle" size="14" class="text-nile-blue dark:text-blair" /> -->
            </div>

            <AppFormatNumber
              :data="getPerfeesBotWalletsById?.creditAmount"
              :to-fixed="2"
              :is-math-symbols="false"
              text-size="text-md font-semibold leading-1"
              :class="
                getPerfeesBotWalletsById?.creditAmount
                  ? 'text-spring-bouquet'
                  : 'text-bluster-blue dark:text-cloudless'
              "
            />
          </AppCard>
        </div>

        <!-- ACTION BUTTONS (IF REFILL FALSE) -->
        <template v-if="!getPerfeesBotWalletsById?.autoRefill">
          <div class="grid grid-cols-2 gap-x-20">
            <AppButton
              type="green-gradient"
              size="xlg"
              class="flex items-center justify-center"
              :disabled="loading || baseAvailableLoading"
              @click="showTransferModal('plus')"
            >
              <AppIcon name="plus" size="28" />
            </AppButton>

            <AppButton
              type="red-gradient"
              size="xlg"
              class="flex items-center justify-center"
              :disabled="!isMinButtonEnable || loading|| baseAvailableLoading"
              @click="showTransferModal('minus')"
            >
              <AppIcon name="minus" size="28" />
            </AppButton>
          </div>
        </template>
      </div>
    </mq-layout>

    <!-- UBXT TRANSFER MODAL -->
    <AppModal v-model="isTransUbxtModalOpen">
      <div class="flex flex-col">
        <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-10">
          Transfer UBXT
        </h2>

        <div class="grid grid-cols-3 gap-x-20 mb-40">
          <div class="flex flex-col justify-center items-center text-seal-blue dark:text-white-lilac text-center">
            <div>From:</div>
            <div>{{ transferMode == "plus" ? "Main Balance" : getPerfBotCyclesDataById?.name }}</div>
          </div>

          <div class="flex items-center justify-center">
            <AppIcon name="swap" size="24" class="text-nile-blue dark:text-tradewind" />
          </div>

          <div class="flex flex-col justify-center items-center text-seal-blue dark:text-white-lilac text-center">
            <div>To:</div>
            <div>{{ transferMode == "minus" ? "Main Balance" : getPerfBotCyclesDataById?.name }}</div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-40">
          <div class="flex items-center">
            <span class="text-seal-blue dark:text-white-lilac">
              Available UBXT Amount:
            </span>
            <span class="text-nile-blue dark:text-tradewind ml-4">
              <span class="text-blue-cl-400">{{ getTransableMaxAmount.toFixed(4) }} UBXT</span>
            </span>
          </div>

          <AppInputNumber
            v-model="ubxtAmountToTrans"
            :is-arrow="false"
            type="number"
            size="xlg"
            class="mt-10 text-md"
          />
        </div>

        <div class="flex items-center justify-center w-full">
          <AppButton :disabled="isTransferBtnAvailable" size="xlg" @click="transferUbxt">
            Transfer
          </AppButton>
        </div>
      </div>
    </AppModal>

    <!-- TOT UP MODAL -->
    <AppModal v-model="isModalTopUpOpen" modal-width="700">
      <UBXTTopUpModal />
    </AppModal>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'

import { vuex } from '@/store'
import { algoBotsService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'

import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

import UBXTTopUpModal from '@/views/ubxt-wallet/components/ubxt-balance/UBXTTopUpModal.vue'

export default defineComponent({
  name: 'AlgoBotsDetailedActiveConfig',

  components: { UBXTTopUpModal },

  props: {
    baseAvailableLoading: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    baseAvailable: {
      type: Number as PropType<number>,
      default: 0
    }
  },

  setup (props) {
    /* USE ALGO BOTS DETAILED SETUP */
    const {
      getAlgobotByBotId,
      getPerfSubscriptionCyclesData,
      getPerfeesBotWalletsById,
      getAlgobotsSubscriptionByBotId,
      getUserWalletData,
      fetchAutoRefill,
      cryptoPriceCoinGecko,
      fetchCryptoPriceCoinGecko,
      isPrivateBot
    } = useAlgoBotsDetailed()

    /* USE ALGO BOTS SETUP */
    const { getAlgobotsSubscriptionById, getPerfBotCyclesDataById } = useAlgoBots()

    /* USE GLOBAL SETUP */
    const { getModeName, getPerfeesUserWalletAmount } = useGlobal()

    const baseAvailable = computed(() => props.baseAvailable *
    (getAlgobotsSubscriptionById.value?.accountPercent || 0))

    // LOADING //
    const loading = ref<boolean>(false)

    const isModalTopUpOpen = ref<boolean>(false)

    // GET TOTAL REALISED GAIN //
    const getTotalRealisedGain = computed((): number => {
      return getPerfSubscriptionCyclesData.value.reduce((acc, cur) => acc + (cur?.realisedGain?.usd || 0), 0)
    })

    // GET ALLOCATION BALANCE //
    const getAllocationBalance = computed((): number => {
      const amount = getPerfeesBotWalletsById.value?.amount || 0
      const debtAmount = getPerfeesBotWalletsById.value?.debtAmount || 0

      return getPerfeesBotWalletsById.value ? (amount - debtAmount) : 0
    })

    // HANDLE AUTO REFILL //
    async function handleAutoRefill () {
      loading.value = true

      try {
        await fetchAutoRefill()
        if (getPerfBotCyclesDataById.value && getPerfeesBotWalletsById.value?.autoRefill) {
          const payload = {
            botId: getPerfBotCyclesDataById.value?.id,
            amount: 0,
            type: 'WITHDRAW'
          }
          await algoBotsService.botWalletTransfer(payload)
          await vuex.algobots.fetchUserWallet()
          await vuex.algobots.fetchBotWallets()
        }
      } finally {
        loading.value = false
      }
    }

    // GET CURRENT UBXT PRICE //
    const getCurrentUbxtPrice = computed(() => {
      const pair = 'upbots/usd'
      const pairData = cryptoPriceCoinGecko.data[pair]
      if (pairData) {
        const latestPrice = pairData.prices[pairData.prices.length - 1][1]
        return latestPrice
      }
      return 0
    })

    // GET MINIMUM UBXT TO DEPOSIT //
    const getMiniumUbxtToDeposit = computed(() => {
      const ubxtPrice = getCurrentUbxtPrice.value
      if (ubxtPrice === 0) {
        return 0
      } else {
        const minUbxt = (baseAvailable.value / ubxtPrice) * 0.01
        return minUbxt
      }
    })

    // IS TRADABLE AMOUNT //
    const isTradableAmount = computed(() => {
      if (!getPerfeesBotWalletsById.value) {
        return false
      }
      const realAmount = getPerfeesBotWalletsById.value.amount - getPerfeesBotWalletsById.value.debtAmount
      if (realAmount > getMiniumUbxtToDeposit.value) {
        return true
      }
      return false
    })

    // IS MIN BUTTON ENABLED //
    const isMinButtonEnable = computed(() => {
      return isTradableAmount.value && !getAlgobotsSubscriptionByBotId.value?.botRunning
    })

    // TRANSFER MODAL STATE //
    const isTransUbxtModalOpen = ref<boolean>(false)

    // UBXT AMOUNT TO TRANSFER //
    const ubxtAmountToTrans = ref<number>(0)

    // TRANSFER MODE //
    const transferMode = ref<string>('')

    // GET TRANSABLE MAX AMOUNT //
    const getTransableMaxAmount = computed(() => {
      if (transferMode.value === 'plus') {
        return getUserWalletData.value.availableAmount
      } else {
        return getPerfeesBotWalletsById.value && getPerfeesBotWalletsById.value.amount - getMiniumUbxtToDeposit.value
      }
    })

    // IS TRANSABLE //
    const isTransable = computed(() => {
      return Number(ubxtAmountToTrans.value) > 0 &&
      Number(ubxtAmountToTrans.value) <= Number(getTransableMaxAmount.value)
    })

    // IS TRANSFER BTN AVAILABLE //
    const isTransferBtnAvailable = computed(() => {
      if (
        !ubxtAmountToTrans.value ||
        Number(ubxtAmountToTrans.value) === 0 ||
        ubxtAmountToTrans.value > (getTransableMaxAmount.value || 0)
      ) {
        return true
      } else {
        return false
      }
    })

    const getUBXTBalanceValue = computed((): number => {
      const totalUserBalance = getPerfeesUserWalletAmount.value || 0
      const allocatedAmount = getUserWalletData.value.allocatedAmount || 0

      return getPerfeesBotWalletsById.value?.autoRefill
        ? (totalUserBalance - allocatedAmount)
        : (getAllocationBalance.value)
    })

    // HANDLE OPEN/CLOSE STATE TRANSFER MODAL //
    function showTransferModal (mode: string) {
      transferMode.value = mode
      isTransUbxtModalOpen.value = true
    }

    // TRANSFER UBXT //
    async function transferUbxt () {
      let amount = 0
      const botAmount = getPerfeesBotWalletsById.value ? Number(getPerfeesBotWalletsById.value.amount) : 0
      if (transferMode.value === 'plus') {
        amount = botAmount + Number(ubxtAmountToTrans.value)
      } else {
        amount = botAmount - Number(ubxtAmountToTrans.value)
      }

      const payload: {botId: any; amount: number;} = {
        botId: getPerfBotCyclesDataById.value?.id,
        amount
      }

      loading.value = true
      try {
        const res = await algoBotsService.botWalletTransfer(payload)
        if (res.status === 200) {
          vuex.algobots.fetchUserWallet()
          vuex.algobots.fetchBotWallets()
        }
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
      } finally {
        ubxtAmountToTrans.value = 0
        loading.value = false
        isTransUbxtModalOpen.value = false
      }
    }

    // INIT DATA //
    async function initActiveConfigData () {
      loading.value = true
      try {
        await Promise.all([
          vuex.algobots.fetchBotWallets(),
          vuex.algobots.fetchUserWallet(),
          fetchCryptoPriceCoinGecko()
        ])
      } finally {
        loading.value = false
      }
    }
    initActiveConfigData()

    return {
      getModeName,

      getAlgobotByBotId,
      getPerfeesBotWalletsById,
      getPerfBotCyclesDataById,
      getPerfeesUserWalletAmount,

      loading,
      isModalTopUpOpen,

      getTotalRealisedGain,
      getAllocationBalance,
      isMinButtonEnable,
      getUBXTBalanceValue,

      isTransUbxtModalOpen,
      showTransferModal,
      ubxtAmountToTrans,
      transferMode,
      isTransable,
      getTransableMaxAmount,
      isTransferBtnAvailable,
      isTradableAmount,

      transferUbxt,
      handleAutoRefill,

      isPrivateBot
    }
  }
})
</script>

<style lang="scss" scoped>
.algobot-detailed-config {
  &__allocation-btn {
    @apply
      flex items-center justify-center
      w-50 h-28
      border border-solid border-true-lavender
      bg-true-lavender bg-opacity-20
      rounded-sm
      px-5 py-2;

    &--plus,
    &--minus {
      &.is-disabled {
        @apply opacity-50 pointer-events-none;
      }
    }
  }
  @media(min-width: 1440px) {
    &__grid {
      &--rental {
        grid-template-columns: 1fr 2fr 1fr;
      }

      &--private {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    &__item-1,
    &__item-2 {
      border-bottom: none;
    }
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    min-height: 311px;
  }

  @media(min-width: 1024px) and (max-width: 1439px) {
    min-height: 355px;
  }

  @media(min-width: 1440px) and (max-width: 1919px) {
    min-height: 160px;
  }

  @media(min-width: 1920px) {
    min-height: 160px;
  }

  @media(max-width: 767px) {
    background: transparent;

    &.is-dark {
      background: transparent;
    }

    &__mobile-item-1,
    &__mobile-item-2,
    &__mobile-item-3 {
      min-height: 105px;
    }

    &__mobile-item-3 {
      &.is-light {
        @apply bg-white;
      }

      &.is-dark {
        background: linear-gradient(119.59deg, rgba(127, 134, 255, 0.71) 22.04%, rgba(45, 59, 80, 0.56) 94.24%);
      }
    }
  }
}
</style>
