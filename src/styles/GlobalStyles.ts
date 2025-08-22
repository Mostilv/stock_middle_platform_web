import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* 全局样式重置 */
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.colors.text.primary};
    background: #f5f5f5;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* 首页特殊背景处理 - 避免菜单折叠时的白底 */
  .ant-layout {
    /* 当在首页时，确保背景正确 */
    &[data-path="/"] {
      background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%) !important;
    }
  }

  /* 确保首页内容区域背景正确 */
  .ant-layout-content {
    &[data-path="/"] {
      background: transparent !important;
    }
  }

  /* 表单组件 */
  .form-input-full-width {
    width: 100%;
  }

  /* 响应式布局 */
  @media (max-width: ${theme.breakpoints.mobile}) {
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
  }

  .ant-menu-dark {
    background: #001529;
  }

  .ant-menu-dark .ant-menu-item-selected {
    background: #1890ff;
  }

  .ant-card {
    border-radius: ${theme.borderRadius.md};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .ant-statistic-title {
    color: ${theme.colors.text.secondary};
    font-size: 14px;
  }

  .ant-statistic-content {
    color: ${theme.colors.text.primary};
    font-weight: 600;
  }

  .ant-table {
    border-radius: ${theme.borderRadius.md};
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-progress-text {
    font-size: 12px;
    color: ${theme.colors.text.secondary};
  }
`;
