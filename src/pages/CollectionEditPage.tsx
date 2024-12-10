import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'wouter';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import clsx from 'clsx';

import { Card } from '@/components/card';
import { Button, FormItem } from '@/components/library';

const collectionScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
});
export type CollectionEditType = z.infer<typeof collectionScheme>;

export type CollectionType = CollectionEditType & {
  id: number;
};

const getCollectionPseudoRequest = async (id: number) => {
  return {
    id: id,
    title: 'Test collection',
    description: 'Just test collection',
  };
};

const getCollectionCardsPseudoRequest = async (id: number) => {
  return [0, 1, 2, 3, 4, 5, 6];
};

const getAllCardsPseudoRequest = async () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
};

export interface EditPageParams {
  id: number;
}

export const CollectionEditPage: React.FC = () => {
  const { id } = useParams<EditPageParams>();
  const [collection, setCollection] = useState<CollectionType>();
  const [collectionCardsIds, setCollectionCardsIds] = useState<number[]>([]);
  const [cardsIds, setCardsIds] = useState<number[]>([]);

  useEffect(() => {
    getCollectionPseudoRequest(id).then((collection) =>
      setCollection(collection)
    );
    getCollectionCardsPseudoRequest(id).then((cardsIds) =>
      setCollectionCardsIds(cardsIds)
    );
    getAllCardsPseudoRequest().then((cardsIds) => setCardsIds(cardsIds));
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
        <div
          className="grid gap-x-5 gap-y-1 w-full"
          style={{
            gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
          }}
        >
          <Card
            cardId="new"
            mode="edit"
            className="bg-1-4 text-7xl font-normal"
          />
          {collectionCardsIds.map((cardId) => (
            <Card cardId={cardId} mode="edit" key={cardId} />
          ))}
        </div>

        <hr className="border border-1-1 rounded my-2 md:my-6" />
        <h2 className="my-2 text-2xl text-center font-bold">All cards</h2>
        <div
          className="grid gap-x-5 gap-y-1 w-full"
          style={{
            gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
          }}
        >
          {cardsIds.map((cardId) => (
            <Card cardId={cardId} mode="edit" key={cardId} />
          ))}
        </div>
      </div>
    </>
  );
};
