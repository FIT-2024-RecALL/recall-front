import React, { HTMLAttributes, useEffect, useState } from 'react';
import { MiniCard } from './MiniCard';
import { CardType, ActiveCardUIModes } from '@/state/slices';
import { useAppStore } from '@/state';
import { ZoomedCard } from './ZoomedCard';
import { match } from 'ts-pattern';
import { number } from 'zod';

const newcardDraft: CardType = {
  id: 'new',
  previewText: `+`,
  frontSide: '',
  backSide: '',
};

const getCardPseudoRequest = async (id: number) => {
  return {
    id: id,
    previewText: `Card ${id}`,
    frontSide:
      '# The first side \n Here will be **question** \n ' +
      'Photos: ![Cat photo](https://avatars.mds.yandex.net/i?id=76dd9d5c1922688236a4dca063bc3c2ce3dafd22-5283663-images-thumbs&n=13)' +
      'audios: ![Bip sound](https://sanstv.ru/test/audio/test.wav)' +
      'and videos: ![Waterfall video](https://tekeye.uk/html/images/Joren_Falls_Izu_Jap.mp4)' +
      'are available! \n ' +
      'And also $LaTeX$...',
    backSide:
      '# The second side \n Here will be *answer* \n (Only basic markup is available)',
  };
};

interface CardProps extends HTMLAttributes<React.FC> {
  mode: ActiveCardUIModes;
  cardId: number | 'new';
}

export const Card: React.FC<CardProps> = ({ mode, cardId, className }) => {
  const setActiveCard = useAppStore((state) => state.setActiveCard);
  const setActiveCardUIMode = useAppStore((state) => state.setActiveCardUIMode);

  const [cardData, setCardData] = useState<CardType>();

  useEffect(() => {
    if (cardId === 'new') setCardData(newcardDraft);
    else
      getCardPseudoRequest(cardId).then((cardData) => {
        setCardData(cardData);
      });
  }, [cardId]);

  return (
    <>
      {cardData ? (
        <MiniCard
          previewText={cardData.previewText}
          onClick={() => {
            setActiveCardUIMode(mode);
            setActiveCard(cardData);
          }}
          className={className}
        />
      ) : (
        <MiniCard previewText="Card not found" className={className} />
      )}
      {cardData && <ZoomedCard cardData={cardData} />}
    </>
  );
};
