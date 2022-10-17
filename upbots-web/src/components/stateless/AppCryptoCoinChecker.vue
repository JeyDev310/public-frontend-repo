<template>
  <CoinIcon
    v-if="isCryptoExistIcon || !localIcons.includes(iconName.toLowerCase())"
    :name="getIconName"
    :scale="iconSize"
  />
  <img
    v-else :src="`/img/cryptocoins/${getIconName}.svg`"
    :alt="iconName"
    class="ml-2"
    :style="`width: ${imgSize}px; height: ${imgSize}px`"
  >
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { addIcons, OhVueIcon } from 'oh-vue-icons'
import * as CryptocurrencyIcon from 'oh-vue-icons/icons/ci'

const Ci = Object.values({ ...CryptocurrencyIcon })
addIcons(...Ci)

export default defineComponent({
  name: 'AppCryptoCoinChecker',

  components: { CoinIcon: OhVueIcon },

  props: {
    iconName: {
      type: String as PropType<string>,
      default: 'ci-color-generic'
    },

    iconSize: {
      type: Number as PropType<number>,
      default: 1
    },

    imgSize: {
      type: Number as PropType<number>,
      default: 16
    },

    isColored: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  setup (props) {
    const localIcons: string[] = [
      'ftx',
      'ftx-future',
      'binance',
      'binance-us',
      'binance-future',
      'okex',
      'kucoin',
      'kucoin-future',
      'bitmex',
      'huobi',
      'coinbasepro',
      'ubxt',
      'avax',
      'ar',
      'srm',
      'luna',
      'rune',
      'ftm',
      'yfii',
      'ftt',
      'shib',
      'near',
      'cake',
      'sxp'
    ]

    const iconsKey = Object.keys(CryptocurrencyIcon).map(key => key.toLowerCase())

    const isCryptoExistIcon = computed((): boolean => {
      return (
        iconsKey.includes(`cicolor${props.iconName.toLowerCase()}`) ||
        iconsKey.includes(`ci${props.iconName.toLowerCase()}`)
      )
    })

    const getIconName = computed((): string => {
      if (isCryptoExistIcon.value) {
        if (props.isColored) {
          return `ci-color-${props.iconName.toLowerCase()}`
        } else {
          return `ci-${props.iconName.toLowerCase()}`
        }
      } else if (!isCryptoExistIcon.value && !localIcons.includes(props.iconName.toLowerCase())) {
        if (props.isColored) {
          return 'ci-color-generic'
        } else {
          return 'ci-generic'
        }
      } else {
        return props.iconName.toLowerCase()
      }
    })

    return { getIconName, isCryptoExistIcon, localIcons }
  }
})
</script>
