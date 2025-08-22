import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, App as AntdApp, Spin } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './components/Layout';
import './App.css';

// 懒加载页面组件
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Indicators = React.lazy(() => import('./pages/Indicators/Indicators'));
const Portfolio = React.lazy(() => import('./pages/Portfolio/Portfolio'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));

// 加载中组件
const LoadingComponent: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: '#1a1a1a'
  }}>
    <Spin size="large" />
  </div>
);

const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
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
                <Route path='indicators' element={<Indicators />} />
                <Route path='portfolio' element={<Portfolio />} />
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
