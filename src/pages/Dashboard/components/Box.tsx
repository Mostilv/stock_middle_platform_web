import React from 'react';
import { BoxContainer, BoxContent, BoxHeader } from './Box.styles';

export type BoxTitleSize = 'sm' | 'md' | 'lg';
export type BoxTitleAlign = 'left' | 'center' | 'right';

export interface BoxProps {
  title?: React.ReactNode;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padding?: number | string;
  titleSize?: BoxTitleSize;
  titleAlign?: BoxTitleAlign;
  underlineTitle?: boolean;
  hoverable?: boolean;
}

const normalizePadding = (padding?: number | string) => {
  if (typeof padding === 'number') return `${padding}px`;
  if (typeof padding === 'string') return padding;
  return '12px';
};

const Box: React.FC<BoxProps> = ({
  title,
  headerExtra,
  children,
  className,
  padding,
  titleSize = 'md',
  titleAlign = 'center',
  underlineTitle = false,
  hoverable = true,
}) => {
  return (
    <BoxContainer
      className={className}
      $padding={normalizePadding(padding)}
      $hoverable={hoverable}
    >
      {title ? (
        <BoxHeader $align={titleAlign} $size={titleSize} $underline={underlineTitle}>
          {title}
          {headerExtra}
        </BoxHeader>
      ) : null}
      <BoxContent>{children}</BoxContent>
    </BoxContainer>
  );
};

export default React.memo(Box);

