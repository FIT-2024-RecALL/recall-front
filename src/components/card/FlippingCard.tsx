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
  const isEditModeActive = useAppStore(
    (state) => state.activeCardUI.editActive
  );

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
          active={isEditModeActive}
          extended
          placeholder="First side"
        />
      </CardSide>
      <CardSide side="back">
        <EditorComponent
          state={backSide}
          setState={(s) => setCardSide('backSide', s)}
          active={isEditModeActive}
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
        {/* <Icon icon="arrowRight" className="w-4 h-4 md:w-6 md:h-6" />
        <Icon icon="arrowRight" className="w-4 h-4 md:w-6 md:h-6" />
        <Icon icon="arrowRight" className="w-4 h-4 md:w-6 md:h-6" /> */}
      </div>
    </div>
  );
};
