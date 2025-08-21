import React, { useState } from 'react';
import TimeDisplay from './components/TimeDisplay';
import TopIndicators from './components/TopIndicators';
import SideCharts from './components/SideCharts';
import CenterCharts from './components/CenterCharts';
import CombinedSmallCharts from './components/CombinedSmallCharts';
import { getMarketData } from './services/marketData';
import {
  DashboardContainer,
  MainContent,
} from './Dashboard.styles';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  // 获取市场数据
  const marketData = getMarketData();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <DashboardContainer>
      {/* 右上角时间显示 */}
      <TimeDisplay 
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      {/* 顶部数字指标 */}
      <TopIndicators marketData={marketData} />

      {/* 主要内容区域 - 三列布局 */}
      <MainContent>
        {/* 左侧三个小折线图 */}
        <SideCharts type="left" />

        {/* 中间图表区域 */}
        <CenterCharts selectedDate={selectedDate} />

        {/* 右侧三个小折线图 */}
        <SideCharts type="right" />
      </MainContent>

      {/* 窄屏时，合并六个小图为2x3网格排列在最下方 */}
      <CombinedSmallCharts />
    </DashboardContainer>
  );
};

export default Dashboard;
