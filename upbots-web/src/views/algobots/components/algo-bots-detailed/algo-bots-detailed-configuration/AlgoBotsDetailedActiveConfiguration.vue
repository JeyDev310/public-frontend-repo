<template>
  <AppCard class="algobot-detailed-config relative flex flex-shrink-0 w-full md:p-14 lg:p-20">
    <!-- DESKTOP VIEW -->
    <mq-layout
      mq="lg+"
      class="algobot-detailed-config__grid flex flex-col 2xl:grid 2xl:gap-x-20 space-y-14 2xl:space-y-0 w-full"
    >
      <!-- COL 1 -->
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
        <!-- TOTAL GAIN -->
        <p class="text-nile-blue dark:text-soaring-eagle font-medium 4xl:text-md mb-14">
          Total Gain
        </p>
        <div class="flex items-center">
          <AppFormatNumber
            :data="getTotalGain"
            :to-fixed="2"
            :is-math-symbols="false"
            text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
            class="text-bluster-blue dark:text-cloudless"
          />
          <p class="text-bluster-blue dark:text-cloudless text-2xl 4xl:text-4xl font-semibold leading-1 ml-4">
            {{ subscriptionBot?.quote ? subscriptionBot.quote : 'USDT' }}
          </p>
        </div>
      </div>

      <!-- COL 2 -->
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
          <!-- AUTO REFILL TITLE -->
          <div class="flex items-start justify-center mb-14">
            <div class="flex flex-col text-nile-blue dark:text-soaring-eagle 4xl:text-md font-medium">
              {{ perfeesBotWallet.autoRefill ? 'UBXT Balance' : 'UBXT Allocation Balance' }}
            </div>
          </div>

          <div class="flex items-center">
            <!-- UBXT ICON -->
            <div class="w-24 4xl:w-30 h-24 4xl:h-30 rounded-full mr-20 overflow-hidden">
              <img src="/img/cryptocoins/ubxt.svg" alt="ubxt" class="w-full h-full object-cover">
            </div>

            <!-- UBXT BALANCE -->
            <div class="flex flex-col mr-10 xl:mr-28">
              <template v-if="baseAvailableLoading">
                <AppTextLoader
                  text=""
                  class="text-tradewind dark:text-white text-md2 4xl:text-lg font-medium"
                />
              </template>
              <template v-else>
                <AppFormatNumber
                  :data="getUBXTBalance"
                  :to-fixed="2"
                  :is-math-symbols="false"
                  text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
                  :not-available-classes="
                    !perfeesBotWallet.autoRefill
                      ? !isTradableAmount
                        ? 'text-alexandria'
                        : 'text-nile-blue dark:text-tradewind'
                      : 'text-nile-blue dark:text-tradewind'"
                  :class="
                    !perfeesBotWallet.autoRefill
                      ? !isTradableAmount
                        ? 'text-alexandria'
                        : 'text-nile-blue dark:text-tradewind'
                      : 'text-nile-blue dark:text-tradewind'
                  "
                />
              </template>
            </div>

            <!-- ADD TOKEN -->
            <template v-if="perfeesBotWallet.autoRefill">
              <AppButton
                size="xs"
                type="grey-outlined"
                @click="isModalTopUpOpen = true"
              >
                Add Token
              </AppButton>
            </template>

            <!-- TRANSFER UBXT -->
            <template v-else>
              <div class="flex items-center space-x-12">
                <AppButton
                  type="primary-border-filled"
                  size="xs"
                  class="flex items-center justify-center"
                  :disabled="!isMinButtonEnable || baseAvailableLoading"
                  @click="showTransferModal('minus')"
                >
                  <AppIcon name="minus" size="14" />
                </AppButton>

                <AppButton
                  :disabled="baseAvailableLoading"
                  size="xs"
                  class="flex items-center justify-center"
                  @click="showTransferModal('plus')"
                >
                  <AppIcon name="plus" size="15" />
                </AppButton>
              </div>
            </template>
          </div>

          <!-- AUTOMATIC REFILL -->
          <div class="flex mt-14">
            <AppTooltip
              placement="top"
              content="I agree that the UBXT of my main balance will be automatically used
              in case of insufficient funds on my active bots"
            >
              <AppCheckbox
                v-model="perfeesBotWallet.autoRefill"
                type="secondary"
                @input="onAutoRefill()"
              >
                <span>Automatic Refill</span>
              </AppCheckbox>
            </AppTooltip>
          </div>
        </div>
      </div>

      <!-- COL 3 -->
      <div
        class="
          algobot-detailed-config__item-3
          flex
          flex-grow
          flex-col
          items-center
          xl:py-14
        "
      >
        <!-- VIRTUAL CREDIT -->
        <div class="flex items-start mb-14">
          <span class="text-nile-blue dark:text-soaring-eagle 4xl:text-md font-medium">
            Virtual Credit
          </span>
        </div>

        <AppFormatNumber
          :data="perfeesBotWallet.creditAmount"
          :to-fixed="2"
          :is-math-symbols="false"
          text-size="text-2xl 4xl:text-4xl font-semibold leading-1"
          :class="perfeesBotWallet.creditAmount ? 'text-spring-bouquet' : 'text-bluster-blue dark:text-cloudless'"
        />
      </div>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col w-full space-y-40">
      <!-- COL 1 -->
      <AppCard
        class="
          algobot-detailed-config__mobile-item-1
          flex
          flex-col
          items-center
          justify-center
          relative
          w-full
          p-10
        "
        :class="getModeName"
      >
        <p class="text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-8">Total Gain</p>
        <div class="flex items-center">
          <AppFormatNumber
            :data="getTotalGain"
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

      <!-- COL 2 & COL 3 -->
      <div class="flex flex-col w-full space-y-10">
        <!-- COL 2 -->
        <AppCard
          class="
            algobot-detailed-config__mobile-item-2
            flex
            flex-col
            items-center
            justify-center
            relative
            w-full
            p-10
          "
        >
          <!-- AUTO REFILL TITLE -->
          <p class="flex text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-10">
            {{ perfeesBotWallet.autoRefill ? 'UBXT Balance' : 'UBXT Allocation Balance' }}
          </p>

          <div class="flex items-center">
            <!-- UBXT ICON -->
            <div class="w-20 h-20 rounded-full mr-10 overflow-hidden">
              <img src="/img/cryptocoins/ubxt.svg" alt="ubxt" class="w-full h-full object-cover">
            </div>

            <!-- UBXT BALANCE -->
            <div class="flex flex-col">
              <template v-if="baseAvailableLoading">
                <AppTextLoader
                  text=""
                  class="text-tradewind dark:text-white text-md2 4xl:text-lg font-medium"
                />
              </template>
              <template v-else>
                <AppFormatNumber
                  :data="getUBXTBalance"
                  :to-fixed="2"
                  :is-math-symbols="false"
                  text-size="text-md font-semibold leading-1"
                  :not-available-classes="
                    !perfeesBotWallet.autoRefill
                      ? !isTradableAmount
                        ? 'text-alexandria'
                        : 'text-nile-blue dark:text-tradewind'
                      : 'text-nile-blue dark:text-tradewind'"
                  :class="
                    !perfeesBotWallet.autoRefill
                      ? !isTradableAmount
                        ? 'text-alexandria'
                        : 'text-nile-blue dark:text-tradewind'
                      : 'text-nile-blue dark:text-tradewind'
                  "
                />
              </template>
            </div>

            <!-- ADD TOKEN -->
            <template v-if="perfeesBotWallet.autoRefill">
              <AppButton
                size="xs"
                type="grey-outlined"
                class="ml-10"
                @click="isModalTopUpOpen = true"
              >
                Add Token
              </AppButton>
            </template>
          </div>

          <!-- AUTOMATIC REFILL -->
          <div class="flex self-end mt-10">
            <AppTooltip
              placement="top"
              content="I agree that the UBXT of my main balance will be automatically used
                in case of insufficient funds on my active bots"
            >
              <AppCheckbox
                v-model="perfeesBotWallet.autoRefill"
                type="secondary"
                @input="onAutoRefill()"
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

        <!-- COL 3 -->
        <AppCard
          class="
            algobot-detailed-config__mobile-item-3
            flex
            flex-col
            items-center
            justify-center
            relative
            w-full
            p-10
          "
        >
          <p class="flex text-nile-blue dark:text-soaring-eagle text-sm font-medium mb-10">
            Virtual Credit
          </p>

          <AppFormatNumber
            :data="perfeesBotWallet.creditAmount"
            :to-fixed="2"
            :is-math-symbols="false"
            text-size="text-md font-semibold leading-1"
            :class="perfeesBotWallet.creditAmount ? 'text-spring-bouquet' : 'text-bluster-blue dark:text-cloudless'"
          />
        </AppCard>
      </div>

      <!-- TRANSFER UBXT -->
      <template v-if="!perfeesBotWallet.autoRefill">
        <div class="flex items-center space-x-12">
          <AppButton
            type="red-gradient"
            size="lg"
            class="flex items-center justify-center w-full"
            :disabled="!isMinButtonEnable"
            @click="showTransferModal('minus')"
          >
            <AppIcon name="minus" size="25" />
          </AppButton>

          <AppButton
            type="green-gradient"
            size="lg"
            class="flex items-center justify-center w-full"
            @click="showTransferModal('plus')"
          >
            <AppIcon name="plus" size="25" />
          </AppButton>
        </div>
      </template>
    </mq-layout>
  </AppCard>

  <!-- UBXT TRANSFER MODAL -->
  <AppModal v-model="isTransUbxtModalOpen">
    <div class="flex flex-col">
      <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-10">
        Transfer UBXT
      </h2>

      <div class="grid grid-cols-3 gap-x-20 mb-40">
        <div class="flex flex-col justify-center items-center text-seal-blue dark:text-white-lilac text-center">
          <div>From:</div>
          <div>{{ transferMode == "plus" ? "Main Balance" : bot.name }}</div>
        </div>

        <div class="flex items-center justify-center">
          <AppIcon name="swap" size="24" class="text-nile-blue dark:text-tradewind" />
        </div>

        <div class="flex flex-col justify-center items-center text-seal-blue dark:text-white-lilac text-center">
          <div>To:</div>
          <div>{{ transferMode == "minus" ? "Main Balance" : bot.name }}</div>
        </div>
      </div>

      <div class="flex flex-col w-full mb-40">
        <div class="flex items-center">
          <span class="text-seal-blue dark:text-white-lilac">Available UBXT Amount:</span>
          <span class="text-nile-blue dark:text-tradewind ml-4">
            {{ getTransableMaxAmount.toFixed(4) }} UBXT
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
        <AppButton
          :disabled="isTransferBtnAvailable"
          size="xlg"
          @click="onTransferUBXT()"
        >
          Transfer
        </AppButton>
      </div>
    </div>
  </AppModal>

  <!-- TOT UP MODAL -->
  <AppModal v-model="isModalTopUpOpen" modal-width="700">
    <UBXTTopUpModal />
  </AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'

