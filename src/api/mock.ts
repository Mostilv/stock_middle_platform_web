import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

interface MockResult<T = unknown> {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  data: T;
}

interface MockRequestContext {
  path: string;
  config: AxiosRequestConfig;
}

type MockHandler = (
  request: MockRequestContext,
) => Promise<MockResult | undefined> | MockResult | undefined;

const jsonResponse = <T>(
  data: T,
  init?: Partial<MockResult<T>>,
): MockResult<T> => ({
  status: 200,
  statusText: 'OK',
  headers: { 'Content-Type': 'application/json' },
  data,
  ...(init ?? {}),
});

const marketDataMock = {
  shanghaiIndex: {
    current: 3700.25,
    change: 1.25,
    history: [3680.5, 3695.2, 3710.8, 3698.45, 3700.25],
  },
  nasdaqIndex: {
    current: 16543.67,
    change: -0.85,
    history: [16680.3, 16620.15, 16580.9, 16560.25, 16543.67],
  },
  goldIndex: {
    current: 2345.89,
    change: 2.15,
    history: [2295.6, 2310.25, 2325.8, 2335.45, 2345.89],
  },
  zhongzheng2000Index: {
    current: 1245.67,
    change: 0.75,
    history: [1235.2, 1240.8, 1242.5, 1243.9, 1245.67],
  },
};

const industryMetricsMock = {
  indicator: 'industry_metrics',
  target: 'primary',
  start: '2024-08-15T00:00:00Z',
  end: '2024-08-26T00:00:00Z',
  dates: [
    '2024-08-15',
    '2024-08-16',
    '2024-08-19',
    '2024-08-20',
    '2024-08-21',
    '2024-08-22',
    '2024-08-23',
    '2024-08-26',
  ],
  series: [
    {
      symbol: 'INDUSTRY:801010',
      code: '801010',
      name: '农林牧渔',
      points: [
        { date: '2024-08-15T00:00:00Z', momentum: 0.5, width: 12 },
        { date: '2024-08-16T00:00:00Z', momentum: 0.8, width: 15 },
        { date: '2024-08-19T00:00:00Z', momentum: -0.3, width: 9 },
        { date: '2024-08-20T00:00:00Z', momentum: 1.2, width: 18 },
        { date: '2024-08-21T00:00:00Z', momentum: 0.2, width: 11 },
        { date: '2024-08-22T00:00:00Z', momentum: -0.6, width: 8 },
        { date: '2024-08-23T00:00:00Z', momentum: 0.4, width: 13 },
        { date: '2024-08-26T00:00:00Z', momentum: 0.9, width: 16 },
      ],
    },
    {
      symbol: 'INDUSTRY:801040',
      code: '801040',
      name: '钢铁',
      points: [
        { date: '2024-08-15T00:00:00Z', momentum: -0.4, width: 10 },
        { date: '2024-08-16T00:00:00Z', momentum: -0.1, width: 12 },
        { date: '2024-08-19T00:00:00Z', momentum: 0.3, width: 14 },
        { date: '2024-08-20T00:00:00Z', momentum: 0.7, width: 17 },
        { date: '2024-08-21T00:00:00Z', momentum: 1.1, width: 20 },
        { date: '2024-08-22T00:00:00Z', momentum: 0.6, width: 16 },
        { date: '2024-08-23T00:00:00Z', momentum: -0.2, width: 9 },
        { date: '2024-08-26T00:00:00Z', momentum: 0.3, width: 11 },
      ],
    },
    {
      symbol: 'INDUSTRY:801150',
      code: '801150',
      name: '医药生物',
      points: [
        { date: '2024-08-15T00:00:00Z', momentum: 1.4, width: 22 },
        { date: '2024-08-16T00:00:00Z', momentum: 1.1, width: 20 },
        { date: '2024-08-19T00:00:00Z', momentum: 0.9, width: 18 },
        { date: '2024-08-20T00:00:00Z', momentum: 1.0, width: 19 },
        { date: '2024-08-21T00:00:00Z', momentum: 0.6, width: 17 },
        { date: '2024-08-22T00:00:00Z', momentum: 0.2, width: 15 },
        { date: '2024-08-23T00:00:00Z', momentum: -0.1, width: 13 },
        { date: '2024-08-26T00:00:00Z', momentum: 0.5, width: 16 },
      ],
    },
  ],
};

