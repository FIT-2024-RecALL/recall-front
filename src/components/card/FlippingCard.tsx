import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import { EditorComponent } from '@/components/editor/EditorComponent';

import { CardSide } from './CardSide';
import { useAppStore } from '@/state';

interface FlippingCardProps extends HTMLAttributes<React.FC> {}

export const FlippingCard: React.FC<FlippingCardProps> = ({ className }) => {
  const frontSide = useAppStore((state) => state.activeCard.frontSide);
  const backSide = useAppStore((state) => state.activeCard.backSide);
  const setCardSide = useAppStore((state) => state.setActiveCardSide);
  const flipped = useAppStore((state) => state.activeCardUI.flipped);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  return (
    <div
      className={clsx(
        'transition-all duration-500 flip-inner',
        flipped && 'animate-flip',
        className
      )}
    >
      <CardSide side="front">
        <EditorComponent
          state={frontSide}
          setState={(s) => setCardSide('frontSide', s)}
          extended
          placeholder="First side"
        />
      </CardSide>
      <CardSide side="back">
        <EditorComponent
          state={backSide}
          setState={(s) => setCardSide('backSide', s)}
          placeholder="Second side"
        />
      </CardSide>
      <div
        className={clsx(
          'absolute bottom-0',
          'w-full h-1/12 p-2',
          'center',
          'overflow-hidden transition-all',
          'hover:cursor-pointer hover:bg-1-8/10 hover:pl-10',
          'text-xl font-bold'
        )}
        onClick={() => setUIFlag('flipped', (f) => !f)}
      >
        {'> > >'}
      </div>
    </div>
  );
};
