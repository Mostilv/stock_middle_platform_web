import { useEffect, useState } from 'react';
import type { IndustryMetricResponse } from '../api/modules/analytics';
import { fetchIndustryMetrics } from '../api/modules/analytics';

interface IndustryMetricsState {
  data: IndustryMetricResponse | null;
  loading: boolean;
  error: string | null;
}

export const useIndustryMetrics = (
  selectedDate: Date | null,
  days = 12,
): IndustryMetricsState => {
  const [state, setState] = useState<IndustryMetricsState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const end = selectedDate ? selectedDate.toISOString() : undefined;
    setState(prev => ({ ...prev, loading: true, error: null }));

    fetchIndustryMetrics({ days, end })
      .then(response => {
        if (cancelled) return;
        setState({ data: response, loading: false, error: null });
      })
      .catch(error => {
        if (cancelled) return;
        const message =
          error instanceof Error ? error.message : '加载行业指标失败';
        setState({ data: null, loading: false, error: message });
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate, days]);

  return state;
};
