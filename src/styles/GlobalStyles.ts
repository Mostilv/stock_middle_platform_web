import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  :root {
    --app-page-bg: #f4f6fb;
    --app-surface: #ffffff;
    --app-surface-muted: #f8fafc;
    --app-text-primary: #111827;
    --app-text-secondary: #6b7280;
    --app-border-color: rgba(15, 23, 42, 0.08);
    --app-card-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    --app-card-hover-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
    --app-table-hover: rgba(24, 144, 255, 0.08);
    --app-table-header-bg: #f5f6fa;
  }

  body[data-app-theme='dark'] {
    --app-page-bg: #0f172a;
    --app-surface: #111827;
    --app-surface-muted: #0b1626;
    --app-text-primary: #e5edf9;
    --app-text-secondary: #a5b4c5;
    --app-border-color: rgba(148, 163, 184, 0.25);
    --app-card-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
    --app-card-hover-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
    --app-table-hover: rgba(255, 255, 255, 0.06);
    --app-table-header-bg: #152236;
  }

  /* 全局样式重置 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    background-color: var(--app-page-bg);
    color: var(--app-text-primary);
    line-height: ${theme.typography.lineHeights.normal};
    font-size: ${theme.typography.fontSizes.md};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease;
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* 首页特殊背景处理 - 深色主题 */
  .ant-layout {
    /* 当在首页时，确保背景正确 */
    &[data-path="/"] {
      background: ${theme.colors.layout.darkGradient} !important;
    }
  }

  /* 确保首页内容区域背景正确 */
  .ant-layout-content {
    &[data-path="/"] {
      background: transparent !important;
      color: ${theme.colors.text.light};
    }
  }

  /* 其他页面使用浅色主题 */
  .ant-layout:not([data-path="/"]) {
    background: var(--app-page-bg);
  }

  .ant-layout-content:not([data-path="/"]) {
    background: var(--app-page-bg);
    color: var(--app-text-primary);
  }
  
  /* 链接样式 */
  a {
    color: ${theme.colors.text.link};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }

  /* 标题样式 */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeights.semibold};
    margin-bottom: 0.5em;
    line-height: ${theme.typography.lineHeights.tight};
  }

  /* 表单组件 */
  .ant-form-item-label > label {
    color: var(--app-text-secondary);
    font-weight: ${theme.typography.fontWeights.medium};
  }

  .form-input-full-width {
    width: 100%;
  }

  .form-button-group {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
  }

  /* 响应式布局 */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    .sider-container {
      display: none;
    }
    
    .main-layout-expanded {
      margin-left: 0;
    }
    
    .content-container {
      margin: 16px 8px;
      padding: 16px;
    }
  }

  /* Ant Design 组件样式覆盖 */
  .ant-layout-sider {
    background: #001529;
    box-shadow: ${theme.shadows.medium};
  }

  .ant-menu-dark {
    background: #001529;
  }

  .ant-menu-dark .ant-menu-item-selected {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.sm};
    font-weight: ${theme.typography.fontWeights.medium};
  }

  .ant-menu-dark .ant-menu-item:hover:not(.ant-menu-item-selected) {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .ant-card {
    border-radius: ${theme.borderRadius.md};
    box-shadow: var(--app-card-shadow);
    transition: box-shadow 0.3s ease;
    overflow: hidden;
    border: 1px solid var(--app-border-color);
    background: var(--app-surface);
    
    &:hover {
      box-shadow: var(--app-card-hover-shadow);
    }
  }

  .ant-card-head {
    border-bottom: 1px solid var(--app-border-color);
    padding: 16px 24px;
  }

  .ant-card-head-title {
    font-weight: ${theme.typography.fontWeights.semibold};
    font-size: ${theme.typography.fontSizes.lg};
    color: var(--app-text-primary);
  }

  .ant-statistic-title {
    color: var(--app-text-secondary);
    font-size: ${theme.typography.fontSizes.sm};
    margin-bottom: 4px;
  }

  .ant-statistic-content {
    color: var(--app-text-primary);
    font-weight: ${theme.typography.fontWeights.semibold};
  }

  .ant-table {
    border-radius: ${theme.borderRadius.md};
    overflow: hidden;
    box-shadow: var(--app-card-shadow);
    background: var(--app-surface);
    color: var(--app-text-primary);
  }

  .ant-table-thead > tr > th {
    background: var(--app-table-header-bg);
    border-bottom: 1px solid var(--app-border-color);
    font-weight: ${theme.typography.fontWeights.semibold};
    color: var(--app-text-secondary);
  }

  .ant-table-tbody > tr:hover > td {
    background: var(--app-table-hover);
  }

  .ant-table-tbody > tr > td {
    color: var(--app-text-primary);
    background: var(--app-surface);
  }

  .ant-progress-text {
    font-size: ${theme.typography.fontSizes.xs};
    color: var(--app-text-secondary);
  }

  /* 按钮样式优化 */
  .ant-btn {
    border-radius: ${theme.borderRadius.md};
    font-weight: ${theme.typography.fontWeights.medium};
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: none;
    }
  }

  .ant-btn-primary {
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.button.primaryHover};
      border-color: ${theme.colors.button.primaryHover};
    }
  }

  /* 输入框样式优化 */
  .ant-input, .ant-select, .ant-picker {
    border-radius: ${theme.borderRadius.md};
    transition: all 0.3s ease;
    
    &:hover, &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  /* 滚动条美化 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;
