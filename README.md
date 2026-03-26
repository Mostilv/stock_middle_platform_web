# 股票中台前端

`stock_middle_platform_web` 是股票中台的前端应用，基于 React、TypeScript 和 Vite 构建，当前主要服务于仪表盘、涨停复盘、投资组合、策略订阅、用户管理和系统设置页面。

## 技术栈

- React 19
- TypeScript
- Vite
- React Router
- Ant Design
- styled-components
- ECharts
- Zustand

## 当前页面

- 仪表盘 `Dashboard`
- 涨停复盘 `LimitUpStocks`
- 投资组合 `Portfolio`
- 登录 `Login`
- 策略订阅 `StrategySubscription`
- 用户管理 `UserManagement`
- 系统设置 `Settings`

## 目录结构

```text
src/
|-- api/          接口封装
|-- assets/       静态资源
|-- components/   通用组件
|-- constants/    常量
|-- contexts/     认证与主题上下文
|-- hooks/        自定义 hooks
|-- pages/        页面模块
|-- stores/       全局状态
|-- styles/       全局样式与主题
|-- types/        类型定义
|-- utils/        工具函数
|-- App.tsx       路由入口
`-- main.tsx      应用入口
```

## 环境变量

- `VITE_API_BASE_URL`
  用于指定后端地址，例如 `http://localhost:8000/api/v1`
- `VITE_ENABLE_API_MOCK`
  设为 `true` 时启用前端内置 Mock 数据

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

## 当前实现说明

- API 封装位于 `src/api/`
- 应用通过 `src/contexts/` 提供认证和主题能力
- 路由集中在 `src/App.tsx`
- 组件样式主要通过 `styled-components` 管理
- 前端仍保留一部分 Mock 数据，用于没有后端时的页面联调

## 相关文档

- 接口需求说明见 `api-need.md`
- 仪表盘说明见 `src/pages/Dashboard/README.md`
- 图表组件说明见 `src/components/StockChart/README.md`
