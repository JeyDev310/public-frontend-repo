export const botTags: {
  botRef: string;
  botName: string;
  exchangesType: string[];
  priceDecimal: number;
}[] = [
  {
    botRef: 'OPTIMUSBTC',
    botName: 'Optimus V2 BTC',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'OPTIMUSETH',
    botName: 'Optimus V2 ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'OPTIMUSBNB',
    botName: 'Optimus V2 BNB',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'AVAXUSDT1',
    botName: 'Community Bot AVAX',
    exchangesType: ['Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'IROBOTBTC',
    botName: 'Sonny BTC',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'IROBOTETH',
    botName: 'Sonny ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'IROBOTBNB',
    botName: 'Sonny BNB',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'TOMOLO1',
    botName: 'Community bot TOMO LO1',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'FRAMAV2ETH',
    botName: 'FRaMAV2 ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'GRAVITYDUSK',
    botName: 'Gravity DUSK',
    exchangesType: ['Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'GRAVITYNULS',
    botName: 'Gravity NULS',
    exchangesType: ['Binance', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'ETHINFINITY',
    botName: 'ETH Infinity',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'SUPERTRADERETH',
    botName: 'SuperTrader ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro', 'KuCoin-future', 'Binance-future', 'Ftx-future'],
    priceDecimal: 2
  },
  {
    botRef: 'SUPERTRADERLINK',
    botName: 'SuperTrader LINK',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'KuCoin-future', 'Coinbasepro', 'Binance-future', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'SUPERTRADERBNB',
    botName: 'SuperTrader BNB',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'KuCoin-future', 'Binance-future', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'SURGEBOTSXP',
    botName: 'Surge Bot SXP',
    exchangesType: ['FTX', 'Binance', 'Binance-future', 'Ftx-future', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERBTC',
    botName: 'Spooner BTC',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERETH',
    botName: 'Spooner ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERLINK',
    botName: 'Spooner LINK',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERFTT',
    botName: 'Spooner FTT',
    exchangesType: ['FTX', 'Binance', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'PGBTC',
    botName: 'Swing Sniper: BTCUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'PGETH',
    botName: 'Swing Sniper: ETHUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'PGBNB',
    botName: 'Swing Sniper: BNBUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'PGTRX',
    botName: 'Swing Sniper: TRXUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 4
  },
  {
    botRef: 'PGBAT',
    botName: 'Gold Rush: BATUSDT',
    exchangesType: ['Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'PGMATIC',
    botName: 'Gold Rush: MATICUSDT',
    exchangesType: ['Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'PGDOGE',
    botName: 'Wow much profit: DOGEUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botName: 'WT ETH',
    botRef: 'WTETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botName: 'WT BNB',
    botRef: 'WTBNB',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botName: 'WT ETC',
    botRef: 'WTETC',
    exchangesType: ['Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botName: 'WT SOL',
    botRef: 'WTSOL',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botName: 'WT CAKE',
    botRef: 'WTCAKE',
    exchangesType: ['Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botName: 'WT SHIB',
    botRef: 'WTSHIB',
    exchangesType: ['Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'NLSFTT',
    botName: 'INERTIALGO SWING FTT',
    exchangesType: ['FTX', 'Binance', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'FLUCTUSBTC',
    botName: 'Fluctus BTC',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro', 'KuCoin-future', 'Binance-future'],
    priceDecimal: 2
  },
  {
    botRef: 'HARSIBTC',
    botName: 'Harsi',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'Coinbasepro', 'KuCoin-future', 'Binance-future'],
    priceDecimal: 2
  },
  {
    botRef: 'ATAMABTS',
    botName: 'ATAMA',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi', 'KuCoin-future', 'Binance-future'],
    priceDecimal: 2
  },
  {
    botRef: 'LAIKAADA',
    botName: 'Smart ADA',
    exchangesType: ['Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'LAIKAAVAX',
    botName: 'Smart AVAX',
    exchangesType: ['Binance', 'KuCoin', 'Huobi', 'Coinbasepro'],
    priceDecimal: 2
  },
  {
    botRef: 'LAIKAATOM',
    botName: 'Smart ATOM',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'LAIKANEAR',
    botName: 'Smart NEAR',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  }
]
