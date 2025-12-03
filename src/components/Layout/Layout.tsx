import React, { useState, useCallback } from 'react';
import { Avatar, Menu } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutContainer,
  SiderContainer,
  LogoContainer,
  MainLayout,
  HeaderButton,
  ContentContainer,
} from './Layout.styles';
import { useAuth } from '../../contexts/useAuth';

const LayoutComponent: React.FC = React.memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const accountInitial =
    user?.username?.charAt(0).toUpperCase() ||
    user?.displayName?.charAt(0).toUpperCase() ||
    'U';

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '首页',
    },
    {
      key: '/limit-up-stocks',
      icon: <BarChartOutlined />,
      label: '复盘',
    },
    {
      key: '/portfolio',
      icon: <BarChartOutlined />,
      label: '调仓',
    },
    {
      key: '/strategy-subscription',
      icon: <BellOutlined />,
      label: '策略订阅',
    },
    {
      key: '/user-management',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  // 使用useCallback优化事件处理函数
  const handleMenuClick = useCallback(
    ({ key }: { key: string }): void => {
      navigate(key);
    },
    [navigate],
  );

  // 使用useCallback优化折叠按钮点击事件
  const handleCollapseClick = useCallback(() => {
    setCollapsed(prev => {
      const next = !prev;
      const pulses = [0, 120, 240, 360];
      pulses.forEach(delay => {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, delay);
      });
      return next;
    });
  }, []);

  return (
    <LayoutContainer data-path={location.pathname}>
      <SiderContainer
        trigger={null}
        collapsible={false}
        collapsed={collapsed}
        $collapsed={collapsed}
        width={240}
        collapsedWidth={0}
      >
        <LogoContainer $collapsed={collapsed}>
          <div className='logo-mark'>
            {isAuthenticated ? (
              <Avatar size={44} src={user?.avatarUrl || undefined}>
                {accountInitial}
              </Avatar>
            ) : (
              <span className='logo-initial'>S</span>
            )}
          </div>
          <div className='logo-content'>
            {isAuthenticated ? (
              <div className='user-info'>
                <div className='user-meta'>
                  <span className='user-name'>
                    {user?.username || '我的账户'}
                  </span>
                  <span className='user-role'>
                    {user?.role ? `角色：${user.role}` : '策略管理员'}
                  </span>
                </div>
              </div>
            ) : (
              <div className='logo-text'>
                <span className='logo-title'>市场监控</span>
                <span className='logo-subtitle'>SOHA ALPHA</span>
              </div>
            )}
          </div>
        </LogoContainer>
        <div className='menu-scroll'>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </div>
      </SiderContainer>
      <MainLayout $collapsed={collapsed} data-path={location.pathname}>
        {/* 固定在左上角的按钮，只在首页大屏页显示 */}
        {location.pathname === '/' && (
          <HeaderButton
            $collapsed={collapsed}
            $isDashboard={true}
            onClick={handleCollapseClick}
          >
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </HeaderButton>
        )}
        <ContentContainer data-path={location.pathname}>
          <Outlet />
        </ContentContainer>
      </MainLayout>
    </LayoutContainer>
  );
});

LayoutComponent.displayName = 'LayoutComponent';

export default LayoutComponent;
