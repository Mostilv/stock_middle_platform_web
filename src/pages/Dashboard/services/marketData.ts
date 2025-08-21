// 市场数据接口定义
export interface MarketData {
  current: number;
  change: number;
  history: number[];
}

export interface MarketDataState {
  shanghaiIndex: MarketData;
  nasdaqIndex: MarketData;
  goldIndex: MarketData;
  zhongzheng2000Index: MarketData;
}

// 模拟市场数据 - 5天变化数据
export const getMarketData = (): MarketDataState => ({
  shanghaiIndex: {
    current: 3700.25,
    change: 1.25,
    history: [3680.50, 3695.20, 3710.80, 3698.45, 3700.25]
  },
  nasdaqIndex: {
    current: 16543.67,
    change: -0.85,
    history: [16680.30, 16620.15, 16580.90, 16560.25, 16543.67]
  },
  goldIndex: {
    current: 2345.89,
    change: 2.15,
    history: [2295.60, 2310.25, 2325.80, 2335.45, 2345.89]
  },
  zhongzheng2000Index: {
    current: 1245.67,
    change: 0.75,
    history: [1235.20, 1240.80, 1242.50, 1243.90, 1245.67]
  }
});

// 模拟更多市场数据
export const getAdditionalMarketData = () => ({
  volume: '2.3B',
  turnover: '156.7B',
  upCount: 1245,
  downCount: 892,
  flatCount: 156,
  marketCap: '89.2T',
  peRatio: 15.6,
  pbRatio: 1.8
});
