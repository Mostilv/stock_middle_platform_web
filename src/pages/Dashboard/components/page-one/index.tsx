import React from 'react';
import type { DashboardPageOneCopy } from '../../dashboardCopy';
import {
  MainContent,
  StackPanel,
  SectionHeader,
  LeftChartsStack,
  CenterPanels,
  GlassCard,
  RightChartsStack,
} from '../../Dashboard.styles';
import SmallChartCard from './SmallChartCard';
import IndustryWidthChart from './IndustryWidthChart';
import IndustryMomentumChart from './IndustryMomentumChart';
import { leftSmallCharts, rightSmallCharts } from './smallCharts.config';
import { useIndustryMetrics } from '../../../../hooks/useIndustryMetrics';

interface PageOneProps {
  selectedDate: Date | null;
  copy: DashboardPageOneCopy;
}

const PageOne: React.FC<PageOneProps> = React.memo(({ selectedDate, copy }) => {
  const metricsState = useIndustryMetrics(selectedDate, 12);

  return (
    <MainContent>
      <StackPanel>
        <SectionHeader className='compact'>
          <div>
            <p className='eyebrow'>{copy.sections.marketSize.eyebrow}</p>
            <p className='title'>{copy.sections.marketSize.title}</p>
          </div>
          <span className='meta'>{copy.sections.marketSize.meta ?? ''}</span>
        </SectionHeader>
        <LeftChartsStack>
          {leftSmallCharts.map(chart => (
            <SmallChartCard
              key={chart.key}
              title={chart.title}
              option={chart.option}
            />
          ))}
        </LeftChartsStack>
      </StackPanel>

      <CenterPanels>
        <GlassCard className='full-span'>
          <SectionHeader className='compact'>
            <div>
              <p className='eyebrow'>{copy.sections.breadth.eyebrow}</p>
              <p className='title'>{copy.sections.breadth.title}</p>
            </div>
            <span className='meta'>{copy.sections.breadth.meta ?? ''}</span>
          </SectionHeader>
          <IndustryWidthChart
            data={metricsState.data}
            loading={metricsState.loading}
            error={metricsState.error}
          />
        </GlassCard>
        <GlassCard className='full-span'>
          <SectionHeader className='compact'>
            <div>
              <p className='eyebrow'>{copy.sections.momentum.eyebrow}</p>
              <p className='title'>{copy.sections.momentum.title}</p>
            </div>
            <span className='meta'>{copy.sections.momentum.meta ?? ''}</span>
          </SectionHeader>
          <IndustryMomentumChart
            data={metricsState.data}
            loading={metricsState.loading}
            error={metricsState.error}
          />
        </GlassCard>
      </CenterPanels>

      <StackPanel>
        <SectionHeader className='compact'>
          <div>
            <p className='eyebrow'>{copy.sections.sentiment.eyebrow}</p>
            <p className='title'>{copy.sections.sentiment.title}</p>
          </div>
          <span className='meta'>{copy.sections.sentiment.meta ?? ''}</span>
        </SectionHeader>
        <RightChartsStack>
          {rightSmallCharts.map(chart => (
            <SmallChartCard
              key={chart.key}
              title={chart.title}
              option={chart.option}
            />
          ))}
        </RightChartsStack>
      </StackPanel>
    </MainContent>
  );
});

PageOne.displayName = 'DashboardPageOne';

export default PageOne;
