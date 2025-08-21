import React from 'react';
import IndustryWidthChart from './IndustryWidthChart';
import IndustryMomentumChart from './IndustryMomentumChart';
import { CenterChartsContainer } from './CenterCharts.styles';

interface CenterChartsProps {
  selectedDate: Date | null;
}

const CenterCharts: React.FC<CenterChartsProps> = ({ selectedDate }) => {
  return (
    <CenterChartsContainer>
      <IndustryWidthChart selectedDate={selectedDate} />
      <IndustryMomentumChart />
    </CenterChartsContainer>
  );
};

export default CenterCharts;
