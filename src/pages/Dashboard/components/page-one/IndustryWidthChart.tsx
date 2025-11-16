import React, { useMemo, useCallback } from 'react';
import Box from '../Box';
import { useEChart } from '../../../../hooks/useEChart';
import { SHENWAN_LEVEL1_INDUSTRIES } from '../../../../constants/industries';
import type { IndustryMetricResponse } from '../../../../api/modules/analytics';

interface IndustryWidthChartProps {
  data: IndustryMetricResponse | null;
  loading: boolean;
  error: string | null;
}

const IndustryWidthChart: React.FC<IndustryWidthChartProps> = React.memo(
  ({ data, loading, error }) => {
    const chartData = useMemo(() => {
      if (!data) {
        return {
          dateLabels: [] as string[],
          industries: [] as string[],
          widthData: [] as [number, number, number | null][],
        };
      }

      const orderMap = new Map(
        SHENWAN_LEVEL1_INDUSTRIES.map((name, index) => [name, index]),
      );
      const sortedSeries = [...data.series].sort((a, b) => {
        const orderA = orderMap.get(a.name) ?? Number.MAX_SAFE_INTEGER;
        const orderB = orderMap.get(b.name) ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
      });

      const reversedDates = [...data.dates].reverse();
      const widthData: [number, number, number | null][] = [];

      sortedSeries.forEach((seriesItem, industryIndex) => {
        const widthMap = new Map(
          seriesItem.points.map(point => [
            point.date.slice(0, 10),
            point.width ?? null,
          ]),
        );
        reversedDates.forEach((dateLabel, dateIndex) => {
          widthData.push([
            industryIndex,
            dateIndex,
            widthMap.get(dateLabel) ?? null,
          ]);
        });
      });

      return {
        dateLabels: reversedDates,
        industries: sortedSeries.map(item => item.name),
        widthData,
      };
    }, [data]);

    const totalDates = chartData.dateLabels.length;
    const visibleWindow = Math.min(10, totalDates || 10);
    const defaultStart =
      totalDates > visibleWindow
        ? ((totalDates - visibleWindow) / totalDates) * 100
        : 0;
    const defaultEnd = 100;

    const formatLabelVertical = useCallback(
      (label: string) => (label ? label.split('').join('\n') : ''),
      [],
    );

    const industryWidthOption = useMemo(
      () => ({
        backgroundColor: 'transparent',
        grid: { left: 60, right: 30, top: 10, bottom: 10 },
        tooltip: {
          show: true,
          trigger: 'item' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' },
          formatter: (params: any) => {
            const [industryIndex, dateIndex, value] = params.data;
            const date = chartData.dateLabels[dateIndex];
            const industry = chartData.industries[industryIndex];
            const widthValue =
              typeof value === 'number' ? `${value.toFixed(2)}%` : '-';
            return `${date}<br/>${industry}: ${widthValue}`;
          },
        },
        xAxis: {
          type: 'category' as const,
          data: chartData.industries,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: {
            color: '#e6f7ff',
            fontSize: 10,
            interval: 0,
            formatter: formatLabelVertical,
          },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'category' as const,
          data: chartData.dateLabels,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        visualMap: {
          show: false,
          min: -20,
          max: 40,
          inRange: { color: ['rgba(0,100,0,0.35)', 'rgba(139,0,0,0.35)'] },
        },
        dataZoom: [
          {
            type: 'inside' as const,
            yAxisIndex: 0,
            filterMode: 'weakFilter' as const,
            zoomOnMouseWheel: true,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
            start: defaultStart,
            end: defaultEnd,
          },
          {
            type: 'slider' as const,
            yAxisIndex: 0,
            right: 8,
            width: 12,
            top: 20,
            bottom: 20,
            orient: 'vertical' as const,
            brushSelect: false,
            start: defaultStart,
            end: defaultEnd,
            moveHandleSize: 8,
            selectedDataBackground: {
              lineStyle: { color: '#1890ff' },
              areaStyle: { color: 'rgba(24, 144, 255, 0.2)' },
            },
          },
        ],
        series: [
          {
            type: 'heatmap' as const,
            data: chartData.widthData,
            label: {
              show: true,
              formatter: ({ value }: any) =>
                Array.isArray(value) && value[2] !== null
                  ? value[2].toFixed(1)
                  : '-',
              color: 'rgba(230,247,255,0.9)',
              fontSize: 10,
            },
            progressive: 0,
            emphasis: {
              disabled: false,
              itemStyle: {
                borderColor: '#1890ff',
                borderWidth: 3,
                shadowBlur: 15,
                shadowColor: 'rgba(24, 144, 255, 0.6)',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
              },
            },
            select: {
              disabled: false,
              itemStyle: {
                borderColor: '#1890ff',
                borderWidth: 2,
              },
            },
          },
        ],
      }),
      [chartData, defaultStart, defaultEnd, formatLabelVertical],
    );

    const { containerRef, isVisible } = useEChart({
      option: industryWidthOption,
      lazy: true,
    });

    const noData = !loading && !error && chartData.widthData.length === 0;

    return (
      <Box title='行业宽度' padding='14px' underlineTitle>
        {error && (
          <p style={{ color: '#ff7875', marginBottom: 12 }}>加载失败：{error}</p>
        )}
        {noData && (
          <p style={{ color: '#d1d5db', marginBottom: 12 }}>暂无数据</p>
        )}
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            minWidth: 0,
            opacity: isVisible ? 1 : 0,
            filter: loading ? 'grayscale(0.7)' : 'none',
          }}
        />
      </Box>
    );
  },
);

IndustryWidthChart.displayName = 'IndustryWidthChart';

export default IndustryWidthChart;