const limitUpOverviewMock = {
  date: '2025-08-28',
  sectors: [
    { name: '芯片', count: 27, value: 21441 },
    { name: '算力', count: 29, value: 8221 },
    { name: '人工智能', count: 31, value: 7592 },
    { name: '通信', count: 9, value: 4830 },
    { name: '证券', count: 2, value: 4187 },
  ],
  ladders: [
    {
      level: 6,
      count: 1,
      stocks: [
        {
          name: '科森科技',
          code: '603626',
          time: '09:43',
          price: 10.02,
          changePercent: 28.44,
          volume1: 84.67,
          volume2: 84.67,
          ratio1: 0.43,
          ratio2: 1.9,
          sectors: ['机器人概念'],
          marketCap: 45.6,
          pe: 25.3,
          pb: 2.1,
        },
      ],
    },
    {
      level: 5,
      count: 1,
      stocks: [
        {
          name: '园林股份',
          code: '605303',
          time: '09:30',
          price: 9.99,
          changePercent: 0.49,
          volume1: 32.31,
          volume2: 32.31,
          ratio1: 4.31,
          ratio2: 4.35,
          sectors: ['人工智能', '数字经济'],
          marketCap: 32.8,
          pe: 18.7,
          pb: 1.8,
        },
      ],
    },
    {
      level: 4,
      count: 1,
      stocks: [
        {
          name: '伟隆股份',
          code: '002871',
          time: '13:02',
          price: 10.03,
          changePercent: 5.49,
          volume1: 46.42,
          volume2: 28.25,
          ratio1: 1.07,
          ratio2: 3.41,
          sectors: ['人工智能', '数字经济', '基础建设', '军工'],
          marketCap: 28.5,
          pe: 22.1,
          pb: 1.6,
        },
      ],
    },
    {
      level: 3,
      count: 3,
      stocks: [
        {
          name: '御银科技',
          code: '002177',
          time: '09:33',
          price: 10.01,
          changePercent: 23.12,
          volume1: 76.12,
          volume2: 67.49,
          ratio1: 1.11,
          ratio2: 4.15,
          sectors: ['通信', '证券'],
          marketCap: 56.2,
          pe: 31.5,
          pb: 2.8,
        },
        {
          name: '汇嘉时代',
          code: '603101',
          time: '09:31',
          price: 9.99,
          changePercent: 1.68,
          volume1: 53.86,
          volume2: 53.86,
          ratio1: 1.1,
          ratio2: 2.23,
          sectors: ['有色金属'],
          marketCap: 23.4,
          pe: 15.2,
          pb: 1.3,
        },
        {
          name: '成飞集成',
          code: '002190',
          time: '09:32',
          price: 10.01,
          changePercent: 45.52,
          volume1: 175.02,
          volume2: 175.02,
          ratio1: 1.32,
          ratio2: 6.01,
          sectors: ['军工'],
          marketCap: 67.3,
          pe: 28.9,
          pb: 2.4,
        },
      ],
    },
    {
      level: 2,
      count: 3,
      stocks: [
        {
          name: '万通发展',
          code: '600246',
          time: '09:30',
          price: 10.05,
          changePercent: 1.12,
          volume1: 219.48,
          volume2: 219.48,
          ratio1: 3.74,
          ratio2: 12.46,
          sectors: ['芯片', '人工智能'],
          marketCap: 78.9,
          pe: 35.6,
          pb: 2.9,
        },
        {
          name: '天融信',
          code: '002212',
          time: '09:30',
          price: 9.97,
          changePercent: 10.09,
          volume1: 119.71,
          volume2: 118.44,
          ratio1: 1.72,
          ratio2: 5.51,
          sectors: ['算力', '数字经济', '基础建设', '机器人概念'],
          marketCap: 45.2,
          pe: 26.8,
          pb: 2.1,
        },
        {
          name: '合力泰',
          code: '002217',
          time: '09:37',
          price: 10.04,
          changePercent: 5.57,
          volume1: 229.62,
          volume2: 174.39,
          ratio1: 1.49,
          ratio2: 12.26,
          sectors: ['通信', '云游戏', '化工'],
          marketCap: 34.7,
          pe: 19.3,
          pb: 1.7,
        },
      ],
    },
    {
      level: 0,
      count: 2,
      stocks: [
        {
          name: '模拟股票1',
          code: '000001',
          time: '14:30',
          price: 9.85,
          changePercent: -1.5,
          volume1: 45.23,
          volume2: 45.23,
          ratio1: 0.85,
          ratio2: 2.1,
          sectors: ['芯片'],
          marketCap: 52.1,
          pe: 29.3,
          pb: 2.3,
        },
        {
          name: '模拟股票2',
          code: '000002',
          time: '14:25',
          price: 8.92,
          changePercent: -2.1,
          volume1: 32.15,
          volume2: 32.15,
          ratio1: 0.72,
          ratio2: 1.8,
          sectors: ['人工智能'],
          marketCap: 41.8,
          pe: 23.6,
          pb: 1.9,
        },
      ],
    },
  ],
};

