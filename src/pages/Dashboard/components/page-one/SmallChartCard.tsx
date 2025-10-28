import React from 'react';
import EChart from '../../../../components/EChart';
import { SmallChartCardContainer } from './SmallChartCard.styles';

interface SmallChartCardProps {
  title: string;
  option: any;
  height?: number | string;
}

const SmallChartCard: React.FC<SmallChartCardProps> = React.memo(({ 
  title, 
  option, 
  height = '100%'
}) => {
  return (
    <SmallChartCardContainer>
      <h4>{title}</h4>
      <EChart height={height} option={option} lazy={true} />
    </SmallChartCardContainer>
  );
});

SmallChartCard.displayName = 'SmallChartCard';

export default SmallChartCard;
