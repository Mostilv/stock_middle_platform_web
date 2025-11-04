import { apiClient } from '../../../api';

export interface PortfolioItemDTO {
  key: string;
  stock: string;
  code: string;
  currentWeight: number;
  targetWeight: number;
  action: 'buy' | 'sell' | 'hold';
  price: number;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  marketValue: number;
}

export interface StrategyDTO {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  totalValue: number;
  totalWeight: number;
  items: PortfolioItemDTO[];
  createdAt: string;
}

export interface PortfolioOverviewResponse {
  strategies: StrategyDTO[];
  todayPnL: number;
  totalPnL: number;
  todayRebalance: number;
  todayPendingRebalance: number;
}

export async function fetchPortfolioOverview(): Promise<PortfolioOverviewResponse> {
  const { data } = await apiClient.get<PortfolioOverviewResponse>(
    '/portfolio/overview',
  );
  return data;
}
