import React from 'react';
import type { HeroMetric, MarketNarrative } from '../../types';
import {
  DashboardContainer,
  HeroSection,
  HeroCopy,
  HeroMeta,
  HeroMetricsRow,
  MetricCard,
  SectionHeader,
  MainContent,
  StackPanel,
  CenterPanels,
  GlassCard,
  LeftChartsStack,
  RightChartsStack,
  ScrollHint,
} from '../../Dashboard.styles';
import TimeDisplay from './TimeDisplay';
import CombinedSmallCharts from './CombinedSmallCharts';
import SmallChartCard from './SmallChartCard';
import IndustryWidthChart from './IndustryWidthChart';
import IndustryMomentumChart from './IndustryMomentumChart';
import { leftSmallCharts, rightSmallCharts } from './smallCharts.config';

interface PageOneProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  heroMetrics: HeroMetric[];
  marketNarrative: MarketNarrative;
}

const PageOne: React.FC<PageOneProps> = React.memo(
  ({ selectedDate, onDateChange, heroMetrics, marketNarrative }) => (
    <DashboardContainer>
      <HeroSection>
        <HeroCopy>
          <span className='hero-badge'>{marketNarrative.mood} · LIVE</span>
          <h1>SOHA 市场驾驶舱</h1>
          <p>{marketNarrative.detail}</p>
        </HeroCopy>
        <HeroMeta>
          <TimeDisplay
            selectedDate={selectedDate}
            onDateChange={onDateChange}
          />
          <HeroMetricsRow>
            {heroMetrics.map(metric => (
              <MetricCard key={metric.label} $trend={metric.trend}>
                <div className='label'>{metric.label}</div>
                <div className='value'>{metric.value}</div>
                <div className='hint'>{metric.hint}</div>
              </MetricCard>
            ))}
          </HeroMetricsRow>
        </HeroMeta>
      </HeroSection>

      <MainContent>
        <StackPanel>
          <SectionHeader className='compact'>
            <div>
              <p className='eyebrow'>STRATEGY</p>
              <p className='title'>策略雷达</p>
            </div>
            <span className='meta'>多维小图</span>
          </SectionHeader>
          <LeftChartsStack>
            {leftSmallCharts.map(chart => (
              <SmallChartCard
                key={chart.key}
                title={chart.title}
                option={chart.option}
                titleSize='sm'
              />
            ))}
          </LeftChartsStack>
        </StackPanel>

        <CenterPanels>
          <GlassCard>
            <SectionHeader className='compact'>
              <div>
                <p className='eyebrow'>BREADTH</p>
                <p className='title'>行业宽度</p>
              </div>
              <span className='meta'>按日期对比</span>
            </SectionHeader>
            <IndustryWidthChart selectedDate={selectedDate} />
          </GlassCard>
          <GlassCard>
            <SectionHeader className='compact'>
              <div>
                <p className='eyebrow'>MOMENTUM</p>
                <p className='title'>行业动量雷达</p>
              </div>
              <span className='meta'>高频更新</span>
            </SectionHeader>
            <IndustryMomentumChart />
          </GlassCard>
          <GlassCard className='full-span'>
            <SectionHeader className='compact'>
              <div>
                <p className='eyebrow'>MULTI-FACTOR</p>
                <p className='title'>微型图谱矩阵</p>
              </div>
              <span className='meta'>策略沙盘</span>
            </SectionHeader>
            <CombinedSmallCharts />
          </GlassCard>
        </CenterPanels>

        <StackPanel>
          <SectionHeader className='compact'>
            <div>
              <p className='eyebrow'>SENTIMENT</p>
              <p className='title'>情绪探针</p>
            </div>
            <span className='meta'>盘面映射</span>
          </SectionHeader>
          <RightChartsStack>
            {rightSmallCharts.map(chart => (
              <SmallChartCard
                key={chart.key}
                title={chart.title}
                option={chart.option}
                titleSize='sm'
              />
            ))}
          </RightChartsStack>
        </StackPanel>
      </MainContent>
      <ScrollHint>垂直滑动查看更多</ScrollHint>
    </DashboardContainer>
  ),
);

PageOne.displayName = 'DashboardPageOne';

export default PageOne;
