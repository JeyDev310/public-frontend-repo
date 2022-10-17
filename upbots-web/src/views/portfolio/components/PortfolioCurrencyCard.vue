<template>
  <mq-layout mq="lg+" class="flex flex-col flex-grow" :class="wrapClasses">
    <AppCard class="flex flex-col flex-grow items-center w-full relative justify-center p-20">
      <!-- LOADER -->
      <AppLoader v-if="getLoading" class="rounded-xlg" size="sm" />

      <!-- TITLE -->
      <h3
        class="w-full md:text-md text-center text-industrial-revolution dark:text-seascape-blue leading-1"
        :class="titleClasses"
      >
        {{ title }}
      </h3>

      <!-- DEFAULT SLOT -->
      <slot v-if="!notAvailableData">
        <div :class="valueClasses">
          <AppFormatNumber
            :data="getCurrencyValue"
            class="text-center font-semibold leading-1 text-xl 4xl:text-4xl mt-10"
            :is-math-symbols="false"
            :not-available-classes="valueClasses"
            :negative-classes="valueClasses"
            :positive-classes="valueClasses"
          >
            <template #value="{ data }">
              <AppTruncatedTooltip :content="`${getCurrencySymbol}${data}`" />
            </template>
          </AppFormatNumber>
        </div>
      </slot>

      <!-- N/A -->
      <!-- TODO -->
      <div v-else>
        <div
          :class="valueClasses"
          class="text-center font-semibold leading-1 text-xl 4xl:text-4xl mt-10"
        >
          N/A
        </div>
      </div>
    </AppCard>
  </mq-layout>

  <mq-layout mq="sm-md">
    <div class="flex" :class="wrapClasses">
      <!-- TITLE -->
      <h3 v-if="title" :class="titleClasses">{{ title }}</h3>

      <!-- DEFAULT SLOT -->
      <slot v-if="!notAvailableData">
        <div :class="valueClasses">
          <AppFormatNumber
            :data="getCurrencyValue"
            :is-math-symbols="false"
            :not-available-classes="valueClasses"
            :negative-classes="valueClasses"
            :positive-classes="valueClasses"
          >
            <template #value="{ data }">
              <AppTruncatedTooltip :content="`${getCurrencySymbol}${data}`" />
            </template>
          </AppFormatNumber>
        </div>
      </slot>

      <!-- N/A -->
      <div v-else>
        <div :class="valueClasses">N/A</div>
      </div>
    </div>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { vuex } from '@/store'
import { IBtcAmount } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'PortfolioCurrencyCard',

  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },

    currencyValue: {
      type: Object as PropType<IBtcAmount>,
      required: true
    },

    tabName: {
      type: String as PropType<'cex' | 'dex' | 'summary'>,
      required: true
    },

    wrapClasses: {
      type: String as PropType<string>,
      default: ''
    },

    titleClasses: {
      type: String as PropType<string>,
      default: ''
    },

    valueClasses: {
      type: String as PropType<string>,
      default: 'text-nile-blue dark:text-white'
    },

    notAvailableData: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup (props) {
    const { getConvertedCurrency, getCurrencySymbol } = useGlobal()

    const getLoading = computed((): boolean => {
      if (props.tabName === 'summary') return false
      return vuex[props.tabName].loading
    })

    const getCurrencyValue = computed((): number => {
      if (!props.currencyValue?.btc && !getCurrencySymbol.value) return 0

      return getConvertedCurrency(props.currencyValue.btc)
    })

    return { getLoading, getCurrencyValue, getCurrencySymbol }
  }
})
</script>
