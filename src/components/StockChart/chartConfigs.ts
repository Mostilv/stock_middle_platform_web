import * as echarts from 'echarts';
import type { StockDataPoint } from './types';

export interface ChartConfigOptions {
  processedData: StockDataPoint[];
  showVolume: boolean;
  chartColors: {
    up: string;
    down: string;
    volume: string;
    line: string;
    grid: string;
    text: string;
  };
  theme: 'light' | 'dark';
  showGrid: boolean;
  showDataLabel: boolean;
  showTimeSelector: boolean;
}

// 生成K线图配置
export const getCandlestickOption = (options: ChartConfigOptions): echarts.EChartsOption => {
  const { processedData, showVolume, chartColors, theme, showGrid, showTimeSelector } = options;
  const times = processedData.map(item => item.time);
  const prices = processedData.map(item => [item.open, item.close, item.low, item.high]);
  const volumes = processedData.map(item => item.volume);

  const series: echarts.SeriesOption[] = [
    {
      name: 'K线',
      type: 'candlestick',
      data: prices,
      itemStyle: {
        color: chartColors.up,
        color0: chartColors.down,
        borderColor: chartColors.up,
        borderColor0: chartColors.down,
      },
      emphasis: {
        itemStyle: {
          borderWidth: 2,
        },
      },
    },
  ];

  if (showVolume) {
    series.push({
      name: '成交量',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: volumes,
      itemStyle: {
        color: chartColors.volume,
        opacity: 0.8,
      },
    } as echarts.BarSeriesOption);
  }

  return {
    backgroundColor: 'transparent',
    animation: false,
    grid: [
      {
        left: '10%',
        right: '10%',
        top: '15%',
        height: showVolume ? '60%' : '80%',
        show: showGrid,
        borderColor: chartColors.grid,
      },
      ...(showVolume ? [{
        left: '10%',
        right: '10%',
        top: '80%',
        height: '15%',
        show: showGrid,
        borderColor: chartColors.grid,
      }] : []),
    ],
    xAxis: [
      {
        type: 'category' as const,
        data: times,
        boundaryGap: false,
        axisLine: { 
          onZero: false,
          lineStyle: {
            color: chartColors.grid,
          },
        },
        splitLine: { show: false },
        axisLabel: {
          color: chartColors.text,
          fontSize: 10,
        },
      },
      ...(showVolume ? [{
        type: 'category' as const,
        gridIndex: 1,
        data: times,
        boundaryGap: false,
        axisLine: { 
          onZero: false,
          lineStyle: {
            color: chartColors.grid,
          },
        },
        splitLine: { show: false },
        axisLabel: { show: false },
      }] : []),
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
          areaStyle: {
            color: (theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)') as any,
          },
        },
        axisLabel: {
          color: chartColors.text,
          fontSize: 10,
        },
        axisLine: {
          lineStyle: {
            color: chartColors.grid,
          },
        },
        splitLine: {
          lineStyle: {
            color: chartColors.grid,
            type: 'dashed',
          },
        },
      },
      ...(showVolume ? [{
        scale: true,
        gridIndex: 1,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      }] : []),
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, showVolume ? 1 : 0],
        start: 0,
        end: 100,
      },
      ...(showTimeSelector ? [{
        show: true,
        xAxisIndex: [0, showVolume ? 1 : 0],
        type: 'slider',
        top: '85%',
        start: 0,
        end: 100,
        height: 20,
        borderColor: chartColors.grid,
        fillerColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        handleStyle: {
          color: chartColors.volume,
        },
      }] : []),
    ],
    series,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      borderColor: theme === 'dark' ? '#444' : '#e8e8e8',
      textStyle: {
        color: chartColors.text,
      },
      formatter: (params: any) => {
        const dataIndex = params[0].dataIndex;
        const data = processedData[dataIndex];
        if (!data) return '';

        const isUp = data.close >= data.open;
        const change = data.close - data.open;
        const changePercent = ((change / data.open) * 100).toFixed(2);

        return `
          <div style="font-weight: 600; margin-bottom: 8px;">${data.time}</div>
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">开盘：</span>
            <span style="color: ${chartColors.text};">${data.open.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">最高：</span>
            <span style="color: ${chartColors.text};">${data.high.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">最低：</span>
            <span style="color: ${chartColors.text};">${data.low.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">收盘：</span>
            <span style="color: ${isUp ? chartColors.up : chartColors.down};">${data.close.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">涨跌：</span>
            <span style="color: ${isUp ? chartColors.up : chartColors.down};">${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent}%)</span>
          </div>
          ${showVolume ? `
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">成交量：</span>
            <span style="color: ${chartColors.text};">${(data.volume / 10000).toFixed(2)}万</span>
          </div>
          ` : ''}
        `;
      },
    },
  };
};

