import React, { useState, useMemo, useCallback } from 'react';
import { Carousel, Row, Col } from 'antd';
import type { EChartsOption } from 'echarts';
import TimeDisplay from './components/TimeDisplay';
import TopIndicators from './components/TopIndicators';
import SideCharts from './components/SideCharts';
import CenterCharts from './components/CenterCharts';
import CombinedSmallCharts from './components/CombinedSmallCharts';
import EChart from '../../components/EChart';
import { getMarketData } from './services/marketData';
import {
  DashboardContainer,
  MainContent,
} from './Dashboard.styles';

const Dashboard: React.FC = React.memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  // 使用useMemo缓存市场数据，避免重复计算
  const marketData = useMemo(() => getMarketData(), []);

  // 使用useCallback优化事件处理函数
  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);

  // 第二页 2x2 折线图配置（占位）
  const makeSeries = (len: number, seed: number) =>
    Array.from({ length: len }, (_, i) => Math.round(50 + 20 * Math.sin((i + seed) / 3) + Math.random() * 10));

  const baseOption = (data: number[], color: string): EChartsOption => ({
    grid: { left: 20, right: 10, top: 10, bottom: 20 },
    xAxis: { type: 'category', data: data.map((_, i) => i), axisLine: { lineStyle: { color: '#556' } }, axisLabel: { color: '#889' } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: '#556' } }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#889' } },
    series: [{ type: 'line', data, smooth: true, symbol: 'none', lineStyle: { color, width: 2 }, areaStyle: { color: color + '1A' } }],
    animation: false,
  });

  // 多行业（申万一级）示例：多序列折线
  const industryNames = ['计算机', '医药生物', '食品饮料', '银行', '非银金融', '有色金属'];
  const industryColors = ['#3ba272', '#ee6666', '#5470c6', '#91cc75', '#fac858', '#73c0de'];
  const industryTrend: EChartsOption = {
    grid: { left: 20, right: 10, top: 30, bottom: 20 },
    legend: { top: 4, textStyle: { color: '#a0aec0' } },
    xAxis: { type: 'category', data: Array.from({ length: 30 }, (_, i) => i), axisLine: { lineStyle: { color: '#556' } }, axisLabel: { color: '#889' } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: '#556' } }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#889' } },
    series: industryNames.map((name, idx) => ({
      name,
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: { color: industryColors[idx % industryColors.length], width: 2 },
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
            <Row gutter={[16, 16]} style={{ padding: '12px 12px 20px 12px', height: '100%' }}>
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div style={{ height: '100%', background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(42,59,77,0.8)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#a0aec0', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>各行业走势</div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height={'100%'} option={page2Options.industryTrend} />
                  </div>
                </div>
              </Col>
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div style={{ height: '100%', background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(42,59,77,0.8)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#a0aec0', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>涨停数</div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height={'100%'} option={page2Options.limitUpCount} />
                  </div>
                </div>
              </Col>
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div style={{ height: '100%', background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(42,59,77,0.8)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#a0aec0', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>空</div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height={'100%'} option={page2Options.placeholder1} />
                  </div>
                </div>
              </Col>
              <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                <div style={{ height: '100%', background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(42,59,77,0.8)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#a0aec0', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>空</div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <EChart height={'100%'} option={page2Options.placeholder2} />
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
