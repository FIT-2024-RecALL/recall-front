import clsx from 'clsx';
import React, { PropsWithChildren, HTMLAttributes } from 'react';

type CardSides = 'front' | 'back';
interface CardSideProps extends PropsWithChildren<HTMLAttributes<React.FC>> {
  side: CardSides;
}

export const CardSide: React.FC<CardSideProps> = ({ side, children }) => {
  const getSideAnimationClass = (side: CardSides) => {
    switch (side) {
      case 'front':
        return 'flip-front';
      case 'back':
        return 'flip-back';
    }
  };

  return (
    <div
      className={clsx(
        'p-2 lg:p-4 w-full h-5/6',
        'vstack items-center',
        'overflow-auto',
        getSideAnimationClass(side)
      )}
    >
      {children}
    </div>
  );
};
