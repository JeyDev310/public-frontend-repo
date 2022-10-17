<template>
  <AppCard class="flex flex-col p-10">
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
            <AppIcon name="entry" size="30" class="text-namara-grey dark:text-white -ml-4" />

            <span class="text-namara-grey dark:text-white font-medium text-md leading-1 capitalize ml-6">
              Bot Entry
            </span>
          </div>
        </div>
      </template>

      <!-- EXPAND CONTENT -->
      <template #content>
        <div class="bot-parameters__grid grid grid-cols-1 gap-y-20 xl:gap-y-0 xl:gap-x-30">
          <!-- ENTRY TRIGGER -->
          <div class="flex flex-col">
            <p class="text-heavy-metal-armor dark:text-blair font-medium mb-10">Entry trigger</p>
            <AppInput :model-value="trigger" readonly size="xlg" placeholder="Enter bot name" />
          </div>

          <!-- ORDER TYPE -->
          <!-- <div class="flex flex-col">
            <p class="text-heavy-metal-armor dark:text-blair font-medium mb-10">Order type</p>
            <AppButtonsGroup
              v-model="entry[type].orderType"
              :options="orderTypeOptions"
              size="lg2"
              width="100%"
            />
          </div> -->

          <!-- SIZE POSITION -->
          <div class="flex flex-col">
            <p class="text-heavy-metal-armor dark:text-blair font-medium mb-10">Size position</p>
            <p class="text-nile-blue dark:text-blair italic text-sm mb-14">
              {{ `% of your ${myBotPair?.quoteCurrency || ''} balance that the bot will trade` }}
            </p>
            <AppSlider
              v-model="myBotEntry[type].sizePosition"
              :disabled="myBotGlobalLoading || !myBotAvailableAccounts.length"
              @changed="onChangeInitialCap"
              @input="onChangeInitialCap"
            />

            <div class="flex items-center">
              <div class="text-nile-blue dark:text-blair text-base mr-10">Initial cap:</div>
              <div class="h-36
                  text-nile-blue
                  dark:text-let-it-snow
                  bg-white
                  dark:bg-passionate-blueberry
                  py-6
                  px-10
                  rounded-sm"
              >
                <AppTextLoader
                  v-if="myBotGlobalLoading"
                  text=""
                  class="text-beguiling-blue dark:text-cotton-ball-second"
                />
                <template v-else>
                  {{ myBotInitialCap }}
                  {{ myBotPairQuoteCurrency }}
                </template>
              </div>
            </div>
          </div>

          <!-- LEVERAGE -->
          <div v-if="myBotStrategy !== EStrategy.LONG" class="flex flex-col">
            <p class="text-heavy-metal-armor dark:text-blair font-medium mb-10">Leverage</p>

            <AppButtonsGroup
              v-model="myBotEntry[type].leverage"
              :options="leverageOptions"
              :disabled="!myBotAvailableAccounts.length || !Object.keys(myBotPair).length"
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
import { defineComponent, PropType, reactive, toRefs } from 'vue'

import { EStrategy } from '@/types'

import { useCreateMyBot } from '../../create-my-bot.setup'

export default defineComponent({
  name: 'BotEntry',

  props: {
    type: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup () {
    const {
      myBotGlobalLoading,
      myBotPair,
      myBotAvailableAccounts,
      myBotEntry,
      myBotStrategy,
      orderTypeOptions,
      leverageOptions,
      myBotInitialCap,
      myBotPairQuoteCurrency,
      trigger,
      onChangeInitialCap
    } = useCreateMyBot()

    /* STATE */
    const state = reactive({
      expandValue: true as boolean
    })

    return {
      ...toRefs(state),
      EStrategy,
      myBotGlobalLoading,
      myBotPair,
      myBotAvailableAccounts,
      trigger,
      myBotEntry,
      myBotStrategy,
      orderTypeOptions,
      leverageOptions,
      myBotInitialCap,
      myBotPairQuoteCurrency,
      onChangeInitialCap
    }
  }
})
</script>

<style lang="scss" scoped>
.bot-parameters {
  &__grid {
    @media(min-width: 1280px) {
      /* grid-template-columns: 1fr 1fr 1fr 1.8fr; */
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
