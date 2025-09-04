import { apiClient } from '../../../api';

export interface SectorData {
  name: string;
  count: number;
  value: number;
}

export interface StockItem {
  name: string;
  code: string;
  time: string;
  price: number;
  changePercent: number;
  volume1: number;
  volume2: number;
  ratio1: number;
  ratio2: number;
  sectors: string[];
  marketCap?: number;
  pe?: number;
  pb?: number;
}

export interface LadderGroup {
  level: number; // 0 表示断板
  count: number;
  stocks: StockItem[];
}

export interface LimitUpOverviewResponse {
  date: string;
  sectors: SectorData[];
  ladders: LadderGroup[];
}

export async function fetchLimitUpOverview(date?: string): Promise<LimitUpOverviewResponse> {
  const { data } = await apiClient.get<LimitUpOverviewResponse>('/limitup/overview', {
    query: date ? { date } : undefined,
  });
  return data;
}


