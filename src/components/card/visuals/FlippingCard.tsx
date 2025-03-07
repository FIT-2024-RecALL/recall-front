import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import {
  MarkdownEditorComponent,
  MarkdownRenderComponent,
} from '@/components/editor';

import { CardSide } from './CardSide';
import { useAppStore } from '@/state';
import { useTranslation } from 'react-i18next';

type FlippingCardProps = HTMLAttributes<React.FC>;

export const FlippingCard: React.FC<FlippingCardProps> = ({ className }) => {
  const { t } = useTranslation();

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
        {mode === 'edit' ? (
          <MarkdownEditorComponent
            state={frontSide}
            setState={(s) => setCardSide('frontSide', s)}
            extended
            placeholder={t('card.frontSidePlaceholder')}
            previewClassName="font-sans"
          />
        ) : (
          <MarkdownRenderComponent
            className="text-lg w-full p-2 md:p-4 font-sans"
            rawText={frontSide}
            extended
          />
        )}
      </CardSide>
      <CardSide side="back">
        {mode === 'edit' ? (
          <MarkdownEditorComponent
            state={backSide}
            setState={(s) => setCardSide('backSide', s)}
            placeholder={t('card.backSidePlaceholder')}
            previewClassName="font-sans"
          />
        ) : (
          <MarkdownRenderComponent
            className="text-lg w-full p-2 md:p-4 font-sans"
            rawText={backSide}
          />
        )}
      </CardSide>
      <div
        className={clsx(
          'absolute bottom-0',
          'w-full h-7 md:py-2',
          'center rounded-b-lg',
          'overflow-hidden transition-all duration-500',
          'hover:cursor-pointer hover:pl-10',
          'text-xl font-bold',
          'bg-blue-300 hover:bg-blue-300/75'
        )}
        onClick={() => setUIFlag('flipped', (f) => !f)}
      >
        {'> > >'}
      </div>
    </div>
  );
};
