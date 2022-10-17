import {
  IPortfolioEvolutionChart,
  IBtcAmount,
  IDistributionTableData,
  IDistributionChartData
} from '@/types'
import dayjs from 'dayjs'

export const generateTotalBalance = (cexBalance: IBtcAmount, dexBalance: IBtcAmount) => {
  return {
    btc: cexBalance.btc + dexBalance.btc
  }
}

export const generateTotalDistributionTable =
    (cexDistribution: IDistributionTableData[], dexDistribution: IDistributionTableData[]) => {
      const data: IDistributionTableData[] = []

      if (cexDistribution) {
        cexDistribution.forEach((token) => {
          const existingToken = data.find((item) => token.coin === item.coin)
          if (existingToken) {
            existingToken.amount += token.amount ? token.amount : 0
            existingToken.btc += token.btc ? token.btc : 0
          } else {
            data.push({
              ...token
            })
          }
        })
      }

      if (dexDistribution) {
        dexDistribution.forEach((token) => {
          const existingToken = data.find(({ coin }) =>
            token.coin === coin)
          if (existingToken) {
            existingToken.amount += token.amount ? token.amount : 0
            existingToken.btc += token.btc ? token.btc : 0
          } else {
            data.push(token)
          }
        })
      }

      return data.sort((a: any, b: any) => b.btc - a.btc)
    }

export const generateTotalDistributionChart = (totalDistributionTable: IDistributionTableData[]) => {
  const btcTotal = totalDistributionTable.map((x) => x.btc ? x.btc : 0).reduce((a: any, b) => a + b, 0)

  const data: IDistributionChartData[] = []

  totalDistributionTable.filter((__, index) => index <= 7).map((item) => {
    data.push({
      currency: `${item.coin} ${item.blockchain === 'bsc' ? 'on BSC' : ''}`,
      btc: item.btc,
      currencyAmount: item.amount,
      percentage: btcTotal ? item.btc * 100 / btcTotal : 0
    })
  })

  const other = totalDistributionTable.filter((__, index) => index > 7).reduce<any>(
    (acc, item) => ({
      currency: 'other',
      btc: acc.btc + item.btc ? item.btc : 0,
      percentage: btcTotal ? item.btc * 100 / btcTotal : 0
    }),
    {
      currency: 'other',
      btc: 0,
      eur: 0,
      usd: 0,
      percentage: 0
    }
  )

  if (other) data.push(other)

  return data
}

export const generateTotalEvolutionChart =
      (cexEvolution: IPortfolioEvolutionChart, dexEvolution: IPortfolioEvolutionChart) => {
        if (!Object.keys(cexEvolution).length && Object.keys(dexEvolution).length) return dexEvolution
        if (Object.keys(cexEvolution).length && !Object.keys(dexEvolution).length) return cexEvolution

        if (Object.keys(cexEvolution).length && Object.keys(dexEvolution).length) {
          const datasets = cexEvolution.datasets.map((dataset, i) => {
            return {
              ...dataset,
              data: dataset.data.map((cexNetworth, j) => {
                let index = -1
                dexEvolution.labels.find((label, p) => {
                  if (dayjs(cexEvolution.labels[j]).isSame(dayjs(label), 'day')) {
                    index = p
                    return true
                  }
                  return false
                })
                return (parseFloat(cexNetworth.toString()) + (index >= 0
                  ? parseFloat(dexEvolution.datasets[i].data[index].toString()) : 0))
              })
            }
          })

          return {
            labels: cexEvolution.labels,
            datasets: datasets
          }
        }

        return { labels: [], datasets: []}
      }
