import React, { useMemo, useCallback } from 'react';

import { Spin } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import {
  StockChartContainer,
  ChartHeader,
  ChartContent,
  LoadingOverlay,
  EmptyState,
} from './StockChart.styles';
import type { StockChartProps } from './types';
import { getCandlestickOption, getLineOption } from './chartConfigs';
import { useEChart } from '../../hooks/useEChart';

const StockChart: React.FC<StockChartProps> = ({
  data,
  chartType,
  theme = 'light',
  showVolume = true,
  height = 400,
  width = '100%',
  className,
  stockCode,
  loading = false,
  title,
  showGrid = true,
  showDataLabel = false,
  showTimeSelector = true,
  colors,
  onChartClick,
  emptyText = '暂无数据',
}) => {
  // 默认颜色配置
  const defaultColors = useMemo(
    () => ({
      up: '#52c41a',
      down: '#ff4d4f',
      volume: '#1890ff',
      line: '#1890ff',
      grid: theme === 'dark' ? '#333' : '#e8e8e8',
      text: theme === 'dark' ? '#ffffff' : '#333333',
    }),
    [theme],
  );

  const chartColors = { ...defaultColors, ...colors };

  // 处理数据格式
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map(item => ({
      time:
        typeof item.time === 'string'
          ? item.time
          : new Date(item.time).toLocaleDateString(),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
    }));
  }, [data]);

  // 根据图表类型选择配置
  const chartOption = useMemo(() => {
    const configOptions = {
      processedData,
      showVolume,
      chartColors,
      theme,
      showGrid,
      showDataLabel,
      showTimeSelector,
    };

    if (chartType === 'candlestick') {
      return getCandlestickOption(configOptions);
    } else {
      return getLineOption(configOptions);
    }
  }, [
    chartType,
    processedData,
    showVolume,
    chartColors,
    theme,
    showGrid,
    showDataLabel,
    showTimeSelector,
  ]);

  // 处理图表点击事件
  const handleChartClick = useCallback(
    (params: any) => {
      if (onChartClick) {
        onChartClick(params);
      }
    },
    [onChartClick],
  );

  const chartHeight =
    typeof height === 'number'
      ? Math.max(height - (title ? 60 : 0), 0)
      : height ?? '100%';
  const resolvedHeight =
    typeof chartHeight === 'number' ? `${chartHeight}px` : chartHeight || '100%';
  const { containerRef, isVisible } = useEChart({
    option: chartOption,
    theme: theme === 'dark' ? 'dark' : undefined,
    onChartClick: handleChartClick,
  });

  // 数据为空时显示空状态
  if (!data || data.length === 0) {
    return (
      <StockChartContainer
        $theme={theme}
        className={className}
        style={{ width, height }}
      >
        {title && (
          <ChartHeader $theme={theme}>
            <div className='chart-title'>{title}</div>
            {stockCode && <div className='stock-info'>{stockCode}</div>}
          </ChartHeader>
        )}
        <EmptyState $theme={theme}>
          <div className='empty-icon'>
            <LineChartOutlined />
          </div>
          <div className='empty-text'>{emptyText}</div>
        </EmptyState>
      </StockChartContainer>
    );
  }

  return (
    <StockChartContainer
      $theme={theme}
      className={className}
      style={{ width, height }}
    >
      {title && (
        <ChartHeader $theme={theme}>
          <div className='chart-title'>{title}</div>
          {stockCode && <div className='stock-info'>{stockCode}</div>}
        </ChartHeader>
      )}
      <ChartContent>
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: resolvedHeight,
            minWidth: 0,
            opacity: isVisible ? 1 : 0,
          }}
        />
        {loading && (
          <LoadingOverlay $theme={theme}>
            <Spin size='large' />
          </LoadingOverlay>
        )}
      </ChartContent>
    </StockChartContainer>
  );
};

export default StockChart;
