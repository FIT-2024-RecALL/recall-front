import { Card } from '@/components/card/Card';
import { CardType } from '@/state/slices';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'wouter';
import { Button } from '../components/library/Button';
import clsx from 'clsx';
import { CollectionType } from './CollectionEditPage';

function getCardExample(id: number): CardType {
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
}

const getCollectionPseudoRequest = async (id: number) => {
  return {
    id: id,
    title: 'Test collection',
    description: 'Just test collection',
  };
};

const getTrainCardsPseudoRequest = async (collectionId: number) => {
  return [
    { ...getCardExample(0) },
    { ...getCardExample(1) },
    { ...getCardExample(2) },
    { ...getCardExample(3) },
    { ...getCardExample(4) },
    { ...getCardExample(5) },
    { ...getCardExample(6) },
  ];
};

export interface TrainPageParams {
  id: number;
}

export const TrainPage: React.FC = () => {
  const { id } = useParams<TrainPageParams>();
  const [collection, setCollection] = useState<CollectionType>();
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    getCollectionPseudoRequest(id).then((collection) =>
      setCollection(collection)
    );
    getTrainCardsPseudoRequest(id).then((cards) => setCards(cards));
  }, [id]);

  return (
    <>
      {!collection && <Redirect to="" />}
      <div className="vstack m-2 md:m-10 p-2 md:p-5">
        <h1 className="text-center text-2xl font-bold">
          Trainining {collection?.title}
        </h1>
        <hr className="border-2 border-1-1 rounded my-2 md:my-6" />
        <div
          className="grid gap-x-5 gap-y-1 w-full"
          style={{
            gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
          }}
        >
          {cards.map((card) => (
            <Card cardData={card} mode="train" key={card.id} />
          ))}
        </div>
      </div>
    </>
  );
};