const portfolioOverviewMock = {
  strategies: [
    {
      id: '1',
      name: '价值投资策略',
      description: '基于基本面分析的价值投资策略',
      status: 'active',
      totalValue: 1_000_000,
      totalWeight: 100,
      items: [
        {
          key: '1',
          stock: '贵州茅台',
          code: '600519',
          currentWeight: 15.2,
          targetWeight: 18,
          action: 'buy',
          price: 1688,
          quantity: 100,
          status: 'pending',
          createdAt: '2024-01-15',
          marketValue: 168800,
        },
        {
          key: '2',
          stock: '招商银行',
          code: '600036',
          currentWeight: 8.5,
          targetWeight: 8.5,
          action: 'hold',
          price: 35.2,
          quantity: 0,
          status: 'completed',
          createdAt: '2024-01-13',
          marketValue: 0,
        },
      ],
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: '成长投资策略',
      description: '专注于高成长性公司的投资策略',
      status: 'active',
      totalValue: 800_000,
      totalWeight: 100,
      items: [
        {
          key: '3',
          stock: '宁德时代',
          code: '300750',
          currentWeight: 12.8,
          targetWeight: 10,
          action: 'sell',
          price: 245.6,
          quantity: 200,
          status: 'completed',
          createdAt: '2024-01-14',
          marketValue: 49120,
        },
      ],
      createdAt: '2024-01-05',
    },
  ],
  todayPnL: 12500,
  totalPnL: 89000,
  todayRebalance: 8,
  todayPendingRebalance: 3,
};

const settingsDataMock = {
  emailConfigs: [
    {
      id: '1',
      email: 'admin@example.com',
      remark: '管理员邮箱',
      enabled: true,
    },
    {
      id: '2',
      email: 'trader@example.com',
      remark: '交易员邮箱',
      enabled: true,
    },
  ],
  notificationTemplates: [
    {
      id: '1',
      name: '通知模板',
      subject: '投资组合调仓通知 - {date}',
      content:
        '策略名称：{{strategyName}}\n委托时间：{{orderTime}}\n股票|委托数量|委托类型|委托价格|操作|持仓\n{{#orders}}{{stock}}|{{quantity}}|{{orderType}}|{{price}}|{{action}}|{{position}}\n{{/orders}}',
      enabled: true,
    },
  ],
};

const usersMock = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    full_name: '系统管理员',
    is_active: true,
    is_superuser: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    isReal: true,
  },
  {
    id: 2,
    username: 'trader',
    email: 'trader@example.com',
    full_name: '交易员',
    is_active: true,
    is_superuser: false,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    isReal: true,
  },
  {
    id: 3,
    username: 'analyst',
    email: 'analyst@example.com',
    full_name: '分析师',
    is_active: true,
    is_superuser: false,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    isReal: false,
  },
  {
    id: 4,
    username: 'viewer',
    email: 'viewer@example.com',
    full_name: '观察员',
    is_active: false,
    is_superuser: false,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
    isReal: false,
  },
];

const mockAuthUsers = {
  admin: { password: '123456', role: 'admin' },
  trader: { password: '123456', role: 'trader' },
};

