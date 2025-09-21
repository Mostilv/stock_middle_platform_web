import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
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
    background-color: ${theme.colors.layout.lightBackground};
    color: ${theme.colors.text.primary};
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
    background: ${theme.colors.layout.lightBackground};
  }

  .ant-layout-content:not([data-path="/"]) {
    background: ${theme.colors.layout.lightBackground};
    color: ${theme.colors.text.primary};
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
    color: ${theme.colors.text.secondary};
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
    box-shadow: ${theme.shadows.small};
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    overflow: hidden;
    border: none;
    
    &:hover {
      box-shadow: ${theme.shadows.medium};
      transform: translateY(-2px);
    }
  }

  .ant-card-head {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 16px 24px;
  }

  .ant-card-head-title {
    font-weight: ${theme.typography.fontWeights.semibold};
    font-size: ${theme.typography.fontSizes.lg};
  }

  .ant-statistic-title {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSizes.sm};
    margin-bottom: 4px;
  }

  .ant-statistic-content {
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.fontWeights.semibold};
  }

  .ant-table {
    border-radius: ${theme.borderRadius.md};
    overflow: hidden;
    box-shadow: ${theme.shadows.small};
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    font-weight: ${theme.typography.fontWeights.semibold};
    color: ${theme.colors.text.secondary};
  }

  .ant-table-tbody > tr:hover > td {
    background: rgba(24, 144, 255, 0.1);
  }

  .ant-progress-text {
    font-size: ${theme.typography.fontSizes.xs};
    color: ${theme.colors.text.secondary};
  }

  /* 按钮样式优化 */
  .ant-btn {
    border-radius: ${theme.borderRadius.md};
    font-weight: ${theme.typography.fontWeights.medium};
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
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
