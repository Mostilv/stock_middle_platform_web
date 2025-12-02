import React, { useMemo, useCallback } from 'react';
import { useEChart } from '../../../../hooks/useEChart';
import { SHENWAN_LEVEL1_INDUSTRIES } from '../../../../constants/industries';
import type { IndustryMetricResponse } from '../../../../api/modules/analytics';
import { formatShortDateLabel } from '../../../../utils/date';
import {
  buildRankingTooltipContent,
  TOOLTIP_EXTRA_CSS,
} from '../../../../utils/chartTooltip';
import {
  ChartPanelBody,
  ChartCanvas,
  ChartMessage,
} from './ChartPanel.styles';

interface IndustryWidthChartProps {
  data: IndustryMetricResponse | null;
  loading: boolean;
  error: string | null;
}

const IndustryWidthChart: React.FC<IndustryWidthChartProps> = React.memo(
  ({ data, loading, error }) => {
    const chartData = useMemo(() => {
      const industries = [...SHENWAN_LEVEL1_INDUSTRIES];
      const normalizedDates = (data?.dates ?? []).map(date =>
        date.slice(0, 10),
      );
      const reversedDates = [...normalizedDates].reverse();

      const widthData: [number, number, number | null][] = [];
      const dateIndustryValues = new Map<
        string,
        { industry: string; value: number | null }[]
      >();
      reversedDates.forEach(date => {
        dateIndustryValues.set(date, []);
      });

      industries.forEach((industryName, industryIndex) => {
        const seriesItem = data?.series.find(item => item.name === industryName);
        const widthMap = new Map(
          (seriesItem?.points ?? []).map(point => [
            point.date.slice(0, 10),
            point.width ?? null,
          ]),
        );

        reversedDates.forEach((dateLabel, dateIndex) => {
          const widthValue = widthMap.get(dateLabel) ?? null;
          widthData.push([industryIndex, dateIndex, widthValue]);
          dateIndustryValues.get(dateLabel)?.push({
            industry: industryName,
            value: widthValue,
          });
        });
      });

      return {
        dateLabels: reversedDates,
        industries,
        widthData,
        dateIndustryValues,
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

    const formatDateLabel = useCallback(
      (label: string) => formatShortDateLabel(label),
      [],
    );

    const tooltipPosition = useCallback(
      (
        point: number[],
        _params: unknown,
        _dom?: HTMLElement,
        _rect?: any,
        size?: { contentSize: number[]; viewSize: number[] },
      ) => {
        const [mouseX, mouseY] = point;
        const [tipWidth, tipHeight] = size?.contentSize ?? [0, 0];
        const fallbackWidth =
          typeof window !== 'undefined' ? window.innerWidth : tipWidth;
        const fallbackHeight =
          typeof window !== 'undefined' ? window.innerHeight : tipHeight;
        const [viewWidth, viewHeight] = size?.viewSize ?? [
          fallbackWidth,
          fallbackHeight,
        ];

        let left = mouseX + 16;
        if (left + tipWidth > viewWidth - 8) {
          left = mouseX - tipWidth - 16;
        }
        left = Math.max(8, Math.min(left, viewWidth - tipWidth - 8));

        const nearTop = mouseY < tipHeight + 40;
        let top = nearTop ? mouseY + 16 : mouseY - tipHeight - 16;
        if (top + tipHeight > viewHeight - 8) {
          top = viewHeight - tipHeight - 8;
        }
        top = Math.max(8, top);
        return [left, top];
      },
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
          appendToBody: true,
          position: tooltipPosition,
          extraCssText: TOOLTIP_EXTRA_CSS,
          formatter: (params: any) => {
            const [industryIndex, dateIndex] = params.data;
            const dateLabel = chartData.dateLabels[dateIndex];
            const date = formatDateLabel(dateLabel);
            const hoveredIndustry = chartData.industries[industryIndex];
            const values =
              chartData.dateIndustryValues.get(dateLabel) ?? [];
            const sorted = [...values].sort((a, b) => {
              const valueA = typeof a.value === 'number' ? a.value : -Infinity;
              const valueB = typeof b.value === 'number' ? b.value : -Infinity;
              return valueB - valueA;
            });
            const items = sorted.map((item, idx) => ({
              rank: idx + 1,
              label: item.industry,
              value:
                typeof item.value === 'number'
                  ? `${item.value.toFixed(2)}%`
                  : '-',
              highlight: item.industry === '银行',
            }));
            return buildRankingTooltipContent(date, items);
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
          axisLabel: {
            color: '#e6f7ff',
            fontSize: 10,
            formatter: formatDateLabel,
          },
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
      [
        chartData,
        defaultStart,
        defaultEnd,
        formatLabelVertical,
        formatDateLabel,
        tooltipPosition,
      ],
    );

    const { containerRef, isVisible } = useEChart({
      option: industryWidthOption,
      lazy: true,
    });

    const noData = !loading && !error && chartData.widthData.length === 0;

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

IndustryWidthChart.displayName = 'IndustryWidthChart';

export default IndustryWidthChart;
