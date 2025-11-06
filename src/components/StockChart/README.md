# StockChart 股票图表组件

一个可复用的股票图表组件，支持K线图和折线图，具有暗色和亮色主题，可配置成交量显示。

## 特性

- 🎯 **双图表类型**: 支持K线图和折线图
- 🌓 **主题切换**: 支持亮色和暗色两种主题
- 📊 **成交量显示**: 可配置是否显示成交量柱状图
- 🎨 **自定义样式**: 支持自定义颜色配置
- 📱 **响应式设计**: 自适应容器大小
- 🔧 **高度可配置**: 丰富的配置选项
- ⚡ **性能优化**: 支持懒加载和防抖处理

## 安装

组件已集成到项目中，无需额外安装依赖。

## 基本用法

```tsx
import StockChart, { StockDataPoint } from '@/components/StockChart';

// 准备数据
const data: StockDataPoint[] = [
  {
    time: '2024-01-01',
    open: 100,
    high: 105,
    low: 98,
    close: 103,
    volume: 1000000,
  },
  // ... 更多数据
];

// 使用组件
<StockChart
  data={data}
  chartType='candlestick'
  theme='light'
  showVolume={true}
  height={400}
  stockCode='000001.SZ'
  title='平安银行'
/>;
```

## API

### Props

| 参数               | 类型                      | 默认值       | 说明               |
| ------------------ | ------------------------- | ------------ | ------------------ |
| `data`             | `StockDataPoint[]`        | -            | **必填** 图表数据  |
| `chartType`        | `'line' \| 'candlestick'` | -            | **必填** 图表类型  |
| `theme`            | `'light' \| 'dark'`       | `'light'`    | 主题               |
| `showVolume`       | `boolean`                 | `true`       | 是否显示成交量     |
| `height`           | `number \| string`        | `400`        | 图表高度           |
| `width`            | `number \| string`        | `'100%'`     | 图表宽度           |
| `className`        | `string`                  | -            | 自定义类名         |
| `stockCode`        | `string`                  | -            | 股票代码或名称     |
| `loading`          | `boolean`                 | `false`      | 加载状态           |
| `title`            | `string`                  | -            | 图表标题           |
| `showGrid`         | `boolean`                 | `true`       | 是否显示网格线     |
| `showDataLabel`    | `boolean`                 | `false`      | 是否显示数据标签   |
| `showTimeSelector` | `boolean`                 | `true`       | 是否显示时间选择器 |
| `colors`           | `object`                  | -            | 自定义颜色配置     |
| `onChartClick`     | `function`                | -            | 图表点击事件       |
| `emptyText`        | `string`                  | `'暂无数据'` | 空数据提示文本     |

### StockDataPoint 数据结构

```tsx
interface StockDataPoint {
  time: string | number; // 时间
  open: number; // 开盘价
  high: number; // 最高价
  low: number; // 最低价
  close: number; // 收盘价
  volume: number; // 成交量
}
```

### 自定义颜色配置

```tsx
const colors = {
  up: '#52c41a', // 上涨颜色
  down: '#ff4d4f', // 下跌颜色
  volume: '#1890ff', // 成交量颜色
  line: '#1890ff', // 折线图颜色
  grid: '#e8e8e8', // 网格线颜色
  text: '#333333', // 文字颜色
};
```

## 使用示例

### 1. 基本K线图

```tsx
<StockChart
  data={stockData}
  chartType='candlestick'
  theme='light'
  showVolume={true}
  height={500}
  stockCode='000001.SZ'
  title='平安银行K线图'
/>
```

### 2. 暗色主题折线图

```tsx
<StockChart
  data={stockData}
  chartType='line'
  theme='dark'
  showVolume={false}
  height={400}
  stockCode='000002.SZ'
  title='万科A走势图'
  showDataLabel={true}
  showTimeSelector={false}
/>
```

### 3. 自定义颜色配置

```tsx
<StockChart
  data={stockData}
  chartType='candlestick'
  theme='light'
  colors={{
    up: '#00ff00',
    down: '#ff0000',
    volume: '#0000ff',
    line: '#ff6600',
    grid: '#cccccc',
    text: '#333333',
  }}
  height={400}
  stockCode='000001.SZ'
  title='自定义颜色K线图'
/>
```

### 4. 带事件处理

```tsx
<StockChart
  data={stockData}
  chartType='line'
  theme='light'
  height={400}
  stockCode='000001.SZ'
  title='带点击事件的图表'
  onChartClick={params => {
    console.log('点击了数据点:', params);
    // 处理点击事件
  }}
/>
```

### 5. 加载状态

```tsx
<StockChart
  data={stockData}
  chartType='candlestick'
  theme='light'
  loading={isLoading}
  height={400}
  stockCode='000001.SZ'
  title='加载中的图表'
  showTimeSelector={true}
/>
```

## 注意事项

1. **数据格式**: 确保传入的数据符合 `StockDataPoint` 接口格式
2. **时间格式**: `time` 字段可以是字符串或数字，建议使用标准日期格式
3. **性能优化**: 大量数据时建议启用懒加载
4. **主题切换**: 切换主题时会自动调整颜色配置
5. **响应式**: 组件会自动响应容器大小变化

## 开发

### 文件结构

```
src/components/StockChart/
├── index.ts              # 入口文件
├── StockChart.tsx        # 主组件
├── StockChart.styles.ts  # 样式文件
├── types.ts              # 类型定义
├── chartConfigs.ts       # 图表配置
├── StockChartDemo.tsx    # 演示页面
└── README.md            # 说明文档
```

### 本地开发

1. 运行演示页面查看效果
2. 修改配置和样式
3. 测试不同数据格式和主题

## 更新日志

### v1.0.0

- 初始版本
- 支持K线图和折线图
- 支持亮色和暗色主题
- 支持成交量显示
- 支持自定义颜色配置
