import styled from 'styled-components';

export const CombinedSmallChartsContainer = styled.div`
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 24px 24px 24px;

  @media (max-width: 992px) {
    display: grid;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 极窄屏单列 */
  }
`;