const strategySubscriptionsMock = {
  strategies: [
    {
      id: 'alpha-trend',
      name: 'Alpha趋势跟踪',
      summary: '捕捉高胜率趋势行情，聚焦放量突破与动量修复的组合交易信号。',
      riskLevel: '中',
      signalFrequency: '日内/收盘',
      lastSignal: '2025-01-15 10:12',
      performance: 12.4,
      subscribed: true,
      channels: ['app', 'email'],
      tags: ['趋势', '风控联动'],
      subscribers: 86,
    },
    {
      id: 'quant-mean',
      name: '量化均值回归',
      summary: '统计套利+波动率分层，适合低回撤的稳健订阅。',
      riskLevel: '低',
      signalFrequency: '日内低频',
      lastSignal: '2025-01-14 14:35',
      performance: 6.8,
      subscribed: false,
      channels: ['app'],
      tags: ['稳健', '低回撤'],
      subscribers: 54,
    },
    {
      id: 'event-drive',
      name: '事件驱动快线',
      summary: '侧重公告、异动与成交量触发的短线信号，推送更敏捷。',
      riskLevel: '高',
      signalFrequency: '实时推送',
      lastSignal: '2025-01-15 09:55',
      performance: 18.9,
      subscribed: false,
      channels: ['app', 'sms'],
      tags: ['快节奏', '题材轮动'],
      subscribers: 41,
    },
  ],
  recentSignals: [
    {
      id: 'sig-1',
      strategyName: 'Alpha趋势跟踪',
      time: '2025-01-15 10:12',
      action: '触发买入信号：放量突破5日高点',
      expectedImpact: '预计提升组合beta，关注回撤控制',
    },
    {
      id: 'sig-2',
      strategyName: '事件驱动快线',
      time: '2025-01-15 09:55',
      action: '冲击涨停受阻，提醒减仓 30%',
      expectedImpact: '缓冲单一标的波动，降低敞口',
    },
    {
      id: 'sig-3',
      strategyName: '量化均值回归',
      time: '2025-01-14 14:35',
      action: '超跌反弹触发建仓窗口',
      expectedImpact: '占用组合 5% 仓位，目标 3% 区间收益',
    },
  ],
};

// 这里集中定义 Mock 路由
const routes: Record<string, MockHandler> = {
  'GET /market/data': () => jsonResponse(marketDataMock),
  'GET /limitup/overview': () => jsonResponse(limitUpOverviewMock),
  'GET /portfolio/overview': () => jsonResponse(portfolioOverviewMock),
  'GET /settings/data': () => jsonResponse(settingsDataMock),
  'POST /settings/data': () => jsonResponse({ ok: true }),
  'GET /users': () => jsonResponse(usersMock),
  'GET /analytics/industry/metrics': () => jsonResponse(industryMetricsMock),
  'POST /auth/login': ({ config }) => {
    const body =
      typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    const matched = mockAuthUsers[body?.username as keyof typeof mockAuthUsers];
    if (matched && body?.password === matched.password) {
      return jsonResponse({
        token: `mock-token-${body.username}`,
        user: {
          username: body.username,
          role: matched.role,
        },
      });
    }
    return jsonResponse(
      { message: 'invalid credentials' },
      { status: 401, statusText: 'Unauthorized' },
    );
  },
  'GET /strategies/subscriptions': () =>
    jsonResponse(strategySubscriptionsMock),
  'POST /strategies/subscriptions': ({ config }) => {
    const body =
      typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    strategySubscriptionsMock.strategies = strategySubscriptionsMock.strategies.map(
      item =>
        item.id === body?.strategyId
          ? {
              ...item,
              subscribed: Boolean(body?.subscribed),
              channels: body?.channels || item.channels,
            }
          : item,
    );
    return jsonResponse({ ok: true });
  },
};

export async function resolveMockResponse<T = unknown>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T> | undefined> {
  if (!API_CONFIG.enableMock) return undefined;

  const method = (config.method || 'GET').toUpperCase();
  const rawUrl = config.url || '';
  const [pathPart] = rawUrl.split('?');
  const normalizedPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
  const handler = routes[`${method} ${normalizedPath}`];

  if (!handler) return undefined;

  const result = await handler({ path: normalizedPath, config });
  if (!result) return undefined;

  return {
    data: result.data as T,
    status: result.status ?? 200,
    statusText: result.statusText ?? 'OK',
    headers: result.headers ?? { 'Content-Type': 'application/json' },
    config,
  } as AxiosResponse<T>;
}
