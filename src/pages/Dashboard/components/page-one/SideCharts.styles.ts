import styled from 'styled-components';

export const SideChartsContainer = styled.div<{ $type: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  grid-column: ${({ $type }) =>
    $type === 'right' ? '4 / span 1' : '1 / span 1'};

  & > div {
    flex: 1 1 0;
    min-height: 0;
  }

  @media (max-width: 992px) {
    display: none;
    grid-column: auto;
  }
`;
