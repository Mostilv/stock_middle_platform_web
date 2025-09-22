import styled from 'styled-components';

export const CenterChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  grid-column: 2 / span 2;

  & > div {
    flex: 1 1 0;
    min-height: 0;
  }
`;
