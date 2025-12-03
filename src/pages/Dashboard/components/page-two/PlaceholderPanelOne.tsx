import React, { useMemo } from 'react';
import Box from '../Box';
import { useEChart } from '../../../../hooks/useEChart';
import { buildPlaceholderOneOption } from './chartOptions';

const PlaceholderPanelOne: React.FC = () => {
  const option = useMemo(() => buildPlaceholderOneOption(), []);
  const chartState = useEChart({ option, lazy: true });

  return (
    <Box title='指标占位 1' padding='12px' titleAlign='left'>
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

export default React.memo(PlaceholderPanelOne);
