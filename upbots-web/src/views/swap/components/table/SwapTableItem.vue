<template>
  <div
    class="swap-table__item flex items-center flex-shrink-0 py-8 3xl:py-14 4xl:py-20 px-20 3xl:px-30"
    :class="[ isActiveItem ? isDarkMode ? 'is-active-dark' : 'is-active-light' : null ]"
  >
    <!-- NAME -->
    <div class="swap-table__col-1 flex flex-col pr-10">
      <div class="flex flex-col md:flex-row items-center justify-center md:justify-start">
        <div
          v-if="exchangeImage"
          class="
            flex
            flex-col
            items-center
            justify-center
            w-32
            h-32
            4xl:w-40
            4xl:h-40
            bg-catskill-white
            dark:bg-blue-bayberry
            p-6
            md:mr-14
            rounded-full
          "
        >
          <img
            :src="exchangeImage"
            :alt="tableItem.name"
            class="w-full h-full object-contain"
          >
        </div>

        <p class="swap-table__item-text text-sm lg:text-base 4xl:text-lg">
          {{ tableItem.name }}
        </p>
      </div>

      <div v-if="tableItem && tableItem.nameDesc" class="swap-table__item-text text-sm 4xl:text-base">
        {{ tableItem.nameDesc }}
      </div>
    </div>

    <!-- PRICE -->
    <div class="swap-table__col-2 swap-table__item-text block text-sm lg:text-base 4xl:text-lg pr-10 truncate">
      {{ tableItem.price }}
    </div>

    <!-- TOTAL -->
    <div class="swap-table__col-3 swap-table__item-text block text-sm lg:text-base 4xl:text-lg pr-10 truncate">
      {{ tableItem.total }}
    </div>

    <!-- MARKUP -->
    <div class="swap-table__col-4 swap-table__item-text block text-sm lg:text-base 4xl:text-lg pr-10 truncate">
      {{ markup }}
    </div>

    <!-- ACTION BUTTONS -->
    <mq-layout mq="lg+" class="swap-table__col-5">
      <AppButton
        v-if="isActiveItem"
        :size="is4XL ? 'md' : 'lg'"
        class="w-full"
        @click="trade"
      >
        Buy Now
      </AppButton>
      <AppButton
        v-else
        type="primary-border"
        :size="is4XL ? 'md' : 'lg'"
        class="w-full"
        @click="trade"
      >
        Buy Direct
      </AppButton>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import { ITableColumn } from '@/types'
import { exchangeImagesData } from '@/views/swap/swap.data'

import { useSwap } from '@/views/swap/swap.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'SwapTableItem',

  props: {
    tableData: {
      type: Array as PropType<ITableColumn[]>,
      required: true
    },

    tableItem: {
      type: Object as PropType<ITableColumn>,
      required: true
    },

    tableIndex: {
      type: Number as PropType<number>,
      required: true
    }
  },

  setup (props) {
    /* USE GLOBAL SETUP */
    const { isDarkMode } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL } = useCustomBreakpoints()

    /* USE SWAP SETUP */
    const { executeTrade } = useSwap()

    const exchangeImages = exchangeImagesData

    const isActiveItem = computed((): boolean => props.tableItem.markup === 'Best trade')

    const markup = computed((): string => {
      return isActiveItem.value
        ? parseFloat(props.tableItem.markup) >= 0
          ? `+${props.tableItem.markup}`
          : `${props.tableItem.markup}`
        : parseFloat(props.tableItem.markup) >= 0
          ? `+${props.tableItem.markup}%`
          : `${props.tableItem.markup}%`
    })

    const tableDropdownData = computed((): { label: string; method: string; }[] => {
      if (isActiveItem.value) {
        return [{ label: 'Buy Now', method: 'clone' }]
      } else {
        return [{ label: 'Buy Direct', method: 'clone' }]
      }
    })

    const exchangeImage = computed(() => {
      const img = exchangeImages.filter((ex) => ex.id === props.tableItem.dex)
      return img.length > 0 ? img[0].img : false
    })

    async function trade (): Promise<void> {
      await executeTrade(props.tableItem.dex)
    }

    return {
      is4XL,
      isDarkMode,

      tableDropdownData,
      isActiveItem,
      markup,
      exchangeImage,
      trade
    }
  }
})
</script>

<style lang="scss" scoped>
.swap-table {
  &__item {
    &.is-active-dark {
      background: linear-gradient(90deg, #7F86FF -52.14%, rgba(86, 164, 160, 0) 125%);
    }

    &.is-active-light {
      background: linear-gradient(90deg, rgba(127, 134, 255, 0.64) -52.14%, rgba(50, 218, 245, 0) 125%);
    }
  }

  &__item-text {
    @apply text-nile-blue dark:text-let-it-snow;
  }
}
</style>
