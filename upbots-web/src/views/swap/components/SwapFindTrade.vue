<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+" class="flex flex-col flex-grow w-full lg:w-7/10">
    <AppCard class="flex flex-col flex-grow relative p-20 3xl:p-30">
      <!-- LOADER -->
      <AppLoader v-if="pending" class="rounded-xlg" />

      <!-- CARD CONTENT -->
      <p class="label-text-color text-md 2xl:text-lg 4xl:text-3xl mb-12 4xl:mb-18">Find a trade</p>

      <div class="flex flex-col xl:flex-row justify-between gap-20 xl:gap-32 4xl:gap-40">
        <div class="flex flex-col md:flex-row items-start flex-grow gap-20 md:gap-10 xl:gap-32 4xl:gap-40">
          <!-- BUY -->
          <div class="selection-containers flex flex-col">
            <div class="flex flex-col w-full">
              <p class="label-text-color text-base 4xl:text-lg mb-6 4xl:mb-8">Buy</p>
              <AppSelect
                v-model="form.selectedBuyCurrency"
                :options="coins"
                item-key="id"
                :size="is4XL ? 'md' : 'lg'"
                class="mb-20 4xl:mb-40"
              >
                <template #selection="{ value }">
                  <div class="flex items-center space-x-8">
                    <AppCryptoCoinChecker
                      :icon-name="value.label"
                      :icon-size="1.2"
                      :img-size="18"
                    />
                    <p>{{ value.label }}</p>
                  </div>
                </template>
                <template #options="{ item }">
                  <div class="flex items-center space-x-8">
                    <AppCryptoCoinChecker
                      :icon-name="item.label"
                      :icon-size="1.2"
                      :img-size="18"
                    />
                    <p>{{ item.label }}</p>
                  </div>
                </template>
              </AppSelect>
            </div>

            <div class="flex flex-col w-full">
              <p class="label-text-color text-base 4xl:text-lg mb-6 4xl:mb-8">
                Amount to buy ({{ form.selectedBuyCurrency.label }})
              </p>

              <AppInput v-model="form.amount" :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'" />
            </div>
          </div>

          <!-- SWAP -->
          <div
            class="
              flex
              justify-center
              items-center
              self-center
              md:self-auto
              flex-shrink-0
              h-34
              w-34
              4xl:w-50
              4xl:h-50
              mt-28
              4xl:mt-34
              rounded-full
              cursor-pointer
            "
          >
            <AppIcon
              name="swap"
              :size="is4XL ? '22' : '25'"
              class="text-bluster-blue dark:text-blair"
              @click="swapBuyWith()"
            />
          </div>

          <!-- WITH -->
          <div class="selection-containers flex flex-col">
            <p class="label-text-color text-base 4xl:text-lg mb-6 4xl:mb-8">With</p>
            <AppSelect
              v-model="form.selectedWithCurrency"
              :options="coins"
              item-key="id"
              :size="is4XL ? 'md' : 'lg'"
              class="mb-20 4xl:mb-40"
            >
              <template #selection="{ value }">
                <div class="flex items-center space-x-8">
                  <AppCryptoCoinChecker
                    :icon-name="value.label"
                    :icon-size="1.2"
                    :img-size="18"
                  />
                  <p>{{ value.label }}</p>
                </div>
              </template>
              <template #options="{ item }">
                <div class="flex items-center space-x-8">
                  <AppCryptoCoinChecker
                    :icon-name="item.label"
                    :icon-size="1.2"
                    :img-size="18"
                  />
                  <p>{{ item.label }}</p>
                </div>
              </template>
            </AppSelect>

            <div class="flex flex-col">
              <p class="label-text-color text-base 4xl:text-lg mb-6 4xl:mb-8">Slippage</p>
              <AppSlider v-model="form.rangeValue" min="0" max="5" step="0.1" />
            </div>
          </div>

          <!-- SEARCH -->
          <div class="mt-30 4xl:mt-40">
            <AppButton
              :size="is4XL ? 'sm' : 'lg'"
              class="4xl:w-300"
              @click="handleSubmit()"
            >
              {{ pending ? "Searching..." : "Search" }}
            </AppButton>
          </div>
        </div>
      </div>
    </AppCard>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex flex-col">
    <AppCard class="flex flex-col flex-grow relative px-24 py-28">
      <!-- LOADER -->
      <AppLoader v-if="pending" />

      <!-- CARD CONTENT -->
      <div class="flex flex-col">
        <!-- CARD LABEL -->
        <h2 class="label-text-color text-md font-medium text-center mb-32">Find a trade</h2>

        <!-- FILTERS -->
        <SwapFilters class="mb-24" />

        <!-- BUY SELECT -->
        <div class="flex flex-col w-full">
          <p class="label-text-color text-base font-medium mb-8">Buy</p>
          <AppSelect v-model="form.selectedBuyCurrency" :options="coins" itemKey="id" class="mb-20">
            <!-- BUY PREVIEW -->
            <template #selection="{ value }">
              <div class="flex items-center space-x-8">
                <AppCryptoCoinChecker
                  :icon-name="value.label"
                  :icon-size="1.2"
                  :img-size="18"
                />
                <p>{{ value.label }}</p>
              </div>
            </template>

            <!-- BUY OPTIONS -->
            <template #options="{ item }">
              <div class="flex items-center space-x-8">
                <AppCryptoCoinChecker
                  :icon-name="item.label"
                  :icon-size="1.2"
                  :img-size="18"
                />
                <p>{{ item.label }}</p>
              </div>
            </template>
          </AppSelect>
        </div>

        <!-- SWAP -->
        <div
          class="
            flex
            justify-center
            items-center
            self-center
            flex-shrink-0
            w-20
            h-20
            rounded-full
            transform
            rotate-90
            cursor-pointer
          "
        >
          <AppIcon name="swap" class="text-bluster-blue dark:text-blair" size="20" @click="swapBuyWith()" />
        </div>

        <!-- WITH SELECT -->
        <div class="flex flex-col w-full">
          <p class="label-text-color mb-8">With</p>
          <AppSelect v-model="form.selectedWithCurrency" :options="coins" itemKey="id" class="mb-20">
            <!-- WITH PREVIEW -->
            <template #selection="{ value }">
              <div class="flex items-center space-x-8">
                <AppCryptoCoinChecker
                  :icon-name="value.label"
                  :icon-size="1.2"
                  :img-size="18"
                />
                <p>{{ value.label }}</p>
              </div>
            </template>

            <!-- WITH OPTIONS -->
            <template #options="{ item }">
              <div class="flex items-center space-x-8">
                <AppCryptoCoinChecker
                  :icon-name="item.label"
                  :icon-size="1.2"
                  :img-size="18"
                />
                <p>{{ item.label }}</p>
              </div>
            </template>
          </AppSelect>
        </div>

        <!-- AMOUNT TO BUY -->
        <div class="flex flex-col w-full">
          <p class="label-text-color mb-8">Amount to buy ({{ form.selectedBuyCurrency.label }})</p>
          <AppInput v-model="form.amount" class="mb-14" size="xlg" />
        </div>

        <!-- SLIPPAGE -->
        <div class="flex flex-col w-full">
          <p class="label-text-color mb-8">Slippage</p>
          <AppSlider v-model="form.rangeValue" class="w-full" />
        </div>

        <!-- SEARCH -->
        <div class="mt-40">
          <AppButton class="w-full" size="xlg" @click="handleSubmitMobile()">
            {{ pending ? "Searching..." : "Search" }}
          </AppButton>
        </div>
      </div>
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'

