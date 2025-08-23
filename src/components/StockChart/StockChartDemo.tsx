import React, { useState } from 'react';
import { Card, Switch, Select, Space, Radio } from 'antd';
import StockChart from './StockChart';
import type { StockDataPoint, ChartType, Theme } from './types';

// 模拟股票数据
const generateMockData = (days: number): StockDataPoint[] => {
  const data: StockDataPoint[] = [];
  let basePrice = 100;
  let baseVolume = 1000000;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    const change = (Math.random() - 0.5) * 10;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const volume = baseVolume + (Math.random() - 0.5) * 500000;

    data.push({
      time: date.toLocaleDateString(),
      open,
      high,
      low,
      close,
      volume,
    });

    basePrice = close;
    baseVolume = volume;
  }

  return data;
};

const StockChartDemo: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [theme, setTheme] = useState<Theme>('light');
  const [showVolume, setShowVolume] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showDataLabel, setShowDataLabel] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(true);
  const [dataDays, setDataDays] = useState(30);

  const mockData = generateMockData(dataDays);

  return (
    <div style={{ padding: '24px', background: theme === 'dark' ? '#1f1f1f' : '#f5f5f5', minHeight: '100vh' }}>
      <Card 
        title="股票图表组件演示" 
        style={{ marginBottom: '24px' }}
        bodyStyle={{ background: theme === 'dark' ? '#2a2a2a' : '#ffffff' }}
      >
        <Space wrap>
          <div>
            <span style={{ marginRight: '8px' }}>图表类型：</span>
            <Radio.Group value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <Radio.Button value="line">折线图</Radio.Button>
              <Radio.Button value="candlestick">K线图</Radio.Button>
            </Radio.Group>
          </div>
          
          <div>
            <span style={{ marginRight: '8px' }}>主题：</span>
            <Radio.Group value={theme} onChange={(e) => setTheme(e.target.value)}>
              <Radio.Button value="light">亮色</Radio.Button>
              <Radio.Button value="dark">暗色</Radio.Button>
            </Radio.Group>
          </div>

          <div>
            <span style={{ marginRight: '8px' }}>显示成交量：</span>
            <Switch checked={showVolume} onChange={setShowVolume} />
          </div>

          <div>
            <span style={{ marginRight: '8px' }}>显示网格：</span>
            <Switch checked={showGrid} onChange={setShowGrid} />
          </div>

          <div>
            <span style={{ marginRight: '8px' }}>显示数据点：</span>
            <Switch checked={showDataLabel} onChange={setShowDataLabel} />
          </div>

          <div>
            <span style={{ marginRight: '8px' }}>显示时间选择器：</span>
            <Switch checked={showTimeSelector} onChange={setShowTimeSelector} />
          </div>

          <div>
            <span style={{ marginRight: '8px' }}>数据天数：</span>
            <Select 
              value={dataDays} 
              onChange={setDataDays}
              style={{ width: 100 }}
              options={[
                { label: '7天', value: 7 },
                { label: '30天', value: 30 },
                { label: '60天', value: 60 },
                { label: '90天', value: 90 },
              ]}
            />
          </div>
        </Space>
      </Card>

      <Card 
        title="股票图表" 
        bodyStyle={{ padding: 0, background: theme === 'dark' ? '#2a2a2a' : '#ffffff' }}
      >
        <StockChart
          data={mockData}
          chartType={chartType}
          theme={theme}
          showVolume={showVolume}
          height={500}
          stockCode="000001.SZ"
          title={`${chartType === 'line' ? '折线图' : 'K线图'} - 平安银行`}
          showGrid={showGrid}
          showDataLabel={showDataLabel}
          showTimeSelector={showTimeSelector}
          onChartClick={(params) => {
            console.log('图表点击事件：', params);
          }}
        />
      </Card>

      <Card 
        title="组件特性说明" 
        style={{ marginTop: '24px' }}
        bodyStyle={{ background: theme === 'dark' ? '#2a2a2a' : '#ffffff' }}
      >
        <ul>
          <li>支持K线图和折线图两种图表类型</li>
          <li>支持亮色和暗色两种主题</li>
          <li>可配置是否显示成交量柱状图</li>
          <li>支持数据缩放和拖拽</li>
          <li>支持自定义颜色配置</li>
          <li>支持图表点击事件</li>
          <li>支持加载状态和空数据状态</li>
          <li>响应式设计，自适应容器大小</li>
        </ul>
      </Card>
    </div>
  );
};

export default StockChartDemo;
