import { apiClient } from '../../../api';
import type { MarketDataState } from './marketData';

export const fetchMarketData = async (): Promise<MarketDataState> => {
  const response = await apiClient.get<MarketDataState>('/market/data');
  return response.data;
};
