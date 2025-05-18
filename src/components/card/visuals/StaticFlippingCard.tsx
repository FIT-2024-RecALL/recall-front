import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import { MarkdownRenderComponent } from '@/components/editor';

import { CardSide } from './CardSide';

interface StaticFlippingCardProps extends HTMLAttributes<React.FC> {
  frontSide: string;
  backSide: string;
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
      <CardSide side="front">
        <MarkdownRenderComponent
          className={clsx('p-1 font-sans')}
          rawText={frontSide}
          extended
        />
      </CardSide>
      <CardSide side="back">
        <MarkdownRenderComponent
          className={clsx('px-1 font-sans')}
          rawText={backSide}
        />
      </CardSide>
    </div>
  );
};
