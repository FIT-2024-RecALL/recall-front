import React from 'react';
import clsx from 'clsx';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { navigate } from 'wouter/use-browser-location';
import { useTranslation } from 'react-i18next';

import {
  Button,
  FormItem,
  LoadableComponent,
  Icon,
  DropDown,
  Input,
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
  const { t } = useTranslation();
  const {
    collection,
    error: collectionError,
    isPending: isCollectionPending,
  } = useCollection(id);

  const {
    register,
    control,
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
            <Controller
              name="title"
              control={control}
              defaultValue={collection.title}
              render={({ field }) => (
                <Input
                  className="text-center"
                  placeholder={t('collection.titlePlaceholder')}
                  id="title"
                  {...field}
                />
              )}
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
                'p-1 md:p-2 w-full text-center',
                'bg-transparent resize-none',
                'focus:outline-none',
                'transition-all duration-200',
                'hover:shadow-inner hover:shadow-neutral-400',
                'focus:shadow-inner hover:shadow-neutral-400',
                'rounded text-o-black'
              )}
              placeholder={t('collection.descriptionPlaceholder')}
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
        <div className="w-full xs-md:vstack center flex-wrap">
          <Button
            variant="plate-green"
            type="submit"
            withShadow
            shadowBoxClassName="mt-2 md:m-2 w-1/2 md:w-fit"
            title={t('common.saveChanges')}
          >
            {t('common.saveChanges')}
          </Button>
          {(isSavePending || isSaveSuccess) && (
            <div className="mt-1 md:m-2">
              {isSavePending && <Icon className="animate-spin" icon="loader" />}
              {isSaveSuccess && t('common.saved')}
            </div>
          )}
          <DropDown
            buttonComponent={
              <Button
                className="mt-2 md:m-2"
                variant="bordered"
                title={t('collection.deleteButton')}
              >
                {t('collection.deleteButton')}
              </Button>
            }
          >
            <Button
              className="mt-1 md:mx-2"
              variant="plate-red"
              onClick={() => deleteCollection()}
              title={t('common.confirmDeletion')}
            >
              {t('common.confirmDeletion')}
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
