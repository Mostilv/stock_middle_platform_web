import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import { TopIndicatorsContainer, IndicatorCard } from './TopIndicators.styles';
import { useEChart } from '../../../../hooks/useEChart';

interface MarketData {
  current: number;
  change: number;
  history: number[];
}

interface TopIndicatorsProps {
  marketData: {
    shanghaiIndex: MarketData;
    nasdaqIndex: MarketData;
    goldIndex: MarketData;
    zhongzheng2000Index: MarketData;
  };
}

const TopIndicators: React.FC<TopIndicatorsProps> = ({ marketData }) => {
  // 简易折线图配置
  const createSimpleChartOption = (
    data: number[],
    color: string,
    isPositive: boolean,
  ) => ({
    backgroundColor: isPositive
      ? 'rgba(82, 196, 26, 0.1)'
      : 'rgba(255, 77, 79, 0.1)',
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: {
      show: false,
      type: 'category' as const,
      data: Array.from({ length: data.length }, (_, i) => i),
    },
    yAxis: {
      show: false,
      type: 'value' as const,
      min: Math.min(...data) * 0.95,
      max: Math.max(...data) * 1.05,
    },
    series: [
      {
        type: 'line' as const,
        data,
        lineStyle: { color, width: 2 },
        symbol: 'none',
        smooth: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${color}40` },
              { offset: 1, color: 'transparent' },
            ],
          },
        },
      },
    ],
  });

  const indicatorConfigs = useMemo(
    () =>
      [
        {
          title: '上证指数',
          data: marketData.shanghaiIndex,
          color: marketData.shanghaiIndex.change >= 0 ? '#52c41a' : '#ff4d4f',
          option: createSimpleChartOption(
            marketData.shanghaiIndex.history,
            marketData.shanghaiIndex.change >= 0 ? '#52c41a' : '#ff4d4f',
            marketData.shanghaiIndex.change >= 0,
          ),
        },
        {
          title: '纳指',
          data: marketData.nasdaqIndex,
          color: marketData.nasdaqIndex.change >= 0 ? '#52c41a' : '#ff4d4f',
          option: createSimpleChartOption(
            marketData.nasdaqIndex.history,
            marketData.nasdaqIndex.change >= 0 ? '#52c41a' : '#ff4d4f',
            marketData.nasdaqIndex.change >= 0,
          ),
        },
        {
          title: '黄金',
          data: marketData.goldIndex,
          color: marketData.goldIndex.change >= 0 ? '#52c41a' : '#ff4d4f',
          option: createSimpleChartOption(
            marketData.goldIndex.history,
            marketData.goldIndex.change >= 0 ? '#52c41a' : '#ff4d4f',
            marketData.goldIndex.change >= 0,
          ),
        },
        {
          title: '中证2000',
          data: marketData.zhongzheng2000Index,
          color:
            marketData.zhongzheng2000Index.change >= 0 ? '#52c41a' : '#ff4d4f',
          option: createSimpleChartOption(
            marketData.zhongzheng2000Index.history,
            marketData.zhongzheng2000Index.change >= 0 ? '#52c41a' : '#ff4d4f',
            marketData.zhongzheng2000Index.change >= 0,
          ),
        },
      ] as const,
    [marketData],
  );

  const [shanghaiConfig, nasdaqConfig, goldConfig, zhongzhengConfig] =
    indicatorConfigs;

  const shanghaiChart = useEChart({
    option: shanghaiConfig.option,
    lazy: true,
  });
  const nasdaqChart = useEChart({
    option: nasdaqConfig.option,
    lazy: true,
  });
  const goldChart = useEChart({
    option: goldConfig.option,
    lazy: true,
  });
  const zhongzhengChart = useEChart({
    option: zhongzhengConfig.option,
    lazy: true,
  });
  const chartStates = [shanghaiChart, nasdaqChart, goldChart, zhongzhengChart];

  return (
    <TopIndicatorsContainer>
      <Row gutter={[16, 16]}>
        {indicatorConfigs.map((indicator, index) => {
          const state = chartStates[index];
          return (
            <Col span={6} key={index}>
              <IndicatorCard>
                <div className='indicator-content-horizontal'>
                  <div className='indicator-title'>{indicator.title}</div>
                  <div className='indicator-chart'>
                    <div
                      ref={state.containerRef}
                      style={{
                        width: '100%',
                        height: '40px',
                        minWidth: 0,
                        opacity: state.isVisible ? 1 : 0,
                      }}
                    />
                  </div>
                  <div className='indicator-value'>
                    <div className='value'>
                      {indicator.data.current.toFixed(2)}
                    </div>
                    <div
                      className={`change ${indicator.data.change >= 0 ? 'positive' : 'negative'}`}
                    >
                      {indicator.data.change >= 0 ? '+' : ''}
                      {indicator.data.change}%
                    </div>
                  </div>
                </div>
              </IndicatorCard>
            </Col>
          );
        })}
      </Row>
    </TopIndicatorsContainer>
  );
};

export default TopIndicators;
