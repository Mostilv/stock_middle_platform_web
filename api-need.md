# 项目接口需求说明

- 所有接口响应均为 JSON（当前前端也按此解析），示例均为 Mock 数据格式。
- 基础：`VITE_API_BASE_URL` 作为后端根地址，`Content-Type: application/json`，超时 15s。`VITE_ENABLE_API_MOCK=true` 时走前端 Mock。
- 鉴权：登录成功的 `token` 存入 `localStorage` 的 `auth_token`。axios 目前未自动附带鉴权头，如需请后端约定（推荐 `Authorization: Bearer <token>`）。

## 认证
- **POST /auth/login**
  - 请求示例
    ```json
    { "username": "admin", "password": "123456" }
    ```
  - 响应示例
    ```json
    {
      "token": "mock-token-admin",
      "user": {
        "username": "admin",
        "role": "admin",
        "email": "admin@example.com",
        "displayName": "策略管理员",
        "avatarUrl": "https://api.dicebear.com/7.x/initials/svg?seed=Admin"
      }
    }
    ```

## 账户与设置
- **GET /account/profile**
  - 响应示例
    ```json
    {
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin",
      "display_name": "策略管理员",
      "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=Admin"
    }
    ```
- **PUT /account/profile**
  - 请求示例
    ```json
    {
      "username": "admin",
      "display_name": "策略管理员",
      "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
      "email": "admin@example.com"
    }
    ```
  - 响应同 GET。
- **POST /account/password**
  - 请求示例
    ```json
    { "currentPassword": "123456", "newPassword": "654321" }
    ```
  - 响应示例
    ```json
    { "ok": true }
    ```
- **GET /settings/data**
  - 响应示例
    ```json
    {
      "emailConfigs": [
        { "id": "1", "email": "admin@example.com", "remark": "管理员邮箱", "enabled": true },
        { "id": "2", "email": "trader@example.com", "remark": "交易员邮箱", "enabled": true }
      ],
      "notificationTemplates": [
        {
          "id": "1",
          "name": "通知模板",
          "subject": "投资组合调仓通知 - {date}",
          "content": "策略名称：{{strategyName}}\\n委托时间：{{orderTime}}\\n股票|委托数量|委托类型|委托价格|操作|持仓\\n{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}\\n{{/orders}}",
          "enabled": true
        }
      ]
    }
    ```
- **POST /settings/data**
  - 请求示例：同上响应结构。
  - 响应示例
    ```json
    { "ok": true }
    ```

## 指数与行情
- **GET /market/data**
  - 响应示例
    ```json
    {
      "shanghaiIndex": { "current": 3700.25, "change": 1.25, "history": [3680.5, 3695.2, 3710.8, 3698.45, 3700.25] },
      "nasdaqIndex": { "current": 16543.67, "change": -0.85, "history": [16680.3, 16620.15, 16580.9, 16560.25, 16543.67] },
      "goldIndex": { "current": 2345.89, "change": 2.15, "history": [2295.6, 2310.25, 2325.8, 2335.45, 2345.89] },
      "zhongzheng2000Index": { "current": 1245.67, "change": 0.75, "history": [1235.2, 1240.8, 1242.5, 1243.9, 1245.67] }
    }
    ```

## 行业因子指标
- **GET /analytics/industry/metrics**
  - 查询参数示例：`?days=30&target=primary&end=2024-08-26`
  - 响应示例
    ```json
    {
      "indicator": "industry_metrics",
      "target": "primary",
      "start": "2024-08-15T00:00:00Z",
      "end": "2024-08-26T00:00:00Z",
      "dates": ["2024-08-15", "2024-08-16", "2024-08-19", "2024-08-20"],
      "series": [
        {
          "symbol": "INDUSTRY:801010",
          "code": "801010",
          "name": "银行",
          "points": [
            { "date": "2024-08-15T00:00:00Z", "momentum": 0.71, "width": 13.5 },
            { "date": "2024-08-16T00:00:00Z", "momentum": 1.04, "width": 15.1 }
          ]
        }
      ]
    }
    ```

## 涨停监控
- **GET /limitup/overview**
  - 查询参数示例：`?date=2025-08-28`
  - 响应示例
    ```json
    {
      "date": "2025-08-28",
      "sectors": [
        { "name": "芯片", "count": 27, "value": 21441 },
        { "name": "算力", "count": 29, "value": 8221 }
      ],
      "ladders": [
        {
          "level": 6,
          "count": 1,
          "stocks": [
            {
              "name": "科森科技",
              "code": "603626",
              "time": "09:43",
              "price": 10.02,
              "changePercent": 28.44,
              "volume1": 84.67,
              "volume2": 84.67,
              "ratio1": 0.43,
              "ratio2": 1.9,
              "sectors": ["机器人概念"],
              "marketCap": 45.6,
              "pe": 25.3,
              "pb": 2.1
            }
          ]
        }
      ]
    }
    ```

