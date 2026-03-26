import { http } from './httpClient';

export interface StrategySubscription {
  id: string;
  name: string;
  summary: string;
  riskLevel: '低' | '中' | '高';
  signalFrequency: string;
  lastSignal: string;
  performance: number;
  subscribed: boolean;
  channels: string[];
  tags: string[];
  subscribers: number;
}

export interface StrategySubscriptionsResponse {
  strategies: StrategySubscription[];
  blacklist: string[];
}

let mockSubscriptions: StrategySubscriptionsResponse = {
  strategies: [
    { id: 'alpha-trend', name: 'Alpha趋势跟踪', summary: '捕捉高胜率趋势行情，聚焦放量突破与动量修复的组合交易信号。', riskLevel: '中', signalFrequency: '日内/收盘', lastSignal: '2025-01-15 10:12', performance: 12.4, subscribed: true, channels: ['email'], tags: ['趋势', '风控联动'], subscribers: 86 },
    { id: 'quant-mean', name: '量化均值回归', summary: '统计套利+波动率分层，适合低回撤的稳健订阅。', riskLevel: '低', signalFrequency: '日内低频', lastSignal: '2025-01-14 14:35', performance: 6.8, subscribed: false, channels: [], tags: ['稳健', '低回撤'], subscribers: 54 },
    { id: 'event-drive', name: '事件驱动快线', summary: '侧重公告、异动与成交量触发的短线信号，推送更敏捷。', riskLevel: '高', signalFrequency: '实时推送', lastSignal: '2025-01-15 09:55', performance: 18.9, subscribed: false, channels: [], tags: ['快节奏', '题材轮动'], subscribers: 41 },
  ],
  blacklist: ['600519', '000001', '300750'],
};

export const fetchStrategySubscriptions = async (): Promise<StrategySubscriptionsResponse> => {
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    return JSON.parse(JSON.stringify(mockSubscriptions));
  }
  return http.get<StrategySubscriptionsResponse>('/strategies/subscriptions');
};

export const updateStrategySubscription = async (params: { strategyId: string; subscribed: boolean; channels: string[] }): Promise<{ ok: boolean }> => {
  const { strategyId, subscribed, channels } = params;
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    const target = mockSubscriptions.strategies.find(s => s.id === strategyId);
    if (target) {
      target.subscribed = subscribed;
      target.channels = channels;
    }
    return { ok: true };
  }
  return http.post<{ ok: boolean }, any>('/strategies/subscriptions', { strategyId, subscribed, channels });
};

export const updateStrategyBlacklist = async (params: { blacklist: string[] }): Promise<{ ok: boolean }> => {
  const { blacklist } = params;
  if (import.meta.env.VITE_ENABLE_API_MOCK === 'true') {
    mockSubscriptions.blacklist = blacklist;
    return { ok: true };
  }
  return http.post<{ ok: boolean }, any>('/strategies/subscriptions/blacklist', { blacklist });
};
