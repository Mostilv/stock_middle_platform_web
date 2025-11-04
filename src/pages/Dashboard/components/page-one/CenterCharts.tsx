import React, { useMemo } from 'react';
import IndustryWidthChart from './IndustryWidthChart';
import IndustryMomentumChart from './IndustryMomentumChart';
import { CenterChartsContainer } from './CenterCharts.styles';

interface CenterChartsProps {
  selectedDate: Date | null;
}

const CenterCharts: React.FC<CenterChartsProps> = React.memo(
  ({ selectedDate }) => {
    // 使用useMemo缓存子组件，避免不必要的重新渲染
    const industryWidthChart = useMemo(
      () => <IndustryWidthChart selectedDate={selectedDate} />,
      [selectedDate],
    );

    const industryMomentumChart = useMemo(() => <IndustryMomentumChart />, []);

    return (
      <CenterChartsContainer>
        {industryWidthChart}
        {industryMomentumChart}
      </CenterChartsContainer>
    );
  },
);

CenterCharts.displayName = 'CenterCharts';

export default CenterCharts;
