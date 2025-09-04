import { apiClient } from '../../../api';

// 示例：通过后端接口获取市场数据（替代或补充本地模拟）
export interface RemoteMarketData {
  current: number;
  change: number;
  history: number[];
}

export interface RemoteMarketDataState {
  shanghaiIndex: RemoteMarketData;
  nasdaqIndex: RemoteMarketData;
  goldIndex: RemoteMarketData;
  zhongzheng2000Index: RemoteMarketData;
}

export async function fetchMarketData(): Promise<RemoteMarketDataState> {
  const { data } = await apiClient.get<RemoteMarketDataState>('/market/data');
  return data;
}


