interface IExchange {
  [key: string]: string[];
}

interface IStableCoins {
  [key: string]: IExchange;
}

export const stableCoinsPerExchangeAndPair: IStableCoins = {
  binance: {
    eth: ['USDT', 'BUSD', 'TUSD', 'USDC'],
    btc: ['USDT', 'BUSD', 'TUSD', 'USDC'],
    ada: ['USDT', 'BUSD', 'TUSD', 'USDC'],
    bnb: ['USDT', 'BUSD', 'TUSD', 'USDC'],
    trx: ['USDT', 'BUSD', 'TUSD', 'USDC'],
    sol: ['USDT', 'BUSD', 'USDC'],
    link: ['USDT', 'BUSD', 'USDC'],
    etc: ['USDT', 'BUSD'],
    avax: ['USDT', 'BUSD'],
    bat: ['USDT', 'BUSD'],
    shib: ['USDT', 'BUSD'],
    matic: ['USDT', 'BUSD'],
    cake: ['USDT', 'BUSD'],
    doge: ['USDT', 'BUSD'],
    sxp: ['USDT', 'BUSD'],
    ftt: ['USDT', 'BUSD'],
    tomo: ['USDT', 'BUSD'],
    dusk: ['USDT', 'BUSD'],
    nuls: ['USDT', 'BUSD'],
    spell: ['USDT', 'BUSD']
  },
  ftx: {
    sol: ['USDT', 'USD'],
    link: ['USDT', 'USD'],
    eth: ['USDT', 'USD'],
    avax: ['USDT', 'USD'],
    btc: ['USDT', 'USD'],
    doge: ['USDT', 'USD'],
    bnb: ['USDT', 'USD'],
    sxp: ['USDT', 'USD'],
    ftt: ['USDT', 'USD'],
    trx: ['USDT', 'USD'],
    tomo: ['USDT', 'USD'],
    bat: ['USD'],
    shib: ['USD'],
    matic: ['USD'],
    etc: [],
    cake: [],
    ada: []
  },
  kucoin: {
    eth: ['USDT', 'TUSD', 'USDC'],
    btc: ['USDT', 'TUSD', 'USDC'],
    link: ['USDT', 'USDC'],
    doge: ['USDT', 'USDC'],
    ada: ['USDT', 'USDC'],
    bnb: ['USDT'],
    sol: ['USDT'],
    etc: ['USDT'],
    avax: ['USDT'],
    bat: ['USDT'],
    shib: ['USDT'],
    matic: ['USDT'],
    cake: ['USDT'],
    sxp: ['USDT'],
    ftt: ['USDT'],
    trx: ['USDT'],
    tomo: ['USDT']
  },
  huobi: {
    eth: ['USDT', 'USDC'],
    btc: ['USDT', 'USDC'],
    sol: ['USDT'],
    link: ['USDT'],
    etc: ['USDT'],
    avax: ['USDT'],
    bat: ['USDT'],
    shib: ['USDT'],
    matic: ['USDT'],
    cake: ['USDT'],
    doge: ['USDT'],
    bnb: ['USDT'],
    sxp: ['USDT'],
    ftt: ['USDT'],
    ada: ['USDT'],
    trx: ['USDT'],
    tomo: [],
    dusk: ['USDT', 'BUSD'],
    nuls: ['USDT', 'BUSD']
  },
  coinbasepro: {
    eth: ['USDT', 'USDC', 'USD'],
    btc: ['USDT', 'USDC', 'USD'],
    sol: ['USDT', 'USD'],
    link: ['USDT', 'USD'],
    etc: ['USD'],
    avax: ['USDT', 'USD'],
    bat: ['USDC', 'USD'],
    shib: ['USDT', 'USD'],
    matic: ['USDT', 'USD'],
    doge: ['USDT', 'USD'],
    ada: ['USDT', 'USD']
  },
  'binance-future': {
    eth: ['USDT', 'BUSD'],
    btc: ['USDT', 'BUSD'],
    link: ['USDT'],
    sxp: ['USDT'],
    bnb: ['USDT']
  },
  'ftx-future': {
    link: ['USD'],
    eth: ['USD'],
    btc: ['USD'],
    sxp: ['USD'],
    bnb: ['USD']
  },
  'kucoin-future': {
    eth: ['USDT', 'USD'],
    btc: ['USDT', 'USD'],
    link: ['USDT'],
    sxp: ['USDT'],
    bnb: ['USDT']
  }
}
