export const theme = {
  colors: {
    // 股票涨跌颜色
    stockChange: {
      positive: '#52c41a',
      negative: '#ff4d4f',
    },
    // 统计卡片颜色
    statistic: {
      success: '#3f8600',
      primary: '#1890ff',
      warning: '#faad14',
      successAlt: '#52c41a',
      purple: '#722ed1',
    },
    // 页面元素颜色
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    // 布局颜色
    layout: {
      headerTitle: '#1890ff',
      logoBackground: 'rgba(255, 255, 255, 0.2)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.2s ease',
    slow: '0.5s ease',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  zIndex: {
    sider: 1000,
    modal: 1001,
    tooltip: 1002,
  },
} as const;

export type Theme = typeof theme;
