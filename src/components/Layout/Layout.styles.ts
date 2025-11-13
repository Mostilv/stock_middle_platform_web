import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const { Sider: AntSider, Header: AntHeader, Content: AntContent } =
  AntLayout;

export const LayoutContainer = styled(AntLayout)`
  min-height: 100vh;
  background: radial-gradient(
    circle at 20% 20%,
    #0d172b 0%,
    #04070f 60%,
    #020307 100%
  );
`;

export const SiderContainer = styled(AntSider)<{ $collapsed: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: ${({ $collapsed }) => ($collapsed ? '88px' : '240px')} !important;
  background: rgba(1, 6, 15, 0.85);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
  transition: width 0.35s ease;
  overflow: hidden;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ant-layout-sider-trigger {
    display: none;
  }

  .menu-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 10px 6px;
  }

  .menu-scroll::-webkit-scrollbar {
    width: 4px;
  }

  .menu-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }

  .ant-menu {
    background: transparent;
    border-right: none;
    color: rgba(233, 242, 255, 0.8);
  }

  .ant-menu-item {
    margin: 6px 12px;
    height: 48px;
    border-radius: 16px !important;
    display: flex;
    align-items: center;
    font-size: 14px;
    letter-spacing: 0.3px;
    transition: background 0.3s ease, color 0.3s ease;
  }

  .ant-menu-item::after {
    display: none;
  }

  .ant-menu-item-selected {
    background: linear-gradient(
        135deg,
        rgba(24, 144, 255, 0.28),
        rgba(11, 64, 115, 0.9)
      )
      !important;
    color: #f7fbff !important;
    box-shadow: 0 10px 30px rgba(16, 90, 180, 0.35);
  }

  .ant-menu-item:hover {
    color: #ffffff;
    background: rgba(24, 144, 255, 0.12);
  }

  .ant-menu-item-icon {
    font-size: 18px;
  }

  .ant-menu-inline-collapsed .ant-menu-title-content {
    opacity: 0;
  }
`;

export const LogoContainer = styled.div<{ $collapsed: boolean }>`
  margin: 24px 18px 8px 18px;
  padding: 12px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(3, 11, 24, 0.8);
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  transition: all 0.3s ease;
  overflow: hidden;

  .logo-mark {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: linear-gradient(135deg, #3d8bff, #5be7c4);
    display: grid;
    place-items: center;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    transform: translateX(${({ $collapsed }) => ($collapsed ? '-8px' : '0')});
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .logo-subtitle {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
  }

  .logo-title {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const SidebarFooter = styled.div<{ $collapsed: boolean }>`
  margin: 12px 18px 24px 18px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(233, 242, 255, 0.75);
  font-size: 12px;
  line-height: 1.5;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  pointer-events: ${({ $collapsed }) => ($collapsed ? 'none' : 'auto')};
  transform: translateY(${({ $collapsed }) => ($collapsed ? '10px' : '0')});
  transition: all 0.3s ease;

  .footer-label {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  .footer-value {
    font-size: 14px;
    margin: 4px 0 6px;
    color: #ffffff;
  }

  .footer-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3dffce;
    box-shadow: 0 0 8px rgba(61, 255, 206, 0.9);
  }
`;

export const MainLayout = styled(AntLayout)<{ $collapsed: boolean }>`
  margin-left: ${({ $collapsed }) => ($collapsed ? '88px' : '240px')};
  transition: margin-left 0.35s ease;
  position: relative;
`;

export const HeaderContainer = styled(AntHeader)`
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
  z-index: 999;
`;

export const HeaderButton = styled.button<{
  $collapsed: boolean;
  $isDashboard?: boolean;
}>`
  position: fixed;
  top: 18px;
  left: ${({ $collapsed }) => ($collapsed ? '104px' : '252px')};
  z-index: 1001;
  font-size: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: ${({ $isDashboard }) =>
    $isDashboard ? 'rgba(255, 255, 255, 0.12)' : 'rgba(3, 12, 24, 0.6)'};
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: ${({ $isDashboard }) => ($isDashboard ? '#e6f7ff' : '#fff')};
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    top: 12px;
    left: 12px;
  }
`;

export const HeaderTitle = styled.span`
  margin-left: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const ContentContainer = styled(AntContent)`
  margin: 0;
  padding: 0;
  min-height: 280px;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
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

  will-change: opacity, transform;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;
