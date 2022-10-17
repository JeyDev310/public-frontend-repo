<template>
  <AppCard class="relative flex flex-col w-full p-20 4xl:p-30">
    <!-- LOADER -->
    <AppLoader v-if="accountsLoading" class="rounded-xlg" />

    <!-- TITLE -->
    <p
      class="text-md 4xl:text-lg font-medium text-nile-blue dark:text-blair text-center md:text-left mb-20 4xl:mb-24"
    >
      Connect New Exchanges
    </p>

    <!-- FILTERS -->
    <div class="connect-new-exchanges__container flex flex-col space-y-20 4xl:space-y-24">
      <!-- SELECT EXCHANGES -->
      <div class="connect-new-exchanges__select-wrap">
        <p class="connect-new-exchanges__select-title">Select Exchange</p>

        <AppSelect v-model="exchangeModel" :options="exchangeList" :disabled="accountsLoading">
          <!-- SELECT PREVIEW -->
          <template #selection="{ value }">
            <div class="flex items-center space-x-5">
              <AppCryptoCoinChecker
                :icon-name="value.value"
                :icon-size="1.2"
                :img-size="18"
              />
              <AppTruncatedTooltip :content="value.label" />
            </div>
          </template>

          <!-- SELECT OPTIONS -->
          <template #options="{ item }">
            <div class="flex items-center space-x-5">
              <AppCryptoCoinChecker
                :icon-name="item.value"
                :icon-size="1.2"
                :img-size="18"
              />
              <AppTruncatedTooltip :content="item.label" />
            </div>
          </template>
        </AppSelect>
      </div>

      <!-- ACCOUNT TYPE -->
      <div v-if="exchangeModel.accountType" class="connect-new-exchanges__select-wrap">
        <p class="connect-new-exchanges__select-title">Account type</p>
        <AppSelect v-model="accountTypeModel" :options="accountTypes" :disabled="accountsLoading" />
      </div>
    </div>

    <!-- API KEYS INPUTS -->
    <div class="connect-new-exchanges__container flex flex-col w-full mt-28 4xl:mt-40">
      <p class="text-md font-medium text-nile-blue dark:text-blair text-left mb-20 4xl:mb-24">API Keys</p>

      <!-- VALIDATION FORM -->
      <Form :validation-schema="createKeySchema" @submit="onSubmitForm">
        <div class="flex flex-col space-y-20 4xl:space-y-24">
          <!-- API KEY LABEL -->
          <AppInput
            name="name"
            label="API Key label"
            placeholder="Enter API Key label"
            size="lg"
            :disabled="accountsLoading"
            label-classes="inline-block text-beguiling-blue dark:text-white 4xl:text-lg cursor-pointer"
            class="connect-new-exchanges__input"
          />

          <!-- PUBLIC KEY -->
          <AppInput
            name="publicKey"
            label="API Public key"
            type="password"
            placeholder="Enter Public Key"
            size="lg"
            show-last
            :disabled="accountsLoading"
            label-classes="inline-block text-beguiling-blue dark:text-white 4xl:text-lg cursor-pointer"
            class="connect-new-exchanges__input"
          />

          <!-- SECRET KEY -->
          <AppInput
            name="secretKey"
            label="API Secret key"
            type="password"
            placeholder="Enter Secret Key"
            size="lg"
            show-last
            :disabled="accountsLoading"
            label-classes="inline-block text-beguiling-blue dark:text-white 4xl:text-lg cursor-pointer"
            class="connect-new-exchanges__input"
          />

          <!-- SUBACCOUNT NAME -->
          <AppInput
            v-if="exchangeModel.accountType && accountTypeModel.value === 'sub'"
            name="subAccountName"
            label="Enter Sub Account name"
            placeholder="Sub Account"
            size="lg"
            :disabled="accountsLoading"
            label-classes="inline-block text-beguiling-blue dark:text-white 4xl:text-lg cursor-pointer"
            class="connect-new-exchanges__input"
          />

          <!-- PASSPHARASE -->
          <AppInput
            v-if="exchangeModel.passphrase"
            name="password"
            label="Enter Passphrase"
            placeholder="Passphrase"
            size="lg"
            :disabled="accountsLoading"
            label-classes="inline-block text-beguiling-blue dark:text-white 4xl:text-lg cursor-pointer"
            class="connect-new-exchanges__input"
          />
        </div>

        <!-- ACTION BTN -->
        <div class="connect-new-exchanges__action-btn">
          <div />
          <AppButton
            type="primary-border-filled"
            size="lg"
            :disabled="accountsLoading"
            class="w-full mt-28 4xl:mt-40"
          >
            Connect
          </AppButton>
        </div>
      </Form>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Form } from 'vee-validate'
