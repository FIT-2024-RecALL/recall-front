import React, { HTMLAttributes } from 'react';
import { MiniCard } from './MiniCard';
import { ActiveCardUIModes } from '@/state/slices';
import { useAppStore } from '@/state';
import { useCard } from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';
import clsx from 'clsx';

interface NewCardProps extends HTMLAttributes<React.FC> {}

export const NewCard: React.FC<NewCardProps> = ({ className }) => {
  const setDraftActiveCard = useAppStore((state) => state.setDraftActiveCard);
  const setActiveCardUIMode = useAppStore((state) => state.setActiveCardUIMode);

  return (
    <MiniCard
      previewText="+"
      onClick={() => {
        setActiveCardUIMode('edit');
        setDraftActiveCard();
      }}
      className={clsx('bg-1-4 text-7xl font-normal', className)}
    />
  );
};
