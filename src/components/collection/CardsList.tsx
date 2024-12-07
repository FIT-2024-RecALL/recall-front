import React, { HTMLAttributes } from 'react';
import { Card } from '@/components/card';
import { ActiveCardUIModes } from '@/state/slices';
import clsx from 'clsx';

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
      className={clsx('grid gap-x-5 gap-y-1 w-full', className)}
      style={{
        gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
      }}
    >
      {addNewCard && (
        <Card
          cardId="new"
          mode="edit"
          className="bg-1-4 text-7xl font-normal"
        />
      )}
      {cardsIds.map((cardId) => (
        <Card cardId={cardId} mode={mode} key={cardId} />
      ))}
    </div>
  );
};
