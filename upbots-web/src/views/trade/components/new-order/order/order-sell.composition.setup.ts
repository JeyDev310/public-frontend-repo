import { computed, reactive, toRefs } from 'vue'

import Decimal from 'decimal.js-light'

import { tradeService } from '@/services'
import { EErrorsMessage } from '@/types'
import { ICreatedOrderData, IOrderInputOptions } from '../../../trade-types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useTrade } from '../../../trade-composition.setup'

const orderTypeOptions: { label: string; value: string; }[] = [
  { label: 'Limit', value: 'limit' },
  { label: 'Market', value: 'market' }
]

const inputOptions = {
  max: 0,
  step: 0.1
}

const state = reactive({
  availableSymbol: '' as string,
  available: 0 as number,
  availableOptions: { precision: 8, ...inputOptions } as IOrderInputOptions,
  marketPrice: 0 as number,
  price: 0 as number,
  priceOptions: { precision: 4, ...inputOptions } as IOrderInputOptions,
  quantity: 0 as number,
  quantityOptions: { precision: 4, ...inputOptions } as IOrderInputOptions,
  range: [0] as number[],
  total: 0 as number,
  totalOptions: { precision: 4, ...inputOptions } as IOrderInputOptions,
  isValidated: true as boolean,
  createOrderModal: false as boolean,
  orderData: {} as ICreatedOrderData,
  orderType: { label: 'Limit', value: 'limit' } as { label: string; value: string; }
})

