import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Indicators from './pages/Indicators/Indicators';
import Portfolio from './pages/Portfolio/Portfolio';
import Settings from './pages/Settings/Settings';
import './App.css';

const App: React.FC = (): JSX.Element => {
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
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='indicators' element={<Indicators />} />
              <Route path='portfolio' element={<Portfolio />} />
              <Route path='settings' element={<Settings />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
          </Routes>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
