import { computed } from 'vue'
import { router } from '@/router'

import { IBotSnapshot } from '@/types'
import { ECategory, ISubscriptedBots } from '@/types/bots.types'
import { IAlgobotFilters } from '@/types/user/user-settings.types'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

/* USE BOTS SETUP */
const { bots, subscriptedBots } = useBots()

/* USE GLOBAL SETUP */
const { userSettings, setAlgoBotFilters } = useGlobal()

const getPerfBotCyclesDataById = computed(() =>
  bots.value.find((e) => e.id === router.currentRoute.value.params.id) as IBotSnapshot
)

const getAlgobotsSubscriptionById = computed(() =>
  subscriptedBots.value.find((e) => e.botId === getPerfBotCyclesDataById.value?.id) as ISubscriptedBots
)

function getBotLogoImg (item: IBotSnapshot): string {
  if (item.picture?.data) {
    return `data:${item.picture.mimetype};base64,` + item.picture.data
  }
  if (item.creator === 'I-Robot') return '/img/algo-bots/bot-logo/IRobot-logo.jpg'
  if (item.botRef === 'GRAVITYDUSK' || item.botRef === 'GRAVITYNULS') return '/img/algo-bots/bot-logo/gravity1-logo.jpeg'
  if (item.creator === 'Gravity Trading') return '/img/algo-bots/bot-logo/gravity-logo.jpeg'
  if (item.creator === 'XpR') return '/img/algo-bots/bot-logo/xpr-logo.png'
  if (item.creator === 'Pure Gold Crypto Signals') return '/img/algo-bots/bot-logo/PG-logo.png'
  if (item.creator === 'Wave Trader') return '/img/algo-bots/bot-logo/wt-logo.png'
  if (item.creator === 'INERTIALGO') return '/img/algo-bots/bot-logo/inertialgo-logo.jpg'
  if (item.creator === 'Kerokero') return '/img/algo-bots/bot-logo/trendmfi-logo.png'
  if (item.creator === 'Fluctus Technology') return '/img/algo-bots/bot-logo/fluctus-logo.jpg'
  if (item.creator === 'Olmo') return '/img/algo-bots/bot-logo/harsi-logo.jpg'
  if (item.creator === 'LAIKA') return '/img/algo-bots/bot-logo/laika-logo.png'
  if (item.category === ECategory.UserBot) return '/img/logos/logo-purple.svg'
  return '/img/algo-bots/bot-logo/4c_logo.png'
}

function setBotStatusFilter (payload: { value: string; label: string; }) {
  setAlgoBotFilters({ ...userSettings.value.algobotFilters, status: payload })
}
function setBotStrategyFilter (payload: { value: string; label: string; }) {
  setAlgoBotFilters({ ...userSettings.value.algobotFilters, strategy: payload })
}
function setBotExchangeFilter (payload: string[]) {
  setAlgoBotFilters({ ...userSettings.value.algobotFilters, exchanges: payload })
}
function setBotPairFilter (payload: string[]) {
  setAlgoBotFilters({ ...userSettings.value.algobotFilters, pairs: payload })
}
function setBotSortByValueFilter (payload: { value: string; label: string; }) {
  setAlgoBotFilters({ ...userSettings.value.algobotFilters, sortedByValue: payload })
}
function setBotMyBotsFilter (payload: boolean) {
  setAlgoBotFilters({ ...userSettings.value.algobotFilters, isMyBots: payload })
}
function setAllBotFilterSetting (payload: IAlgobotFilters) {
  setAlgoBotFilters({ ...payload })
}

export const useAlgoBots = function () {
  return {
    getPerfBotCyclesDataById,
    getAlgobotsSubscriptionById,
    getBotLogoImg,
    setBotStatusFilter,
    setBotStrategyFilter,
    setBotExchangeFilter,
    setBotPairFilter,
    setBotSortByValueFilter,
    setAllBotFilterSetting,
    setBotMyBotsFilter
  }
}
