<template>
  <AppCard
    class="flex flex-col items-start relative w-full gap-y-10 4xl:gap-y-20 p-20 md:pb-20 md:px-20 z-2"
    :rounded="isMD ? 'rounded-t-xlg' : 'rounded-xlg'"
  >
    <!-- CLOSE MOBILE ORDER VIEW -->
    <AppIcon
      v-if="isMD"
      name="cross-medium"
      size="16"
      class="modal__close absolute right-8 top-8 text-blue-heeler dark:text-bel-air-blue p-10 cursor-pointer"
      @click="$emit('on-close')"
    />

    <!-- LOADER -->
    <AppLoader v-if="orderLoading" class="rounded-xlg" />

    <!-- CONTENT -->
    <div class="grid grid-cols-2 items-center gap-x-32 w-full">
      <!-- OPERATION TYPE -->
      <h3
        class="
          flex
          flex-shrink-0
          text-beguiling-blue
          dark:text-blair
          font-semibold
          4xl:font-normal
          4xl:text-lg
          leading-1
          capitalize
        "
      >
        Sell
      </h3>

      <!-- AVAILABLE -->
      <div class="flex flex-col md:flex-row md:items-center justify-end">
        <span class="text-beguiling-blue dark:text-fly-a-kite text-sm mr-4">Available:</span>
        <span class="text-beguiling-blue dark:text-frostbite-second text-sm font-medium">
          {{ available.toFixed(availableOptions.precision) }} {{ availableSymbol }}
        </span>
      </div>
    </div>

    <!-- ORDER TYPE -->
    <div class="grid grid-cols-2 items-center gap-x-32 w-full">
      <p class="text-beguiling-blue dark:text-fly-a-kite">Order type</p>
      <AppSelect
        v-model="orderType"
        :options="orderTypeOptions"
        size="md"
        :disabled="!availableAccounts.length"
      />
    </div>

    <!-- LIMIT PRICE -->
    <template v-if="orderType.value === 'limit'">
      <div class="grid grid-cols-2 items-center gap-x-32 w-full">
        <p class="text-beguiling-blue dark:text-fly-a-kite">Limit Price Order</p>
        <AppInputNumber
          v-model="price"
          class="w-full"
          size="lg"
          :step="{ value: priceOptions.step }"
          :disabled="!availableAccounts.length"
          @change="onChangedPrice"
        />
      </div>
    </template>

    <!-- QUANTITY -->
    <div class="grid grid-cols-2 items-center gap-x-32 w-full">
      <p class="text-beguiling-blue dark:text-fly-a-kite">Quantity</p>
      <div class="flex flex-col w-full">
        <AppInputNumber
          v-model="quantity"
          class="w-full"
          size="lg"
          :max="quantityOptions.max"
          :step="{ value: quantityOptions.step }"
          :disabled="!availableAccounts.length"
          @change="onChangeQuantity"
        />
      </div>
    </div>

    <!-- RANGE -->
    <AppSlider
      v-model="range"
      min="0"
      max="100"
      class="w-full"
      :disabled="!availableAccounts.length"
      @changed="calcOrderQuantity"
    />

    <!-- TOTAL -->
    <div class="flex items-center space-x-5 text-beguiling-blue dark:text-fly-a-kite w-full">
      <span>Total:</span>
      <span class="font-semibold">{{ total.toFixed(totalOptions.precision) }}</span>
    </div>

    <template v-if="availableAccounts.length">
      <!-- VALID EXCHANGE KEY -->
      <AppButton
        v-if="defaultAccount.valid"
        type="red-gradient"
        rounded="xlg"
        size="xlg"
        class="w-full mt-auto capitalize"
        :disabled="getValidationInputs"
        @click="onOpenOrderModal()"
      >
        {{ `Sell ${defaultPair?.baseCurrency ? defaultPair.baseCurrency : ''}` }}
      </AppButton>

      <!-- INVALID EXCHANGE KEY -->
      <AppButton v-else class="w-full" size="xlg" disabled>API key is not valid</AppButton>
    </template>

    <!-- NO ACCOUNTS -->
    <template v-else>
      <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
        <AppButton size="xlg" class="w-full mt-auto" @click="navigate()">
          Connect an account
        </AppButton>
      </router-link>
    </template>

    <!-- CREATE ORDER MODAL -->
    <AppModal v-model="createOrderModal" modal-width="600">
      <div class="w-full text-beguiling-blue dark:text-fly-a-kite">
        <!-- ORDER TITLE -->
        <div class="flex flex-col text-center text-xl">
          My Order - {{ orderData.side }} {{ orderData.type }}
        </div>

        <!-- ORDER DATA -->
        <div class="flex flex-col pt-30 pb-30 px-60">
          <!-- ACCOUNT -->
          <div class="grid grid-cols-2 col-gap-10 mb-16">
            <span class="text-grey-cl-920 text-left">Account:</span>
            <span class="text-left">{{ orderData.accountName }}</span>
          </div>

          <!-- PAIR -->
          <div class="grid grid-cols-2 col-gap-10 mb-16">
            <span class="text-grey-cl-920 text-left">Pair:</span>
            <span class="text-left">{{ orderData.symbol }}</span>
          </div>

          <!-- PRICE -->
          <div class="grid grid-cols-2 col-gap-10 mb-16">
            <span class="text-grey-cl-920 text-left">Price:</span>
            <span class="text-left">{{ orderData.price }}</span>
          </div>

          <!-- AMOUNT -->
          <div
            v-if="orderData && orderData.type.toUpperCase() === 'LIMIT'"
            class="grid grid-cols-2 col-gap-10 mb-16"
          >
            <span class="text-grey-cl-920 text-left">Amount:</span>
            <span class="text-left">{{ orderData.quantity }}</span>
          </div>

          <!-- TOTAL -->
          <div class="grid grid-cols-2 col-gap-10">
            <span class="text-grey-cl-920 text-left">Total:</span>
            <span class="text-left">{{ orderData.totalValue }}</span>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex space-x-20">
          <!-- CANCEL -->
          <AppButton type="primary-border" class="w-full mt-auto" @click="setShowOrderModal(false)">
            Cancel
          </AppButton>

          <!-- CREATE -->
          <AppButton class="w-full mt-auto" @click="onCreateOrder()">Create</AppButton>
        </div>
      </div>
    </AppModal>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

