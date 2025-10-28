import React, { useState, useCallback, useEffect } from 'react';
import { Carousel } from 'antd';
import TimeDisplay from './components/page-one/TimeDisplay';
import TopIndicators from './components/page-one/TopIndicators';
import SideCharts from './components/page-one/SideCharts';
import CenterCharts from './components/page-one/CenterCharts';
import CombinedSmallCharts from './components/page-one/CombinedSmallCharts';
import PageTwoIndicators from './components/page-two/PageTwoIndicators';
import { getMarketData } from './services/marketData';
import { fetchMarketData } from '../../api/modules/dashboard';
import {
  DashboardContainer,
  MainContent,
} from './Dashboard.styles';

const Dashboard: React.FC = React.memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  // 市场数据：默认先用本地模拟，随后尝试远程拉取（支持 Mock）
  const [marketData, setMarketData] = useState(() => getMarketData());

  useEffect(() => {
    let mounted = true;
    fetchMarketData()
      .then((data) => {
        if (!mounted) return;
        setMarketData(data as any);
      })
      .catch(() => {})
    return () => {
      mounted = false;
    };
  }, []);

  // 使用useCallback优化事件处理函数
  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);
  
  const carouselStyle: React.CSSProperties = { height: '100vh' };

  // 整页轮播：滚轮翻页
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>, ref: any) => {
    if (!ref?.current) return;
    if (e.deltaY > 0) ref.current.next();
    else if (e.deltaY < 0) ref.current.prev();
  }, []);

  const carouselRef = React.useRef<any>(null);

  return (
    <div onWheel={(e) => handleWheel(e, carouselRef)}>
      <Carousel ref={carouselRef} dots draggable swipeToSlide vertical dotPosition="right" style={carouselStyle}>
        {/* 第一页：完整首页内容 */}
        <div style={{ height: '100vh' }}>
          <DashboardContainer>
            <TimeDisplay 
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <TopIndicators marketData={marketData} />
            <MainContent>
              <SideCharts type="left" />
              <CenterCharts selectedDate={selectedDate} />
              <SideCharts type="right" />
            </MainContent>
            <CombinedSmallCharts />
          </DashboardContainer>
        </div>

        {/* 第二页：2x2 指标占位 */}
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
