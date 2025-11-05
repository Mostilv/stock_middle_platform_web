import React, { useState, useCallback, useEffect } from 'react';
import { Carousel, Row, Col } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import type { EChartsOption } from 'echarts';
import {
  TimeDisplay,
  TopIndicators,
  SideCharts,
  CenterCharts,
  CombinedSmallCharts,
} from './components';
import EChart from '../../components/EChart';
import { getMarketData } from './services/marketData';
import { fetchMarketData } from './services/marketData.api';
import { DashboardContainer, MainContent } from './Dashboard.styles';

const Dashboard: React.FC = React.memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 默认使用本地模拟数据，随后尝试远程拉取（支持 Mock）
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

  const makeSeries = (len: number, seed: number) =>
    Array.from({ length: len }, (_, index) =>
      Math.round(50 + 20 * Math.sin((index + seed) / 3) + Math.random() * 10),
    );

  const baseOption = (data: number[], color: string): EChartsOption => ({
    grid: { left: 20, right: 10, top: 10, bottom: 20 },
    xAxis: {
      type: 'category',
      data: data.map((_, index) => index),
      axisLine: { lineStyle: { color: '#556' } },
      axisLabel: { color: '#889' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#556' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#889' },
    },
    series: [
      {
        type: 'line',
        data,
        smooth: true,
        symbol: 'none',
        lineStyle: { color, width: 2 },
        areaStyle: { color: `${color}1A` },
      },
    ],
    animation: false,
  });

  const industryNames = [
    '计算机',
    '医药生物',
    '食品饮料',
    '银行',
    '非银金融',
    '有色金属',
  ];
  const industryColors = [
    '#3ba272',
    '#ee6666',
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#73c0de',
  ];
  const industryTrend: EChartsOption = {
    grid: { left: 20, right: 10, top: 30, bottom: 20 },
    legend: { top: 4, textStyle: { color: '#a0aec0' } },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 30 }, (_, index) => index),
      axisLine: { lineStyle: { color: '#556' } },
      axisLabel: { color: '#889' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#556' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#889' },
    },
    series: industryNames.map((name, idx) => ({
      name,
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: industryColors[idx % industryColors.length],
        width: 2,
      },
      data: makeSeries(30, idx + 1),
    })),
    animation: false,
  };

  const page2Options = {
    industryTrend,
    limitUpCount: baseOption(makeSeries(30, 2), '#ee6666'),
    placeholder1: baseOption(makeSeries(30, 3), '#5470c6'),
    placeholder2: baseOption(makeSeries(30, 4), '#fac858'),
  };

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
        {/* 第一页：原有仪表盘内容 */}
        <div style={{ height: '100vh' }}>
          <DashboardContainer>
            <TimeDisplay
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <TopIndicators marketData={marketData} />
            <MainContent>
              <SideCharts type='left' />
              <CenterCharts selectedDate={selectedDate} />
              <SideCharts type='right' />
            </MainContent>
            <CombinedSmallCharts />
          </DashboardContainer>
        </div>

        {/* 第二页：占位指标面板 */}
        <div style={{ height: '100vh' }}>
          <DashboardContainer>
            <Row
              gutter={[16, 16]}
              style={{ padding: '12px 12px 20px 12px', height: '100%' }}
            >
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'rgba(0,0,0,0.28)',
                    border: '1px solid rgba(42,59,77,0.8)',
                    borderRadius: 12,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      color: '#a0aec0',
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    各行业走势
                  </div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height='100%' option={page2Options.industryTrend} />
                  </div>
                </div>
              </Col>
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'rgba(0,0,0,0.28)',
                    border: '1px solid rgba(42,59,77,0.8)',
                    borderRadius: 12,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      color: '#a0aec0',
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    涨停数量
                  </div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height='100%' option={page2Options.limitUpCount} />
                  </div>
                </div>
              </Col>
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'rgba(0,0,0,0.28)',
                    border: '1px solid rgba(42,59,77,0.8)',
                    borderRadius: 12,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      color: '#a0aec0',
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    占位指标一
                  </div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height='100%' option={page2Options.placeholder1} />
                  </div>
                </div>
              </Col>
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'rgba(0,0,0,0.28)',
                    border: '1px solid rgba(42,59,77,0.8)',
                    borderRadius: 12,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      color: '#a0aec0',
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    占位指标二
                  </div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height='100%' option={page2Options.placeholder2} />
                  </div>
                </div>
              </Col>
            </Row>
          </DashboardContainer>
        </div>
      </Carousel>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
