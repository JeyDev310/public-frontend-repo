<template>
  <div class="flex items-center" :class="isColored && getColorClasses">
    <!-- IF CURRENCY SYMBOL TRUE -->
    <template v-if="currencySymbol">
      <span class="mr-2" :class="textSize">{{ currencySymbol }}</span>
    </template>

    <!-- IF MATH SYMBOLS TRUE -->
    <template v-if="isMathSymbols">
      <span class="mr-2" :class="textSize">{{ getPositiveNegativeSymbol }}</span>
    </template>

    <!-- IF MATH SYMBOLS FALSE & DATA VALUE < 0 (SHOW NEGATIVE SYMBOL) -->
    <template v-if="!isMathSymbols && data && data < 0">
      <span :class="textSize">-</span>
    </template>

    <!-- DEFAULT SLOT -->
    <slot name="value" :data="formatedData">
      <span :class="textSize">{{ formatedData }}</span>
    </slot>

    <!-- IF PERCENT -->
    <span v-if="getPercent" :class="textSize">%</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  name: 'AppFormatNumber',

  props: {
    data: {
      type: [Number, null] as PropType<number | null>,
      default: null
    },

    isFormated: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    toFixed: {
      type: Number as PropType<number>,
      default: 2
    },

    format: {
      type: String as PropType<string>,
      default: 'en-US'
    },

    isColored: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    textSize: {
      type: String as PropType<string>,
      default: 'text-base'
    },

    percent: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    isShowZero: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    currencySymbol: {
      type: String as PropType<string>,
      default: ''
    },

    isMathSymbols: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    positiveClasses: {
      type: String as PropType<string>,
      default: 'text-spring-bouquet'
    },

    negativeClasses: {
      type: String as PropType<string>,
      default: 'text-alexandria'
    },

    /* IF YOU NEED TO CHANGE IT FROM PARENT, NOT FORGET ABOUT LIGHT & DARK MODE */
    notAvailableClasses: {
      type: String as PropType<string>,
      default: 'text-namara-grey dark:text-white'
    },

    notAvailableText: {
      type: String as PropType<string>,
      default: '-'
    }
  },

  setup (props) {
    const formatedData = computed((): string | number => {
      if (props.data) {
        if (props.isFormated) {
          const mathData = Math.abs(props.data)
          const data = props.data < 0 ? mathData : props.data

          if (props.format) {
            return Number(data.toFixed(props.toFixed)).toLocaleString(props.format) // TODO ADD condition for toFixed
          } else {
            return data.toFixed(props.toFixed)
          }
        } else {
          return props.data.toFixed(props.toFixed)
        }
      } else {
        if (props.isShowZero) {
          return 0
        } else {
          return props.notAvailableText
        }
      }
    })

    const getPositiveNegativeSymbol = computed((): string => {
      if (props.data) return props.data > 0 ? '+' : props.data < 0 ? '-' : ''
      return ''
    })

    const getPercent = computed((): string => {
      if (props.data) return (props.data > 0 || props.data < 0) && props.percent ? '%' : ''
      return ''
    })

    const getColorClasses = computed((): string => {
      if (props.data) {
        return props.data > 0
          ? props.positiveClasses : props.data < 0
            ? props.negativeClasses : props.notAvailableClasses
      } else {
        return props.notAvailableClasses
      }
    })

    return { formatedData, getPositiveNegativeSymbol, getPercent, getColorClasses }
  }
})
</script>
