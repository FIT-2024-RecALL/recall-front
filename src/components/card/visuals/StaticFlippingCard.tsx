import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import { MarkdownRenderComponent } from '@/components/editor';

import { CardSide } from './CardSide';

interface StaticFlippingCardProps extends HTMLAttributes<React.FC> {
  frontSide: JSX.Element;
  backSide: JSX.Element;
  flipped: boolean | 'hover';
}

export const StaticFlippingCard: React.FC<StaticFlippingCardProps> = ({
  className,
  frontSide,
  backSide,
  flipped,
}) => {
  return (
    <div
      className={clsx(
        'transition-all duration-500 flip-inner',
        flipped && 'animate-flip',
        className
      )}
    >
      <CardSide side="front">{frontSide}</CardSide>
      <CardSide side="back">{backSide}</CardSide>
    </div>
  );
};
