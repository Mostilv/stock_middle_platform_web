import styled from 'styled-components';

export const IndicatorPanel = styled.div`
  height: 100%;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(42, 59, 77, 0.8);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(8px);

  .panel-title {
    color: #a0aec0;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .panel-chart {
    flex: 1;
    min-height: 0;
  }
`;
