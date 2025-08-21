import styled from 'styled-components';
import { theme } from '../../styles/theme';

// Dashboard容器
export const DashboardContainer = styled.div`
  padding: ${theme.spacing.lg};
  background: #f5f5f5;
  min-height: 100vh;
`;

// 页面头部
export const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${theme.colors.text.primary};
    margin: 0 0 ${theme.spacing.xs} 0;
  }

  p {
    color: ${theme.colors.text.secondary};
    margin: 0;
  }
`;

// 统计卡片网格
export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

// 统计卡片
export const StatisticCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

// 内容区域网格
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

// 内容卡片
export const ContentCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 320px;
  overflow: hidden;
`;

// 进度条容器
export const ProgressContainer = styled.div`
  margin-bottom: ${theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

// 进度条标签
export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xs};
  font-size: 14px;
  color: ${theme.colors.text.primary};
`;

// 表格容器
export const TableContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// 股票涨跌样式
export const StockChange = styled.span<{ $isPositive: boolean }>`
  color: ${({ $isPositive }) =>
    $isPositive
      ? theme.colors.stockChange.positive
      : theme.colors.stockChange.negative};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
