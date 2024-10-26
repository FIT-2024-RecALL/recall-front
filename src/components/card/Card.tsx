import React, { HTMLAttributes, useState } from 'react';
import { MiniCard } from './MiniCard';
import { FlippingCard } from './FlippingCard';

interface CardProps extends HTMLAttributes<React.FC> {
  mode: 'train' | 'edit';
}

export const Card: React.FC<CardProps> = ({ mode, className }) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <MiniCard previewText="Card preview" onClick={() => setZoomed(true)} />
      <FlippingCard
        isShown={zoomed}
        close={() => setZoomed(false)}
        mode={mode}
        className={className}
      />
    </>
  );
};
