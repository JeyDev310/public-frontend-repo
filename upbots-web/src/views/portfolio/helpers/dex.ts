import {
  IDistributionTableData,
  IDexWallet,
  IProjectData,
  IToken,
  IDexAssetSummary,
  IUSDConverstion,
  IDexEvolutionAmount
} from '@/types'
import { getConvertedCurrency } from '@/global-setup/global.composition.setup'
import { fixedDecimal, cloneDeep } from '@/core/helpers/index'
import dayjs from 'dayjs'

export const getTokensSum = (tokens: IToken[], wallet: IDexWallet): IToken[] => {
  const res: IToken[] = []
  tokens.forEach((token) => {
    if (wallet.address && token.address !== wallet.address) return
    const existingToken = res.find(
      ({ contractTickerSymbol, blockchain }) =>
        token.contractTickerSymbol === contractTickerSymbol &&
        token.blockchain === blockchain
    )
    if (existingToken) {
      existingToken.balance += token.balance
      existingToken.quote += token.quote
    } else {
      res.push({ ...token })
    }
  })

  return res
}

export const generateDexDistributionData = (tokens: IToken[],
  selectedWallet: IDexWallet, conversionRate: IUSDConverstion) => {
  const portfolioTokens = getTokensSum(tokens, selectedWallet).map((token: IToken) => ({
    coin: token.contractTickerSymbol,
    amount: token.balance,
    btc: token.quote * conversionRate.btc,
    blockchain: token.blockchain
  })).sort((a, b) => b.btc - a.btc)
  return portfolioTokens
}

export const generateDexDistributionChartData = (distribution: IDistributionTableData[]) => {
  const total = distribution.map((x: IDistributionTableData) => x.btc).reduce((a, b) => a + b, 0)
  return distribution.map((item) => ({
    currency: item.coin,
    percentage: fixedDecimal(item.btc * 100 / total, 2, 0),
    blockchain: item.blockchain
  }))
}

export const reduceProjectData = (projectsData: IProjectData[], wallet: IDexWallet): IProjectData => {
  const res: IProjectData = {}
  let data: IProjectData[] = []
  if (wallet.allWallets) {
    data = cloneDeep(projectsData)
  } else if (wallet.address) {
    data = (cloneDeep(projectsData) as IProjectData[]).filter((project) => project.address === wallet.address)
  }

  data.forEach((d) => {
    if (d.uniswapV2 && res.uniswapV2) {
      if (res.uniswapV2.length) res.uniswapV2 = [...d.uniswapV2, ...res.uniswapV2]
    } else if (d.uniswapV2) {
      res.uniswapV2 = [...d.uniswapV2]
    }

    if (d.pancakeswap && res.pancakeswap) {
      if (res.pancakeswap.length) res.pancakeswap = [...d.pancakeswap, ...res.pancakeswap]
    } else if (d.pancakeswap) {
      res.pancakeswap = [...d.pancakeswap]
    }

    if (d.balancer && res.balancer) {
      if (res.balancer.length) res.balancer = [...d.balancer, ...res.balancer]
    } else if (d.balancer) {
      res.balancer = d.balancer
    }

    if (d.curve && res.curve) {
      if (res.curve.length) res.curve = [...d.curve, ...res.curve]
    } else if (d.curve) {
      res.curve = d.curve
    }

    if (d.aave && res.aave) {
      if (Object.keys(res.aave).length) {
        res.aave.supplied = [...d.aave.supplied, ...res.aave.supplied]
        res.aave.borrowed = [...d.aave.borrowed, ...res.aave.borrowed]
      } else {
        res.aave.supplied = []
        res.aave.borrowed = []
      }
    } else if (d.aave) {
      res.aave = d.aave
    }

    if (d.compound && res.compound) {
      if (Object.keys(res.compound).length) {
        res.compound.supplied = [...d.compound.supplied, ...res.compound.supplied]
        res.compound.borrowed = [...d.compound.borrowed, ...res.compound.borrowed]
      } else {
        res.compound.supplied = []
        res.compound.borrowed = []
      }
    } else if (d.compound) {
      res.compound = d.compound
    }

    if (d.sushiswap && res.sushiswap) {
      if (Object.keys(res.sushiswap).length && Object.keys(res.sushiswap.stake).length) {
        res.sushiswap.stake.balance += d.sushiswap.stake.balance
        res.sushiswap.stake.usdValue += d.sushiswap.stake.usdValue
      } else {
        res.sushiswap.stake.balance = 0
        res.sushiswap.stake.usdValue = 0
      }
    } else if (d.sushiswap) {
      res.sushiswap = d.sushiswap
    }
  })

  return res
}

