import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import { theme } from '../../styles/theme';

const { Sider: AntSider, Header: AntHeader, Content: AntContent } = AntLayout;

// 主布局容器
export const LayoutContainer = styled(AntLayout)`
  min-height: 100vh;
`;

// 侧边栏容器
export const SiderContainer = styled(AntSider)<{ $collapsed: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: ${theme.zIndex.sider};
  overflow: hidden;
  transition: left ${theme.transitions.default};
  left: ${({ $collapsed }) => ($collapsed ? '-200px' : '0')};

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

// Logo容器
export const LogoContainer = styled.div<{ $collapsed: boolean }>`
  height: 32px;
  margin: 16px;
  background: ${theme.colors.layout.logoBackground};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: opacity ${theme.transitions.default};
  font-size: ${({ $collapsed }) => ($collapsed ? '12px' : '16px')};
  opacity: ${({ $collapsed }) => ($collapsed ? '0' : '1')};
`;

// 主内容布局
export const MainLayout = styled(AntLayout)<{ $collapsed: boolean }>`
  transition: margin-left ${theme.transitions.default};
  margin-left: ${({ $collapsed }) => ($collapsed ? '0' : '200px')};
  position: relative;
`;

// 头部容器
export const HeaderContainer = styled(AntHeader)`
  padding: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: ${theme.zIndex.sider - 1};
`;

// 头部按钮 - 固定在子页面左上角
export const HeaderButton = styled.button<{ $collapsed: boolean }>`
  position: fixed;
  top: 16px;
  left: ${({ $collapsed }) => ($collapsed ? '16px' : '216px')};
  z-index: ${theme.zIndex.sider + 1};
  font-size: 16px;
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 8px;
    left: 8px;
    width: 40px;
    height: 40px;
  }
`;

// 头部标题
export const HeaderTitle = styled.span`
  margin-left: 16px;
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.layout.headerTitle};
`;

// 内容容器 - 为固定按钮留出空间
export const ContentContainer = styled(AntContent)`
  margin: 12px 16px;
  padding: 0px 12px 12px 12px; /* 顶部padding增加，为固定按钮留出空间 */
  min-height: 280px;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 16px 8px;
    padding: 60px 16px 16px 16px; /* 移动端减少顶部padding */
  }
`;
