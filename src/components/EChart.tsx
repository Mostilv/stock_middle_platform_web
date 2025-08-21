import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartProps = {
  option: echarts.EChartsOption;
  height?: number | string;
  className?: string;
  theme?: string;
  renderer?: 'canvas' | 'svg';
};

const EChart: React.FC<EChartProps> = ({
  option,
  height = 320,
  className,
  theme,
  renderer = 'canvas',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  // 初始化与销毁，仅在主题或渲染器变化时重新初始化
  useEffect(() => {
    if (!containerRef.current) return;

    const chartInstance = echarts.init(containerRef.current, theme, {
      renderer,
    });
    chartRef.current = chartInstance;
    chartInstance.setOption(option, { notMerge: true, lazyUpdate: true });

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(containerRef.current);

    const handleWindowResize = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      chartInstance.dispose();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, renderer]);

  // 响应容器与option变更（避免频繁重绘造成闪烁）
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setOption(option, { notMerge: false, lazyUpdate: true, replaceMerge: [] });
      chartRef.current.resize();
    }
  }, [option]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        minWidth: 0,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export default EChart;
