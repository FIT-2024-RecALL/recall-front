import React, { useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'wouter';
import { useShallow } from 'zustand/react/shallow';

import { useAppStore } from '@/state';
import { routes } from '@/routes';
import { Button, LoadableComponent, ProgressBar } from '@/components/library';
import { CardsList } from '@/components/card';
import { useCollectionTrainCards } from '@/query/queryHooks/useCollectionTrainCards';
import { useCollection, useProfile } from '@/query/queryHooks';
import { ErrorPage } from './ErrorPage';

export interface TrainPageParams {
  id: number;
}

export const TrainPage: React.FC = () => {
  const { id } = useParams<TrainPageParams>();

  const { profile } = useProfile();
  const {
    collection,
    isPending: isCollectionPending,
    error: collectionError,
  } = useCollection(id);
  const {
    cards,
    isPending: isTrainCardsPending,
    error: trainCardsError,
  } = useCollectionTrainCards(id);

  const cardsIds = useAppStore(useShallow((state) => state.cardsToTrainIds));
  const setTrainCards = useAppStore((state) => state.setTrainCards);
  const maxCount = useAppStore((state) => state.cardsToTrainInitialCount);
  const trainedCount = useAppStore((state) => state.trainedCount);

  const setNewTrainCards = useCallback(() => {
    // if (trainedCount >= maxCount && cards) setTrainCards(cards);
    setTrainCards(cards ?? []);
  }, [cards, setTrainCards]);

  useEffect(() => {
    setNewTrainCards();
  }, [setNewTrainCards]);

  if (!profile)
    return (
      <ErrorPage
        isPending={isCollectionPending || isTrainCardsPending}
        message="Only authorized user can train"
      />
    );

  return (
    <LoadableComponent
      isPending={isCollectionPending || isTrainCardsPending}
      errorMessage={collectionError?.message || trainCardsError?.message}
      animated
    >
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
            <div className="center">
              <Button
                className="p-4 text-lg"
                variant="plate"
                onClick={setNewTrainCards}
              >
                Refresh train cards
              </Button>
            </div>
            <hr className="border-2 border-1-1 rounded my-2 md:my-6" />
            <CardsList cardsIds={cardsIds.slice(0, 6)} mode="train" />
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
                onClick={setNewTrainCards}
              >
                Train this collection again
              </Button>
            </div>
          </>
        )}
      </div>
    </LoadableComponent>
  );
};
