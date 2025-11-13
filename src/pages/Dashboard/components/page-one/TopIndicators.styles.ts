import styled from 'styled-components';

export const TopIndicatorsContainer = styled.div`
  width: 100%;

  .ant-row {
    height: 100%;
  }

  .ant-col {
    height: 100%;
  }
`;

export const IndicatorCard = styled.div`
  background:
    radial-gradient(circle at 0% 0%, rgba(55, 176, 255, 0.28), transparent 60%),
    rgba(4, 13, 31, 0.85);
  border: 1px solid rgba(149, 200, 255, 0.18);
  border-radius: 18px;
  padding: 12px 14px;
  backdrop-filter: blur(18px);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(149, 200, 255, 0.4);
  }

  .indicator-content-horizontal {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 14px;
  }

  .indicator-title {
    color: rgba(230, 247, 255, 0.8);
    font-size: 15px;
    font-weight: 600;
    min-width: 64px;
  }

  .indicator-chart {
    flex: 0 0 54px;
    height: 54px;
    border-radius: 12px;
    background: rgba(7, 16, 32, 0.8);
    padding: 6px;
  }

  .indicator-value {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 90px;
  }

  .value {
    color: #f5fbff;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0.3px;
  }

  .change {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.9;

    &.positive {
      color: #3ccf8e;
    }

    &.negative {
      color: #ff707a;
    }
  }
`;
