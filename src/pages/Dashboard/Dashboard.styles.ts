import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 0;
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%);
  min-height: 100vh;
  color: #e6f7ff;
  font-family: 'Microsoft YaHei', sans-serif;
  overflow: auto; /* 允许页面滚动，不固定，避免内容被遮挡 */
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
  position: relative; /* 不再固定，随内容布局 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 20px 0 20px; /* 放在页面右上角，但不覆盖内容 */
  z-index: 1;

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

  /* 隐藏触发器，仅显示弹层面板 */
  .hidden-picker {
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }
`;

// 顶部数字指标
export const TopIndicators = styled.div`
  padding: 20px 16px 8px 16px; /* 上方更大，下方更小 */
  margin-bottom: 8px;
  margin-top: 12px;

  .ant-col {
    .ant-statistic {
      .ant-statistic-title {
        color: #a0aec0 !important;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 2px;
      }
      
      .ant-statistic-content {
        color: #e6f7ff !important;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
`;

export const IndicatorCard = styled.div`
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(42, 59, 77, 0.8); /* 深色系，不用绿色 */
  border-radius: 12px;
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
    height: 0px; /* 去除顶部彩色装饰 */
    background: transparent;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
    border-color: rgba(42, 59, 77, 0.9);
  }

  .ant-statistic {
    .ant-statistic-title {
      color: #a0aec0 !important;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 2px;
    }
    
    .ant-statistic-content {
      color: #e6f7ff !important;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.1;
    }
  }
`;

// 主要内容区域
export const MainContent = styled.div`
  display: flex; /* 使用flex布局 */
  gap: 12px;
  height: calc(100vh - 180px); /* 更紧凑 */
  padding: 0 16px 16px 16px;
  min-width: 0;

  @media (max-width: 1200px) {
    height: auto;
  }
  
  /* 窄屏：中间图表置顶，左右小图表置于下方 */
  @media (max-width: 992px) {
    display: block;
  }
`;

// 左侧三个小折线图
export const LeftCharts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  flex: 1 1 0%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 992px) {
    display: none;
  }
`;

// 中间图表区域
export const CenterCharts = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
  flex: 2 1 0%;
  min-width: 0;
  overflow: hidden;
  
  & > div { /* 内部两个图表按比例分配高度 */
    flex: 1 1 0;
    min-height: 0;
  }
`;

// 右侧三个小折线图
export const RightCharts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  flex: 1 1 0%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 992px) {
    display: none;
  }
`;

// 图表卡片
export const ChartCard = styled.div<{ $transparent?: boolean }>`
  background: ${({ $transparent }) => ($transparent ? 'transparent' : 'rgba(0, 0, 0, 0.28)')};
  border: ${({ $transparent }) => ($transparent ? 'none' : '1px solid rgba(42, 59, 77, 0.8)')};
  border-radius: 12px;
  padding: 14px;
  backdrop-filter: blur(10px);
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0px; /* 去除顶部彩线 */
    background: transparent;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $transparent }) => ($transparent ? 'none' : '0 8px 25px rgba(0, 0, 0, 0.25)')};
  }

  h3 {
    color: #e6f7ff;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
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

// 合并小图容器（窄屏使用）
export const CombinedSmallCharts = styled.div`
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 20px 20px 20px;

  @media (max-width: 992px) {
    display: grid;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 极窄屏单列 */
  }
`;

// 小图表卡片
export const SmallChartCard = styled.div`
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(42, 59, 77, 0.8);
  border-radius: 8px;
  padding: 10px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0px;
    background: transparent;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  }

  h4 {
    color: #e6f7ff;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 4px;
    text-align: center;
  }

  .echarts-for-react {
    height: calc(100% - 24px) !important;
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
