<template>
  <AppCard
    class="swap-item-mobile relative flex flex-col w-full"
    :class="[isActiveItem ? isDarkMode ? 'is-active-dark' : 'is-active-light' : null]"
  >
    <!-- MARKUP -->
    <div
      v-if="isActiveItem"
      class="text-xs font-bold text-crispy-samosa bg-white border
         border-crispy-samosa dark:border-transparent dark:bg-crispy-samosa dark:bg-opacity-30
         rounded-sm w-40 text-center absolute top-14 right-14 py-2"
    >
      BEST
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col w-full h-full p-24">
      <!-- NAME -->
      <div class="flex items-center mb-16">
        <div
          v-if="getImage"
          class="flex items-center justify-center w-36 h-36 bg-catskill-white dark:bg-blue-bayberry mr-12 rounded-full"
        >
          <img
            :src="getImage"
            :alt="item.name"
            class="w-20 h-20 object-contain"
          >
        </div>

        <div class="font-medium text-base text-nile-blue dark:text-white">{{ item.name }}</div>
      </div>

      <div class="flex mb-18">
        <!-- PRICE -->
        <div class="flex flex-col mr-24">
          <div class="text-sm text-nile-blue dark:text-blair">
            <span class="font-medium mr-4">Price</span>
            <span class="font-bold capitalize">{{ tableCoin }}</span>
          </div>

          <p class="text-sm font-bold text-nile-blue dark:text-let-it-snow">{{ item.price }}</p>
        </div>

        <!-- TOTAL -->
        <div class="flex flex-col">
          <div class="text-sm text-nile-blue dark:text-blair">
            <span class="font-medium mr-4">Total</span>
            <span class="font-bold capitalize">{{ tableCoin }}</span>
          </div>

          <p class="text-sm font-semibold text-nile-blue dark:text-let-it-snow">{{ item.total }}</p>
        </div>
      </div>

      <AppButton v-if="isActiveItem" size="lg" class="w-full" @click="trade">Buy Now</AppButton>
      <AppButton v-else size="lg" class="w-full" type="primary-border" @click="trade">
        Buy Direct
      </AppButton>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useSwap } from '@/views/swap/swap.setup'
import { exchangeImagesData } from '@/views/swap/swap.data'
import { ITableColumn } from '@/types'

export default defineComponent({
  name: 'SwapItemMobile',

  props: {
    item: {
      type: Object as PropType<ITableColumn>,
      required: true
    }
  },

  setup (props) {
    // GLOBAL SETUP //
    const { isDarkMode } = useGlobal()

    // SWAP SETUP //
    const { executeTrade, tableCoin } = useSwap()

    const exchangeImages = exchangeImagesData

    const isActiveItem = computed(() => props.item.markup === 'Best trade')

    const markup = computed(() => {
      return isActiveItem.value
        ? parseFloat(props.item.markup) >= 0
          ? `+${props.item.markup}`
          : `${props.item.markup}`
        : parseFloat(props.item.markup) >= 0
          ? `+${props.item.markup}%`
          : `${props.item.markup}%`
    })

    const tableDropdownData = computed(() => {
      if (isActiveItem.value) return [{ label: 'Buy Now', method: 'clone' }]
      return [{ label: 'Buy Direct', method: 'clone' }]
    })

    async function trade () {
      await executeTrade(props.item.dex)
    }

    const getImage = computed(() => {
      const img = exchangeImages.filter((ex) => ex.id === props.item.dex)
      return img.length > 0 ? img[0].img : false
    })

    return {
      isDarkMode,
      tableDropdownData,
      getImage,
      isActiveItem,
      markup,
      trade,
      exchangeImages,
      tableCoin
    }
  }
})
</script>

<style lang="scss" scoped>
.swap-item-mobile {
  &.is-active-dark {
    background: linear-gradient(90deg, #7F86FF -52.14%, rgba(86, 164, 160, 0) 125%);
  }
  &.is-active-light {
    background: linear-gradient(90deg, rgba(127, 134, 255, 0.64) -52.14%, rgba(50, 218, 245, 0) 125%);
  }
}
</style>
