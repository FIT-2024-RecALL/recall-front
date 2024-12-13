import clsx from 'clsx';
import React, { PropsWithChildren, HTMLAttributes } from 'react';

type CardSides = 'front' | 'back';
interface CardSideProps extends PropsWithChildren<HTMLAttributes<React.FC>> {
  side: CardSides;
}

const animationClasses = {
  front: 'flip-front',
  back: 'flip-back',
} satisfies Record<CardSides, string>;

export const CardSide: React.FC<CardSideProps> = ({ side, children }) => {
  return (
    <div
      className={clsx(
        'px-2 pb-8 md:px-4 md:pb-14 full',
        'vstack items-center',
        'overflow-scroll-y',
        animationClasses[side]
      )}
    >
      {children}
    </div>
  );
};