import React, { useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';

type EChartProps = {
  option: echarts.EChartsOption;
  height?: number | string;
  className?: string;
  theme?: string;
  renderer?: 'canvas' | 'svg';
  lazy?: boolean; // 是否启用懒加载
  onChartClick?: (params: any) => void; // 图表点击事件
};

const EChart: React.FC<EChartProps> = ({
  option,
  height = 320,
  className,
  theme,
  renderer = 'canvas',
  lazy = true,
  onChartClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isVisible, setIsVisible] = React.useState(!lazy);

  // 防抖的resize处理函数
  const debouncedResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    }, 100);
  }, []);

  // 初始化图表
  const initChart = useCallback(() => {
    if (!containerRef.current || chartRef.current) return;

    const chartInstance = echarts.init(containerRef.current, theme, {
      renderer,
    });
    chartRef.current = chartInstance;
    
    // 使用动画关闭以减少卡顿
    chartInstance.setOption(option, { 
      notMerge: true, 
      lazyUpdate: true
    });

    // 添加点击事件监听
    if (onChartClick) {
      chartInstance.on('click', onChartClick);
    }

    // 使用ResizeObserver监听容器大小变化
    const resizeObserver = new ResizeObserver(() => {
      debouncedResize();
    });
    resizeObserver.observe(containerRef.current);

    // 清理函数
    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [theme, renderer, option, debouncedResize]);

  // 懒加载逻辑
  useEffect(() => {
    if (!lazy) {
      const cleanup = initChart();
      return cleanup;
    }

    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, initChart]);

  // 当组件变为可见时初始化图表
  useEffect(() => {
    if (isVisible && lazy) {
      const cleanup = initChart();
      return cleanup;
    }
  }, [isVisible, lazy, initChart]);

  // 响应option变更
  useEffect(() => {
    if (chartRef.current && isVisible) {
      chartRef.current.setOption(option, { 
        notMerge: false, 
        lazyUpdate: true, 
        replaceMerge: []
      });
    }
  }, [option, isVisible]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // 全局resize事件监听
  useEffect(() => {
    const handleWindowResize = () => {
      debouncedResize();
    };
    
    window.addEventListener('resize', handleWindowResize);
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [debouncedResize]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        minWidth: 0,
        height: typeof height === 'number' ? `${height}px` : height,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
};

export default EChart;
