import React from 'react';
import Box, { type BoxTitleSize } from '../Box';
import { useEChart } from '../../../../hooks/useEChart';

interface SmallChartCardProps {
  title: string;
  option: any;
  height?: number | string;
  titleSize?: BoxTitleSize;
}

const SmallChartCard: React.FC<SmallChartCardProps> = React.memo(
  ({ title, option, height = '100%', titleSize = 'sm' }) => {
    const resolvedHeight =
      typeof height === 'number' ? `${height}px` : height || '100%';
    const { containerRef, isVisible } = useEChart({ option, lazy: true });

    return (
      <Box title={title} padding='10px' titleSize={titleSize}>
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: resolvedHeight,
            minWidth: 0,
            opacity: isVisible ? 1 : 0,
          }}
        />
      </Box>
    );
  },
);

SmallChartCard.displayName = 'SmallChartCard';

export default SmallChartCard;
