import { Immutable } from 'immer';

import { Slice } from '../types';
import { CardType } from './ActiveCardState';

export type TrainState = Immutable<{
  cardsToTrain: CardType[];
  trainedCards: CardType[];
  cardsToTrainInitialCount: number;
  trainedCount: number;
  setTrainCards: (cards: CardType[]) => void;
  executeTrainCard: (cardId: CardType['id']) => void;
}>;

export const createTrainStateSlice: Slice<TrainState> = (mutate) => ({
  cardsToTrain: [],
  trainedCards: [], // Сейчас не используется и не изменяется, но может быть полезно в будущем
  cardsToTrainInitialCount: 0,
  trainedCount: 0,
  setTrainCards: (cards) =>
    mutate((state) => {
      state.cardsToTrain = cards;
      state.trainedCards = [];
      state.cardsToTrainInitialCount = cards.length;
      state.trainedCount = 0;
    }),
  executeTrainCard: (cardId) => {
    mutate((state) => {
      state.cardsToTrain = state.cardsToTrain.filter(
        (card) => card.id !== cardId
      );
      state.trainedCount++;
    });
    console.log(`Card ${cardId} executed`);
  },
});
