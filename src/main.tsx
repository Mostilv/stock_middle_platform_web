import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  App as AntdApp,
  ConfigProvider,
  theme as antdTheme,
  unstableSetRender,
} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/useTheme';

unstableSetRender((node, container) => {
  const root = createRoot(container);
  root.render(node);
  return () => root.unmount();
});

const BootstrapApp: React.FC = () => {
  const { themeMode } = useTheme();
  const algorithm =
    themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <AntdApp>
        <AuthProvider>
          <StyledThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
          </StyledThemeProvider>
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <BootstrapApp />
    </AppThemeProvider>
  </StrictMode>,
);
