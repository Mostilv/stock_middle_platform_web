import React, { useState, useCallback } from 'react';
import { Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutContainer,
  SiderContainer,
  LogoContainer,
  SidebarFooter,
  MainLayout,
  HeaderButton,
  ContentContainer,
} from './Layout.styles';

const LayoutComponent: React.FC = React.memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    setCollapsed(!collapsed);
    // 通知窗口变化，强制子图表重算布局，避免展开后不变窄
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }, [collapsed]);

  return (
    <LayoutContainer data-path={location.pathname}>
      <SiderContainer
        trigger={null}
        collapsible={false}
        collapsed={collapsed}
        $collapsed={collapsed}
        width={240}
        collapsedWidth={88}
      >
        <LogoContainer $collapsed={collapsed}>
          <div className='logo-mark'>S</div>
          <div className='logo-text'>
            <span className='logo-subtitle'>SOHA ALPHA</span>
            <span className='logo-title'>市场中台</span>
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
        <SidebarFooter $collapsed={collapsed}>
          <div className='footer-label'>{"TODAY'S NOTE"}</div>
          <div className='footer-value'>波动收敛 · 关注行业轮动</div>
          <div className='footer-status'>
            <span className='status-dot' />
            <span>System Health · OK</span>
          </div>
        </SidebarFooter>
      </SiderContainer>
      <MainLayout $collapsed={collapsed} data-path={location.pathname}>
        {/* 固定在左上角的按钮，只在首页大屏页显示 */}
        {location.pathname === '/' && (
          <HeaderButton
            $collapsed={collapsed}
            $isDashboard={true}
            onClick={handleCollapseClick}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
