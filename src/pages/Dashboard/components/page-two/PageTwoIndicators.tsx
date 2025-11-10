import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import type { EChartsOption } from 'echarts';
import Box from '../Box';
import { useEChart } from '../../../../hooks/useEChart';

type PanelKey =
  | 'industryTrend'
  | 'limitUpCount'
  | 'placeholder1'
  | 'placeholder2';

const industryNames = [
  '计算机',
  '医药生物',
  '食品饮料',
  '银行',
  '非银金融',
  '有色金属',
];
const industryColors = [
  '#3ba272',
  '#ee6666',
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#73c0de',
];

const panelMeta: Array<{ key: PanelKey; title: string }> = [
  { key: 'industryTrend', title: '各行业走势' },
  { key: 'limitUpCount', title: '涨停统计' },
  { key: 'placeholder1', title: '指标占位 1' },
  { key: 'placeholder2', title: '指标占位 2' },
];

const PageTwoIndicators: React.FC = () => {
  const chartOptions = useMemo<Record<PanelKey, EChartsOption>>(() => {
    const makeSeries = (len: number, seed: number) =>
      Array.from({ length: len }, (_, i) =>
        Math.round(50 + 20 * Math.sin((i + seed) / 3) + Math.random() * 10),
      );

    const baseOption = (data: number[], color: string): EChartsOption => ({
      grid: { left: 20, right: 10, top: 10, bottom: 20 },
      xAxis: {
        type: 'category',
        data: data.map((_, i) => i),
        axisLine: { lineStyle: { color: '#556' } },
        axisLabel: { color: '#889' },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#556' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
        axisLabel: { color: '#889' },
      },
      series: [
        {
          type: 'line',
          data,
          smooth: true,
          symbol: 'none',
          lineStyle: { color, width: 2 },
          areaStyle: { color: `${color}1A` },
        },
      ],
      animation: false,
    });

    const industryTrend: EChartsOption = {
      grid: { left: 20, right: 10, top: 30, bottom: 20 },
      legend: { top: 4, textStyle: { color: '#a0aec0' } },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 30 }, (_, i) => i),
        axisLine: { lineStyle: { color: '#556' } },
        axisLabel: { color: '#889' },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#556' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
        axisLabel: { color: '#889' },
      },
      series: industryNames.map((name, idx) => ({
        name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: industryColors[idx % industryColors.length],
          width: 2,
        },
        data: makeSeries(30, idx + 1),
      })),
      animation: false,
    };

    return {
      industryTrend,
      limitUpCount: baseOption(makeSeries(30, 2), '#ee6666'),
      placeholder1: baseOption(makeSeries(30, 3), '#5470c6'),
      placeholder2: baseOption(makeSeries(30, 4), '#fac858'),
    };
  }, []);

  const industryTrendChart = useEChart({
    option: chartOptions.industryTrend,
    lazy: true,
  });
  const limitUpCountChart = useEChart({
    option: chartOptions.limitUpCount,
    lazy: true,
  });
  const placeholder1Chart = useEChart({
    option: chartOptions.placeholder1,
    lazy: true,
  });
  const placeholder2Chart = useEChart({
    option: chartOptions.placeholder2,
    lazy: true,
  });

  const chartMap: Record<PanelKey, ReturnType<typeof useEChart>> = {
    industryTrend: industryTrendChart,
    limitUpCount: limitUpCountChart,
    placeholder1: placeholder1Chart,
    placeholder2: placeholder2Chart,
  };

  return (
    <Row
      gutter={[16, 16]}
      style={{ padding: '48px 12px 20px', height: '100%' }}
    >
      {panelMeta.map(panel => {
        const state = chartMap[panel.key];
        return (
          <Col span={12} style={{ height: 'calc(50% - 16px)' }} key={panel.key}>
            <Box title={panel.title} padding='12px' titleAlign='left'>
              <div
                ref={state.containerRef}
                style={{
                  width: '100%',
                  height: '100%',
                  minWidth: 0,
                  opacity: state.isVisible ? 1 : 0,
                }}
              />
            </Box>
          </Col>
        );
      })}
    </Row>
  );
};

export default React.memo(PageTwoIndicators);