## 投资组合
- **GET /portfolio/overview**
  - 响应示例
    ```json
    {
      "strategies": [
        {
          "id": "1",
          "name": "价值投资策略",
          "description": "基于基本面评分的价值投资策略",
          "status": "active",
          "totalValue": 1000000,
          "totalWeight": 100,
          "items": [
            {
              "key": "1",
              "stock": "贵州茅台",
              "code": "600519",
              "currentWeight": 15.2,
              "targetWeight": 18,
              "action": "buy",
              "price": 1688,
              "quantity": 100,
              "status": "pending",
              "createdAt": "2024-01-15",
              "marketValue": 168800
            }
          ],
          "createdAt": "2024-01-01"
        }
      ],
      "todayPnL": 12500,
      "totalPnL": 89000,
      "todayRebalance": 8,
      "todayPendingRebalance": 3
    }
    ```

## 策略订阅
- **GET /strategies/subscriptions**
  - 响应示例
    ```json
    {
      "strategies": [
        {
          "id": "alpha-trend",
          "name": "Alpha趋势跟踪",
          "summary": "捕捉高胜率趋势行情，聚焦放量突破与动量修复的组合交易信号",
          "riskLevel": "中",
          "signalFrequency": "日内/收盘",
          "lastSignal": "2025-01-15 10:12",
          "performance": 12.4,
          "subscribed": true,
          "channels": ["email"],
          "tags": ["趋势", "风控联动"],
          "subscribers": 86
        }
      ],
      "blacklist": ["600519", "000001", "300750"]
    }
    ```
- **POST /strategies/subscriptions**
  - 请求示例
    ```json
    { "strategyId": "alpha-trend", "subscribed": false, "channels": ["app", "email"] }
    ```
  - 响应示例
    ```json
    { "ok": true }
    ```
- **POST /strategies/subscriptions/blacklist**
  - 请求示例
    ```json
    { "blacklist": ["600519", "000001"] }
    ```
  - 响应示例
    ```json
    { "ok": true }
    ```

## 用户管理
- **GET /users**
  - 查询参数示例：`?skip=0&limit=20`
  - 响应示例
    ```json
    [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "full_name": "系统管理员",
        "display_name": "策略管理员",
        "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
        "is_active": true,
        "is_superuser": true,
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z",
        "isReal": true,
        "remark": "系统默认管理员"
      }
    ]
    ```
- **GET /users/{id}**
  - 响应示例
    ```json
    {
      "id": 2,
      "username": "trader",
      "email": "trader@example.com",
      "full_name": "交易员",
      "display_name": "资深交易员",
      "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=Trader",
      "is_active": true,
      "is_superuser": false,
      "created_at": "2024-01-02T00:00:00Z",
      "updated_at": "2024-01-02T00:00:00Z",
      "isReal": true,
      "remark": "核心交易员"
    }
    ```
- **POST /users**
  - 请求示例
    ```json
    {
      "username": "newuser",
      "email": "newuser@example.com",
      "password": "123456",
      "full_name": "新同事",
      "display_name": "新同事",
      "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=newuser",
      "isReal": true,
      "remark": "试用期"
    }
    ```
  - 响应示例
    ```json
    {
      "id": 3,
      "username": "newuser",
      "email": "newuser@example.com",
      "full_name": "新同事",
      "display_name": "新同事",
      "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=newuser",
      "is_active": true,
      "is_superuser": false,
      "created_at": "2024-01-05T00:00:00Z",
      "updated_at": "2024-01-05T00:00:00Z",
      "isReal": true,
      "remark": "试用期"
    }
    ```
- **PUT /users/{id}**
  - 请求示例
    ```json
    {
      "email": "updated@example.com",
      "display_name": "更新后的昵称",
      "is_active": true,
      "is_superuser": false,
      "remark": "备注更新"
    }
    ```
  - 响应示例
    ```json
    {
      "id": 2,
      "username": "trader",
      "email": "updated@example.com",
      "full_name": "交易员",
      "display_name": "更新后的昵称",
      "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=Trader",
      "is_active": true,
      "is_superuser": false,
      "created_at": "2024-01-02T00:00:00Z",
      "updated_at": "2024-02-01T12:00:00Z",
      "isReal": true,
      "remark": "备注更新"
    }
    ```
- **DELETE /users/{id}**
  - 响应示例
    ```json
    { "ok": true }
    ```
- **POST /users/{id}/roles**
  - 请求示例
    ```json
    { "roles": ["admin", "trader"] }
    ```
  - 响应示例
    ```json
    { "id": 2, "username": "trader", "roles": ["admin", "trader"] }
    ```
- **DELETE /users/{id}/roles**
  - 请求示例（DELETE body）
    ```json
    { "roles": ["trader"] }
    ```
  - 响应示例
    ```json
    { "id": 2, "username": "trader", "roles": [] }
    ```
- **POST /users/{id}/permissions**
  - 请求示例
    ```json
    { "permissions": ["user.read", "user.write"] }
    ```
  - 响应示例
    ```json
    { "id": 2, "username": "trader", "permissions": ["user.read", "user.write"] }
    ```
- **DELETE /users/{id}/permissions**
  - 请求示例（DELETE body）
    ```json
    { "permissions": ["user.write"] }
    ```
  - 响应示例
    ```json
    { "id": 2, "username": "trader", "permissions": ["user.read"] }
    ```

## 统一 User 结构
```json
{
  "id": 0,
  "username": "string",
  "email": "string",
  "full_name": "string?",
  "display_name": "string?",
  "avatar_url": "string?",
  "is_active": true,
  "is_superuser": false,
  "created_at": "ISODate",
  "updated_at": "ISODate",
  "isReal": true,
  "remark": "string?"
}
```