// 生成折线图配置
export const getLineOption = (options: ChartConfigOptions): echarts.EChartsOption => {
  const { processedData, showVolume, chartColors, theme, showGrid, showDataLabel, showTimeSelector } = options;
  const times = processedData.map(item => item.time);
  const prices = processedData.map(item => item.close);
  const volumes = processedData.map(item => item.volume);

  const series: echarts.SeriesOption[] = [
    {
      name: '价格',
      type: 'line',
      data: prices,
      smooth: true,
      symbol: showDataLabel ? 'circle' : 'none',
      symbolSize: 4,
      lineStyle: {
        color: chartColors.line,
        width: 2,
      },
      itemStyle: {
        color: chartColors.line,
      },
      areaStyle: {
        color: {
          type: 'linear' as const,
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: theme === 'dark' ? 'rgba(24, 144, 255, 0.3)' : 'rgba(24, 144, 255, 0.1)',
            },
            {
              offset: 1,
              color: theme === 'dark' ? 'rgba(24, 144, 255, 0.05)' : 'rgba(24, 144, 255, 0.02)',
            },
          ],
        },
      },
    },
  ];

  if (showVolume) {
    series.push({
      name: '成交量',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: volumes,
      itemStyle: {
        color: chartColors.volume,
        opacity: 0.8,
      },
    } as echarts.BarSeriesOption);
  }

  return {
    backgroundColor: 'transparent',
    animation: false,
    grid: [
      {
        left: '10%',
        right: '10%',
        top: '15%',
        height: showVolume ? '60%' : '80%',
        show: showGrid,
        borderColor: chartColors.grid,
      },
      ...(showVolume ? [{
        left: '10%',
        right: '10%',
        top: '80%',
        height: '15%',
        show: showGrid,
        borderColor: chartColors.grid,
      }] : []),
    ],
    xAxis: [
      {
        type: 'category' as const,
        data: times,
        boundaryGap: false,
        axisLine: { 
          onZero: false,
          lineStyle: {
            color: chartColors.grid,
          },
        },
        splitLine: { show: false },
        axisLabel: {
          color: chartColors.text,
          fontSize: 10,
        },
      },
      ...(showVolume ? [{
        type: 'category' as const,
        gridIndex: 1,
        data: times,
        boundaryGap: false,
        axisLine: { 
          onZero: false,
          lineStyle: {
            color: chartColors.grid,
          },
        },
        splitLine: { show: false },
        axisLabel: { show: false },
      }] : []),
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
          areaStyle: {
            color: (theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)') as any,
          },
        },
        axisLabel: {
          color: chartColors.text,
          fontSize: 10,
        },
        axisLine: {
          lineStyle: {
            color: chartColors.grid,
          },
        },
        splitLine: {
          lineStyle: {
            color: chartColors.grid,
            type: 'dashed',
          },
        },
      },
      ...(showVolume ? [{
        scale: true,
        gridIndex: 1,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      }] : []),
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, showVolume ? 1 : 0],
        start: 0,
        end: 100,
      },
      ...(showTimeSelector ? [{
        show: true,
        xAxisIndex: [0, showVolume ? 1 : 0],
        type: 'slider',
        top: '85%',
        start: 0,
        end: 100,
        height: 20,
        borderColor: chartColors.grid,
        fillerColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        handleStyle: {
          color: chartColors.volume,
        },
      }] : []),
    ],
    series,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      borderColor: theme === 'dark' ? '#444' : '#e8e8e8',
      textStyle: {
        color: chartColors.text,
      },
      formatter: (params: any) => {
        const dataIndex = params[0].dataIndex;
        const data = processedData[dataIndex];
        if (!data) return '';

        return `
          <div style="font-weight: 600; margin-bottom: 8px;">${data.time}</div>
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">价格：</span>
            <span style="color: ${chartColors.text};">${data.close.toFixed(2)}</span>
          </div>
          ${showVolume ? `
          <div style="display: flex; justify-content: space-between; margin: 4px 0;">
            <span style="color: #999;">成交量：</span>
            <span style="color: ${chartColors.text};">${(data.volume / 10000).toFixed(2)}万</span>
          </div>
          ` : ''}
        `;
      },
    },
  };
};
