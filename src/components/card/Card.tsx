import React, { HTMLAttributes } from 'react';
import { MiniCard } from './MiniCard';
import { ActiveCardUIModes } from '@/state/slices';
import { useAppStore } from '@/state';
import { useCard } from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';

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
          previewText={error ? error.message : `Card ${card?.id}`}
          onClick={
            card &&
            (() => {
              setActiveCardUIMode(mode);
              setRealActiveCard(card);
            })
          }
          className={className}
        />
      </LoadableComponent>
    </>
  );
};
