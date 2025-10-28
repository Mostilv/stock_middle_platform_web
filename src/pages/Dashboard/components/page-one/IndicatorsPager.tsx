import React, { useMemo, useRef, useState, useCallback } from 'react';
import type { EChartsOption } from 'echarts';
import { Row, Col, Carousel } from 'antd';
import EChart from '../../../../components/EChart';
import TopIndicators from './TopIndicators';
import { IndicatorCard } from './TopIndicators.styles';

interface MarketData {
  current: number;
  change: number;
  history: number[];
}

interface IndicatorsPagerProps {
  marketData: {
    shanghaiIndex: MarketData;
    nasdaqIndex: MarketData;
    goldIndex: MarketData;
    zhongzheng2000Index: MarketData;
  };
}

const IndicatorsPager: React.FC<IndicatorsPagerProps> = ({ marketData }) => {
  const carouselRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    if (e.deltaY > 0) {
      carouselRef.current.next();
    } else if (e.deltaY < 0) {
      carouselRef.current.prev();
    }
  }, []);

  const lineOption = useMemo(() => {
    const makeSeries = (len: number, seed: number) =>
      Array.from({ length: len }, (_, i) => Math.round(50 + 20 * Math.sin((i + seed) / 3) + Math.random() * 10));

    const baseOption = (data: number[], color: string): EChartsOption => ({
      grid: { left: 20, right: 10, top: 10, bottom: 20 },
      xAxis: { type: 'category', data: data.map((_, i) => i), axisLine: { lineStyle: { color: '#556' } }, axisLabel: { color: '#889' } },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#556' } }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, axisLabel: { color: '#889' } },
      series: [{ type: 'line', data, smooth: true, symbol: 'none', lineStyle: { color, width: 2 }, areaStyle: { color: color + '1A' } }],
      animation: false,
    });

    return {
      industryTrend: baseOption(makeSeries(30, 1), '#3ba272'),
      limitUpCount: baseOption(makeSeries(30, 2), '#ee6666'),
      placeholder1: baseOption(makeSeries(30, 3), '#5470c6'),
      placeholder2: baseOption(makeSeries(30, 4), '#fac858'),
    };
  }, []);

  return (
    <div onWheel={handleWheel} style={{ marginBottom: 8 }}>
      <Carousel
        ref={carouselRef}
        dots
        draggable
        swipeToSlide
        beforeChange={(_, next) => setCurrent(next)}
      >
        <div>
          <TopIndicators marketData={marketData} />
        </div>
        <div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <IndicatorCard>
                <div className="indicator-content">
                  <div className="indicator-title">各行业走势</div>
                  <EChart height={140} option={lineOption.industryTrend} />
                </div>
              </IndicatorCard>
            </Col>
            <Col span={12}>
              <IndicatorCard>
                <div className="indicator-content">
                  <div className="indicator-title">涨停数</div>
                  <EChart height={140} option={lineOption.limitUpCount} />
                </div>
              </IndicatorCard>
            </Col>
            <Col span={12}>
              <IndicatorCard>
                <div className="indicator-content">
                  <div className="indicator-title">空</div>
                  <EChart height={140} option={lineOption.placeholder1} />
                </div>
              </IndicatorCard>
            </Col>
            <Col span={12}>
              <IndicatorCard>
                <div className="indicator-content">
                  <div className="indicator-title">空</div>
                  <EChart height={140} option={lineOption.placeholder2} />
                </div>
              </IndicatorCard>
            </Col>
          </Row>
        </div>
      </Carousel>
    </div>
  );
};

export default IndicatorsPager;


