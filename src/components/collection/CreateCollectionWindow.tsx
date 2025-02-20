import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { navigate } from 'wouter/use-browser-location';

import { Button, FormItem, Icon, PopUp } from '@/components/library';
import { useAppStore } from '@/state';
import clsx from 'clsx';
import { routes } from '@/routes';
import { useCollectionCreate } from '@/query/mutationHooks';

export const collectionScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
});
export type CollectionEditType = z.infer<typeof collectionScheme>;

export const CreateCollectionWindow: React.FC = () => {
  const isOpened = useAppStore((state) => state.isCreateCollectionWindowOpened);
  const setIsOpened = useAppStore(
    (state) => state.setIsCreateCollectionWindowOpened
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollectionEditType>({
    resolver: zodResolver(collectionScheme),
  });

  const { createCollection, error, isPending } = useCollectionCreate((data) => {
    navigate(routes.collectionEdit.getUrl(data.id), { replace: true });
    setIsOpened(false);
  });

  return (
    <PopUp
      isShown={isOpened}
      close={() => setIsOpened(false)}
      className="bg-1-8/25 backdrop-blur-sm"
    >
      <div className="center">
        <div
          className={clsx(
            'absolute top-1/4 w-3/4',
            'bg-o-white',
            'm-2 p-3 md:w-1/2 lg:w-1/3 h-fit',
            'border border-1-1 rounded-lg'
          )}
        >
          <h2 className="text-xl font-medium text-center">
            Collection{"'"}s creation
          </h2>
          <form onSubmit={handleSubmit((data) => createCollection(data))}>
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
                {...register('description')}
              />
            </FormItem>
            <FormItem
              className="m-2 md:m-4 text-lg"
              errorMessage={error?.message}
            />
            <div className="w-full center">
              <Button variant="plate" type="submit">
                Create
              </Button>
              {isPending && (
                <div className="mx-2">
                  <Icon className="animate-spin" icon="loader" />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </PopUp>
  );
};
