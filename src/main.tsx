import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { AppThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppThemeProvider>
        <StyledThemeProvider theme={theme}>
          <GlobalStyles />
          <App />
        </StyledThemeProvider>
      </AppThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
