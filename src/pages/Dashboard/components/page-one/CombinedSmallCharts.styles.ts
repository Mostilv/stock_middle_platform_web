import styled from 'styled-components';

export const CombinedSmallChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-auto-rows: minmax(140px, 1fr);
  gap: 12px;
  width: 100%;
  height: 100%;

  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
