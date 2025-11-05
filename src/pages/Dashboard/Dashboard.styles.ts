import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const DashboardContainer = styled.div`
  padding: 0;
  background: ${theme.colors.layout.darkGradient};
  height: 100vh;
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily};
  overflow: hidden; /* 在整页轮播模式下，避免内容溢出到其他页 */
  position: relative;

  /* 添加微妙的背景图案，增加深度感 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 25% 25%,
        rgba(255, 255, 255, 0.02) 1%,
        transparent 1%
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(255, 255, 255, 0.02) 1%,
        transparent 1%
      );
    background-size: 60px 60px;
    opacity: 0.4;
    pointer-events: none;
  }
`;

// 主要内容区域
export const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 16px;
  grid-auto-rows: minmax(0, 1fr);
  align-items: stretch;
  height: calc(100vh - 140px);
  padding: 16px 24px 24px 24px;
  min-width: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 1200px) {
    height: auto;
  }

  @media (max-width: 992px) {
    display: block;
    padding: 12px 16px 16px 16px;
  }
`;

const chartsStackBase = `
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  & > * {
    flex: 1 1 0;
    min-height: 0;
  }
`;

export const LeftChartsStack = styled.div`
  ${chartsStackBase}
  grid-column: 1 / span 1;

  @media (max-width: 992px) {
    display: none;
  }
`;

export const CenterChartsStack = styled.div`
  ${chartsStackBase}
  grid-column: 2 / span 2;
`;

export const RightChartsStack = styled.div`
  ${chartsStackBase}
  grid-column: 4 / span 1;

  @media (max-width: 992px) {
    display: none;
  }
`;

// 保留原有的样式组件以兼容性
export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const StatisticCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.12);
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.12);
  }

  h3 {
    margin-bottom: 16px;
    color: ${theme.colors.text.light};
    font-weight: ${theme.typography.fontWeights.semibold};
    font-size: ${theme.typography.fontSizes.lg};
    letter-spacing: 0.5px;
  }
`;

export const ProgressContainer = styled.div`
  margin-bottom: 20px;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: ${theme.typography.fontSizes.sm};
  color: rgba(255, 255, 255, 0.8);
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.12);
  }

  h3 {
    margin-bottom: 16px;
    color: ${theme.colors.text.light};
    font-weight: ${theme.typography.fontWeights.semibold};
    font-size: ${theme.typography.fontSizes.lg};
    letter-spacing: 0.5px;
  }
`;

export const StockChange = styled.span<{ $isPositive: boolean }>`
  color: ${props =>
    props.$isPositive
      ? theme.colors.stockChange.positive
      : theme.colors.stockChange.negative};
  font-weight: ${theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: 4px;
`;
