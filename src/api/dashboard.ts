import { http } from './httpClient';
import { SHENWAN_LEVEL1_INDUSTRIES } from '../constants/industries';

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

export interface IndustryMetricPoint {
  date: string;
  momentum: number;
  width: number;
}

export interface IndustryMetricSeries {
  symbol: string;
  code: string;
  name: string;
  points: IndustryMetricPoint[];
}

export interface IndustryMetricsData {
  indicator: string;
  target: string;
  start: string;
  end: string;
  dates: string[];
  series: IndustryMetricSeries[];
}

// Mocks
const marketDataMock: RemoteMarketDataState = {
  shanghaiIndex: { current: 3700.25, change: 1.25, history: [3680.5, 3695.2, 3710.8, 3698.45, 3700.25] },
  nasdaqIndex: { current: 16543.67, change: -0.85, history: [16680.3, 16620.15, 16580.9, 16560.25, 16543.67] },
  goldIndex: { current: 2345.89, change: 2.15, history: [2295.6, 2310.25, 2325.8, 2335.45, 2345.89] },
  zhongzheng2000Index: { current: 1245.67, change: 0.75, history: [1235.2, 1240.8, 1242.5, 1243.9, 1245.67] },
};

const industryMetricDates = ['2024-08-15', '2024-08-16', '2024-08-19', '2024-08-20', '2024-08-21', '2024-08-22', '2024-08-23', '2024-08-26'];
const industryMetricsMock: IndustryMetricsData = {
  indicator: 'industry_metrics',
  target: 'primary',
  start: `${industryMetricDates[0]}T00:00:00Z`,
  end: `${industryMetricDates[industryMetricDates.length - 1]}T00:00:00Z`,
  dates: industryMetricDates,
  series: SHENWAN_LEVEL1_INDUSTRIES.map((name, index) => {
    const code = (801010 + index * 10).toString();
    return {
      symbol: `INDUSTRY:${code}`,
      code,
      name,
      points: industryMetricDates.map((date, dateIndex) => ({
        date: `${date}T00:00:00Z`,
        momentum: Number((Math.sin((index + 1) * 0.55 + (dateIndex + 1) * 0.45) * 1.3).toFixed(2)),
        width: Number(Math.max(5, 10 + (index % 6) * 2.5 + dateIndex * 1.5 + Math.cos((dateIndex + 1) * 0.7 + index * 0.2) * 1.8).toFixed(2)),
      })),
    };
  }),
};

// APIs
export const fetchMarketData = async (): Promise<RemoteMarketDataState> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return marketDataMock;
  }
  return http.get<RemoteMarketDataState>('/market/data');
};

export const fetchIndustryMetrics = async (params: { days?: number; target?: string; end?: string; }): Promise<IndustryMetricsData> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return industryMetricsMock;
  }
  return http.get<IndustryMetricsData>('/analytics/industry/metrics', { query: params as Record<string, string | number> });
};
