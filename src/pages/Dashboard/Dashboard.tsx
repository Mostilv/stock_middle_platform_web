import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { CarouselRef } from 'antd/es/carousel';
import { PageOne, PageTwo } from './components';
import { getMarketData } from './services/marketData';
import type { MarketDataState } from './services/marketData';
import { fetchMarketData } from './services/marketData.api';
import type { HeroMetric, MarketNarrative } from './types';
import { useLocale } from '../../i18n/LocaleContext';
import { getDashboardCopy } from '../../i18n/dashboard';
import TimeDisplay from './components/page-one/TimeDisplay';
import {
  DashboardContainer,
  HeroSection,
  HeroCopy,
  HeroMeta,
  HeroMetricsRow,
  MetricCard,
  ScrollHint,
  CarouselViewport,
  ChartsCarousel,
  CarouselSlide,
} from './Dashboard.styles';

const MARKET_ORDER: (keyof MarketDataState)[] = [
  'shanghaiIndex',
  'nasdaqIndex',
  'goldIndex',
  'zhongzheng2000Index',
];

const Dashboard: React.FC = React.memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [marketData, setMarketData] = useState<MarketDataState>(() =>
    getMarketData(),
  );
  const { locale } = useLocale();
  const carouselRef = useRef<CarouselRef | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchMarketData()
      .then(data => {
        if (!mounted) return;
        setMarketData(data as MarketDataState);
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);

  const dashboardCopy = useMemo(() => getDashboardCopy(locale), [locale]);

  const labelMap = dashboardCopy.indexLabels as Record<
    keyof MarketDataState,
    string
  >;

  const { heroMetrics, averageChange } = useMemo(() => {
    const orderedEntries = MARKET_ORDER.filter(key => marketData[key]).map(
      key => [key, marketData[key]] as const,
    );

    if (!orderedEntries.length) {
      return { heroMetrics: [], averageChange: 0 };
    }

    const avg =
      orderedEntries.reduce((sum, [, value]) => sum + value.change, 0) /
      orderedEntries.length;

    const metrics: HeroMetric[] = orderedEntries.map(([key, data]) => {
      const change = data.change;
      const trend =
        Math.abs(change) < 0.05 ? 'flat' : change > 0 ? 'up' : 'down';

      return {
        label: labelMap[key],
        value: data.current.toFixed(2),
        hint: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        trend,
      };
    });

    return { heroMetrics: metrics, averageChange: avg };
  }, [labelMap, marketData]);

  const marketNarrative: MarketNarrative = useMemo(() => {
    const narratives = dashboardCopy.narratives;
    if (averageChange > 0.8) {
      return narratives.strongBull;
    }

    if (averageChange > 0.2) {
      return narratives.mildBull;
    }

    if (averageChange < -0.8) {
      return narratives.strongBear;
    }

    if (averageChange < -0.2) {
      return narratives.pullback;
    }

    return narratives.range;
  }, [averageChange, dashboardCopy]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    if (event.deltaY > 0) {
      carouselRef.current.next?.();
    } else if (event.deltaY < 0) {
      carouselRef.current.prev?.();
    }
  }, []);

  return (
    <DashboardContainer>
      <HeroSection>
        <HeroCopy>
          <div className='hero-time'>
            <TimeDisplay
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>
          <h1>{dashboardCopy.pageOne.heroTitle}</h1>
          <p>{marketNarrative.detail}</p>
        </HeroCopy>
        <HeroMeta>
          <HeroMetricsRow>
            {heroMetrics.map(metric => (
              <MetricCard key={metric.label} $trend={metric.trend}>
                <div className='label'>{metric.label}</div>
                <div className='value'>{metric.value}</div>
                <div className='hint'>{metric.hint}</div>
              </MetricCard>
            ))}
          </HeroMetricsRow>
        </HeroMeta>
      </HeroSection>

      <CarouselViewport onWheel={handleWheel}>
        <ChartsCarousel
          ref={carouselRef}
          dots
          draggable
          swipeToSlide
          vertical
          dotPosition='right'
        >
          <CarouselSlide key='dashboard-page-one'>
            <PageOne selectedDate={selectedDate} copy={dashboardCopy.pageOne} />
          </CarouselSlide>
          <CarouselSlide key='dashboard-page-two'>
            <PageTwo copy={dashboardCopy.pageTwo} />
          </CarouselSlide>
        </ChartsCarousel>
      </CarouselViewport>
      <ScrollHint>{dashboardCopy.pageOne.scrollHint}</ScrollHint>
    </DashboardContainer>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
