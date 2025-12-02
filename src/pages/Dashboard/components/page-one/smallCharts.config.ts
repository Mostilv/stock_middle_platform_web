import type { EChartsOption } from 'echarts';
import { buildRecentDateLabels } from '../../../../utils/date';

export interface SmallChartConfig {
  key: string;
  title: string;
  option: EChartsOption;
}

const TIME_SCALE = buildRecentDateLabels(10, undefined, 'YY-MM-DD');

const baseSmallChartOption = (
  data: number[],
  color: string,
): EChartsOption => ({
  backgroundColor: 'transparent',
  grid: { left: 30, right: 10, top: 20, bottom: 20 },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#1890ff',
    textStyle: { color: '#e6f7ff' },
  },
  xAxis: {
    type: 'category',
    data: TIME_SCALE,
    axisLine: { lineStyle: { color: '#4a5568' } },
    axisLabel: { color: '#e6f7ff', fontSize: 10 },
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#4a5568' } },
    axisLabel: { color: '#e6f7ff', fontSize: 10 },
    splitLine: { lineStyle: { color: '#2d3748' } },
  },
  series: [
    {
      type: 'line',
      smooth: false,
      data,
      lineStyle: { color, width: 1 },
      symbol: 'none',
    },
  ],
});

const RAW_SMALL_CHARTS: Array<{
  key: string;
  title: string;
  color: string;
  data: number[];
}> = [
  {
    key: 'crowding',
    title: '拥挤度',
    color: '#1890ff',
    data: [65, 68, 72, 70, 75, 78, 80, 82, 79, 76],
  },
  {
    key: 'large-cap-index',
    title: '大盘股指数',
    color: '#52c41a',
    data: [120, 122, 125, 123, 128, 130, 132, 135, 133, 131],
  },
  {
    key: 'micro-cap-index',
    title: '微盘股指数',
    color: '#faad14',
    data: [85, 88, 92, 90, 95, 98, 100, 102, 99, 96],
  },
  {
    key: 'discount-rate',
    title: '贴税率',
    color: '#f5222d',
    data: [2.5, 2.8, 3.2, 3.0, 3.5, 3.8, 4.0, 4.2, 3.9, 3.6],
  },
  {
    key: 'micro-cap-market-value',
    title: '微盘市值中枢',
    color: '#722ed1',
    data: [45, 48, 52, 50, 55, 58, 60, 62, 59, 56],
  },
  {
    key: 'micro-cap-pe',
    title: '微盘净市率',
    color: '#13c2c2',
    data: [1.2, 1.5, 1.8, 1.6, 2.0, 2.3, 2.5, 2.7, 2.4, 2.1],
  },
];

const buildSmallCharts = (items: typeof RAW_SMALL_CHARTS) =>
  items.map<SmallChartConfig>(item => ({
    key: item.key,
    title: item.title,
    option: baseSmallChartOption(item.data, item.color),
  }));

export const leftSmallCharts = buildSmallCharts(RAW_SMALL_CHARTS.slice(0, 3));
export const rightSmallCharts = buildSmallCharts(RAW_SMALL_CHARTS.slice(3));
export const allSmallCharts: SmallChartConfig[] = [
  ...leftSmallCharts,
  ...rightSmallCharts,
];
