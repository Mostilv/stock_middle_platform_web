import styled from 'styled-components';

export const SmallChartCardContainer = styled.div`
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
  height: 100%;

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
    height: 100% !important;
  }
`;
