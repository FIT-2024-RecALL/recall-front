import React, { HTMLAttributes } from 'react';
import { MiniCard } from './visuals';
import { useAppStore } from '@/state';
import clsx from 'clsx';

interface NewCardProps extends HTMLAttributes<React.FC> {}

export const NewCard: React.FC<NewCardProps> = ({ className }) => {
  const setDraftActiveCard = useAppStore((state) => state.setDraftActiveCard);
  const setActiveCardUIMode = useAppStore((state) => state.setActiveCardUIMode);

  return (
    <MiniCard
      onClick={() => {
        setActiveCardUIMode('edit');
        setDraftActiveCard();
      }}
      className={clsx('bg-1-4 text-7xl font-normal', className)}
    >
      <h2>+</h2>
    </MiniCard>
  );
};
