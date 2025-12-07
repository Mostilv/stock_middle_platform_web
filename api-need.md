# 项目接口需求说明
- 所有接口使用 JSON 请求/响应，默认 `Content-Type: application/json`，超时 15s。`VITE_API_BASE_URL` 作为基地址；`VITE_ENABLE_API_MOCK=true` 或未配置基址时走前端内置 Mock。
- 后端数据库已有指数、股票基础数据（含名称）、自定义指标数据、策略与用户数据；前端需按下述请求格式传递查询条件，后端据此返回匹配的数据。
- 登录成功后返回的 `token` 会存入 `localStorage`(`auth_token`)；当前 Axios 未自动附带 Authorization 头，如需要请兼容 `Authorization: Bearer <token>`。

## 1. 认证
### POST /auth/login
- 功能：账号密码登录，返回用户信息与 token。
- 请求体示例
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
    "avatarUrl": "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    "emailConfigs": [
      { "id": "1", "email": "admin@example.com", "remark": "管理员邮箱", "enabled": true }
    ],
    "notificationTemplates": [
      {
        "id": "tpl-1",
        "name": "通知模板",
        "subject": "投资组合调仓通知 - {{date}}",
        "content": "策略名称：{{strategyName}}\\n委托时间：{{orderTime}}\\n{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}\\n{{/orders}}",
        "enabled": true
      }
    ]
  }
}
```

## 2. 账户与系统设置
### GET /account/profile
- 功能：获取当前登录用户资料。
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

### PUT /account/profile
- 功能：更新账号资料（用户名/头像）。
- 请求体示例
```json
{
  "username": "admin",
  "display_name": "策略管理员",
  "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=Admin"
}
```
- 响应同 GET /account/profile。

### POST /account/password
- 功能：修改当前登录用户密码。
- 请求体示例
```json
{ "currentPassword": "123456", "newPassword": "654321" }
```
- 响应示例
```json
{ "ok": true }
```

### GET /settings/data
- 功能：获取通知邮箱与模板配置（登录后调用）。
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
      "subject": "投资组合调仓通知 - {{date}}",
      "content": "策略名称：{{strategyName}}\\n委托时间：{{orderTime}}\\n股票|委托数量|委托类型|委托价格|操作|持仓\\n{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}\\n{{/orders}}",
      "enabled": true
    }
  ]
}
```

### POST /settings/data
- 功能：保存通知邮箱和模板配置（最多 3 个邮箱）。
- 请求体示例（同 GET 返回体）
```json
{
  "emailConfigs": [
    { "id": "1", "email": "admin@example.com", "remark": "管理员邮箱", "enabled": true }
  ],
  "notificationTemplates": [
    {
      "id": "tpl-1",
      "name": "通知模板",
      "subject": "投资组合调仓通知 - {{date}}",
      "content": "策略名称：{{strategyName}}...",
      "enabled": true
    }
  ]
}
```
- 响应示例
```json
{ "ok": true }
```

## 3. 行情与行业指标
### GET /market/data
- 功能：按名称获取所需指数行情数据。
- 请求参数：
  - `symbols`（必填）：字符串数组，指数名称/标识列表。示例：`["shanghaiIndex", "nasdaqIndex", "goldIndex", "zhongzheng2000Index"]`。
  - `historyDays`（可选）：数值，返回近 N 天/周期的历史点位，默认 5。
- 请求示例：`GET /market/data?symbols=shanghaiIndex,nasdaqIndex,goldIndex,zhongzheng2000Index&historyDays=5`
- 响应示例
```json
{
  "shanghaiIndex": { "current": 3700.25, "change": 1.25, "history": [3680.5, 3695.2, 3710.8, 3698.45, 3700.25] },
  "nasdaqIndex": { "current": 16543.67, "change": -0.85, "history": [16680.3, 16620.15, 16580.9, 16560.25, 16543.67] },
  "goldIndex": { "current": 2345.89, "change": 2.15, "history": [2295.6, 2310.25, 2325.8, 2335.45, 2345.89] },
  "zhongzheng2000Index": { "current": 1245.67, "change": 0.75, "history": [1235.2, 1240.8, 1242.5, 1243.9, 1245.67] }
}
```

