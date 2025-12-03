export type NotificationChannel = 'app' | 'email' | 'sms' | 'webhook';

export interface StrategySubscriptionPreference {
  strategyId: string;
  subscribed: boolean;
  channels: NotificationChannel[];
}
