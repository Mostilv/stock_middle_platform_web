import { http } from '../httpClient';

export interface IndustryMetricPoint {
  date: string;
  momentum?: number | null;
  width?: number | null;
}

export interface IndustryMetricSeries {
  symbol: string;
  code: string;
  name: string;
  points: IndustryMetricPoint[];
}

export interface IndustryMetricResponse {
  indicator: string;
  target: string;
  start: string;
  end: string;
  dates: string[];
  series: IndustryMetricSeries[];
}

export interface IndustryMetricQuery {
  days?: number;
  target?: string;
  end?: string;
}

export const fetchIndustryMetrics = (
  params?: IndustryMetricQuery,
): Promise<IndustryMetricResponse> =>
  http.get<IndustryMetricResponse>('/analytics/industry/metrics', {
    query: params,
  });
