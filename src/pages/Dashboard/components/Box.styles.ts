import styled, { css } from 'styled-components';

type TitleSize = 'sm' | 'md' | 'lg';
type TitleAlign = 'left' | 'center' | 'right';

const titleSizeMap: Record<TitleSize, string> = {
  sm: '11px',
  md: '14px',
  lg: '16px',
};

export const BoxContainer = styled.div<{
  $padding: string;
  $hoverable: boolean;
}>`
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(42, 59, 77, 0.8);
  border-radius: 12px;
  padding: ${({ $padding }) => $padding};
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  ${({ $hoverable }) =>
    $hoverable &&
    css`
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
      }
    `}
`;

export const BoxHeader = styled.div<{
  $align: TitleAlign;
  $size: TitleSize;
  $underline: boolean;
}>`
  color: #e6f7ff;
  font-weight: 600;
  font-size: ${({ $size }) => titleSizeMap[$size]};
  text-align: ${({ $align }) => $align};
  margin-bottom: 8px;
  position: relative;
  line-height: 1.4;

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
  gap: 8px;
`;
