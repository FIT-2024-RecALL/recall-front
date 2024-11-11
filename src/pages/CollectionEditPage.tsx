import { Card } from '@/components/card/Card';
import { CardType } from '@/state/slices';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useParams } from 'wouter';
import { FormItem } from '../components/library/FormItem';
import { z } from 'zod';
import { Button } from '../components/library/Button';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

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

  return (
    <>
      {!collection && <Redirect to="" />}
      <div className="vstack m-2 md:m-10 p-2 md:p-5">
        <h1 className="text-4xl my-2 font-bold">
          Edit collection {collection?.title}
        </h1>
        <form
          className="my-2 md:my-6"
          onSubmit={handleSubmit(saveCollectionData)}
        >
          <FormItem
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2 md:m-4 text-2xl"
            errorMessage={errors.title?.message}
          >
            <label className="md:text-right mr-2" htmlFor="title">
              Title:
            </label>
            <input
              className="bg-1-2 focus:bg-1-3 text-white p-1"
              id="title"
              defaultValue={collection?.title}
              {...register('title', { required: true })}
            />
          </FormItem>
          <FormItem
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2 md:m-4 text-lg"
            errorMessage={errors.description?.message}
          >
            <label className="md:text-right mr-2" htmlFor="description">
              Description:
            </label>
            <textarea
              className="bg-1-2 focus:bg-1-3 text-white p-1"
              id="description"
              defaultValue={collection?.description}
              {...register('description')}
            />
          </FormItem>
          <div className="w-full center">
            <Button variant="plate" type="submit">
              Save collection fields
            </Button>
          </div>
        </form>
        <hr className="border-2 border-1-1 rounded my-2 md:my-6" />
        <h2 className="my-2 text-2xl text-center font-bold">Paired cards</h2>
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
          {collectionCards.map((card) => (
            <Card cardData={card} mode="edit" key={card.id} />
          ))}
        </div>
        <hr className="border border-1-1 rounded my-2 md:my-6" />
        <h2 className="my-2 text-2xl text-center font-bold">All cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {cards.map((card) => (
            <Card cardData={card} mode="edit" key={card.id} />
          ))}
        </div>
      </div>
    </>
  );
};
