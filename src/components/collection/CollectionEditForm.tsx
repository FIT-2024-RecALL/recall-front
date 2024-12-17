import React from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  Button,
  FormItem,
  LoadableComponent,
  Icon,
} from '@/components/library';
import { dataExtractionWrapper } from '@/query';
import { getCollectionQueryOptions, useCollection } from '@/query/queryHooks';
import {
  deleteCollectionCollectionsCollectionIdDelete,
  updateCollectionCollectionsCollectionIdPut,
} from '@/api';
import { CollectionEditType, collectionScheme } from './CreateCollectionWindow';
import { navigate } from 'wouter/use-browser-location';
import { routes } from '@/routes';
import { DropDown } from '../library/DropDown';

export type CollectionType = CollectionEditType & {
  id: number;
};

export interface CollectionEditFormProps {
  id: number;
}

export const CollectionEditForm: React.FC<CollectionEditFormProps> = ({
  id,
}) => {
  const {
    collection,
    error: collectionError,
    isPending: isCollectionPending,
  } = useCollection(id);

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
    isPending: isSavePending,
    isSuccess: isSaveSuccess,
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
      queryClient.setQueryData(getCollectionQueryOptions(id).queryKey, data);
    },
  });
  const {
    mutate: deleteCollection,
    error: deleteError,
    isPending: isDeletePending,
  } = useMutation({
    mutationFn: (id: number) =>
      dataExtractionWrapper(
        deleteCollectionCollectionsCollectionIdDelete({
          path: {
            collection_id: id,
          },
        })
      ),
    onSuccess: (data, id) => {
      queryClient.resetQueries({
        queryKey: getCollectionQueryOptions(id).queryKey,
      });
      navigate(routes.collections.getUrl(), { replace: true });
    },
  });

  return (
    <LoadableComponent
      isPending={isCollectionPending}
      errorMessage={collectionError?.message}
    >
      <form
        className="my-2 md:my-6"
        onSubmit={handleSubmit((data) => saveCollectionData(data))}
      >
        <FormItem
          className="m-2 md:m-4 text-2xl"
          errorMessage={errors.title?.message}
        >
          {collection && (
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
          )}
        </FormItem>
        <FormItem
          className="m-2 md:m-4 text-lg"
          errorMessage={errors.description?.message}
        >
          {collection && (
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
          )}
        </FormItem>
        <FormItem
          className="m-2 md:m-4 text-lg"
          errorMessage={saveError?.message || deleteError?.message}
        />
        <div className="w-full center">
          <Button className="mx-3" variant="plate" type="submit">
            Save collection
          </Button>
          {(isSavePending || isSaveSuccess) && (
            <div className="mx-2">
              {isSavePending && <Icon className="animate-spin" icon="loader" />}
              {isSaveSuccess && 'Saved'}
            </div>
          )}
          <DropDown
            buttonComponent={
              <Button className="mx-3" variant="bordered-trans">
                Delete collection
              </Button>
            }
          >
            <Button
              className="m-3"
              variant="bordered"
              onClick={() => deleteCollection(id)}
            >
              Confirm deletion
            </Button>
            {isDeletePending && (
              <div className="mx-2">
                <Icon className="animate-spin" icon="loading-3/4" />
              </div>
            )}
          </DropDown>
        </div>
      </form>
    </LoadableComponent>
  );
};
