import React, { useMemo } from 'react';
import EChart from '../../../../components/EChart';
import { ChartCard } from './IndustryMomentumChart.styles';

const IndustryMomentumChart: React.FC = React.memo(() => {
  // 使用useMemo缓存图表配置，避免重复计算
  const industryMomentumOption = useMemo(() => ({
    backgroundColor: 'transparent',
    grid: { left: 40, right: 20, top: 30, bottom: 30 },
    tooltip: { 
      trigger: 'axis' as const,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#1890ff',
      textStyle: { color: '#e6f7ff' }
    },
    legend: {
      data: ['银行', '科技', '消费', '医药', '金融'],
      textStyle: { color: '#e6f7ff' },
      top: 10
    },
    xAxis: {
      type: 'category' as const,
      data: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-08', '01-09', '01-10', '01-11', '01-12'],
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#e6f7ff' }
    },
    yAxis: { 
      type: 'value' as const,
      axisLine: { lineStyle: { color: '#4a5568' } },
      axisLabel: { color: '#e6f7ff' },
      splitLine: { lineStyle: { color: '#2d3748' } }
    },
    series: [
      {
        name: '银行',
        type: 'line' as const,
        smooth: true,
        data: [85, 88, 92, 90, 95, 98, 100, 102, 99, 96],
        lineStyle: { color: '#1890ff', width: 2 },
        symbol: 'none'
      },
      {
        name: '科技',
        type: 'line' as const,
        smooth: true,
        data: [65, 68, 72, 70, 75, 78, 80, 82, 79, 76],
        lineStyle: { color: '#52c41a', width: 2 },
        symbol: 'none'
      },
      {
        name: '消费',
        type: 'line' as const,
        smooth: true,
        data: [45, 48, 52, 50, 55, 58, 60, 62, 59, 56],
        lineStyle: { color: '#faad14', width: 2 },
        symbol: 'none'
      },
      {
        name: '医药',
        type: 'line' as const,
        smooth: true,
        data: [25, 28, 32, 30, 35, 38, 40, 42, 39, 36],
        lineStyle: { color: '#f5222d', width: 2 },
        symbol: 'none'
      },
      {
        name: '金融',
        type: 'line' as const,
        smooth: true,
        data: [15, 18, 22, 20, 25, 28, 30, 32, 29, 26],
        lineStyle: { color: '#722ed1', width: 2 },
        symbol: 'none'
      },
    ],
  }), []);

  return (
    <ChartCard>
      <h3>行业动量</h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        <EChart height={'100%'} option={industryMomentumOption} lazy={true} />
      </div>
    </ChartCard>
  );
});

IndustryMomentumChart.displayName = 'IndustryMomentumChart';

export default IndustryMomentumChart;
