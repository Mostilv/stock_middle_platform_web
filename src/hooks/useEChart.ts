import { useCallback, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export interface UseEChartConfig {
  option: echarts.EChartsOption;
  theme?: string;
  renderer?: 'canvas' | 'svg';
  lazy?: boolean;
  onChartClick?: (params: any) => void;
}

interface UseEChartResult {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

export const useEChart = ({
  option,
  theme,
  renderer = 'canvas',
  lazy = true,
  onChartClick,
}: UseEChartConfig): UseEChartResult => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.EChartsType | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isVisible, setIsVisible] = useState(!lazy);

  const debouncedResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      chartRef.current?.resize();
    }, 100);
  }, []);

  useEffect(() => {
    if (!lazy) {
      setIsVisible(true);
      return;
    }

    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [lazy]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const chartInstance = echarts.init(containerRef.current, theme, {
      renderer,
    });
    chartRef.current = chartInstance;

    if (onChartClick) {
      chartInstance.on('click', onChartClick);
    }

    resizeObserverRef.current = new ResizeObserver(() => {
      debouncedResize();
    });
    resizeObserverRef.current.observe(containerRef.current);

    const handleWindowResize = () => {
      debouncedResize();
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      if (onChartClick) {
        chartInstance.off('click', onChartClick);
      }
      window.removeEventListener('resize', handleWindowResize);
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = null;
      }
      chartInstance.dispose();
      chartRef.current = null;
    };
  }, [debouncedResize, isVisible, theme, renderer, onChartClick]);

  useEffect(() => {
    if (isVisible && chartRef.current) {
      chartRef.current.setOption(option, {
        notMerge: true,
        lazyUpdate: true,
        replaceMerge: ['series', 'xAxis', 'yAxis', 'grid', 'dataZoom'],
      });
    }
  }, [option, isVisible]);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
      resizeObserverRef.current?.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    },
    [],
  );

  return { containerRef, isVisible };
};
