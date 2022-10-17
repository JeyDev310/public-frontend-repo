import { reactive, toRefs } from 'vue'

import { algoBotsService, globalService } from '@/services'
import { EErrorsMessage } from '@/types'
import { IPerfeesBotWallet, IPerfeesUserWallet } from '@/types/perfees/perfees.types'
import { appNotify } from '@/components/stateless/notifications'

/* BOTS STATE */
const state = reactive({
  perfeesUserWallet: {} as IPerfeesUserWallet,
  perfeesUserWalletLoading: false as boolean,
  perfeesBotWallet: {} as IPerfeesBotWallet,
  perfeesBotWalletLoading: false as boolean
})

async function fetchPerfeesWallet (): Promise<void> {
  try {
    const { data } = await globalService.getPerfeesUserWallet()

    state.perfeesUserWallet = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function fetchPerfeesBotWalletById (id: string): Promise<void> {
  state.perfeesBotWalletLoading = true
  try {
    const { data } = await algoBotsService.getPerfeesBotWalletById(id)

    state.perfeesBotWallet = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.perfeesBotWalletLoading = false
  }
}

/* EXPORT USE BOTS */
export const usePerfees = function () {
  return {
    ...toRefs(state),

    fetchPerfeesBotWalletById,
    fetchPerfeesWallet
  }
}
