import React from 'react';
import { useEChart } from '../../../../hooks/useEChart';
import {
  ChartCanvas,
  SmallChartCardRoot,
  SmallChartTitle,
} from './ChartPanel.styles';

interface SmallChartCardProps {
  title: string;
  option: any;
  height?: number | string;
}

const SmallChartCard: React.FC<SmallChartCardProps> = React.memo(
  ({ title, option, height = '100%' }) => {
    const resolvedHeight =
      typeof height === 'number' ? `${height}px` : height || '100%';
    const { containerRef, isVisible } = useEChart({ option, lazy: true });

    return (
      <SmallChartCardRoot>
        <SmallChartTitle>{title}</SmallChartTitle>
        <ChartCanvas
          ref={containerRef}
          style={{
            height: resolvedHeight,
            opacity: isVisible ? 1 : 0,
          }}
        />
      </SmallChartCardRoot>
    );
  },
);

SmallChartCard.displayName = 'SmallChartCard';

export default SmallChartCard;
