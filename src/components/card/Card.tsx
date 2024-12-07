import React, { HTMLAttributes } from 'react';
import { MiniCard } from './MiniCard';
import { ActiveCardUIModes, CardIdType } from '@/state/slices';
import { useAppStore } from '@/state';
import { ZoomedCard } from './ZoomedCard';
import { useCard } from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';

interface CardProps extends HTMLAttributes<React.FC> {
  mode: ActiveCardUIModes;
  cardId: CardIdType;
}

export const Card: React.FC<CardProps> = ({ mode, cardId, className }) => {
  const setActiveCard = useAppStore((state) => state.setActiveCard);
  const setActiveCardUIMode = useAppStore((state) => state.setActiveCardUIMode);

  const { card, error, isPending } = useCard(cardId);

  return (
    <>
      <LoadableComponent isPending={isPending}>
        <MiniCard
          previewText={
            error
              ? error.message
              : card?.id === 'new'
              ? '+'
              : `Card ${card?.id}`
          }
          onClick={
            card &&
            (() => {
              setActiveCardUIMode(mode);
              setActiveCard(card);
            })
          }
          className={className}
        />
      </LoadableComponent>
      {card && <ZoomedCard cardId={card.id} />}
    </>
  );
};
