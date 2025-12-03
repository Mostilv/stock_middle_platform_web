# StockChart 股票图表组件

可复用的股票图表组件，支持 K 线与折线图，内置明暗主题与成交量显示。

## 特性

- 🎯 双图表类型：`candlestick` / `line`
- 🌓 主题切换：亮色与暗色
- 📊 成交量：可选柱状图
- 🎨 自定义颜色：支持覆盖默认配色
- 📱 响应式：自适应父容器
- 🔧 高度可配置
- ⚡ 性能优化：懒加载、防抖

## 基本用法

```tsx
import StockChart, { StockDataPoint } from '@/components/StockChart';

const data: StockDataPoint[] = [
  {
    time: '2024-01-01',
    open: 100,
    high: 105,
    low: 98,
    close: 103,
    volume: 1000000,
  },
];

<StockChart
  data={data}
  chartType='candlestick'
  theme='light'
  showVolume
  height={400}
  stockCode='000001.SZ'
  title='平安银行'
/>;
```

## Props

| 参数               | 类型                      | 默认值       | 说明               |
| ------------------ | ------------------------- | ------------ | ------------------ |
| `data`             | `StockDataPoint[]`        | -            | 必填，图表数据     |
| `chartType`        | `'line' \| 'candlestick'` | -            | 必填，图表类型     |
| `theme`            | `'light' \| 'dark'`       | `'light'`    | 主题               |
| `showVolume`       | `boolean`                 | `true`       | 是否显示成交量     |
| `height`           | `number \| string`        | `400`        | 图表高度           |
| `width`            | `number \| string`        | `'100%'`     | 图表宽度           |
| `className`        | `string`                  | -            | 自定义类名         |
| `stockCode`        | `string`                  | -            | 股票代码或名称     |
| `loading`          | `boolean`                 | `false`      | 加载状态           |
| `title`            | `string`                  | -            | 图表标题           |
| `showGrid`         | `boolean`                 | `true`       | 是否显示网格       |
| `showDataLabel`    | `boolean`                 | `false`      | 是否显示数据标签   |
| `showTimeSelector` | `boolean`                 | `true`       | 是否显示时间选择器 |
| `colors`           | `Record<string, string>`  | -            | 自定义颜色         |
| `onChartClick`     | `(params) => void`        | -            | 点击回调           |
| `emptyText`        | `string`                  | `'暂无数据'` | 空状态文案         |

### `StockDataPoint`

```ts
interface StockDataPoint {
  time: string | number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
```

### 自定义颜色

```ts
const colors = {
  up: '#52c41a',
  down: '#ff4d4f',
  volume: '#1890ff',
  line: '#1890ff',
  grid: '#e8e8e8',
  text: '#333333',
};
```

## 示例

1. **基础 K 线图**

```tsx
<StockChart data={stockData} chartType='candlestick' showVolume height={500} />
```

2. **暗色折线图**

```tsx
<StockChart data={stockData} chartType='line' theme='dark' showVolume={false} />
```

3. **自定义颜色**

```tsx
<StockChart data={stockData} chartType='candlestick' colors={colors} />
```

4. **事件处理**

```tsx
<StockChart
  data={stockData}
  chartType='line'
  onChartClick={params => console.log(params)}
/>
```

5. **加载状态**

```tsx
<StockChart data={stockData} chartType='candlestick' loading={isLoading} />
```

## 注意事项

- 数据需符合 `StockDataPoint` 结构
- `time` 建议使用 ISO 日期
- 大量数据时可开启懒加载
- 切换主题会自动处理配色
- 组件会根据父容器自适应

## 开发

```
src/components/StockChart/
├── index.ts
├── StockChart.tsx
├── StockChart.styles.ts
├── types.ts
├── chartConfigs.ts
├── StockChartDemo.tsx
└── README.md
```

本地可通过 Demo 页面调试不同数据与主题。

## 更新日志

- **v1.0.0**：首个版本，支持 K 线/折线图、亮/暗主题、成交量、自定义颜色等能力。
