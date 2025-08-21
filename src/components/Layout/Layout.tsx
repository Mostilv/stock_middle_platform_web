import React, { useState } from 'react';
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

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/indicators',
      icon: <BarChartOutlined />,
      label: '指标管理',
    },
    {
      key: '/portfolio',
      icon: <BarChartOutlined />,
      label: '调仓管理',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }): void => {
    navigate(key);
  };

  return (
    <LayoutContainer>
      <SiderContainer
        trigger={null}
        collapsible
        collapsed={collapsed}
        $collapsed={collapsed}
        width={200}
      >
        <LogoContainer $collapsed={collapsed}>
          {collapsed ? 'A股' : 'A股指标平台'}
        </LogoContainer>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </SiderContainer>
      <MainLayout $collapsed={collapsed}>
        {/* 固定在左上角的按钮 */}
        <HeaderButton 
          $collapsed={collapsed}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </HeaderButton>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainLayout>
    </LayoutContainer>
  );
};

export default LayoutComponent;
