import React, { HTMLAttributes } from 'react';

import { MiniCard } from './visuals';
import { ActiveCardUIModes } from '@/state/slices';
import { useAppStore } from '@/state';
import { useCard } from '@/query/queryHooks';
import { LoadableComponent } from '@/components/library';
import { MarkdownRenderComponent } from '@/components/editor';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<React.FC> {
  mode: ActiveCardUIModes;
  cardId: number;
}

export const Card: React.FC<CardProps> = ({ mode, cardId, className }) => {
  const setRealActiveCard = useAppStore((state) => state.setRealActiveCard);
  const setActiveCardUIMode = useAppStore((state) => state.setActiveCardUIMode);

  const { card, error, isPending } = useCard(cardId);

  return (
    <>
      <LoadableComponent isPending={isPending} animated>
        <MiniCard
          onClick={
            card &&
            (() => {
              setActiveCardUIMode(mode);
              setRealActiveCard(card);
            })
          }
          className={clsx('overflow-hidden', className)}
        >
          {error && error.message}
          {card && (
            <MarkdownRenderComponent
              className="w-3/4 md:w-1/2"
              rawText={card.frontSide}
              extended
            />
          )}
        </MiniCard>
      </LoadableComponent>
    </>
  );
};
