import { http } from '../httpClient';

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

export const fetchMarketData = (): Promise<RemoteMarketDataState> =>
  http.get<RemoteMarketDataState>('/market/data');
