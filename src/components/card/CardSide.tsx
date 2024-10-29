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
        'p-2 lg:p-4 w-full h-5/6',
        'vstack items-center',
        'overflow-auto',
        animationClasses[side]
      )}
    >
      {children}
    </div>
  );
};
