import styled from 'styled-components';

export const SideChartsContainer = styled.div<{ $type: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  flex: 1 1 0%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 992px) {
    display: none;
  }
`;
