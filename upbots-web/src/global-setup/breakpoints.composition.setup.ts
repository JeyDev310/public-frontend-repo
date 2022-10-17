import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const isSM = computed((): boolean => width.value < 640)
const isMD = computed((): boolean => width.value < 768)
const isLG = computed((): boolean => width.value < 1024)
const isXL = computed((): boolean => width.value < 1280)
const is2XL = computed((): boolean => width.value < 1440)
const is3XL = computed((): boolean => width.value < 1920)
const is4XL = computed((): boolean => width.value < 2500)
const is5XL = computed((): boolean => width.value < 3000)
const is6XL = computed((): boolean => width.value >= 3000)

export const useCustomBreakpoints = () => {
  return {
    isSM,
    isMD,
    isLG,
    isXL,
    is2XL,
    is3XL,
    is4XL,
    is5XL,
    is6XL
  }
}
