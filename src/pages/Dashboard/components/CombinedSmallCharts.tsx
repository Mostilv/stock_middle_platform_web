import React from 'react';
import SmallChartCard from './SmallChartCard';
import { CombinedSmallChartsContainer } from './CombinedSmallCharts.styles';

const CombinedSmallCharts: React.FC = () => {
  // 所有小图表的配置
  const allChartOptions = [
    {
      title: '拥挤度',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [65, 68, 72, 70, 75, 78, 80, 82, 79, 76],
            lineStyle: { color: '#1890ff', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '大盘股指数',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [120, 122, 125, 123, 128, 130, 132, 135, 133, 131],
            lineStyle: { color: '#52c41a', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '微盘股指数',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [85, 88, 92, 90, 95, 98, 100, 102, 99, 96],
            lineStyle: { color: '#faad14', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '贴税率',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [2.5, 2.8, 3.2, 3.0, 3.5, 3.8, 4.0, 4.2, 3.9, 3.6],
            lineStyle: { color: '#f5222d', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '微盘市值中枢',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [45, 48, 52, 50, 55, 58, 60, 62, 59, 56],
            lineStyle: { color: '#722ed1', width: 1 },
            symbol: 'none'
          },
        ],
      }
    },
    {
      title: '微盘净市率',
      option: {
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 20, bottom: 20 },
        tooltip: { 
          trigger: 'axis' as const,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#1890ff',
          textStyle: { color: '#e6f7ff' }
        },
        xAxis: {
          type: 'category' as const,
          data: ['09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 }
        },
        yAxis: { 
          type: 'value' as const,
          axisLine: { lineStyle: { color: '#4a5568' } },
          axisLabel: { color: '#e6f7ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#2d3748' } }
        },
        series: [
          {
            type: 'line' as const,
            smooth: true,
            data: [1.2, 1.5, 1.8, 1.6, 2.0, 2.3, 2.5, 2.7, 2.4, 2.1],
            lineStyle: { color: '#13c2c2', width: 1 },
            symbol: 'none'
          },
        ],
      }
    }
  ];

  return (
    <CombinedSmallChartsContainer>
      {allChartOptions.map((chart, index) => (
        <SmallChartCard 
          key={`combined-${index}`}
          title={chart.title}
          option={chart.option}
        />
      ))}
    </CombinedSmallChartsContainer>
  );
};

export default CombinedSmallCharts;
