import styled from 'styled-components';

export const CenterChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  flex: 2 1 0%;
  min-width: 0;
  overflow: hidden;
  
  & > div {
    flex: 1 1 0;
    min-height: 0;
  }
`;
