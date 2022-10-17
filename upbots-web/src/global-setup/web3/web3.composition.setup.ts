import { reactive, toRefs } from 'vue'

import { useWindowSize } from '@vueuse/core'

/* VUE USE */
const { width } = useWindowSize()

/* STATE */
const state = reactive({
  isDAppBrowser: false as boolean
})

/* DETECT DAPP BROWSER | BROWSER WITH EXTENSIONS */
function detectWalletBrowser () {
  if ((window as any).ethereum || (window as any).web3 || (window as any).BinanceChain) {
    state.isDAppBrowser = true
  } else {
    if (width.value <= 479) {
      state.isDAppBrowser = false
    } else {
      state.isDAppBrowser = true
    }
  }
}

/* EXPORT USE WEB3 */
export function useWeb3 () {
  return { ...toRefs(state), detectWalletBrowser }
}
