<template>
  <AppCard
    class="
      home__total-card
      relative
      flex
      flex-col
      items-center
      justify-center
      p-10
      md:p-20
      cursor-pointer
      overflow-hidden
    "
    :is-default-background="isDefaultCardBg"
  >
    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xlg" size="sm" />

    <!-- CURRENCY VALUE -->
    <template v-else>
      <template v-if="!notAvailableData">
        <AppFormatNumber
          :data="getCurrencyValue"
          :is-math-symbols="false"
          :is-colored="false"
        >
          <template #value="{ data }">
            <AppTruncatedTooltip
              :content="`${getCurrencySymbol}${data}`"
              class="text-md xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-semibold"
              :class="isDefaultCardBg ? 'text-industrial-revolution dark:text-white' : 'text-white'"
            />
          </template>
        </AppFormatNumber>
      </template>

      <!-- N/A -->
      <!-- TODO -->
      <template v-else>
        <div
          class="
            flex-grow-0
            text-md
            xl:text-xl
            2xl:text-2xl
            3xl:text-3xl
            4xl:text-4xl
            font-semibold
            text-industrial-revolution
            dark:text-white
          "
        >
          N/A
        </div>
      </template>
    </template>

    <!-- TITLE -->
    <h4
      class=" text-sm md:text-md text-center"
      :class="isDefaultCardBg ? 'text-bluster-blue dark:text-soaring-eagle' : 'text-white'"
    >
      {{ title }}
    </h4>

    <!-- PERCENT VALUE -->
    <div
      v-if="!loading && percentageValue || percentageValue === 0"
      class="flex items-center justify-center w-full text-base mt-10"
    >
      <AppFormatNumber
        :data="percentageValue"
        percent
        text-size="text-sm md:text-base"
        class="leading-1 mr-4"
      />
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { IBtcAmount } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'HomeTotalCard',

  props: {
    title: {
      required: true,
      type: String as PropType<string>
    },

    currencyValue: {
      required: true,
      type: Object as PropType<IBtcAmount>
    },

    percentageValue: {
      type: Number as PropType<number>,
      default: null
    },

    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    isDefaultCardBg: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    notAvailableData: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup (props) {
    const { getConvertedCurrency, getCurrencySymbol } = useGlobal()

    const getCurrencyValue = computed((): number => {
      if (!props.currencyValue?.btc && !getCurrencySymbol.value) return 0

      return getConvertedCurrency(props.currencyValue.btc)
    })

    return { getCurrencySymbol, getCurrencyValue }
  }
})
</script>

<style lang="scss" scoped>
.home {
  @media(min-width: 2500px) {
    &__total-card {
      height: 180px;
    }
  }

  @media(max-width: 2499px) {
    &__total-card {
      height: 150px;
    }
  }

  @media (max-width: 767px) {
    &__total-card {
      height: 70px;
    }
  }
}
</style>
