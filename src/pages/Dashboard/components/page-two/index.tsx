import React from 'react';
import { MainContent, GlassCard, SectionHeader } from '../../Dashboard.styles';
import PageTwoIndicators from './PageTwoIndicators';
import type { DashboardPageTwoCopy } from '../../../../i18n/dashboard';

interface PageTwoProps {
  copy: DashboardPageTwoCopy;
}

const PageTwo: React.FC<PageTwoProps> = React.memo(({ copy }) => (
  <MainContent style={{ gridTemplateColumns: '1fr', height: '100%' }}>
    <GlassCard className='full-span' style={{ minHeight: 0 }}>
      <SectionHeader className='compact'>
        <div>
          <p className='eyebrow'>{copy.eyebrow}</p>
          <p className='title'>{copy.title}</p>
        </div>
        <span className='meta'>{copy.meta}</span>
      </SectionHeader>
      <div style={{ flex: '1 1 auto', minHeight: 0 }}>
        <PageTwoIndicators />
      </div>
    </GlassCard>
  </MainContent>
));

PageTwo.displayName = 'DashboardPageTwo';

export default PageTwo;
