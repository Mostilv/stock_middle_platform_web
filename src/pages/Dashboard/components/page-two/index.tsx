import React from 'react';
import { Row, Col } from 'antd';
import { MainContent } from '../../Dashboard.styles';
import IndustryTrendPanel from './IndustryTrendPanel';
import LimitUpCountPanel from './LimitUpCountPanel';
import PlaceholderPanelOne from './PlaceholderPanelOne';
import PlaceholderPanelTwo from './PlaceholderPanelTwo';
import type { DashboardPageTwoCopy } from '../../dashboardCopy';

interface PageTwoProps {
  copy: DashboardPageTwoCopy;
}

const PageTwo: React.FC<PageTwoProps> = React.memo(({ copy }) => {
  void copy;
  return (
    <MainContent style={{ gridTemplateColumns: '1fr', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: '100%',
        }}
      >
        <Row
          gutter={[16, 16]}
          style={{ padding: '0 12px 12px', height: '100%' }}
        >
          <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
            <IndustryTrendPanel />
          </Col>
          <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
            <LimitUpCountPanel />
          </Col>
          <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
            <PlaceholderPanelOne />
          </Col>
          <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
            <PlaceholderPanelTwo />
          </Col>
        </Row>
      </div>
    </MainContent>
  );
});

PageTwo.displayName = 'DashboardPageTwo';

export default PageTwo;
