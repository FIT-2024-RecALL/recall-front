import React from 'react';
import clsx from 'clsx';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { dataExtractionWrapper, useCollection, useProfile } from '@/query';
import { updateCollectionCollectionsCollectionIdPut } from '@/api';

const collectionScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
});
export type CollectionEditType = z.infer<typeof collectionScheme>;

export type CollectionType = CollectionEditType & {
  id: number;
};

export interface CollectionEditFormProps {
  id: number;
}

export const CollectionEditForm: React.FC<CollectionEditFormProps> = ({
  id,
}) => {
  const { profile, error: profileError } = useProfile();
  const { collection, error: collectionError } = useCollection(id);

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

  const firstError = collectionError?.message || profileError?.message;

  if (firstError) return <h1>{firstError}</h1>;

  if (collection?.ownerId !== profile?.id) return <h1>Prohibited</h1>;

  return (
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
          // Тут возникают траблы из-за нереактивности и
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
          defaultValue={
            collection?.description === null ? '' : collection?.description
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
  );
};
