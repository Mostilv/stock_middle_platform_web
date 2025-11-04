import styled from 'styled-components';

export const StockChartContainer = styled.div<{ $theme: 'light' | 'dark' }>`
  position: relative;
  background: ${props => (props.$theme === 'dark' ? '#1f1f1f' : '#ffffff')};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const ChartHeader = styled.div<{ $theme: 'light' | 'dark' }>`
  padding: 12px 16px;
  border-bottom: 1px solid
    ${props => (props.$theme === 'dark' ? '#333' : '#e8e8e8')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => (props.$theme === 'dark' ? '#2a2a2a' : '#fafafa')};

  .chart-title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => (props.$theme === 'dark' ? '#ffffff' : '#1f2937')};
  }

  .stock-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: ${props => (props.$theme === 'dark' ? '#cccccc' : '#666666')};
  }
`;

export const ChartContent = styled.div`
  position: relative;
  width: 100%;
`;

export const LoadingOverlay = styled.div<{ $theme: 'light' | 'dark' }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props =>
    props.$theme === 'dark'
      ? 'rgba(31, 31, 31, 0.8)'
      : 'rgba(255, 255, 255, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const EmptyState = styled.div<{ $theme: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${props => (props.$theme === 'dark' ? '#999999' : '#666666')};
  font-size: 14px;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .empty-text {
    text-align: center;
  }
`;

export const ChartTooltip = styled.div<{ $theme: 'light' | 'dark' }>`
  background: ${props => (props.$theme === 'dark' ? '#2a2a2a' : '#ffffff')};
  border: 1px solid ${props => (props.$theme === 'dark' ? '#444' : '#e8e8e8')};
  border-radius: 6px;
  padding: 8px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 12px;
  color: ${props => (props.$theme === 'dark' ? '#ffffff' : '#333333')};
  pointer-events: none;
  z-index: 1000;

  .tooltip-title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .tooltip-item {
    display: flex;
    justify-content: space-between;
    margin: 2px 0;
    gap: 16px;
  }

  .tooltip-label {
    color: ${props => (props.$theme === 'dark' ? '#cccccc' : '#666666')};
  }

  .tooltip-value {
    font-weight: 500;
  }
`;
