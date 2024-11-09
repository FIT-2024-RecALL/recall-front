import { Card } from '@/components/card/Card';
import { CardType } from '@/state/slices';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'wouter';

export type CollectionType = {
  id: number;
  title: string;
  description: string;
};

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
    backSide: '# The second side \n Here will be *answer* \n (Only basic markup is available)',
  };
}

const getCollectionPseudoRequest = async (id: number) => {
  return {
    id: id,
    title: 'Test collection',
    description: 'Just test collection',
  };
};

const getCardsPseudoRequest = async (id: number) => {
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

export interface EditPageParams {
  id: number;
}

export const CollectionEditPage: React.FC = () => {
  const { id } = useParams<EditPageParams>();
  const [collection, setCollection] = useState<CollectionType>();
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    getCollectionPseudoRequest(id).then((collection) =>
      setCollection(collection)
    );
    getCardsPseudoRequest(id).then((cards) => setCards(cards));
  }, [id]);

  return (
    <>
      {!collection && <Redirect to="" />}
      <div className="vstack m-2 md:m-10 p-2 md:p-5 bg-1-8 text-black rounded-md">
        <h1 className="text-4xl my-2 font-bold">Edit collection {id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          <Card
            cardData={{
              id: 'new',
              previewText: '+',
              frontSide: '',
              backSide: '',
            }}
            mode="edit"
            className="bg-gradient-to-r from-1-3/75 to-1-1/75"
          />
          {cards.map((card) => (
            <Card cardData={card} mode="edit" key={card.id} />
          ))}
        </div>
      </div>
    </>
  );
};
