import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 0;
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%);
  min-height: 100vh;
  color: #e6f7ff;
  font-family: 'Microsoft YaHei', sans-serif;
  overflow: hidden;
`;

export const DashboardHeader = styled.div`
  margin-bottom: 24px;
  text-align: center;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 0;
  }
`;

// 顶部时间显示
export const TimeDisplay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #1890ff;
  border-radius: 6px;
  backdrop-filter: blur(10px);

  span {
    color: #e6f7ff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #1890ff;
    }
  }

  .ant-picker {
    background: rgba(0, 0, 0, 0.3) !important;
    border: 1px solid #1890ff !important;
    
    .ant-picker-input > input {
      color: #e6f7ff !important;
    }
    
    .ant-picker-suffix {
      color: #1890ff !important;
    }
  }
`;

// 顶部数字指标
export const TopIndicators = styled.div`
  padding: 20px;
  margin-bottom: 20px;

  .ant-col {
    .ant-statistic {
      .ant-statistic-title {
        color: #a0aec0 !important;
        font-size: 14px;
        font-weight: 500;
      }
      
      .ant-statistic-content {
        color: #e6f7ff !important;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
`;

export const IndicatorCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid #1890ff;
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #1890ff, #52c41a);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(24, 144, 255, 0.3);
    border-color: #52c41a;
  }

  .ant-statistic {
    .ant-statistic-title {
      color: #a0aec0 !important;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .ant-statistic-content {
      color: #e6f7ff !important;
      font-size: 28px;
      font-weight: bold;
      line-height: 1.2;
    }
  }
`;

// 主要内容区域
export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  height: calc(100vh - 200px);
  padding: 0 20px 20px 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    height: auto;
  }
`;

// 左侧三个小折线图
export const LeftCharts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

// 中间图表区域
export const CenterCharts = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// 右侧三个小折线图
export const RightCharts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

// 图表卡片
export const ChartCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid #1890ff;
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #1890ff, #52c41a);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(24, 144, 255, 0.3);
  }

  h3 {
    color: #e6f7ff;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    text-align: center;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background: #1890ff;
      border-radius: 1px;
    }
  }

  .echarts-for-react {
    height: calc(100% - 60px) !important;
  }
`;

// 小图表卡片
export const SmallChartCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid #1890ff;
  border-radius: 8px;
  padding: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #1890ff, #52c41a);
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(24, 144, 255, 0.3);
  }

  h4 {
    color: #e6f7ff;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    text-align: center;
  }

  .echarts-for-react {
    height: calc(100% - 30px) !important;
  }
`;

// 保留原有的样式组件以兼容性
export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const StatisticCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 16px;
    color: #333;
    font-weight: 600;
  }
`;

export const ProgressContainer = styled.div`
  margin-bottom: 16px;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
`;

export const TableContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 16px;
    color: #333;
    font-weight: 600;
  }
`;

export const StockChange = styled.span<{ $isPositive: boolean }>`
  color: ${props => (props.$isPositive ? '#52c41a' : '#ff4d4f')};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;
