import { reactive, toRefs, computed } from 'vue'

import { ECategory, IBotSnapshot } from '@/types'
import { ITradersFilters, TTradersFiltersKey } from './copy-trading.types'

import { useBots } from '@/global-setup/bots.composition.setup'

const { bots, subscriptedBots } = useBots()

const defaultTradersFilters: ITradersFilters = {
  search: '',
  status: { label: 'All', value: 'all' },
  strategy: { label: 'All', value: 'all' },
  exchanges: [],
  pairs: [],
  sortedBy: { label: '3m perf %', value: 'performance_3m' }
}

const state = reactive({
  tradersFilters: defaultTradersFilters as ITradersFilters
})

const getCopyBots = computed((): IBotSnapshot[] => bots.value.filter(bot => bot.category === ECategory.CopyBot))

const getSubscriptedCopyBots = computed(() => {
  return subscriptedBots.value.filter((bot) => {
    return getCopyBots.value.some((subscriptedBot) => bot.botId === subscriptedBot.id)
  })
})

function setTradersFilters (value: any, key: TTradersFiltersKey): void {
  state.tradersFilters[key] = value
}

function clearTradersFilters (): void {
  state.tradersFilters = {
    search: '',
    status: { label: 'All', value: 'all' },
    strategy: { label: 'All', value: 'all' },
    exchanges: [],
    pairs: [],
    sortedBy: { label: '3m perf %', value: 'performance_3m' }
  } as ITradersFilters
}

export const useCopyTrading = function () {
  return {
    ...toRefs(state),
    getCopyBots,
    getSubscriptedCopyBots,
    setTradersFilters,
    clearTradersFilters
  }
}
