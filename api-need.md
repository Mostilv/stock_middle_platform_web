# 前端接口说明

本文档从前端代码的实际调用出发，总结当前依赖的接口。若与后端 Swagger 存在差异，以后端 `/openapi.json` 为准。

## 通用约定

- 统一通过 `src/api/httpClient.ts` 发起请求
- 默认基于 `VITE_API_BASE_URL` 作为后端前缀
- `VITE_ENABLE_API_MOCK=true` 时使用前端内置 Mock 数据

## 认证与账户

### `POST /auth/login`

- 用途：登录
- 前端位置：`src/api/auth.ts`

### `GET /account/profile`

- 用途：获取当前用户资料
- 前端位置：`src/api/auth.ts`

### `PUT /account/profile`

- 用途：更新当前用户资料
- 前端位置：`src/api/auth.ts`

### `POST /account/password`

- 用途：修改密码
- 前端位置：`src/api/auth.ts`

## 设置

### `GET /settings/data`

- 用途：读取邮箱配置与通知模板
- 前端位置：`src/api/settings.ts`

### `POST /settings/data`

- 用途：保存邮箱配置与通知模板
- 前端位置：`src/api/settings.ts`

## 仪表盘与市场数据

### `GET /market/data`

- 用途：获取首页指数数据
- 前端位置：`src/api/dashboard.ts`

### `GET /analytics/industry/metrics`

- 用途：获取行业动量/宽度序列
- 前端位置：`src/api/dashboard.ts`
- 常用查询参数：`days`、`target`、`end`

## 涨停复盘

### `GET /limitup/overview`

- 用途：获取指定日期的涨停池概览
- 前端位置：`src/api/limitUp.ts`
- 可选参数：`date`

## 投资组合

### `GET /portfolio/overview`

- 用途：读取投资组合概览
- 前端位置：`src/api/portfolio.ts`

### `POST /portfolio/strategies/{strategy_id}/toggle`

- 用途：切换策略启停状态
- 前端位置：`src/api/portfolio.ts`

## 策略订阅

### `GET /strategies/subscriptions`

- 用途：读取策略订阅状态
- 前端位置：`src/api/strategy.ts`

### `POST /strategies/subscriptions`

- 用途：更新单个策略订阅状态
- 前端位置：`src/api/strategy.ts`

### `POST /strategies/subscriptions/blacklist`

- 用途：更新黑名单
- 前端位置：`src/api/strategy.ts`

## 用户管理

### `GET /users`
### `GET /users/{id}`
### `POST /users`
### `PUT /users/{id}`
### `DELETE /users/{id}`

- 用途：后台用户管理
- 前端位置：`src/api/users.ts`

## 备注

- 前端仍保留部分 Mock 数据与演示文案
- 若登录态接入发生变化，优先修改 `src/api/auth.ts` 与 `src/contexts/AuthContext.tsx`
