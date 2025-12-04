import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App as AntdApp, ConfigProvider, Spin, theme as antdTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import './App.css';
import { useTheme } from './contexts/useTheme';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const LimitUpStocks = React.lazy(
  () => import('./pages/LimitUpStocks/LimitUpStocks'),
);
const Portfolio = React.lazy(() => import('./pages/Portfolio/Portfolio'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const UserManagement = React.lazy(() => import('./pages/UserManagement'));
const StrategySubscription = React.lazy(
  () => import('./pages/StrategySubscription'),
);
const LoginPage = React.lazy(() => import('./pages/Login'));

const LoadingComponent: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#1a1a1a',
    }}
  >
    <Spin size='large' />
  </div>
);

const App: React.FC = () => {
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
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='limit-up-stocks' element={<LimitUpStocks />} />
                <Route path='portfolio' element={<Portfolio />} />
                <Route path='login' element={<LoginPage />} />
                <Route
                  path='strategy-subscription'
                  element={
                    <RequireAuth>
                      <StrategySubscription />
                    </RequireAuth>
                  }
                />
                <Route
                  path='user-management'
                  element={
                    <RequireAuth>
                      <UserManagement />
                    </RequireAuth>
                  }
                />
                <Route path='settings' element={<Settings />} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