import { algoBotsService } from '@/services'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useAlgoBotsDetailed } from '../algo-bots-detailed.composition.setup'
import { usePerfees } from '@/global-setup/perfees.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

import UBXTTopUpModal from '@/views/ubxt-wallet/components/ubxt-balance/UBXTTopUpModal.vue'

export default defineComponent({
  name: 'AlgoBotsDetailedActiveConfiguration',

  components: { UBXTTopUpModal },

  setup () {
    const { getModeName } = useGlobal()
    const {
      perfeesUserWallet,
      perfeesBotWallet,
      fetchPerfeesBotWalletById,
      fetchPerfeesWallet
    } = usePerfees()
    const {
      bot,
      subscriptionBot,
      botPerfSubscriptionCycles,
      isTradableAmount,
      getMiniumUbxtToDeposit,
      baseAvailableLoading,
      fetchCryptoPriceCoinGecko
    } = useAlgoBotsDetailed()

    const state = reactive({
      isModalTopUpOpen: false as boolean,
      transferMode: '' as string,
      isTransUbxtModalOpen: false as boolean,
      ubxtAmountToTrans: 0 as number
    })

    const getTotalGain = computed((): number => {
      return botPerfSubscriptionCycles.value.reduce((acc, cur) => acc + (cur.realisedGain?.usd || 0), 0)
    })

    const getAllocationBalance = computed((): number => {
      return perfeesBotWallet.value.amount - perfeesBotWallet.value.debtAmount
    })

    const getUBXTBalance = computed((): number => {
      const amount = perfeesUserWallet.value.amount
      const allocatedAmount = perfeesUserWallet.value.allocatedAmount

      return perfeesBotWallet.value.autoRefill ? (amount - allocatedAmount) : (getAllocationBalance.value)
    })

    const isMinButtonEnable = computed((): boolean => isTradableAmount.value && !subscriptionBot.value.botRunning)

    const getTransableMaxAmount = computed((): number => {
      if (state.transferMode === 'plus') return perfeesUserWallet.value.availableAmount
      return perfeesBotWallet.value.amount - getMiniumUbxtToDeposit.value
    })

    const isTransferBtnAvailable = computed((): boolean => state.ubxtAmountToTrans > (getTransableMaxAmount.value || 0))

    function showTransferModal (mode: string): void {
      state.transferMode = mode
      state.isTransUbxtModalOpen = true
    }

    async function onAutoRefill (): Promise<void> {
      try {
        await algoBotsService.botWalletAutoRefill({
          botId: bot.value.id,
          autoRefill: perfeesBotWallet.value.autoRefill
        })

        await algoBotsService.botWalletTransfer({ botId: bot.value.id, amount: 0, transType: 'WITHDRAW' })

        await Promise.all([
          fetchPerfeesWallet(),
          fetchPerfeesBotWalletById(bot.value.id)
        ])
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    async function onTransferUBXT (): Promise<void> {
      let amount = 0

      if (state.transferMode === 'plus') {
        amount = perfeesBotWallet.value.amount + state.ubxtAmountToTrans
      } else {
        amount = perfeesBotWallet.value.amount - state.ubxtAmountToTrans
      }

      try {
        await algoBotsService.botWalletTransfer({ botId: bot.value.id, amount })
        await Promise.all([
          fetchPerfeesWallet(),
          fetchPerfeesBotWalletById(bot.value.id)
        ])
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        state.ubxtAmountToTrans = 0
        state.isTransUbxtModalOpen = false
      }
    }

    function initData (): void {
      fetchPerfeesWallet()
      fetchPerfeesBotWalletById(bot.value.id)
      fetchCryptoPriceCoinGecko()
    }

    onMounted(() => { initData() })

    return {
      ...toRefs(state),
      getModeName,
      bot,
      subscriptionBot,
      perfeesBotWallet,
      baseAvailableLoading,
      getTotalGain,
      getUBXTBalance,
      isTradableAmount,
      isMinButtonEnable,
      getTransableMaxAmount,
      isTransferBtnAvailable,
      onTransferUBXT,
      onAutoRefill,
      showTransferModal
    }
  }
})
</script>

<style lang="scss" scoped>
.algobot-detailed-config {
  @media(min-width: 1440px) {
    &__grid {
      grid-template-columns: 1fr 2fr 1fr;
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

    &__mobile-item-1 {
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
