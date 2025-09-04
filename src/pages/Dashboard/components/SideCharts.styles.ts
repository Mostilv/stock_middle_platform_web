import styled from 'styled-components';

export const SideChartsContainer = styled.div<{ $type: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  flex: 0.94 1 0%;
  min-width: 0;
  overflow: hidden;
  
  & > div {
    flex: 1 1 0;
    min-height: 0;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
