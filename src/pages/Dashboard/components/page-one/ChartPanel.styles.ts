import styled from 'styled-components';

export const ChartPanelBody = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  gap: 8px;
`;

export const ChartCanvas = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
`;

export const ChartMessage = styled.p<{ $variant?: 'error' }>`
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: ${({ $variant }) =>
    $variant === 'error' ? '#ff7875' : 'rgba(229, 236, 255, 0.8)'};
`;

export const SmallChartCardRoot = styled(ChartPanelBody)`
  gap: 4px;
  padding: 2px 0 4px;
`;

export const SmallChartTitle = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: rgba(236, 245, 255, 0.86);
`;
