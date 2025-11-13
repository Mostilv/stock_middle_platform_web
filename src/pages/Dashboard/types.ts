export interface HeroMetric {
  label: string;
  value: string;
  hint: string;
  trend: 'up' | 'down' | 'flat';
}

export interface MarketNarrative {
  mood: string;
  detail: string;
}

