# Dashboard 组件说明

## 概述

Dashboard 是股票中台的首页组件，用于展示市场数据、行业宽度与动量等关键信息。

## 组件结构

### 主组件

- `Dashboard.tsx`：负责整体布局与状态管理
- `TimeDisplay`：时间显示与日期选择
- `TopIndicators`：顶部市场指标
- `SideCharts`：左右两列 6 张小图
- `CenterCharts`：行业宽度与行业动量
- `CombinedSmallCharts`：窄屏下的小图聚合

### 子组件

- `IndustryWidthChart`：行业宽度热力图
- `IndustryMomentumChart`：行业动量曲线图
- `SmallChartCard`：小图卡片容器

### 服务

- `marketData.ts`：模拟数据服务

## 功能特性

1. **时间选择**：实时显示当前时间，可选择距今 30 天内任意日期。
2. **行业宽度图**：默认展示最近 30 天数据，支持横向滚动与热力图渲染。
3. **响应式布局**：
   - 宽屏：左/中/右三列
   - 窄屏：单列 + 2×3 小图网格
4. **组件拆分明确**：职责单一，易于复用与测试。

## 使用示例

```tsx
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return <Dashboard />;
}
```

## 数据流

1. 主组件维护 `selectedDate` 等状态。
2. 通过 props 将数据下发到各子组件。
3. 子组件通过回调上报交互事件。

## 样式体系

- 使用 styled-components
- 每个组件拥有独立样式文件
- 支持深色主题与响应式断点

## 注意事项

- 行业图表时间范围限制在 30 天内
- 默认显示最近 30 天数据
- 时间选择器影响行业图表数据
- 所有图表均支持响应式
