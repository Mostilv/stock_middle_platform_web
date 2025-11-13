import React, { useMemo, useCallback } from 'react';
import Box from '../Box';
import { useEChart } from '../../../../hooks/useEChart';
import { SHENWAN_LEVEL1_INDUSTRIES } from '../../../../constants/industries';

interface IndustryWidthChartProps {
  selectedDate: Date | null;
}

const IndustryWidthChart: React.FC<IndustryWidthChartProps> = React.memo(
  ({ selectedDate }) => {
    // 生成最近N天日期，最后一天为选择的日期或今天
    const generateRecentDates = useCallback(
      (days: number) => {
        const result: string[] = [];
        const endDate = selectedDate ? new Date(selectedDate) : new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - days + 1);

        for (let i = 0; i < days; i += 1) {
          const d = new Date(startDate);
          d.setDate(startDate.getDate() + i);
          const mm = `${d.getMonth() + 1}`.padStart(2, '0');
          const dd = `${d.getDate()}`.padStart(2, '0');
          result.push(`${mm}-${dd}`);
        }
        return result;
      },
      [selectedDate],
    );

    // 生成行业宽度数据 - 优化依赖项
    const chartData = useMemo(() => {
      // Build data range based on selected date
      const today = new Date();
      const endDate = selectedDate ? new Date(selectedDate) : today;

      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 29); // look back 30 days

      const daysDiff = Math.max(
        1,
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ),
      );
      const maxDays = Math.min(30, Math.max(10, daysDiff));
      const dateLabels = generateRecentDates(maxDays);
      const reversedDates = [...dateLabels].reverse();
      const industries = [...SHENWAN_LEVEL1_INDUSTRIES];
      const widthData: [number, number, number][] = [];

      for (let i = 0; i < dateLabels.length; i += 1) {
        const yIndex = reversedDates.length - 1 - i;
        for (let j = 0; j < industries.length; j += 1) {
          const base = 50 + 30 * Math.sin(i / 6 + j);
          const val = Math.max(0, Math.min(100, Math.round(base)));
          widthData.push([j, yIndex, val]);
        }
      }

      return { dateLabels: reversedDates, industries, widthData };
    }, [selectedDate, generateRecentDates]);

    // 默认显示最近10天
    const totalDates = chartData.dateLabels.length;
    const visibleWindow = Math.min(10, totalDates);
    const defaultStart =
      totalDates > visibleWindow
        ? ((totalDates - visibleWindow) / totalDates) * 100
        : 0;
    const defaultEnd = 100;

    // 使用useMemo缓存图表配置，避免重复计算
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
            const industryIndex = params.data[0];
            const dateIndex = params.data[1];
            const value = params.data[2];
            const date = chartData.dateLabels[dateIndex];
            const industry = chartData.industries[industryIndex];
            return `${date}<br/>${industry}: ${value}%`;
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
          min: 0,
          max: 100,
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
                Array.isArray(value) ? value[2] : value,
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

    return (
      <Box title='行业宽度' padding='14px' underlineTitle>
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
  },
);

IndustryWidthChart.displayName = 'IndustryWidthChart';

export default IndustryWidthChart;
