import styled, { css } from 'styled-components';

type TitleSize = 'sm' | 'md' | 'lg';
type TitleAlign = 'left' | 'center' | 'right';

const titleSizeMap: Record<TitleSize, string> = {
  sm: '10px',
  md: '13px',
  lg: '15px',
};

export const BoxContainer = styled.div<{
  $padding: string;
  $hoverable: boolean;
}>`
  background: linear-gradient(135deg, rgba(10, 24, 35, 0.9), rgba(9, 12, 28, 0.85));
  border: 1px solid rgba(135, 206, 250, 0.15);
  border-radius: 16px;
  padding: ${({ $padding }) => $padding};
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 20% 20%,
      rgba(24, 144, 255, 0.18),
      transparent 60%
    );
    opacity: 0.7;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    pointer-events: none;
  }

  ${({ $hoverable }) =>
    $hoverable &&
    css`
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 45px rgba(2, 14, 34, 0.55);
      }
    `}
`;

export const BoxHeader = styled.div<{
  $align: TitleAlign;
  $size: TitleSize;
  $underline: boolean;
}>`
  color: rgba(236, 245, 255, 0.92);
  font-weight: 500;
  font-size: ${({ $size }) => titleSizeMap[$size]};
  text-align: ${({ $align }) => $align};
  margin-bottom: 8px;
  position: relative;
  line-height: 1.4;
  letter-spacing: 0.3px;

  ${({ $underline }) =>
    $underline &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 36px;
        height: 2px;
        border-radius: 1px;
        background: rgba(24, 144, 255, 0.8);
      }
    `}
`;

export const BoxContent = styled.div`
  flex: 1 1 0;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
