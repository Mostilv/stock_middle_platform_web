import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const { Sider: AntSider, Header: AntHeader, Content: AntContent } = AntLayout;

// 整体布局容器
export const LayoutContainer = styled(AntLayout)`
  min-height: 100vh;
  background: #f0f2f5;
`;

// 侧边栏
export const SiderContainer = styled(AntSider)<{ $collapsed: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1000;
  overflow: hidden;
  left: ${({ $collapsed }) => ($collapsed ? '-200px' : '0')};
  transition: all 0.2s ease; /* 减少过渡时间，减少白底闪烁 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  /* 隐藏默认的折叠触发器 */
  .ant-layout-sider-trigger {
    display: none !important;
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ant-menu {
    border-right: none;
  }
`;

// Logo容器
export const LogoContainer = styled.div<{ $collapsed: boolean }>`
  height: 32px;
  margin: 16px;
  background: #001529;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: opacity 0.3s;
  font-size: ${({ $collapsed }) => ($collapsed ? '12px' : '16px')};
  opacity: ${({ $collapsed }) => ($collapsed ? '0' : '1')};
`;

// 主内容布局
export const MainLayout = styled(AntLayout)<{ $collapsed: boolean }>`
  transition: margin-left 0.2s ease; /* 减少过渡时间，减少白底闪烁 */
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
  z-index: 999;
`;

// 头部按钮 - 固定在子页面左上角
export const HeaderButton = styled.button<{
  $collapsed: boolean;
  $isDashboard?: boolean;
}>`
  position: fixed;
  top: 10px;
  left: ${({ $collapsed }) => ($collapsed ? '10px' : '210px')};
  z-index: 1001;
  font-size: 16px;
  width: 36px;
  height: 36px;
  border: none;
  background: ${({ $isDashboard }) =>
    $isDashboard ? 'rgba(255,255,255,0.1)' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease; /* 减少过渡时间 */
  color: ${({ $isDashboard }) => ($isDashboard ? '#e6f7ff' : '#333')};

  &:hover {
    background: ${({ $isDashboard }) =>
      $isDashboard ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.04)'};
  }

  @media (max-width: 768px) {
    top: 8px;
    left: 8px;
    width: 32px;
    height: 32px;
  }
`;

// 头部标题
export const HeaderTitle = styled.span`
  margin-left: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

// 内容容器 - 为固定按钮留出空间，添加页面切换动画
export const ContentContainer = styled(AntContent)`
  margin: 0;
  padding: 0; /* 子页面内部自行控制外侧间距 */
  min-height: 280px;
  background: transparent; /* 去掉全局白底和边框阴影，避免首页白边 */
  border-radius: 0;
  box-shadow: none;

  /* 页面切换动画 */
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 优化页面切换性能 */
  will-change: opacity, transform;

  /* 确保动画流畅 */
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;
