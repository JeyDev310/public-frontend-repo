/* eslint-disable no-prototype-builtins */
import { ICexDistributionChart, ICexDistributionAmount } from '@/types'
import { fixedDecimal } from '@/core/helpers'
import { getConvertedCurrency } from '@/global-setup/global.composition.setup'

export const generateCexDistributionChartData = (distribution: ICexDistributionChart) => {
  return Object.keys(distribution).map((key) => ({
    currency: key,
    btc: fixedDecimal(distribution[key] && distribution[key].btc, 2, 0),
    percentage: fixedDecimal(distribution[key] && distribution[key].percentage / 100, 2, 0),
    currencyAmount: fixedDecimal(distribution[key] &&
      distribution[key].currencyAmount, 4, 0)
  }))
}

export const generateCexEvolutionData = ({ keys, selectedWallets, result }: any) => {
  const selectWalletsId = keys.filter((k: any) => selectedWallets.includes(k.name)).map((k: any) => k.id)
  const evolutionData = result.filter((ev: any) => selectWalletsId.some((k: any) => k === ev.account))

  return evolutionData
    .reduce((acc: any, cur: any) => [...acc, ...cur.data], [])
    .sort((a: any, b: any) => {
      return (new Date(a.date) as any) - (new Date(b.date) as any)
    })
}

export const parseTotalCexEvolutionData = (obj: any) => {
  const total = generateCexEvolutionData(obj)

  const labels = [...new Set(total.map((i: any) => i.date))]

  const seen: any = {}
  const parsedData = total
    .filter((entry: any) => {
      let previous

      if (seen.hasOwnProperty(entry.date)) {
        previous = seen[entry.date]
        previous.data.push(entry)

        return false
      }

      if (!Array.isArray(entry.data)) {
        entry.data = [entry]
      }

      seen[entry.date] = entry
      return true
    })
    .map((i: any) => {
      return i.data.reduce(
        (acc: any, cur: any) => {
          return {
            btc: (Number(acc.btc) ? acc.btc : 0) + cur.btc,
            eur: (Number(acc.eur) ? acc.eur : 0) + cur.eur,
            usd: (Number(acc.usd) ? acc.usd : 0) + cur.usd
          }
        },
        { btc: 0, eur: 0, usd: 0 }
      )
    })

  return { labels, parsedData }
}

export const generateCexEvolutionChartData = ({ labels, parsedData, favoriteCurrency }: ICexDistributionChart) => {
  return {
    labels,
    datasets: [
      {
        name: 'BTC', data: parsedData.map((d: ICexDistributionAmount) => fixedDecimal(d.btc, 8, 0))
      },
      {
        name: favoriteCurrency.label,
        data: parsedData.map((d: any) => fixedDecimal(getConvertedCurrency(d.btc || 0), 8, 0))
      }
    ]
  }
}

export const portfolioFilterUrl = (payload: { selectedWallets: string[]; take?: number; }) => {
  let url = '/portfolio/filter'

  const config = {
    params: {}
  }

  if (payload.selectedWallets.length > 0) {
    if (payload.selectedWallets.includes('all')) {
      url += '/all'
    } else {
      if (payload.take) {
        config.params = {
          q: payload.selectedWallets.join(','),
          take: payload.take
        }
      } else {
        config.params = {
          q: payload.selectedWallets.join(',')
        }
      }
    }
  }
  return { url, config }
}
