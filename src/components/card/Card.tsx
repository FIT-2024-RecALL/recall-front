import React, { HTMLAttributes, useState } from 'react';
import { MiniCard } from './MiniCard';
import { CardType, ActiveCardUIModes } from '@/state/slices';
import { useAppStore } from '@/state';
import { ZoomedCard } from './ZoomedCard';

interface CardProps extends HTMLAttributes<React.FC> {
  mode: ActiveCardUIModes;
  cardData: CardType;
}

export const Card: React.FC<CardProps> = ({ mode, cardData, className }) => {
  const [zoomed, setZoomed] = useState(false);
  const setActiveCard = useAppStore((state) => state.setActiveCard);
  const setActiveCardUIMode = useAppStore((state) => state.setActiveCardUIMode);

  return (
    <>
      <MiniCard
        previewText={cardData.previewText}
        onClick={() => {
          setActiveCardUIMode(mode);
          setActiveCard(cardData);
          setZoomed(true);
        }}
      />
      <ZoomedCard
        isShown={zoomed}
        close={() => setZoomed(false)}
        className={className}
      />
    </>
  );
};
