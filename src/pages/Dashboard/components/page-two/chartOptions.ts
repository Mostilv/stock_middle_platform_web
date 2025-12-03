import type { EChartsOption } from 'echarts';
import { SHENWAN_LEVEL1_INDUSTRIES } from '../../../../constants/industries';
import { buildRecentDateLabels } from '../../../../utils/date';
import {
  buildRankingTooltipContent,
  TOOLTIP_EXTRA_CSS,
} from '../../../../utils/chartTooltip';

const DATE_AXIS = buildRecentDateLabels(30, undefined, 'YY-MM-DD');

const INDUSTRY_COLORS = [
  '#3ba272',
  '#ee6666',
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#73c0de',
];

const makeSeries = (len: number, seed: number) =>
  Array.from({ length: len }, (_, i) =>
    Math.round(50 + 20 * Math.sin((i + seed) / 3) + Math.random() * 10),
  );

const tooltipPosition = (
  point: number[],
  _params: unknown,
  _dom?: HTMLDivElement | null,
  _rect?: unknown,
  size?: { contentSize: number[]; viewSize: number[] },
): number[] => {
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
};

const buildSharedTooltip = () => ({
  trigger: 'axis' as const,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderColor: '#1890ff',
  textStyle: { color: '#e6f7ff' },
  axisPointer: { type: 'line' as const },
  position: tooltipPosition,
  appendToBody: true,
  extraCssText: TOOLTIP_EXTRA_CSS,
});

const buildIndustryRankingTooltip = () => ({
  ...buildSharedTooltip(),
  formatter: (params: any) => {
    if (!Array.isArray(params) || params.length === 0) return '';
    const rawLabel = params[0]?.axisValueLabel ?? params[0]?.axisValue ?? '';
    const sorted = [...params].sort((a, b) => {
      const valueA =
        typeof a.data === 'number'
          ? a.data
          : Number.isFinite(Number(a.data))
            ? Number(a.data)
            : -Infinity;
      const valueB =
        typeof b.data === 'number'
          ? b.data
          : Number.isFinite(Number(b.data))
            ? Number(b.data)
            : -Infinity;
      return valueB - valueA;
    });
    const items = sorted.map((item, index) => {
      const value =
        typeof item.data === 'number'
          ? item.data
          : Number.isFinite(Number(item.data))
            ? Number(item.data)
            : null;
      const valueText = typeof value === 'number' ? value.toFixed(2) : '-';
      return {
        rank: index + 1,
        label: item.seriesName,
        value: valueText,
        highlight: item.seriesName === '银行',
      };
    });
    return buildRankingTooltipContent(rawLabel, items);
  },
});

const axisLine = { lineStyle: { color: '#556' } };
const axisLabel = { color: '#889' };

const buildBaseChartOption = (
  data: number[],
  color: string,
): EChartsOption => ({
  grid: { left: 20, right: 10, top: 10, bottom: 20 },
  tooltip: buildSharedTooltip(),
  xAxis: {
    type: 'category',
    data: DATE_AXIS,
    axisLine,
    axisLabel,
  },
  yAxis: {
    type: 'value',
    axisLine,
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    axisLabel,
  },
  series: [
    {
      type: 'line',
      data,
      smooth: false,
      symbol: 'none',
      lineStyle: { color, width: 2 },
      areaStyle: { color: `${color}1A` },
    },
  ],
  animation: false,
});

export const buildIndustryTrendOption = (): EChartsOption => ({
  grid: { left: 20, right: 10, top: 30, bottom: 20 },
  legend: {
    top: 4,
    type: 'scroll',
    data: [...SHENWAN_LEVEL1_INDUSTRIES],
    textStyle: { color: '#a0aec0' },
  },
  tooltip: buildIndustryRankingTooltip(),
  xAxis: {
    type: 'category',
    data: DATE_AXIS,
    axisLine,
    axisLabel,
  },
  yAxis: {
    type: 'value',
    axisLine,
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    axisLabel,
  },
  series: SHENWAN_LEVEL1_INDUSTRIES.map((name, idx) => ({
    name,
    type: 'line',
    smooth: false,
    symbol: 'none',
    lineStyle: {
      color: INDUSTRY_COLORS[idx % INDUSTRY_COLORS.length],
      width: 2,
    },
    data: makeSeries(30, idx + 1),
  })),
  animation: false,
});

export const buildLimitUpCountOption = (): EChartsOption =>
  buildBaseChartOption(makeSeries(30, 2), '#ee6666');

export const buildPlaceholderOneOption = (): EChartsOption =>
  buildBaseChartOption(makeSeries(30, 3), '#5470c6');

export const buildPlaceholderTwoOption = (): EChartsOption =>
  buildBaseChartOption(makeSeries(30, 4), '#fac858');
