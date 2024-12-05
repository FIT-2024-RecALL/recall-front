import { Card } from '@/components/card/Card';
import React from 'react';
import { useParams } from 'wouter';
import {
  useCollection,
  useCollectionCards,
  useProfile,
  useProfileCards,
} from '@/query';
import { CollectionEditForm } from '@/components/collection/CollectionEditForm';
import { ErrorPage } from '@/pages';

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

  const firstError =
    collectionError?.message ||
    profileError?.message ||
    collectionCardsError?.message ||
    profileCardsError?.message;

  // if (firstError) return <Redirect to="/" replace />;
  if (firstError) return <ErrorPage message={firstError} />;

  if (collection?.ownerId !== profile?.id)
    return <ErrorPage message="Prohibited" />;

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5">
      <CollectionEditForm id={id} />
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
  );
};
