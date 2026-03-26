# StockChart 组件说明

`StockChart` 是前端中的通用股票图表组件，封装了 ECharts，并用于展示 K 线、折线和成交量等数据。

## 目录

```text
src/components/StockChart/
|-- StockChart.tsx
|-- StockChart.styles.ts
|-- chartConfigs.ts
|-- types.ts
|-- index.ts
`-- README.md
```

## 主要能力

- 支持 K 线和折线两种模式
- 支持明暗主题
- 支持成交量展示
- 支持空状态、加载态和点击事件
- 支持样式与颜色定制

## 使用方式

```tsx
import StockChart from './components/StockChart';
```

如果项目后续启用了别名，请再同步更新文档中的导入示例。

## 维护说明

- 数据结构定义见 `types.ts`
- 图表配置拆分在 `chartConfigs.ts`
- 样式独立维护在 `StockChart.styles.ts`
