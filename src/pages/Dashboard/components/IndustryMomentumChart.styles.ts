import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;

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
    height: 100% !important;
  }
`;
