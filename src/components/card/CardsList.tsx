import React, { HTMLAttributes } from 'react';
import { Card } from './Card';
import { ActiveCardUIModes } from '@/state/slices';
import clsx from 'clsx';
import { NewCard } from './NewCard';

export interface CardsListProps extends HTMLAttributes<React.FC> {
  cardsIds: number[];
  addNewCard?: boolean;
  mode: ActiveCardUIModes;
}

export const CardsList: React.FC<CardsListProps> = ({
  cardsIds,
  addNewCard,
  mode,
  className,
}) => {
  return (
    <div
      className={clsx('grid gap-x-5 gap-y-3 w-full', className)}
      style={{
        gridTemplateColumns: 'repeat( auto-fit, minmax(280px, 1fr) )',
      }}
    >
      {addNewCard && <NewCard />}
      {cardsIds.map((cardId) => (
        <Card cardId={cardId} mode={mode} key={cardId} />
      ))}
    </div>
  );
};