import { createKeySchema } from '@/schemas'

import { keysService } from '@/services'
import { EErrorsMessage, TCreateKey } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'ConnectNewExchanges',

  components: { Form },

  emits: ['success'],

  setup () {
    const { accountsLoading, setAccountLoading, fetchAccounts } = useGlobal()

    const exchangeList = [
      { label: 'FTX', value: 'ftx', link: 'https://ftx.com/#a=Upbots', accountType: true },
      // { label: 'FTX-future', value: 'ftx-future', link: 'https://ftx.com/#a=Upbots', accountType: true },
      { label: 'Binance', value: 'binance', link: 'https://www.binance.com/en/register?ref=40365219' },
      { label: 'Binance US', value: 'binance-us', link: 'https://accounts.binance.us/en/register' },
      { label: 'Binance-future', value: 'binance-future', link: 'https://www.binance.com/en/register?ref=40365219' },
      { label: 'Huobi', value: 'huobi', link: 'https://www.huobi.com/en-us/topic/invited/?invite_code=ft4b6' },
      { label: 'BitMEX', value: 'bitmex', link: 'https://www.bitmex.com/register/l1uQdD' },
      { label: 'Kucoin', value: 'kucoin', link: 'https://www.kucoin.com/ucenter/signup?rcode=1ucK7sh', passphrase: true },
      { label: 'Kucoin-future', value: 'kucoin-future', link: 'https://futures.kucoin.com', passphrase: true },
      { label: 'Okex', value: 'okex', link: 'https://www.okex.com/join/3/2232856', passphrase: true },
      { label: 'Coinbase Pro', value: 'coinbasepro', link: 'https://pro.coinbase.com/', passphrase: true }
    ]

    const accountTypes = [
      { label: 'Main account', value: 'main' },
      { label: 'Sub account', value: 'sub' }
    ]

    const exchangeModel = ref(exchangeList[0])
    const accountTypeModel = ref(accountTypes[0])

    async function onSubmitForm (payload: TCreateKey, { resetForm }: any) {
      try {
        setAccountLoading(true)
        await keysService.add({ ...payload, exchange: exchangeModel.value.value })

        await fetchAccounts()
        resetForm()
        appNotify({ type: 'success', message: `${payload.name} has been successfully created!` })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        setAccountLoading(false)
      }
    }

    return {
      createKeySchema,
      accountTypes,
      accountTypeModel,
      exchangeModel,
      exchangeList,
      accountsLoading,
      onSubmitForm
    }
  }
})
</script>

<style lang="scss" scoped>
.connect-new-exchanges {
  &__select-title {
    @apply 4xl:text-lg text-beguiling-blue dark:text-white;
  }

  @media(min-width: 768px) {
    &__container {
      max-width: 80%;
    }
  }

  @media(min-width: 1280px) {
    &__input,
    &__action-btn,
    &__select-wrap {
      @apply grid items-center gap-x-20 2xl:gap-x-50;
      grid-template-columns: 200px 1fr;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1279px) {
    &__input,
    &__action-btn,
    &__select-wrap {
      @apply grid items-center gap-x-20;
      grid-template-columns: 200px 1fr;
    }
  }

  @media(max-width: 767px) {
    &__input,
    &__action-btn,
    &__select-wrap {
      @apply grid grid-rows-1 gap-y-16;
    }
  }
}
</style>
