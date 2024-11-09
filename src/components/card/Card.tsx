import React, { HTMLAttributes, useState } from 'react';
import { MiniCard } from './MiniCard';
import { CardType } from '@/state/slices';
import { useAppStore } from '@/state';
import { ZoomedCard } from './ZoomedCard';

interface CardProps extends HTMLAttributes<React.FC> {
  mode: 'train' | 'edit';
  cardData: CardType;
}

export const Card: React.FC<CardProps> = ({ mode, cardData, className }) => {
  const [zoomed, setZoomed] = useState(false);
  const setActiveCard = useAppStore((state) => state.setActiveCard);

  return (
    <>
      <MiniCard
        previewText={cardData.previewText}
        onClick={() => {
          setActiveCard(cardData);
          setZoomed(true);
        }}
      />
      <ZoomedCard
        isShown={zoomed}
        close={() => setZoomed(false)}
        mode={mode}
        className={className}
      />
    </>
  );
};
