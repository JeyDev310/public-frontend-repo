<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between text-beguiling-blue dark:text-white uppercase mb-10 4xl:mb-20">
      <div class="flex space-x-6">
        <p class="font-semibold 3xl:text-md 4xl:text-xl">{{ title }}</p>
        <slot />
      </div>

      <p class="font-semibold 3xl:text-md 4xl:text-xl">
        {{ cryptoCurrencyValue }} {{ cryptoCurrencyName }}
        <span v-if="cryptoCurrencyDetail">({{ cryptoCurrencyDetail }})</span>
      </p>
    </div>

    <div
      class="
        w-full
        bg-white
        dark:bg-black
        dark:bg-opacity-10
        shadow-800
        dark:shadow-700
        rounded-sm1
        px-12
        md:px-18
        3xl:px-24
        4xl:px-30
        pt-20
        md:pt-18
        3xl:pt-40
        pb-12
        md:pb-16
        3xl:pb-20
      "
    >
      <div class="flex items-center border-b border-ice-berge dark:border-icecold-stare pb-20 md:pb-24 3xl:pb-28">
        <div class="relative h-50 md:h-60 3xl:h-70 w-50 md:w-60 3xl:w-70 4xl:w-80 4xl:h-80 rounded-full">
          <img src="/img/cryptocoins/ubxt.svg" alt="ubxt" class="w-full h-full">
          <img
            :src="`/img/cryptocoins/${chaineName}.svg`"
            alt="chaineName"
            class="
              absolute
              -bottom-1
              md:-bottom-2
              3xl:-bottom-1
              4xl:-bottom-2
              right-0
              md:-right-3
              3xl:right-0
              4xl:-right-4
              w-18
              md:w-22
              3xl:w-24
              4xl:w-30
              h-18
              md:h-22
              3xl:h-24
              4xl:h-30
              bg-white
              border
              border-blue-haze
              rounded-full
            "
          >
        </div>

        <div
          class="text-5xl ml-16 md:ml-30 w-full"
          :class="title === 'from' ? 'text-chicory-flower dark:text-white' : 'text-beguiling-blue dark:text-blair'"
        >
          <AppInputNumber
            v-model="currentConvertValue"
            :readonly="readonly"
            :min="minAmount"
            :max="maxAmount"
            :isArrow="false"
            class="w-full mb-14"
            :size="is3XL ? 'md' : !is4XL ? 'xlg' : 'lg'"
          />
        </div>
      </div>

      <div class="text-identity dark:text-blair mt-12 md:mt-20">
        <AppTruncatedTooltip :content="address" class="capitalize text-sm md:text-md2 4xl:text-xl" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'UBXTBridgeConvertCard',

  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },

    address: {
      type: String as PropType<string>,
      required: false
    },

    cryptoCurrencyValue: {
      type: [Number, String] as PropType<number | string>,
      required: true
    },

    cryptoCurrencyName: {
      type: String as PropType<string>,
      required: true
    },

    cryptoCurrencyDetail: {
      type: String as PropType<string>,
      required: true
    },

    convertValue: {
      type: Number as PropType<number>,
      required: true
    },

    chaineName: {
      type: String as PropType<string>,
      required: true
    },

    readonly: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    minAmount: {
      type: Number as PropType<number>,
      required: true
    },

    maxAmount: {
      type: Number as PropType<number>,
      required: true
    }
  },

  emits: ['input'],

  setup (props, { emit }) {
    const { is3XL, is4XL } = useCustomBreakpoints()

    const currentConvertValue = ref(0)

    watch(() => props.convertValue, () => {
      currentConvertValue.value = props.convertValue
    })
    watch(() => currentConvertValue.value, () => {
      emit('input', currentConvertValue.value)
    })

    return { is3XL, is4XL, currentConvertValue }
  }
})
</script>