import { routeNames } from '@/router'

import { useSellOrder } from './order-sell.composition.setup'
import { useTrade } from '@/views/trade/trade-composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'OrderCardSell',

  emits: ['on-close'],

  setup () {
    const { isMD } = useCustomBreakpoints()
    const { orderLoading } = useTrade()
    const { defaultPair, defaultAccount, availableAccounts } = useGlobal()
    const {
      orderType,
      orderTypeOptions,
      price,
      priceOptions,
      quantity,
      quantityOptions,
      range,
      total,
      totalOptions,
      available,
      availableOptions,
      availableSymbol,
      createOrderModal,
      orderData,
      getValidationInputs,
      setOrderPrice,
      setOrderSymbol,
      setTradingAmount,
      calcOrderQuantity,
      calcRange,
      setOrderRange,
      fetchTradeFormats,
      setShowOrderModal,
      onOpenOrderModal,
      onCreateOrder,
      setQuantity,
      calcTotal,
      setQuantityValue,
      setRange
    } = useSellOrder()

    function onChangedPrice (payload: number): void {
      if (payload <= 0) {
        setQuantityValue(0)
        setOrderRange(0)
      }
    }

    function onChangeQuantity (val: number): void {
      if (price.value === 0) {
        setQuantityValue(0)
      }

      if (val > quantityOptions.value.max) {
        setRange(100)
        setQuantityValue(quantityOptions.value.max)
        calcTotal()
      } else {
        calcRange()
      }
    }

    async function initData (): Promise<void> {
      setOrderSymbol()
      setTradingAmount()
      setRange(100)
      setOrderPrice()
      setQuantity()
      calcTotal()
      fetchTradeFormats()
    }

    watch(orderLoading, (oldVal: boolean, newVal: boolean) => {
      if (availableAccounts.value.length) {
        newVal && initData()
      }
    })

    return {
      routeNames,
      isMD,
      orderLoading,
      availableAccounts,
      defaultAccount,
      defaultPair,
      price,
      range,
      orderType,
      orderTypeOptions,
      availableSymbol,
      quantity,
      available,
      total,
      quantityOptions,
      priceOptions,
      totalOptions,
      availableOptions,
      createOrderModal,
      orderData,
      getValidationInputs,
      onChangeQuantity,
      calcOrderQuantity,
      onChangedPrice,
      fetchTradeFormats,
      onCreateOrder,
      setShowOrderModal,
      onOpenOrderModal
    }
  }
})
</script>
