import { http } from './httpClient';

export interface PortfolioItem {
  key: string;
  stock: string;
  code: string;
  currentWeight: number;
  targetWeight: number;
  action: 'buy' | 'sell' | 'hold';
  price: number;
  quantity: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  marketValue: number;
}

export interface StrategyPortfolio {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  totalValue: number;
  totalWeight: number;
  items: PortfolioItem[];
  createdAt: string;
}

export interface PortfolioOverviewResponse {
  strategies: StrategyPortfolio[];
  todayPnL: number;
  totalPnL: number;
  todayRebalance: number;
  todayPendingRebalance: number;
}

const portfolioOverviewMock: PortfolioOverviewResponse = {
  strategies: [
    {
      id: '1',
      name: '价值投资策略',
      description: '基于基本面分析的价值投资策略',
      status: 'active',
      totalValue: 1000000,
      totalWeight: 100,
      items: [
        { key: '1', stock: '贵州茅台', code: '600519', currentWeight: 15.2, targetWeight: 18, action: 'buy', price: 1688, quantity: 100, status: 'pending', createdAt: '2024-01-15', marketValue: 168800 },
        { key: '2', stock: '招商银行', code: '600036', currentWeight: 8.5, targetWeight: 8.5, action: 'hold', price: 35.2, quantity: 0, status: 'completed', createdAt: '2024-01-13', marketValue: 0 },
      ],
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: '成长投资策略',
      description: '专注于高成长性公司的投资策略',
      status: 'active',
      totalValue: 800000,
      totalWeight: 100,
      items: [
        { key: '3', stock: '宁德时代', code: '300750', currentWeight: 12.8, targetWeight: 10, action: 'sell', price: 245.6, quantity: 200, status: 'completed', createdAt: '2024-01-14', marketValue: 49120 },
      ],
      createdAt: '2024-01-05',
    },
  ],
  todayPnL: 12500,
  totalPnL: 89000,
  todayRebalance: 8,
  todayPendingRebalance: 3,
};

export const fetchPortfolioOverview = async (): Promise<PortfolioOverviewResponse> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return portfolioOverviewMock;
  }
  return http.get<PortfolioOverviewResponse>('/portfolio/overview');
};

export const togglePortfolioStrategy = async (strategyId: string, active: boolean): Promise<void> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return;
  }
  return http.post(`/portfolio/strategies/${strategyId}/toggle?active=${active}`);
};
