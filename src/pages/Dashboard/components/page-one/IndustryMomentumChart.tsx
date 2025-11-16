import React, { useMemo } from 'react';
import Box from '../Box';
import { useEChart } from '../../../../hooks/useEChart';
import { SHENWAN_LEVEL1_INDUSTRIES } from '../../../../constants/industries';

const IndustryMomentumChart: React.FC = React.memo(() => {
  const mockMomentumSeries = useMemo(() => {
    const dateLabels = Array.from({ length: 12 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (11 - index));
      const mm = `${date.getMonth() + 1}`.padStart(2, '0');
      const dd = `${date.getDate()}`.padStart(2, '0');
      return `${mm}-${dd}`;
    });

    const series = SHENWAN_LEVEL1_INDUSTRIES.map((industry, industryIndex) => {
      const base = 35 + (industryIndex % 6) * 8;
      const data = dateLabels.map((_, dayIndex) => {
        const wave = Math.sin((dayIndex + industryIndex) / 2.3) * 6;
        const noise = (Math.random() - 0.5) * 4;
        return Math.max(5, Math.round(base + wave * 2 + noise));
      });

      return {
        name: industry,
        type: 'line' as const,
        smooth: true,
        data,
        symbol: 'none',
        lineStyle: { width: 1.5 },
      };
    });

    return { dateLabels, series };
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

          const dateLabel = params[0]?.axisValueLabel ?? params[0]?.axisValue ?? '';
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
        data: mockMomentumSeries.dateLabels,
        axisLine: { lineStyle: { color: '#4a5568' } },
        axisLabel: { color: '#e6f7ff' },
      },
      yAxis: {
        type: 'value' as const,
        axisLine: { lineStyle: { color: '#4a5568' } },
        axisLabel: { color: '#e6f7ff' },
        splitLine: { lineStyle: { color: '#2d3748' } },
      },
      series: mockMomentumSeries.series,
    }),
    [mockMomentumSeries],
  );

  const { containerRef, isVisible } = useEChart({
    option: industryMomentumOption,
    lazy: true,
  });

  return (
    <Box title='行业动量' padding='14px' underlineTitle>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minWidth: 0,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </Box>
  );
});

IndustryMomentumChart.displayName = 'IndustryMomentumChart';

export default IndustryMomentumChart;
