import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { PageOne, PageTwo } from './components';
import { getMarketData } from './services/marketData';
import type { MarketDataState } from './services/marketData';
import { fetchMarketData } from './services/marketData.api';
import type { HeroMetric, MarketNarrative } from './types';

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

  const carouselStyle: React.CSSProperties = { height: '100vh' };
  const carouselRef = React.useRef<CarouselRef | null>(null);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    if (event.deltaY > 0) {
      carouselRef.current.next();
    } else if (event.deltaY < 0) {
      carouselRef.current.prev();
    }
  }, []);

  const labelMap: Record<keyof MarketDataState, string> = useMemo(
    () => ({
      shanghaiIndex: '上证指数',
      nasdaqIndex: '纳斯达克',
      goldIndex: '黄金',
      zhongzheng2000Index: '中证2000',
    }),
    [],
  );

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
    if (averageChange > 0.8) {
      return {
        mood: '多头控盘',
        detail: '增量资金在核心资产中持续放大，趋势友好。',
      };
    }

    if (averageChange > 0.2) {
      return {
        mood: '温和上行',
        detail: '多空力量暂时平衡，结构性机会持续被点亮。',
      };
    }

    if (averageChange < -0.8) {
      return {
        mood: '风险回落',
        detail: '避险资产受追捧，需提高仓位防御等级。',
      };
    }

    if (averageChange < -0.2) {
      return {
        mood: '震荡回调',
        detail: '短线波动放大，建议收敛风险敞口。',
      };
    }

    return {
      mood: '横盘蓄势',
      detail: '波动收敛于中性区间，择时策略优先。',
    };
  }, [averageChange]);

  return (
    <div onWheel={handleWheel}>
      <Carousel
        ref={carouselRef}
        dots
        draggable
        swipeToSlide
        vertical
        dotPosition='right'
        style={carouselStyle}
      >
        <div style={{ height: '100vh' }}>
          <PageOne
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            heroMetrics={heroMetrics}
            marketNarrative={marketNarrative}
          />
        </div>

        <div style={{ height: '100vh' }}>
          <PageTwo />
        </div>
      </Carousel>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