export const generateDexPortfolioEvolution = (
  selectedWallet: IDexWallet,
  assetsEvolution: IDexAssetSummary[],
  timeFrame: string,
  favoriteCurrency: string
) => {
  const filteredAssets = selectedWallet.address
    ? assetsEvolution.filter((item: IDexAssetSummary) => selectedWallet.address === item.address)
    : assetsEvolution

  if (filteredAssets.length === 0) return { labels: [], datasets: []}

  let longestEvolution = filteredAssets[0]

  /* CHECK IF ALL WALLETS HAVE ONE DATA POINT EACH */
  let dataPoints = 0
  filteredAssets.map((item) => {
    dataPoints = dataPoints + item.evolution.length
  })

  if (filteredAssets.length === dataPoints && !selectedWallet.address) {
    /* SUM ALL DATA POINTS FROM ALL WALLETS */
    longestEvolution = {
      address: longestEvolution.address,
      evolution: [{
        btc: filteredAssets.map(asset => asset.evolution[0].btc).reduce((a, b) => a + b),
        date: longestEvolution.evolution[0].date
      }]
    }
  } else {
    /* SELECT ONLY THE WALLET THAT HAS THE LONGEST EVOLUTION PERIOD */
    filteredAssets.map((x: IDexAssetSummary) => {
      if (x.evolution.length > longestEvolution.evolution.length) {
        longestEvolution = x
      }
    })
  }

  /* FILTERED DATA */
  const end = dayjs().format('YYYY-MM-DD')
  let start = ''

  if (timeFrame === 'all') {
    start = '1970-01-01'
  } else if (timeFrame === '1,day') {
    start = dayjs().subtract(1, 'days').format('YYYY-MM-DD')
  } else {
    const [num, type]: any = timeFrame.split(',')
    start = dayjs().subtract(Number(num), type).format('YYYY-MM-DD')
  }

  const filteredData = longestEvolution.evolution.filter((el: IDexEvolutionAmount) => {
    return dayjs(el.date).format('YYYY-MM-DD') >= start && dayjs(el.date).format('YYYY-MM-DD') <= end
  })

  if (!filteredData) return { labels: [], datasets: []}

  const filteredLabels = filteredData.map(({ date }) => date)

  const chartData = {
    labels: filteredLabels.map((date) => dayjs(date).format('YYYY-MM-DD')),
    datasets: [
      {
        name: 'BTC',
        data: filteredData.map((el: IDexEvolutionAmount) => el.btc)
      },
      {
        name: favoriteCurrency.toUpperCase(),
        data: filteredData.map((el: IDexEvolutionAmount) => fixedDecimal(getConvertedCurrency(el.btc || 0), 8, 0))
      }
    ]
  }

  return chartData
}

export const calculateTotalAssets = (tokens: IToken[], projectsDataList: IProjectData[],
  wallet: IDexWallet): number => {
  const walletAssets = getTokensSum(tokens, wallet).reduce((acc, { quote }) => acc + quote, 0)
  const projectsData = reduceProjectData(projectsDataList, wallet)

  let defiAssets = 0

  if (projectsData.uniswapV2) {
    const uniswapV2Assets = projectsData.uniswapV2.reduce((acc, { totalUsdValue }) => acc + totalUsdValue, 0)
    defiAssets += uniswapV2Assets
  }

  if (projectsData.balancer) {
    const balancerAssets = projectsData.balancer.reduce((acc, { totalUsdValue }) => acc + totalUsdValue, 0)
    defiAssets += balancerAssets
  }

  if (projectsData.curve) {
    const curveAssets = projectsData.curve.reduce((acc, { totalUsdValue }) => acc + totalUsdValue, 0)
    defiAssets += curveAssets
  }

  if (projectsData.aave) {
    if (Object.keys(projectsData.aave).length) {
      const aaveAssets = projectsData.aave.supplied.reduce((acc, { usdValue }) => acc + usdValue, 0)
      defiAssets += aaveAssets
    }
  }

  if (projectsData.compound) {
    if (Object.keys(projectsData.compound).length) {
      const compoundAssets = projectsData.compound.supplied.reduce(
        (acc, supp) => acc + supp.reduce((acc2, { usdValue }) => acc2 + usdValue, 0),
        0
      )

      defiAssets += compoundAssets
    }
  }

  if (projectsData.sushiswap) {
    if (Object.keys(projectsData.sushiswap).length && Object.keys(projectsData.sushiswap.stake).length) {
      const sushiswapAssets = projectsData.sushiswap.stake.usdValue
      defiAssets += sushiswapAssets
    }
  }

  return defiAssets + walletAssets
}

export const calculateTotalDebts = (projectsDataList: IProjectData[], wallet: IDexWallet): number => {
  const projectsData = reduceProjectData(projectsDataList, wallet)
  let totalDebts = 0

  if (projectsData.aave) {
    if (projectsData.aave.borrowed) {
      const aaveAssets = projectsData.aave.borrowed
        .reduce((acc, { usdValue }) => acc + usdValue, 0)
      totalDebts += aaveAssets
    }
  }

  if (projectsData.compound) {
    const compoundAssets = projectsData.compound.borrowed.reduce(
      (acc, borr) => acc + borr.reduce((acc2, { usdValue }) => acc2 + usdValue, 0),
      0
    )

    totalDebts += compoundAssets
  }

  return totalDebts
}
