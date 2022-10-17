export const allDexWalletsOption = {
  label: '',
  address: '',
  allWallets: true
}

export const dummyProjectData = {
  uniswapV2: [
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 123.456 }, { tickerSymbol: 'ETH', balance: 123.456 }],
      totalUsdValue: 246.912
    },
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 789.123 }, { tickerSymbol: 'ETH', balance: 789.123 }],
      totalUsdValue: 1578.246
    }
  ],
  pancakeswap: [
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 123.456 }, { tickerSymbol: 'ETH', balance: 123.456 }],
      totalUsdValue: 246.912
    },
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 789.123 }, { tickerSymbol: 'ETH', balance: 789.123 }],
      totalUsdValue: 1578.246
    }
  ],
  balancer: [
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 123.456 }, { tickerSymbol: 'ETH', balance: 123.456 }],
      totalUsdValue: 246.912
    },
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 789.123 }, { tickerSymbol: 'ETH', balance: 789.123 }],
      totalUsdValue: 1578.246
    }
  ],
  curve: [
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 123.456 }, { tickerSymbol: 'ETH', balance: 123.456 }],
      totalUsdValue: 246.912
    },
    {
      tokens: [{ tickerSymbol: 'BTC', balance: 789.123 }, { tickerSymbol: 'ETH', balance: 789.123 }],
      totalUsdValue: 1578.246
    }
  ],
  aave: {
    supplied: [
      { tickerSymbol: 'BTC', balance: 1, usdValue: 40220.40 },
      { tickerSymbol: 'ETH', balance: 1, usdValue: 2290.57 },
      { tickerSymbol: 'LINK', balance: 1, usdValue: 2290.57 },
      { tickerSymbol: 'BNB', balance: 1, usdValue: 2290.57 }
    ],
    borrowed: [
      { tickerSymbol: 'BTC', balance: 1, usdValue: 40220.40 },
      { tickerSymbol: 'ETH', balance: 1, usdValue: 2290.57 },
      { tickerSymbol: 'LINK', balance: 1, usdValue: 2290.57 },
      { tickerSymbol: 'BNB', balance: 1, usdValue: 2290.57 }
    ]
  },
  compound: {
    supplied: [
      [
        { tickerSymbol: 'BTC', balance: 1, usdValue: 40220.40, apr: 0.12 },
        { tickerSymbol: 'ETH', balance: 1, usdValue: 2290.57, apr: 0.12 }
      ],
      [
        { tickerSymbol: 'BNB', balance: 1, usdValue: 312.84, apr: 0.12 },
        { tickerSymbol: 'LINK', balance: 1, usdValue: 18.96, apr: 0.12 }
      ]
    ],
    borrowed: [
      [
        { tickerSymbol: 'BTC', balance: 1, usdValue: 40220.40, apr: 0.12 },
        { tickerSymbol: 'ETH', balance: 1, usdValue: 2290.57, apr: 0.12 }
      ],
      [
        { tickerSymbol: 'BNB', balance: 1, usdValue: 312.84, apr: 0.12 },
        { tickerSymbol: 'LINK', balance: 1, usdValue: 18.96, apr: 0.12 }
      ]
    ]
  },
  sushiswap: {
    stake: {
      tickerSymbol: 'BTC', balance: 123.456, usdValue: 246.912
    }
  }
}
