import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 0;
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%);
  height: 100vh;
  color: #e6f7ff;
  font-family: 'Microsoft YaHei', sans-serif;
  overflow: hidden; /* 在整页轮播模式下，避免内容溢出到其他页 */
`;

// 主要内容区域
export const MainContent = styled.div`
  display: flex;
  // gap: 8px;
  height: calc(100vh - 140px);
  padding: 0 12px 12px 12px;
  min-width: 0;

  @media (max-width: 1200px) {
    height: auto;
  }
  
  @media (max-width: 992px) {
    display: block;
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
