import React from 'react';
import { useParams } from 'wouter';
import {
  useCollection,
  useCollectionCards,
  useProfile,
  useProfileCards,
} from '@/query/queryHooks';
import { CollectionEditForm } from '@/components/collection/CollectionEditForm';
import { ErrorPage } from '@/pages';
import { CardsList } from '../components/card/CardsList';
import { LoadableComponent } from '../components/library/LoadableComponent';

export interface EditPageParams {
  id: number;
}

export const CollectionEditPage: React.FC = () => {
  const { id } = useParams<EditPageParams>();
  const { profile } = useProfile();
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
  const {
    cards: profileCardsIds,
    error: profileCardsError,
    isPending: profileCardsPending,
  } = useProfileCards();

  if (!profile || collection?.ownerId !== profile?.id)
    return <ErrorPage message="Prohibited" />;

  return (
    <LoadableComponent
      isPending={isCollectionPending}
      errorMessage={collectionError?.message}
    >
      <div className="vstack m-2 md:m-10 p-2 md:p-5">
        <CollectionEditForm id={id} />

        <hr className="border-2 border-1-1 rounded my-2 md:my-6" />
        <h2 className="my-2 text-2xl text-center font-bold">Paired cards</h2>
        <LoadableComponent
          isPending={collectionCardsPending}
          errorMessage={collectionCardsError?.message}
        >
          <CardsList cardsIds={collectionCardsIds ?? []} mode="edit" />
        </LoadableComponent>
        <hr className="border border-1-1 rounded my-2 md:my-6" />
        <h2 className="my-2 text-2xl text-center font-bold">All cards</h2>
        <LoadableComponent
          isPending={profileCardsPending}
          errorMessage={profileCardsError?.message}
        >
          <CardsList cardsIds={profileCardsIds ?? []} mode="edit" />
        </LoadableComponent>
      </div>
    </LoadableComponent>
  );
};
