import { Immutable } from 'immer';

import { Slice } from '../types';
import { CardType } from './ActiveCardState';

export type TrainState = Immutable<{
  trainCards: CardType[];
  trainedCount: number;
  setTrainCards: (cards: CardType[]) => void;
  executeTrainCard: (cardId: number) => void;
}>;

export const createTrainStateSlice: Slice<TrainState> = (mutate) => ({
  trainCards: [],
  trainedCount: 0,
  setTrainCards: (cards) =>
    mutate((state) => {
      state.trainCards = cards;
      state.trainedCount = 0;
    }),
  executeTrainCard: (cardId) => {
    mutate((state) => {
      state.trainCards.filter((card) => card.id !== cardId);
      state.trainedCount--;
    });
    console.log(`Card ${cardId} executed`);
  },
});
