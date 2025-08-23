// 这是一个简单的使用示例，展示如何在其他页面中使用 StockChart 组件

import React from 'react';
import StockChart from './StockChart';
import type { StockDataPoint } from './types';

// 示例数据
const sampleData: StockDataPoint[] = [
  {
    time: '2024-01-01',
    open: 100.00,
    high: 105.50,
    low: 98.20,
    close: 103.80,
    volume: 1500000
  },
  {
    time: '2024-01-02',
    open: 103.80,
    high: 108.30,
    low: 102.10,
    close: 106.50,
    volume: 1800000
  },
  {
    time: '2024-01-03',
    open: 106.50,
    high: 107.80,
    low: 104.20,
    close: 105.90,
    volume: 1200000
  },
  {
    time: '2024-01-04',
    open: 105.90,
    high: 110.20,
    low: 105.30,
    close: 109.50,
    volume: 2000000
  },
  {
    time: '2024-01-05',
    open: 109.50,
    high: 112.80,
    low: 108.90,
    close: 111.20,
    volume: 2200000
  }
];

// 在页面中使用组件的示例
const StockChartUsageExample: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>股票图表使用示例</h2>
      
      {/* 基本K线图 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>K线图示例</h3>
        <StockChart
          data={sampleData}
          chartType="candlestick"
          theme="light"
          showVolume={true}
          height={400}
          stockCode="000001.SZ"
          title="平安银行K线图"
        />
      </div>

      {/* 折线图示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>折线图示例</h3>
        <StockChart
          data={sampleData}
          chartType="line"
          theme="light"
          showVolume={false}
          height={300}
          stockCode="000001.SZ"
          title="平安银行走势图"
          showDataLabel={true}
        />
      </div>

      {/* 暗色主题示例 */}
      <div style={{ marginBottom: '30px', background: '#1f1f1f', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#ffffff' }}>暗色主题示例</h3>
        <StockChart
          data={sampleData}
          chartType="candlestick"
          theme="dark"
          showVolume={true}
          height={350}
          stockCode="000001.SZ"
          title="暗色主题K线图"
        />
      </div>

      {/* 自定义颜色示例 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>自定义颜色示例</h3>
        <StockChart
          data={sampleData}
          chartType="line"
          theme="light"
          showVolume={true}
          height={350}
          stockCode="000001.SZ"
          title="自定义颜色图表"
          colors={{
            up: '#00ff00',
            down: '#ff0000',
            volume: '#0000ff',
            line: '#ff6600',
            grid: '#cccccc',
            text: '#333333'
          }}
        />
      </div>
    </div>
  );
};

export default StockChartUsageExample;
