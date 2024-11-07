import { Immutable } from 'immer';

import { Slice } from '@/state';

type CardSides = 'frontSide' | 'backSide';
export type CardType = {
  id: number;
  previewText: string;
  frontSide: string;
  backSide: string;
};

export type ActiveCardState = Immutable<{
  activeCard: CardType;
  setActiveCard: (newCard: CardType) => void;
  setActiveCardSide: (side: CardSides, sideValue: string) => void;
}>;

export const createActiveCardStateSlice: Slice<ActiveCardState> = (mutate, _, get) => ({
  activeCard: {
    id: 0,
    previewText: '',
    frontSide: '',
    backSide: '',
  },
  setActiveCard: (newCard) => {
    mutate((state) => {
      state.activeCard = newCard;
    });
  },
  setActiveCardSide: (side, sideValue) => {
    mutate((state) => {
      state.activeCard[side] = sideValue;
    });
  },
});
