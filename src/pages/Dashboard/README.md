# Dashboard 页面说明

`Dashboard` 是首页模块，主要负责展示市场指数、行业动量和行业宽度等信息。

## 目录结构

```text
src/pages/Dashboard/
|-- Dashboard.tsx
|-- Dashboard.styles.ts
|-- dashboardCopy.ts
|-- types.ts
|-- components/
|   |-- Box.tsx
|   |-- page-one/
|   `-- page-two/
`-- README.md
```

## 当前组成

- 顶层页面：`Dashboard.tsx`
- 第一屏组件：`components/page-one/`
- 第二屏组件：`components/page-two/`
- 公共容器：`Box.tsx`

## 数据来源

- 市场数据来自 `src/api/dashboard.ts`
- 行业指标来自 `/analytics/industry/metrics`

## 维护说明

- 页面依赖主题上下文和全局布局
- 图表较多，改动时需要同时关注桌面和窄屏布局
- 若接口字段变化，优先同步 `src/api/dashboard.ts` 和相关类型定义
