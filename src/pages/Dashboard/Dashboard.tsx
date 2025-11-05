import React, { useState, useCallback, useEffect } from 'react';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import {
  TimeDisplay,
  TopIndicators,
  CombinedSmallCharts,
  IndustryWidthChart,
  IndustryMomentumChart,
  PageTwoIndicators,
} from './components';
import SmallChartCard from './components/page-one/SmallChartCard';
import {
  leftSmallCharts,
  rightSmallCharts,
} from './components/page-one/smallCharts.config';
import { getMarketData } from './services/marketData';
import { fetchMarketData } from './services/marketData.api';
import {
  DashboardContainer,
  MainContent,
  LeftChartsStack,
  CenterChartsStack,
  RightChartsStack,
} from './Dashboard.styles';

const Dashboard: React.FC = React.memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [marketData, setMarketData] = useState(() => getMarketData());

  useEffect(() => {
    let mounted = true;
    fetchMarketData()
      .then(data => {
        if (!mounted) return;
        setMarketData(data as any);
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
        {/* 第一页：原有仪表盘内�?*/}
        <div style={{ height: '100vh' }}>
          <DashboardContainer>
            <TimeDisplay
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <TopIndicators marketData={marketData} />
            <MainContent>
              <LeftChartsStack>
                {leftSmallCharts.map(chart => (
                  <SmallChartCard
                    key={chart.key}
                    title={chart.title}
                    option={chart.option}
                  />
                ))}
              </LeftChartsStack>
              <CenterChartsStack>
                <IndustryWidthChart selectedDate={selectedDate} />
                <IndustryMomentumChart />
              </CenterChartsStack>
              <RightChartsStack>
                {rightSmallCharts.map(chart => (
                  <SmallChartCard
                    key={chart.key}
                    title={chart.title}
                    option={chart.option}
                  />
                ))}
              </RightChartsStack>
            </MainContent>
            <CombinedSmallCharts />
          </DashboardContainer>
        </div>

        {/* 第二页：占位指标面板 */}
        <div style={{ height: '100vh' }}>
          <DashboardContainer>
            <PageTwoIndicators />
          </DashboardContainer>
        </div>
      </Carousel>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
