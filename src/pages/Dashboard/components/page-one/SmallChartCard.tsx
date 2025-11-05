import React from 'react';
import EChart from '../../../../components/EChart';
import Box from '../Box';

interface SmallChartCardProps {
  title: string;
  option: any;
  height?: number | string;
}

const SmallChartCard: React.FC<SmallChartCardProps> = React.memo(
  ({ title, option, height = '100%' }) => {
    return (
      <Box title={title} padding='10px' titleSize='sm'>
        <EChart height={height} option={option} lazy={true} />
      </Box>
    );
  },
);

SmallChartCard.displayName = 'SmallChartCard';

export default SmallChartCard;
