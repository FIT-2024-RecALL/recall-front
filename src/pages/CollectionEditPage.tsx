import { Card } from '@/components/card/Card';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useParams } from 'wouter';
import { FormItem } from '../components/library/FormItem';
import { z } from 'zod';
import { Button } from '../components/library/Button';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import clsx from 'clsx';
import {
  dataExtractionWrapper,
  useCollection,
  useCollectionCards,
  useProfile,
  useProfileCards,
} from '@/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCollectionCollectionsCollectionIdPut } from '@/api';

const collectionScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
});
export type CollectionEditType = z.infer<typeof collectionScheme>;

export type CollectionType = CollectionEditType & {
  id: number;
};

export interface EditPageParams {
  id: number;
}

export const CollectionEditPage: React.FC = () => {
  const { id } = useParams<EditPageParams>();
  const { profile, error: profileError } = useProfile();
  const { collection, error: collectionError } = useCollection(id);
  const { cards: collectionCardsIds, error: collectionCardsError } =
    useCollectionCards(id);
  const { cards: cardsIds, error: profileCardsError } = useProfileCards();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollectionEditType>({
    resolver: zodResolver(collectionScheme),
  });

  const queryClient = useQueryClient();
  const {
    mutate: saveCollectionData,
    error: saveError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: CollectionEditType) =>
      dataExtractionWrapper(
        updateCollectionCollectionsCollectionIdPut({
          path: {
            collection_id: id,
          },
          body: {
            ...data,
          },
        })
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(['collection', id], data);
    },
  });

  const firstError =
    !collection ||
    collectionError?.message ||
    profileError?.message ||
    collectionCardsError?.message ||
    profileCardsError?.message;

  if (firstError) return <h1>{firstError}</h1>;

  if (collection?.owner_id !== profile?.id) return <h1>Prohibited</h1>;

  return (
    <>
      <div className="vstack m-2 md:m-10 p-2 md:p-5">
        <form
          className="my-2 md:my-6"
          onSubmit={handleSubmit((data) => saveCollectionData(data))}
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
              defaultValue={collection.title}
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
              defaultValue={
                collection.description === null ? '' : collection.description
              }
              {...register('description')}
            />
          </FormItem>
          <FormItem
            className="m-2 md:m-4 text-lg"
            errorMessage={saveError?.message}
          />
          <div className="w-full center">
            <Button variant="plate" type="submit">
              Save collection
            </Button>
            <span className="mx-2">
              {isPending && 'Saving...'}
              {isSuccess && 'Saved'}
            </span>
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
          {collectionCardsIds?.map((cardId) => (
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
          {cardsIds?.map((cardId) => (
            <Card cardId={cardId} mode="edit" key={cardId} />
          ))}
        </div>
      </div>
    </>
  );
};
