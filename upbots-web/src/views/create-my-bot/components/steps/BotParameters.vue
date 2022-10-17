<template>
  <AppCard class="flex flex-col p-10 relative">
    <AppExpand
      v-model="expandValue"
      preview-classes="items-center"
      content-classes="flex flex-col"
      :expand-icon-name="expandValue ? 'minus' : 'plus'"
      expand-icon-size="20"
      transition-type="secondary"
      class="relative"
    >
      <!-- EXPAND PREVIEW -->
      <template #preview>
        <div class="w-full">
          <div class="flex items-center">
            <AppIcon
              name="parameters"
              size="28"
              class="text-namara-grey dark:text-white -ml-4"
            />

            <span class="text-namara-grey dark:text-white font-medium text-md leading-1 ml-6">
              Bot Parameters
            </span>
          </div>
        </div>
      </template>

      <!-- EXPAND CONTENT -->
      <template #content>
        <div class="bot-parameters__grid grid grid-cols-1 gap-y-20 xl:gap-y-0 xl:gap-x-30">
          <!-- BOT NAME -->
          <div class="flex flex-col">
            <AppInput
              v-model="myBotName"
              name="bot-name"
              label="Bot Name"
              size="xlg"
              placeholder="Enter bot name"
              :disabled="!myBotAvailableAccounts.length"
              label-classes="
                inline-block
                text-heavy-metal-armor
                dark:text-blair
                font-medium
                mb-10
                cursor-pointer
              "
              inner-classes="w-full"
              class="items-start"
            />
          </div>

          <!-- ACCOUNT -->
          <div class="flex flex-col">
            <p class="text-heavy-metal-armor dark:text-blair font-medium mb-10">Account</p>
            <AppSelect
              v-model="myBotAccount"
              :options="myBotAvailableAccounts"
              :disabled="myBotGlobalLoading || !myBotAvailableAccounts.length || !Object.keys(myBotPair).length"
              item-label="name"
              item-key="id"
              @change="onChangeAccount"
            >
              <template #selection="{ value, hasInitialValue }">
                <template v-if="hasInitialValue">
                  <div class="flex items-center">
                    <img
                      :src="`/img/cryptocoins/${value.exchange}.svg`"
                      :alt="value.value"
                      class="w-16 h-16 mr-5"
                    >
                    <p>{{ value.name }}</p>
                  </div>
                </template>

                <template v-else>No accounts detected</template>
              </template>

              <template #options="{ item }">
                <div class="flex items-center">
                  <img
                    :src="`/img/cryptocoins/${item.exchange}.svg`"
                    :alt="item.value"
                    class="w-16 h-16 mr-5"
                  >
                  <p>{{ item.name }}</p>
                </div>
              </template>
            </AppSelect>
          </div>

          <!-- PAIR -->
          <div class="flex flex-col">
            <p class="text-heavy-metal-armor dark:text-blair font-medium mb-10">Pair</p>
            <div class="flex flex-col md:flex-row md:items-center w-full md:w-auto md:h-40">
              <MyBotPair
                ref="filterPair"
                :show-last-price="false"
                :show-change="false"
                :display-label="false"
                @on-change="onChangePair"
              />
            </div>
          </div>

          <!-- STRATEGY -->
          <div class="flex flex-col">
            <p class="text-heavy-metal-armor dark:text-blair font-medium mb-10">Strategy</p>

            <AppButtonsGroup
              v-model="myBotStrategy"
              :options="strategyOptions"
              :disabled="myBotGlobalLoading"
              :disabled-options="getDisabledStrategyOptions"
              size="lg2"
              width="100%"
            />
          </div>
        </div>
      </template>
    </AppExpand>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

import { useCreateMyBot } from '../../create-my-bot.setup'

import MyBotPair from './pair-bar/MyBotPair.vue'

export default defineComponent({
  name: 'BotParameters',

  components: { MyBotPair },

  setup () {
    const {
      myBotAccount,
      myBotPair,
      myBotAvailableAccounts,
      myBotGlobalLoading,
      myBotName,
      myBotStrategy,
      strategyOptions,
      getDisabledStrategyOptions,
      setPairQuoteCurrency,
      setBaseAvailable,
      setMyBotGlobalLoading,
      onChangeAccount,
      fetchQuotePrice,
      fetchTradingBalance
    } = useCreateMyBot()

    /* STATE */
    const state = reactive({
      expandValue: true as boolean
    })

    async function onChangePair (): Promise<void> {
      setMyBotGlobalLoading(true)
      try {
        setPairQuoteCurrency()
        await Promise.all([fetchQuotePrice(), fetchTradingBalance()])
        setBaseAvailable()
      } finally {
        setMyBotGlobalLoading(false)
      }
    }

    return {
      ...toRefs(state),
      myBotGlobalLoading,
      myBotName,
      myBotPair,
      myBotAccount,
      myBotAvailableAccounts,
      myBotStrategy,
      strategyOptions,
      getDisabledStrategyOptions,
      onChangeAccount,
      onChangePair
    }
  }
})
</script>

<style lang="scss" scoped>
.bot-parameters {
  @media(min-width: 1280px) {
    &__grid {
      grid-template-columns: 1fr 1fr 1fr 1.8fr;
    }
  }
}
</style>
