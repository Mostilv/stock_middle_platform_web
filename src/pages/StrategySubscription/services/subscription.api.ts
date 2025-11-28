import { http } from '../../../api/httpClient';

export type NotificationChannel = 'app' | 'email' | 'sms' | 'webhook';

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

export interface SignalPreview {
  id: string;
  strategyName: string;
  time: string;
  action: string;
  expectedImpact: string;
}

export interface StrategySubscriptionResponse {
  strategies: StrategySubscriptionItem[];
  recentSignals: SignalPreview[];
}

export interface UpdateSubscriptionPayload {
  strategyId: string;
  subscribed: boolean;
  channels: NotificationChannel[];
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
