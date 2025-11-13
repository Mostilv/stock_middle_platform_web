import React from 'react';
import { DashboardContainer } from '../../Dashboard.styles';
import PageTwoIndicators from './PageTwoIndicators';

const PageTwo: React.FC = React.memo(() => (
  <DashboardContainer>
    <PageTwoIndicators />
  </DashboardContainer>
));

PageTwo.displayName = 'DashboardPageTwo';

export default PageTwo;

