export type ChartType = 'line' | 'candlestick';
export type Theme = 'light' | 'dark';

export interface StockDataPoint {
  time: string | number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockChartProps {
  /** 图表数据 */
  data: StockDataPoint[];
  /** 图表类型：line-折线图，candlestick-K线图 */
  chartType: ChartType;
  /** 主题：light-亮色，dark-暗色 */
  theme?: Theme;
  /** 是否显示成交量 */
  showVolume?: boolean;
  /** 图表高度 */
  height?: number | string;
  /** 图表宽度 */
  width?: number | string;
  /** 自定义类名 */
  className?: string;
  /** 股票代码或名称 */
  stockCode?: string;
  /** 加载状态 */
  loading?: boolean;
  /** 图表标题 */
  title?: string;
  /** 是否显示网格线 */
  showGrid?: boolean;
  /** 是否显示数据标签 */
  showDataLabel?: boolean;
  /** 是否显示时间选择器 */
  showTimeSelector?: boolean;
  /** 自定义颜色配置 */
  colors?: {
    up?: string;
    down?: string;
    volume?: string;
    line?: string;
    grid?: string;
    text?: string;
  };
  /** 图表点击事件 */
  onChartClick?: (params: any) => void;
  /** 数据为空时的提示文本 */
  emptyText?: string;
}
