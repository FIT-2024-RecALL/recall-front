import React, { useCallback, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { useShallow } from 'zustand/react/shallow';
import { useQueryClient } from '@tanstack/react-query';

import { useAppStore } from '@/state';
import { routes } from '@/routes';
import { Button, LoadableComponent, ProgressBar } from '@/components/library';
import { CardsList } from '@/components/card';
import {
  useCollection,
  useProfile,
  getCollectionTrainCardsQueryOptions,
  useCollectionTrainCards,
} from '@/query/queryHooks';
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

  const client = useQueryClient();
  const refreshTrainCards = useCallback(() => {
    client.invalidateQueries({
      queryKey: getCollectionTrainCardsQueryOptions(id).queryKey,
    });
  }, [client, id]);

  useEffect(() => {
    setTrainCards(cards ?? []);
  }, [cards, setTrainCards]);

  if (!profile)
    return (
      <ErrorPage
        isPending={isCollectionPending || isTrainCardsPending}
        message="Only authorized users can train"
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
        {maxCount === 0 && (
          <>
            <h2 className="text-center text-xl my-2">
              There{"'"}re no cards to train
            </h2>
            <h2 className="text-center text-xl my-2">
              Maybe chill or train other collection?
            </h2>
            <div className="vstack md:center">
              <Link
                className="my-2 md:m-2 w-full md:w-1/3"
                to={routes.collections.getUrl()}
              >
                <Button className="w-full font-medium text-lg" variant="plate">
                  Go to collections
                </Button>
              </Link>
            </div>
          </>
        )}
        {maxCount > 0 && trainedCount >= maxCount && (
          <>
            <h2 className="text-center text-2xl my-2">
              Congratulations! Training was completed
            </h2>
            <div className="xs-md:vstack md:center">
              <Link
                className="w-full md:w-1/4"
                to={routes.collections.getUrl()}
              >
                <Button className="w-full font-medium text-lg" variant="plate">
                  Go to collections
                </Button>
              </Link>
              <Button
                className="my-2 md:m-2 w-full md:w-1/4 font-medium text-lg"
                variant="plate"
                onClick={refreshTrainCards}
              >
                Train this collection again
              </Button>
            </div>
          </>
        )}
        {maxCount > 0 && trainedCount < maxCount && (
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
                onClick={refreshTrainCards}
              >
                Refresh train cards
              </Button>
            </div>
            <hr className="border-2 border-1-1 rounded my-2 md:my-6" />
            <CardsList cardsIds={cardsIds.slice(0, 6)} mode="train" />
          </>
        )}
      </div>
    </LoadableComponent>
  );
};
