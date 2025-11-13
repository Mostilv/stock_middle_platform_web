import type { MarketNarrative } from '../pages/Dashboard/types';
import type { Locale } from './LocaleContext';

type NarrativeKey =
  | 'strongBull'
  | 'mildBull'
  | 'strongBear'
  | 'pullback'
  | 'range';

interface SectionCopy {
  eyebrow: string;
  title: string;
  meta?: string;
}

export interface DashboardPageOneCopy {
  heroTitle: string;
  scrollHint: string;
  sections: {
    marketSize: SectionCopy;
    breadth: SectionCopy;
    momentum: SectionCopy;
    sentiment: SectionCopy;
  };
}

export interface DashboardPageTwoCopy {
  eyebrow: string;
  title: string;
  meta: string;
}

export interface DashboardCopy {
  pageOne: DashboardPageOneCopy;
  pageTwo: DashboardPageTwoCopy;
  indexLabels: Record<string, string>;
  narratives: Record<NarrativeKey, MarketNarrative>;
}

const DASHBOARD_COPY: Record<Locale, DashboardCopy> = {
  'en-US': {
    pageOne: {
      heroTitle: 'SOHA Market Cockpit',
      scrollHint: 'Scroll vertically for more',
      sections: {
        marketSize: {
          eyebrow: 'Market size',
          title: '',
          meta: '',
        },
        breadth: {
          eyebrow: 'BREADTH',
          title: 'Industry breadth',
          meta: 'Day-over-day',
        },
        momentum: {
          eyebrow: 'MOMENTUM',
          title: 'Industry momentum radar',
          meta: 'High-frequency',
        },
        sentiment: {
          eyebrow: 'SENTIMENT',
          title: 'Sentiment probe',
          meta: 'Board mapping',
        },
      },
    },
    pageTwo: {
      eyebrow: 'MARKET LAB',
      title: 'Multi-metric overview',
      meta: 'Quick scan',
    },
    indexLabels: {
      shanghaiIndex: 'Shanghai Composite',
      nasdaqIndex: 'NASDAQ',
      goldIndex: 'Gold',
      zhongzheng2000Index: 'CSI 2000',
    },
    narratives: {
      strongBull: {
        mood: 'Bullish control',
        detail: 'Fresh capital keeps rotating into core assets, sustaining the uptrend.',
      },
      mildBull: {
        mood: 'Gentle uptrend',
        detail: 'Bull and bear forces are balanced for now, while structural themes keep lighting up.',
      },
      strongBear: {
        mood: 'Risk-off retreat',
        detail: 'Defensive assets are in demand, consider upgrading the protection level of positions.',
      },
      pullback: {
        mood: 'Choppy pullback',
        detail: 'Short-term volatility is expanding, trimming exposure is recommended.',
      },
      range: {
        mood: 'Sideways build-up',
        detail: 'Volatility narrows around the neutral zone, timing strategies take priority.',
      },
    },
  },
  'zh-CN': {
    pageOne: {
      heroTitle: 'SOHA \u5e02\u573a\u9a7e\u9a76\u8231',
      scrollHint: '\u5782\u76f4\u6ed1\u52a8\u67e5\u770b\u66f4\u591a',
      sections: {
        marketSize: {
          eyebrow: '\u5927\u5c0f\u76d8',
          title: '',
          meta: '',
        },
        breadth: {
          eyebrow: 'BREADTH',
          title: '\u884c\u4e1a\u5bbd\u5ea6',
          meta: '\u6309\u65e5\u671f\u5bf9\u6bd4',
        },
        momentum: {
          eyebrow: 'MOMENTUM',
          title: '\u884c\u4e1a\u52a8\u91cf\u96f7\u8fbe',
          meta: '\u9ad8\u9891\u66f4\u65b0',
        },
        sentiment: {
          eyebrow: 'SENTIMENT',
          title: '\u60c5\u7eea\u63a2\u9488',
          meta: '\u76d8\u9762\u6620\u5c04',
        },
      },
    },
    pageTwo: {
      eyebrow: '\u5e02\u573a\u5b9e\u9a8c\u5ba4',
      title: '\u591a\u7ef4\u6307\u6807\u5de1\u822a',
      meta: '\u5feb\u901f\u5de1\u68c0',
    },
    indexLabels: {
      shanghaiIndex: '\u4e0a\u8bc1\u6307\u6570',
      nasdaqIndex: '\u7eb3\u65af\u8fbe\u514b',
      goldIndex: '\u9ec4\u91d1',
      zhongzheng2000Index: '\u4e2d\u8bc12000',
    },
    narratives: {
      strongBull: {
        mood: '\u591a\u5934\u63a7\u76d8',
        detail:
          '\u589e\u91cf\u8d44\u91d1\u5728\u6838\u5fc3\u8d44\u4ea7\u4e2d\u6301\u7eed\u653e\u5927\uff0c\u8d8b\u52bf\u53cb\u597d\u3002',
      },
      mildBull: {
        mood: '\u6e29\u548c\u4e0a\u884c',
        detail:
          '\u591a\u7a7a\u529b\u91cf\u6682\u65f6\u5e73\u8861\uff0c\u7ed3\u6784\u6027\u673a\u4f1a\u6301\u7eed\u88ab\u70b9\u4eae\u3002',
      },
      strongBear: {
        mood: '\u98ce\u9669\u56de\u843d',
        detail:
          '\u907f\u9669\u8d44\u4ea7\u53d7\u8ffd\u6367\uff0c\u9700\u63d0\u9ad8\u4ed3\u4f4d\u9632\u5fa1\u7b49\u7ea7\u3002',
      },
      pullback: {
        mood: '\u9707\u8361\u56de\u8c03',
        detail:
          '\u77ed\u7ebf\u6ce2\u52a8\u653e\u5927\uff0c\u5efa\u8bae\u6536\u655b\u98ce\u9669\u655e\u53e3\u3002',
      },
      range: {
        mood: '\u6a2a\u76d8\u84c4\u52bf',
        detail:
          '\u6ce2\u52a8\u6536\u655b\u4e8e\u4e2d\u6027\u533a\u95f4\uff0c\u62e9\u65f6\u7b56\u7565\u4f18\u5148\u3002',
      },
    },
  },
};

export const getDashboardCopy = (locale: Locale): DashboardCopy =>
  DASHBOARD_COPY[locale] ?? DASHBOARD_COPY['en-US'];
