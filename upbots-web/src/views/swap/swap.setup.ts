import Web3 from 'web3'
import DEXAG from 'dexag-sdk'
import { appNotify } from '@/components/stateless/notifications'
import { dexagStatusNotification, exchangesList, SwapErrors } from '@/views/swap/swap.data'
import { EErrorsMessage, IDexagRequest, IExchangeData, ITableColumn } from '@/types'
import { computed, reactive, toRefs } from 'vue'

const fixedTo = (number: number, fractionDigits: number) => {
  const k = Math.pow(10, fractionDigits)
  return (Math.ceil(number * k) / k).toFixed(fractionDigits)
}

const swapState = reactive({
  error: '',
  pending: false,
  exchangesData: exchangesList.map((exchange) => ({
    ...exchange,
    checked: true
  })) as IExchangeData[],
  tableData: [] as ITableColumn[],
  providerSdk: null as any,
  providerRequest: {} as IDexagRequest
})

export const useSwap = function () {
  const web3 = new Web3()

  const tableCoin = computed(() => {
    if (!swapState.providerRequest) return ''
    return swapState.providerRequest.from
  })

  const getExchangesData = computed(() => swapState.exchangesData)

  function initProviderSdk () {
    const sdk = DEXAG.fromProvider(web3.eth.givenProvider)
    if (sdk.provider) {
      sdk.registerStatusHandler((status: string) => {
        const msg = dexagStatusNotification[status]
        appNotify({ type: msg.type, message: msg.text })
      })

      swapState.providerSdk = sdk
    }
  }

  async function fetchTableData (payload: IDexagRequest) {
    if (payload.from === payload.to) {
      swapState.error = 'You have the same buy and with coin'
    }

    if (payload.toAmount === 0) {
      swapState.error = 'You can\'t search for a trade with an amount of zero'
    }

    if (!swapState.exchangesData.find(({ checked }) => checked)) {
      swapState.pending = false
      swapState.error = ''
      swapState.tableData = []
    }

    swapState.pending = true
    swapState.error = ''
    try {
      const discluded = swapState.exchangesData
        .filter(({ checked }) => !checked)
        .map(({ id }) => id)
        .join(',')
      const data: any[] = await swapState.providerSdk.getPrice({ ...payload, discluded })
      const quantity = payload.toAmount as any | 0
      const bestPrice = parseFloat(data.find(({ dex }) => dex === 'ag').price)
      const res: ITableColumn[] = data
        .map(({ dex, price }: { dex: string; price: string; }) => {
          const exchange = exchangesList.find(({ id }) => id === dex)
          const name = dex === 'ag' ? 'X Blaster' : exchange ? exchange.label : dex
          return {
            dex,
            name,
            nameDesc: dex === 'ag' ? 'Multiple Aggregators' : undefined,
            price: parseFloat(price).toFixed(7),
            total: (parseFloat(price) * quantity).toFixed(7),
            markup: dex === 'ag' ? 'Best trade' : fixedTo((parseFloat(price) - bestPrice) / bestPrice, 3)
          }
        })
        .sort((a, b) => {
          if (a.nameDesc) return -1
          else if (b.nameDesc) return 1
          else return parseFloat(a.markup) - parseFloat(b.markup)
        })
      swapState.pending = false
      swapState.error = ''
      swapState.tableData = res
      swapState.providerRequest = payload
    } catch {
      swapState.pending = false
      swapState.error = ''
      swapState.tableData = []
      swapState.error = SwapErrors.FETCH_TABLE_DATA_ERROR
    }
  }

  async function toggleAllExchanges (checked: boolean) {
    swapState.exchangesData = swapState.exchangesData.map((exchange) => ({
      ...exchange,
      checked
    }))

    await fetchTableData(swapState.providerRequest)
  }

  async function toggleExchange (id: string) {
    swapState.exchangesData = swapState.exchangesData.map((exchange) => ({
      ...exchange,
      checked: exchange.id === id ? !exchange.checked : exchange.checked
    }))

    await fetchTableData(swapState.providerRequest)
  }

  function toDefaultFixed (string: string) {
    return string ? Number(string).toFixed(4) : '0.0000'
  }

  async function executeTrade (dex: string) {
    appNotify({ message: 'A new trade has been started', type: 'info' })
    try {
      await swapState.providerSdk.getTrade({
        ...swapState.providerRequest,
        discluded: '',
        dex: dex,
        proxy: '0x655cc4C803af0D613475aC1CeF90D02EbD52ae45'
      })

      // TODO //
      // const validation = await providerSdk.value.validate(trade)
      // const execution = await providerSdk.value.sendTrade(trade, {})
    } catch (error) {
      appNotify({ type: 'error', message: EErrorsMessage.DEFAULT })
    } finally {}
  }

  return {
    ...toRefs(swapState),

    web3,
    tableCoin,
    getExchangesData,

    initProviderSdk,
    fetchTableData,
    toggleAllExchanges,
    toggleExchange,
    toDefaultFixed,
    executeTrade
  }
}
