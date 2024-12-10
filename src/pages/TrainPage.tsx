import React, { useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'wouter';
import { useShallow } from 'zustand/react/shallow';

import { useAppStore } from '@/state';
import { routes } from '@/routes';
import { Button, ProgressBar } from '@/components/library';
import { Card } from '@/components/card';
import { CollectionType } from './CollectionEditPage';

const getCollectionPseudoRequest = async (id: number) => {
  return {
    id: id,
    title: 'Test collection',
    description: 'Just test collection',
  };
};

const getTrainCardsPseudoRequest = async (collectionId: number) => {
  return [1, 2, 3, 4, 5, 6, 7];
};

export interface TrainPageParams {
  id: number;
}

export const TrainPage: React.FC = () => {
  const { id } = useParams<TrainPageParams>();
  const [collection, setCollection] = useState<CollectionType>();

  const cardsIds = useAppStore(useShallow((state) => state.cardsToTrainIds));
  const setTrainCards = useAppStore((state) => state.setTrainCards);
  const maxCount = useAppStore((state) => state.cardsToTrainInitialCount);
  const trainedCount = useAppStore((state) => state.trainedCount);

  const requestTrainCards = useCallback(() => {
    getCollectionPseudoRequest(id).then((collection) =>
      setCollection(collection)
    );
    getTrainCardsPseudoRequest(id).then((cards) => setTrainCards(cards));
  }, [id, setTrainCards]);

  useEffect(requestTrainCards, [requestTrainCards]);

  return (
    <>
      {!collection && <Redirect to="" />}
      <div className="vstack m-2 md:m-10 p-2 md:p-5">
        <h1 className="my-2 text-center text-2xl font-bold">
          Trainining {collection?.title}
        </h1>
        {trainedCount < maxCount ? (
          <>
            <ProgressBar
              className="my-4 border-2 text-xl font-medium"
              value={trainedCount}
              minValue={0}
              maxValue={maxCount}
            />
            <hr className="border-2 border-1-1 rounded my-2 md:my-6" />
            <div
              className="grid gap-x-5 gap-y-1 w-full"
              style={{
                gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
              }}
            >
              {cardsIds.slice(0, 6).map((cardId) => (
                <Card cardId={cardId} mode="train" key={cardId} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl my-2">
              Congratulations! Training was completed
            </h2>
            <div className="vstack md:center">
              <Link
                className="my-2 md:m-2 w-fit"
                to={routes.collections.getUrl()}
              >
                <Button className="w-full" variant="plate">
                  Go to collections
                </Button>
              </Link>
              <Button
                className="md:m-2"
                variant="plate"
                onClick={requestTrainCards}
              >
                Train this collection again
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
