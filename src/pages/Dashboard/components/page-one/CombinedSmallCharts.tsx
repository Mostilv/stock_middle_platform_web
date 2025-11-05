import React from 'react';
import SmallChartCard from './SmallChartCard';
import { CombinedSmallChartsContainer } from './CombinedSmallCharts.styles';
import { allSmallCharts } from './smallCharts.config';

const CombinedSmallCharts: React.FC = React.memo(() => (
  <CombinedSmallChartsContainer>
    {allSmallCharts.map(chart => (
      <SmallChartCard
        key={`combined-${chart.key}`}
        title={chart.title}
        option={chart.option}
      />
    ))}
  </CombinedSmallChartsContainer>
));

CombinedSmallCharts.displayName = 'CombinedSmallCharts';

export default CombinedSmallCharts;
