import styled from 'styled-components';

export const TopIndicatorsContainer = styled.div`
  padding: 12px 12px 4px 12px;
  margin-bottom: 4px;
  margin-top: 8px;

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
  border: 1px solid rgba(42, 59, 77, 0.8);
  border-radius: 12px;
  padding: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 80px;

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
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
    border-color: rgba(42, 59, 77, 0.9);
  }

  .indicator-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  .indicator-content-horizontal {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8px;
  }

  .indicator-title {
    color: #a0aec0;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    text-align: left;
    min-width: 60px;
  }

  .indicator-chart {
    flex: 1;
    margin: 4px 0;
    aspect-ratio: 1;
    max-width: 40px;
    border-radius: 4px;
    overflow: hidden;
  }

  .indicator-value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 80px;
  }

  .value {
    color: #e6f7ff;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
  }

  .change {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    
    &.positive {
      color: #52c41a;
    }
    
    &.negative {
      color: #ff4d4f;
    }
  }
`;
