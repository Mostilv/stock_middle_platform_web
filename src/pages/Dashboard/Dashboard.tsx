import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
} from 'react';
import type { CarouselRef } from 'antd/es/carousel';
import { PageOne, PageTwo } from './components';
import { getMarketData } from './services/marketData';
import type { MarketDataState } from './services/marketData';
import { fetchMarketData } from './services/marketData.api';
import type { HeroMetric, MarketNarrative } from './types';
import TimeDisplay from './components/page-one/TimeDisplay';
import { dashboardCopy as DASHBOARD_COPY } from './dashboardCopy';
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
  const carouselRef = useRef<CarouselRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const updateDashboardPageHeight = useCallback(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    const hero = heroRef.current;
    if (!container || !hero) return;

    const styles = window.getComputedStyle(container);
    const paddingTop = parseFloat(styles.paddingTop) || 0;
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;
    const verticalGap = parseFloat(styles.rowGap || styles.gap || '0') || 0;

    const heroHeight = hero.getBoundingClientRect().height;
    const containerHeight = container.getBoundingClientRect().height;
    const available =
      containerHeight - heroHeight - paddingTop - paddingBottom - verticalGap;

    container.style.setProperty(
      '--dashboard-page-height',
      `${Math.max(available, 0).toFixed(2)}px`,
    );
  }, []);

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

  const dashboardCopy = DASHBOARD_COPY;

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
  }, [averageChange]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    if (event.deltaY > 0) {
      carouselRef.current.next?.();
    } else if (event.deltaY < 0) {
      carouselRef.current.prev?.();
    }
  }, []);

  useLayoutEffect(() => {
    updateDashboardPageHeight();
  }, [updateDashboardPageHeight]);

  useEffect(() => {
    updateDashboardPageHeight();
  }, [
    updateDashboardPageHeight,
    heroMetrics,
    marketNarrative,
    selectedDate,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    window.addEventListener('resize', updateDashboardPageHeight);
    return () => {
      window.removeEventListener('resize', updateDashboardPageHeight);
    };
  }, [updateDashboardPageHeight]);

  return (
    <DashboardContainer ref={containerRef}>
      <HeroSection ref={heroRef}>
        <HeroCopy>
          <div className='hero-time'>
            <TimeDisplay
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>
          <h1>{dashboardCopy.pageOne.heroTitle}</h1>
        </HeroCopy>
        <HeroMeta>
          <HeroMetricsRow>
            {heroMetrics.map(metric => (
              <MetricCard key={metric.label} $trend={metric.trend}>
                <div className='label'>{metric.label}</div>
                <div className='value'>
                  {metric.value}
                  <span className={`delta delta-${metric.trend}`}>
                    {metric.hint}
                  </span>
                </div>
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
          waitForAnimate
          dotPosition='right'
        >
          <CarouselSlide key='dashboard-page-one' className='dashboard-page'>
            <PageOne selectedDate={selectedDate} copy={dashboardCopy.pageOne} />
          </CarouselSlide>
          <CarouselSlide key='dashboard-page-two' className='dashboard-page'>
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