export const useSellOrder = function () {
  /* USER TRADE SETUP */
  const {
    priceSummary,
    accountTradeBalance,
    fetchPriceSummary,
    fetchPortfolio,
    fetchTradingBalance
  } = useTrade()

  /* USE GLOBAL SETUP */
  const { defaultPair, availableAccounts, defaultAccount } = useGlobal()

  const getValidationInputs = computed((): boolean => {
    return state.available === 0 || state.price === 0 || state.quantity === 0 || state.total === 0
  })

  function noExp (this: any, n: number): string {
    const data = String(n).split(/[eE]/)
    if (data.length === 1) return data[0]

    let z = ''; const sign = this < 0 ? '-' : ''
    const str = data[0].replace('.', '')
    let mag = Number(data[1]) + 1

    if (mag < 0) {
      z = sign + '0.'
      while (mag++) z += '0'
      return z + str.replace(/^-/, '')
    }
    mag -= str.length
    while (mag--) z += '0'
    return str + z
  }

  function getPriceStep (): number {
    let step = 1
    if (defaultPair.value.precisionMode === 'DECIMAL_PLACES') {
      step = 1 / (10 ** defaultPair.value.precision.price)
    } else {
      step = defaultPair.value.precision.price
    }
    return step
  }

  function getAmountStep (): number {
    let step = 1
    if (defaultPair.value.precisionMode === 'DECIMAL_PLACES') {
      // step = 1 / (10 ** (defaultPair.value.precision.amount - 1))
      step = 1 / (10 ** (defaultPair.value.precision.amount))
    } else {
      step = defaultPair.value.precision.amount
    }
    return step
  }

  function correctValueByStep (value: number, step: number): number {
    const intValue = Number(((value || 0) / step).toFixed(0))
    const valueDecimal = new Decimal(intValue * step)
    const stepDecimal = new Decimal(step)
    return valueDecimal.toDecimalPlaces(stepDecimal.decimalPlaces()).toNumber()
  }

  function setOrderSymbol (): void {
    if (!Object.keys(defaultPair.value).length) {
      state.availableSymbol = 'N/A'
    }

    state.availableSymbol = defaultPair.value.baseCurrency
  }

  function setTradingAmount (): void {
    if (!availableAccounts.value.length || !Object.keys(accountTradeBalance.value).length) state.available = 0

    const freeBalances = accountTradeBalance.value?.freeBalances
    if (!Object.keys(accountTradeBalance.value).length) {
      state.available = 0
      return
    }

    if (!Object.keys(freeBalances).length) {
      state.available = 0
      return
    }

    state.available = (state.availableSymbol in freeBalances) ? freeBalances[state.availableSymbol] : 0
  }

  function setOrderPrice (): void {
    const priceSummaryCond = Object.keys(priceSummary.value).length
    if (!priceSummaryCond) return

    const summaryPairCond = Object.keys(priceSummary.value[defaultPair.value.symbolForData]).length
    const pairPriceCond = Object.keys(priceSummary.value[defaultPair.value.symbolForData].price).length

    if (summaryPairCond || pairPriceCond) {
      state.marketPrice = priceSummary.value[defaultPair.value.symbolForData].price.last
      state.price = priceSummary.value[defaultPair.value.symbolForData].price.last
    } else {
      state.marketPrice = 0
      state.price = 0
    }
  }

  function setQuantityValue (payload: number): void {
    state.quantity = payload
  }

  function setOrderQuantity (): void {
    state.quantity = state.available * state.range[0] / 100.0
  }

  function setRange (payload: number): void {
    if (payload === 0 || payload) {
      state.range[0] = payload
    } else {
      if (state.available === 0 || state.price === 0) {
        state.range[0] = 0
      }
    }
  }

  function calcTotal (): void {
    if (state.available === 0 || state.price === 0) {
      state.total = 0
      return
    }

    const price = state.orderType.value === 'market' ? state.marketPrice : state.price
    state.total = ((state.available / 1) * state.range[0] / 100) * price
  }

  function calcOrderQuantity (): void {
    if (state.price === 0) {
      state.range[0] = 0
      return
    }

    const data = (state.available / 1) * state.range[0] / 100
    state.quantity = correctValueByStep(data, getAmountStep())

    calcTotal()
  }

  function setOrderRange (payload: number): void {
    state.range[0] = payload
    calcTotal()
  }

  function calcRange (): void {
    const available = state.available / 1

    state.range[0] = state.quantity / correctValueByStep(available, getAmountStep()) * 100
    state.range[0] = Math.trunc(state.range[0])

    calcTotal()
  }

  function setQuantity (): void {
    if (state.available === 0 || state.price === 0) {
      state.quantity = 0
      return
    }
    state.quantity = (state.available / 1) * state.range[0] / 100
  }

  function setShowOrderModal (paylaod: boolean): void {
    state.createOrderModal = paylaod
  }

  async function onOpenOrderModal (): Promise<void> {
    if (state.orderType.value === 'market') {
      try {
        await fetchPriceSummary()
        setOrderPrice()
      } catch {
        return
      }
    }

    const data: ICreatedOrderData = {
      exchange: defaultAccount.value.exchange,
      accountName: defaultAccount.value.name,
      apiKeyRef: defaultAccount.value.id,
      symbol: defaultPair.value.symbol.toUpperCase(),
      side: 'SELL',
      type: state.orderType.value.toUpperCase(),
      quantity: state.quantity,
      totalValue: state.total.toFixed(state.totalOptions.precision),
      price: state.price
    }
    state.orderData = data

    setShowOrderModal(true)
  }

  async function onCreateOrder (): Promise<void> {
    try {
      await tradeService.createDirectOrder(state.orderData)
      await fetchPortfolio()
      await fetchTradingBalance()
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    } finally {
      setShowOrderModal(false)
    }
  }

  async function fetchTradeFormats (): Promise<void> {
    if (state.available === 0 || state.price === 0) {
      state.price = 0
      return
    }

    const pricePrecision = String(noExp(getPriceStep())).split('.').length
    if (pricePrecision === 2) {
      state.priceOptions = {
        ...state.priceOptions,
        precision: String(noExp(getPriceStep())).split('.')[1].length,
        max: correctValueByStep(state.price, Number(noExp(getPriceStep()))),
        step: getPriceStep()
      }
      state.price = correctValueByStep(state.price, getPriceStep())
    } else {
      state.priceOptions = {
        ...state.priceOptions,
        precision: getPriceStep(),
        max: correctValueByStep(state.price, getPriceStep()),
        step: getPriceStep()
      }
      state.price = correctValueByStep(state.price, getPriceStep())
    }

    const quantityPrecision = String(noExp(getAmountStep())).split('.').length
    if (quantityPrecision === 2) {
      state.quantityOptions = {
        ...state.quantityOptions,
        precision: String(noExp(getAmountStep())).split('.')[1].length,
        max: correctValueByStep(state.quantity, Number(noExp(getAmountStep()))),
        step: getAmountStep()
      }
      state.quantity = correctValueByStep(state.quantity, getAmountStep())
    } else {
      state.quantityOptions = {
        ...state.quantityOptions,
        precision: getAmountStep(),
        max: correctValueByStep(state.quantity, getAmountStep()),
        step: getAmountStep()

      }
      state.quantity = correctValueByStep(state.quantity, getAmountStep())
    }

    if (pricePrecision === 1 && quantityPrecision === 1) {
      state.totalOptions = { ...state.totalOptions, precision: getPriceStep() + getAmountStep() }
    }

    if (pricePrecision === 1 && quantityPrecision === 2) {
      state.totalOptions = {
        ...state.totalOptions,
        precision: getPriceStep() + String(noExp(getAmountStep())).split('.')[1].length
      }
    }

    if (pricePrecision === 2 && quantityPrecision === 1) {
      state.totalOptions = {
        ...state.totalOptions,
        precision: String(noExp(getPriceStep())).split('.')[1].length + getAmountStep()
      }
    }

    if (pricePrecision === 2 && quantityPrecision === 2) {
      state.totalOptions = {
        ...state.totalOptions,
        precision: String(noExp(getPriceStep())).split('.')[1].length + String(noExp(getAmountStep())).split('.')[1].length
      }
    }
  }

  return {
    ...toRefs(state),

    orderTypeOptions,
    getValidationInputs,
    setOrderSymbol,
    setTradingAmount,
    setOrderPrice,
    setOrderQuantity,
    calcOrderQuantity,
    setOrderRange,
    calcRange,
    calcTotal,
    fetchTradeFormats,
    onCreateOrder,
    setShowOrderModal,
    onOpenOrderModal,
    setQuantity,
    setQuantityValue,
    setRange
  }
}
