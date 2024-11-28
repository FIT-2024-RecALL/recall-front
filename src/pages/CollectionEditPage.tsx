import { Card } from '@/components/card/Card';
import { CardType } from '@/state/slices';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useParams } from 'wouter';
import { FormItem } from '../components/library/FormItem';
import { z } from 'zod';
import { Button } from '../components/library/Button';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import clsx from 'clsx';

const collectionScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
});
export type CollectionEditType = z.infer<typeof collectionScheme>;

export type CollectionType = CollectionEditType & {
  id: number;
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

const getCollectionCardsPseudoRequest = async (id: number) => {
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

const getAllCardsPseudoRequest = async () => {
  return [
    { ...getCardExample(0) },
    { ...getCardExample(1) },
    { ...getCardExample(2) },
    { ...getCardExample(3) },
    { ...getCardExample(4) },
    { ...getCardExample(5) },
    { ...getCardExample(6) },
    { ...getCardExample(7) },
    { ...getCardExample(8) },
    { ...getCardExample(9) },
    { ...getCardExample(10) },
  ];
};

export interface EditPageParams {
  id: number;
}

export const CollectionEditPage: React.FC = () => {
  const { id } = useParams<EditPageParams>();
  const [collection, setCollection] = useState<CollectionType>();
  const [collectionCards, setCollectionCards] = useState<CardType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    getCollectionPseudoRequest(id).then((collection) =>
      setCollection(collection)
    );
    getCollectionCardsPseudoRequest(id).then((cards) =>
      setCollectionCards(cards)
    );
    getAllCardsPseudoRequest().then((cards) => setCards(cards));
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollectionEditType>({
    resolver: zodResolver(collectionScheme),
  });

  const saveCollectionData = (data: CollectionEditType) => {
    console.log(data);
  };

  if (!collection) return <Redirect to="" />;

  return (
    <>
      <div className="vstack m-2 md:m-10 p-2 md:p-5">
        {/* Collection Edit Form */}
        <form
          className="my-2 md:my-6"
          onSubmit={handleSubmit(saveCollectionData)}
        >
          <FormItem
            className="m-2 md:m-4 text-2xl"
            errorMessage={errors.title?.message}
          >
            <input
              className={clsx(
                'p-1 md:p-2 w-full',
                'text-1-1 font-medium rounded',
                'bg-transparent border-b border-1-1',
                'focus:outline-none focus:border-b-2'
              )}
              placeholder="Title"
              id="title"
              defaultValue={collection?.title}
              {...register('title', { required: true })}
            />
          </FormItem>
          <FormItem
            className="m-2 md:m-4 text-lg"
            errorMessage={errors.description?.message}
          >
            <textarea
              className={clsx(
                'p-1 md:p-2 w-full h-24 lg:h-32',
                'bg-transparent border border-1-1',
                'focus:outline-none focus:border-2',
                'rounded text-black'
              )}
              placeholder="Description"
              id="description"
              defaultValue={collection?.description}
              {...register('description')}
            />
          </FormItem>
          <div className="w-full center">
            <Button variant="plate" type="submit">
              Save collection
            </Button>
          </div>
        </form>

        <hr className="border-2 border-1-1 rounded my-2 md:my-6" />
        <h2 className="my-2 text-2xl text-center font-bold">Paired cards</h2>
        {/* Paired Cards */}
        <div
          className="grid gap-x-5 gap-y-1 w-full"
          style={{
            gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
          }}
        >
          <Card
            cardData={{
              id: 'new',
              previewText: '+',
              frontSide: '',
              backSide: '',
            }}
            mode="edit"
            className="bg-1-4 text-7xl font-normal"
          />
          {collectionCards.map((card) => (
            <Card cardData={card} mode="edit" key={card.id} />
          ))}
        </div>

        <hr className="border border-1-1 rounded my-2 md:my-6" />
        <h2 className="my-2 text-2xl text-center font-bold">All cards</h2>
        {/* All Cards */}
        <div
          className="grid gap-x-5 gap-y-1 w-full"
          style={{
            gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
          }}
        >
          {cards.map((card) => (
            <Card cardData={card} mode="edit" key={card.id} />
          ))}
        </div>
      </div>
    </>
  );
};
