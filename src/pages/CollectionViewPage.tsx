import React from 'react';
import { useParams } from 'wouter';
import {
  useCollection,
  useCollectionCards,
  useProfile,
  useProfileCards,
} from '@/query/queryHooks';
import { CardsList } from '@/components/card';
import { LoadableComponent } from '@/components/library';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export interface ViewPageParams {
  id: number;
}

export const CollectionViewPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<ViewPageParams>();
  const {
    collection,
    error: collectionError,
    isPending: isCollectionPending,
  } = useCollection(id);
  const {
    cards: collectionCardsIds,
    error: collectionCardsError,
    isPending: collectionCardsPending,
  } = useCollectionCards(id);

  return (
    <LoadableComponent
      isPending={isCollectionPending}
      errorMessage={collectionError?.message}
    >
      <div className="vstack">
        <h1
          className={clsx(
            'm-2 md:m-4',
            'text-center font-black',
            'text-lg md:text-xl lg:text-2xl xl:text-4xl'
          )}
        >
          {collection?.title}
        </h1>
        {collection?.description && (
          <p
            className={clsx(
              'mt-2 md:mt-4 mb-4 md:mb-8',
              'text-center text-o-black font-medium',
              'text-base md:text-lg lg:text-xl xl:text-3xl'
            )}
          >
            {collection.description}
          </p>
        )}

        <LoadableComponent
          isPending={collectionCardsPending}
          errorMessage={collectionCardsError?.message}
        >
          <CardsList cardsIds={collectionCardsIds ?? []} mode="view" />
        </LoadableComponent>
      </div>
    </LoadableComponent>
  );
};
