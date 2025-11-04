export const theme = {
  colors: {
    primary: '#1890ff',
    secondary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    background: '#f0f2f5',
    text: {
      primary: '#000000d9',
      secondary: '#00000073',
      disabled: '#00000040',
      light: '#ffffff',
      dark: '#000000',
      link: '#1890ff',
    },
    border: {
      light: '#f0f0f0',
      base: '#d9d9d9',
      dark: '#bfbfbf',
    },
    layout: {
      darkGradient:
        'linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%)',
      lightBackground: '#f5f7fa',
      contentBackground: '#ffffff',
      lightGradient: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
    },
    stockChange: {
      positive: '#52c41a',
      negative: '#f5222d',
    },
    card: {
      background: '#ffffff',
      hover: '#fafafa',
      border: '#f0f0f0',
      shadow: 'rgba(0, 0, 0, 0.08)',
    },
    button: {
      primary: '#1890ff',
      primaryHover: '#40a9ff',
      secondary: '#f5f5f5',
      secondaryHover: '#e8e8e8',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.08)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.12)',
    large: '0 8px 24px rgba(0, 0, 0, 0.15)',
    card: '0 1px 2px -1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  typography: {
    fontFamily:
      "'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8,
    },
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
} as const;

export type Theme = typeof theme;
