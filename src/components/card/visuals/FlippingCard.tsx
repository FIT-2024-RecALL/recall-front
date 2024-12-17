import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import {
  MarkdownEditorComponent,
  MarkdownRenderComponent,
} from '@/components/editor';

import { CardSide } from './CardSide';
import { useAppStore } from '@/state';

type FlippingCardProps = HTMLAttributes<React.FC>;

export const FlippingCard: React.FC<FlippingCardProps> = ({ className }) => {
  const mode = useAppStore((state) => state.activeCardUI.mode);
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
        {mode === 'edit' && (
          <MarkdownEditorComponent
            state={frontSide}
            setState={(s) => setCardSide('frontSide', s)}
            extended
            placeholder="First side (required)"
          />
        )}
        {mode === 'train' && (
          <MarkdownRenderComponent
            className="text-lg w-full p-2 md:p-4"
            rawText={frontSide}
            extended
          />
        )}
      </CardSide>
      <CardSide side="back">
        {mode === 'edit' && (
          <MarkdownEditorComponent
            state={backSide}
            setState={(s) => setCardSide('backSide', s)}
            placeholder="Second side (required)"
          />
        )}
        {mode === 'train' && (
          <MarkdownRenderComponent
            className="text-lg w-full p-2 md:p-4"
            rawText={backSide}
          />
        )}
      </CardSide>
      <div
        className={clsx(
          'absolute bottom-0',
          'w-full h-7 md:py-2',
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
