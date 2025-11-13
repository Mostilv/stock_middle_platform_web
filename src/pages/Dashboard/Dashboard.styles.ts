import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const pulse = keyframes`
  0% {
    opacity: 0.35;
    transform: translateY(0);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-6px);
  }
  100% {
    opacity: 0.35;
    transform: translateY(0);
  }
`;

const metricBackground = {
  up: 'linear-gradient(135deg, rgba(255, 125, 125, 0.25), rgba(32, 12, 16, 0.9))',
  down: 'linear-gradient(135deg, rgba(76, 202, 164, 0.25), rgba(12, 33, 30, 0.9))',
  flat: 'linear-gradient(135deg, rgba(119, 136, 187, 0.25), rgba(17, 20, 32, 0.9))',
} as const;

export const DashboardContainer = styled.div`
  position: relative;
  padding: 12px clamp(16px, 4vw, 28px) 16px;
  height: 100vh;
  color: ${theme.colors.text.light};
  font-family: ${theme.typography.fontFamily};
  overflow: hidden;
  background: radial-gradient(
    circle at 15% 0%,
    #102347 0%,
    #050a18 55%,
    #02040a 100%
  );
  display: flex;
  flex-direction: column;
  gap: 8px;

  &::before {
    content: '';
    position: absolute;
    inset: -40% -5% auto -5%;
    height: 110%;
    background: radial-gradient(
      circle at 20% 20%,
      rgba(48, 130, 255, 0.35),
      transparent 50%
    );
    filter: blur(35px);
    opacity: 0.7;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 120px 120px;
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const HeroSection = styled.section`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
  flex: 0 0 auto;
`;

export const HeroCopy = styled.div`
  max-width: min(640px, 60%);

  .hero-time {
    margin-bottom: 6px;
  }

  h1 {
    margin: 4px 0;
    font-size: clamp(24px, 2.6vw, 32px);
    font-weight: 600;
    line-height: 1.05;
    color: #f7fbff;
  }

  p {
    margin: 0;
    color: rgba(235, 245, 255, 0.7);
    line-height: 1.6;
    font-size: 14px;
  }
`;

export const HeroMeta = styled.div`
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;

  @media (max-width: 1200px) {
    width: 100%;
    align-items: flex-start;
  }
`;

export const HeroMetricsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  padding-bottom: 8px;

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

export const MetricCard = styled.div<{ $trend: 'up' | 'down' | 'flat' }>`
  min-width: 140px;
  padding: 8px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: ${({ $trend }) => metricBackground[$trend]};
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 5px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    pointer-events: none;
  }

  .label {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
  }

  .value {
    margin: 2px 0;
    font-size: 16px;
    font-weight: 600;
    color: #fefefe;
  }

  .hint {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const TopPanel = styled.section`
  position: relative;
  z-index: 2;
  margin: 24px 0 18px 0;
  padding: 18px 22px 24px 22px;
  border-radius: 24px;
  border: 1px solid rgba(140, 197, 255, 0.25);
  background:
    radial-gradient(
      circle at 10% 0%,
      rgba(30, 128, 255, 0.25),
      transparent 45%
    ),
    rgba(5, 12, 29, 0.75);
  backdrop-filter: blur(24px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    pointer-events: none;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;

  .eyebrow {
    margin: 0;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  .title {
    margin: 4px 0 0 0;
    font-size: 18px;
    font-weight: 600;
    color: #f5fbff;
    line-height: 1.2;
  }

  .meta {
    font-size: 11px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  &.compact {
    margin-bottom: 12px;

    .title {
      font-size: 15px;
    }
  }
`;

export const MainContent = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(200px, 0.65fr) minmax(0, 1.7fr) minmax(
      200px,
      0.65fr
    );
  gap: 16px;
  flex: 1 1 auto;
  min-height: 0;
  & > * {
    min-height: 0;
  }

  @media (max-width: 1500px) {
    grid-template-columns: 190px minmax(0, 1fr) 190px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const StackPanel = styled.section`
  background: rgba(6, 12, 26, 0.82);
  border-radius: 20px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle at top,
      rgba(32, 78, 255, 0.14),
      transparent 60%
    );
    opacity: 0.5;
    pointer-events: none;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const CenterPanels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  height: 100%;
  min-height: 0;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
  }
`;

export const GlassCard = styled.section`
  background: rgba(4, 10, 24, 0.86);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle at 10% 10%,
      rgba(19, 178, 255, 0.18),
      transparent 60%
    );
    opacity: 0.8;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    pointer-events: none;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &.full-span {
    grid-column: 1 / -1;
  }
`;

const chartsStackBase = `
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  & > * {
    flex: 1 1 0;
    min-height: 0;
  }
`;

export const LeftChartsStack = styled.div`
  ${chartsStackBase}
`;

export const RightChartsStack = styled.div`
  ${chartsStackBase}
`;

export const ScrollHint = styled.div`
  position: absolute;
  bottom: 20px;
  right: clamp(16px, 5vw, 64px);
  z-index: 2;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 32px;
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;
