import React, { useMemo, useCallback } from 'react';
import { useEChart } from '../../../../hooks/useEChart';
import { SHENWAN_LEVEL1_INDUSTRIES } from '../../../../constants/industries';
import type { IndustryMetricResponse } from '../../../../api/modules/analytics';
import {
  ChartPanelBody,
  ChartCanvas,
  ChartMessage,
} from './ChartPanel.styles';

interface IndustryMomentumChartProps {
  data: IndustryMetricResponse | null;
  loading: boolean;
  error: string | null;
}

const IndustryMomentumChart: React.FC<IndustryMomentumChartProps> = React.memo(
  ({ data, loading, error }) => {
    const chartSeries = useMemo(() => {
      if (!data) {
        return { dates: [] as string[], series: [] as any[] };
      }

      const orderMap = new Map(
        SHENWAN_LEVEL1_INDUSTRIES.map((name, index) => [name, index]),
      );

      const sortedSeries = [...data.series].sort((a, b) => {
        const orderA = orderMap.get(a.name) ?? Number.MAX_SAFE_INTEGER;
        const orderB = orderMap.get(b.name) ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
      });

      const series = sortedSeries.map(seriesItem => {
        const pointMap = new Map(
          seriesItem.points.map(point => [
            point.date.slice(0, 10),
            point.momentum ?? null,
          ]),
        );
        return {
          name: seriesItem.name,
          type: 'line' as const,
          smooth: true,
          data: data.dates.map(date => pointMap.get(date) ?? null),
          symbol: 'none' as const,
          lineStyle: { width: 1.5 },
        };
      });

      return { dates: data.dates, series };
    }, [data]);

    const formatYearLabel = useCallback((value: string) => {
      if (!value) {
        return '';
      }
      return value.length > 2 ? value.slice(2) : value;
    }, []);

    const industryMomentumOption = useMemo(
      () => ({
        backgroundColor: 'transparent',
        grid: { left: 45, right: 24, top: 40, bottom: 30 },
        tooltip: {
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#1890ff',
        textStyle: { color: '#e6f7ff' },
        appendToBody: true,
        formatter: (params: any) => {
          if (!Array.isArray(params) || params.length === 0) return '';

          const dateLabel =
            params[0]?.axisValueLabel ?? params[0]?.axisValue ?? '';
          const sortedItems = [...params].sort((a, b) => {
            const valueA = typeof a.data === 'number' ? a.data : Number(a.data) || 0;
            const valueB = typeof b.data === 'number' ? b.data : Number(b.data) || 0;
            return valueB - valueA;
          });

          const lines = sortedItems.map((item, index) => {
            const value =
              typeof item.data === 'number'
                ? item.data
                : Number.isFinite(Number(item.data))
                  ? Number(item.data)
                  : '-';
            return `${index + 1}. ${item.marker || ''}${item.seriesName}: ${value}`;
          });

          return [dateLabel, ...lines].join('<br/>');
        },
      },
      legend: {
        type: 'scroll' as const,
        data: [...SHENWAN_LEVEL1_INDUSTRIES],
        textStyle: { color: '#e6f7ff' },
        top: 0,
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category' as const,
        data: chartSeries.dates,
        axisLine: { lineStyle: { color: '#4a5568' } },
        axisLabel: {
          color: '#e6f7ff',
          formatter: formatYearLabel,
        },
      },
      yAxis: {
        type: 'value' as const,
        axisLine: { lineStyle: { color: '#4a5568' } },
        axisLabel: { color: '#e6f7ff' },
        splitLine: { lineStyle: { color: '#2d3748' } },
      },
      series: chartSeries.series,
    }),
      [chartSeries, formatYearLabel],
    );

    const { containerRef, isVisible } = useEChart({
      option: industryMomentumOption,
      lazy: true,
    });

    const noData = !loading && !error && chartSeries.series.length === 0;

    return (
      <ChartPanelBody style={{ flex: '1 1 auto', minHeight: 0 }}>
        {error && <ChartMessage $variant='error'>加载失败：{error}</ChartMessage>}
        {noData && <ChartMessage>暂无数据</ChartMessage>}
        <ChartCanvas
          ref={containerRef}
          style={{
            height: '100%',
            opacity: isVisible ? 1 : 0,
            filter: loading ? 'grayscale(0.7)' : 'none',
          }}
        />
      </ChartPanelBody>
    );
  },
);

IndustryMomentumChart.displayName = 'IndustryMomentumChart';

export default IndustryMomentumChart;
