import React, { useMemo } from 'react';
import Box from '../Box';
import { useEChart } from '../../../../hooks/useEChart';
import { buildIndustryTrendOption } from './chartOptions';

const IndustryTrendPanel: React.FC = () => {
  const option = useMemo(() => buildIndustryTrendOption(), []);
  const chartState = useEChart({ option, lazy: true });

  return (
    <Box title='各行业走势' padding='12px' titleAlign='left'>
      <div
        ref={chartState.containerRef}
        style={{
          width: '100%',
          height: '100%',
          minWidth: 0,
          opacity: chartState.isVisible ? 1 : 0,
        }}
      />
    </Box>
  );
};

export default React.memo(IndustryTrendPanel);