### GET /analytics/industry/metrics
- 功能：获取申万一级行业动量/宽度指标。
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

## 4. 涨停监控
### GET /limitup/overview
- 功能：获取指定交易日涨停概览、梯队分布。
- 查询参数：`date`（可选，格式 YYYY-MM-DD）。
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
      "level": 3,
      "count": 2,
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
          "sectors": ["人工智能", "机器人"],
          "marketCap": 45.6,
          "pe": 25.3,
          "pb": 2.1
        }
      ]
    }
  ]
}
```

## 5. 投资组合
### GET /portfolio/overview
- 功能：获取策略组合列表与盈亏、调仓概览。
- 响应示例
```json
{
  "strategies": [
    {
      "id": "1",
      "name": "价值投资策略",
      "description": "基于基本面分析的价值投资策略",
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

## 6. 策略订阅
### GET /strategies/subscriptions
- 功能：获取可订阅策略列表与股票黑名单。
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

### POST /strategies/subscriptions
- 功能：订阅/取消订阅策略，并设置推送渠道。
- 请求体示例
```json
{ "strategyId": "alpha-trend", "subscribed": false, "channels": ["app", "email"] }
```
- 响应示例
```json
{ "ok": true }
```

### POST /strategies/subscriptions/blacklist
- 功能：更新推送黑名单股票列表。
- 请求体示例
```json
{ "blacklist": ["600519", "000001"] }
```
- 响应示例
```json
{ "ok": true }
```

## 7. 用户管理
### GET /users
- 功能：获取用户列表。
- 查询参数：`skip`（可选，默认 0），`limit`（可选，默认 20），支持附加筛选字段。
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

### GET /users/{id}
- 功能：获取单个用户详情。
- 响应示例同列表单条。

### POST /users
- 功能：创建新用户。
- 请求体示例
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "123456",
  "full_name": "新同事",
  "display_name": "新同事",
  "avatar_url": "https://api.dicebear.com/7.x/initials/svg?seed=newuser",
  "isReal": true,
  "remark": "测试账号"
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
  "remark": "测试账号"
}
```

### PUT /users/{id}
- 功能：更新用户信息（邮箱、显示名、状态、角色等）。
- 请求体示例
```json
{
  "email": "updated@example.com",
  "display_name": "更新后的名称",
  "is_active": true,
  "is_superuser": false,
  "remark": "备注更新"
}
```
- 响应示例同 GET /users/{id}。

### DELETE /users/{id}
- 功能：删除用户。
- 响应示例
```json
{ "ok": true }
```

### POST /users/{id}/roles
- 功能：为用户新增角色。
- 请求体示例
```json
{ "roles": ["admin", "trader"] }
```
- 响应示例
```json
{ "id": 2, "username": "trader", "roles": ["admin", "trader"] }
```

### DELETE /users/{id}/roles
- 功能：移除用户角色（DELETE 需携带 body）。
- 请求体示例
```json
{ "roles": ["trader"] }
```
- 响应示例
```json
{ "id": 2, "username": "trader", "roles": [] }
```

### POST /users/{id}/permissions
- 功能：为用户新增权限。
- 请求体示例
```json
{ "permissions": ["user.read", "user.write"] }
```
- 响应示例
```json
{ "id": 2, "username": "trader", "permissions": ["user.read", "user.write"] }
```

### DELETE /users/{id}/permissions
- 功能：移除用户权限（DELETE 需携带 body）。
- 请求体示例
```json
{ "permissions": ["user.write"] }
```
- 响应示例
```json
{ "id": 2, "username": "trader", "permissions": ["user.read"] }
```

### 统一 User 结构
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
