import React from 'react';
import { MainContent } from '../../Dashboard.styles';
import PageTwoIndicators from './PageTwoIndicators';
import type { DashboardPageTwoCopy } from '../../../../i18n/dashboard';

interface PageTwoProps {
  copy: DashboardPageTwoCopy;
}

const PageTwo: React.FC<PageTwoProps> = React.memo(({}) => (
  <MainContent style={{ gridTemplateColumns: '1fr', height: '100%' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: '100%',
      }}
    >
      <PageTwoIndicators />
    </div>
  </MainContent>
));

PageTwo.displayName = 'DashboardPageTwo';

export default PageTwo;
