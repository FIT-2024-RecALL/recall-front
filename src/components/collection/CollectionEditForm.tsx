import React from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { navigate } from 'wouter/use-browser-location';

import {
  Button,
  FormItem,
  LoadableComponent,
  Icon,
  DropDown,
} from '@/components/library';
import { useCollection } from '@/query/queryHooks';
import {
  useCollectionDelete,
  useCollectionUpdate,
} from '@/query/mutationHooks';
import { CollectionEditType, collectionScheme } from './CreateCollectionWindow';
import { routes } from '@/routes';

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

  const {
    updateCollection,
    error: saveError,
    isPending: isSavePending,
    isSuccess: isSaveSuccess,
  } = useCollectionUpdate(id);
  const {
    deleteCollection,
    error: deleteError,
    isPending: isDeletePending,
  } = useCollectionDelete(id, () => {
    navigate(routes.collections.getUrl(), { replace: true });
  });

  return (
    <LoadableComponent
      isPending={isCollectionPending}
      errorMessage={collectionError?.message}
    >
      <form
        className="my-2 md:my-6"
        onSubmit={handleSubmit((data) => updateCollection(data))}
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
        <div className="w-full center flex-wrap">
          <Button
            className="mt-2 md:m-2 w-1/2 md:w-fit"
            variant="plate"
            type="submit"
          >
            Save collection
          </Button>
          {(isSavePending || isSaveSuccess) && (
            <div className="mt-1 md:m-2">
              {isSavePending && <Icon className="animate-spin" icon="loader" />}
              {isSaveSuccess && 'Saved'}
            </div>
          )}
          <DropDown
            buttonComponent={
              <Button className="mt-2 md:m-2" variant="bordered-trans">
                Delete collection
              </Button>
            }
          >
            <Button
              className="mt-1 md:mx-2"
              variant="bordered"
              onClick={() => deleteCollection()}
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
