import React, { useState, useCallback } from 'react';
import { Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
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
      key: '/settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  // 使用useCallback优化事件处理函数
  const handleMenuClick = useCallback(({ key }: { key: string }): void => {
    navigate(key);
  }, [navigate]);

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
        width={200}
      >
        <LogoContainer $collapsed={collapsed}>
          {collapsed ? 'SOHA' : 'SOHA价投'}
        </LogoContainer>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </SiderContainer>
      <MainLayout $collapsed={collapsed} data-path={location.pathname}>
        {/* 固定在左上角的按钮 */}
        <HeaderButton 
          $collapsed={collapsed}
          $isDashboard={location.pathname === '/'}
          onClick={handleCollapseClick}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </HeaderButton>
        <ContentContainer data-path={location.pathname}>
          <Outlet />
        </ContentContainer>
      </MainLayout>
    </LayoutContainer>
  );
});

LayoutComponent.displayName = 'LayoutComponent';

export default LayoutComponent;