import { coinsList } from '@/views/swap/swap.data'

import { useSwap } from '@/views/swap/swap.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import SwapFilters from '@/views/swap/components/SwapFilters.vue'

export default defineComponent({
  name: 'SwapFindTrade',

  components: { SwapFilters },

  emits: ['handleOpenResult'],

  setup (_, { emit }) {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is6XL } = useCustomBreakpoints()

    /* USE SWAP SETUP */
    const { fetchTableData, providerSdk, pending } = useSwap()

    const coins = coinsList

    const form = reactive({
      selectedOperationType: 'buy',
      selectedBuyCurrency: { id: 'DAI', label: 'DAI' },
      selectedWithCurrency: { id: 'ETH', label: 'ETH' },
      amount: '1',
      rangeValue: [0.3]
    })

    function swapBuyWith (): void {
      const tmp = form.selectedBuyCurrency
      form.selectedBuyCurrency = form.selectedWithCurrency
      form.selectedWithCurrency = tmp
    }

    async function handleSubmit (): Promise<void> {
      const amount = parseFloat(form.amount)
      await fetchTableData({
        to: form.selectedBuyCurrency.id,
        from: form.selectedWithCurrency.id,
        toAmount: amount,
        limitAmount: form.rangeValue[0],
        dex: 'all'
      })
    }

    async function handleSubmitMobile (): Promise<void> {
      try {
        await handleSubmit()
      } finally {
        emit('handleOpenResult')
      }
    }

    watch(providerSdk, (val) => {
      if (val) handleSubmit()
    }, { immediate: true })

    return {
      is4XL,
      is6XL,
      coins,
      handleSubmit,
      form,
      swapBuyWith,
      pending,
      handleSubmitMobile
    }
  }
})
</script>

<style lang="scss" scoped>
.label-text-color {
  @apply text-nile-blue dark:text-blair;
}

.selection-containers {
  @apply w-full;

  @media(max-width: 2499px) {
    min-width: 250px;
    max-width: 300px;
  }

  @media(max-width: 1279px) {
    min-width: 180px;
  }

  @media(max-width: 768px) {
    width: 100%;
  }

  @media(min-width: 2500px) {
    width: 30%;
  }
}
</style>
