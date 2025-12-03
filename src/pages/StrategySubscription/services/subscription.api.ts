import { http } from '../../../api/httpClient';
import type { NotificationChannel } from '../../../types/subscription';

export interface StrategySubscriptionItem {
  id: string;
  name: string;
  summary: string;
  riskLevel: '低' | '中' | '高';
  signalFrequency: string;
  lastSignal?: string;
  performance: number;
  subscribed: boolean;
  channels: NotificationChannel[];
  tags?: string[];
  subscribers?: number;
}

export interface StrategySubscriptionResponse {
  strategies: StrategySubscriptionItem[];
  blacklist: string[];
}

export interface UpdateSubscriptionPayload {
  strategyId: string;
  subscribed: boolean;
  channels: NotificationChannel[];
}

export interface UpdateBlacklistPayload {
  blacklist: string[];
}

export const fetchStrategySubscriptions =
  (): Promise<StrategySubscriptionResponse> =>
    http.get<StrategySubscriptionResponse>('/strategies/subscriptions');

export const updateStrategySubscription = (
  payload: UpdateSubscriptionPayload,
): Promise<{ ok: boolean }> =>
  http.post<{ ok: boolean }, UpdateSubscriptionPayload>(
    '/strategies/subscriptions',
    payload,
  );

export const updateStrategyBlacklist = (
  payload: UpdateBlacklistPayload,
): Promise<{ ok: boolean }> =>
  http.post<{ ok: boolean }, UpdateBlacklistPayload>(
    '/strategies/subscriptions/blacklist',
    payload,
  );
