import { Immutable } from 'immer';

import { Slice } from '@/state';

export type CardSides = 'frontSide' | 'backSide';
export type CardType = {
  id: number | 'new';
  previewText: string;
  frontSide: string;
  backSide: string;
};

export type ActiveCardUIModes = 'train' | 'edit';
export type ActiveCardUIFlagKeys = 'flipped' | 'editActive';
export type ActiveCardUI = {
  mode: ActiveCardUIModes;
  flipped: boolean;
  editActive: boolean;
};

export type ActiveCardState = Immutable<{
  activeCard: CardType;
  activeCardUI: ActiveCardUI;
  setActiveCard: (newCard: CardType) => void;
  setActiveCardSide: (side: CardSides, sideValue: string) => void;
  setActiveCardUIMode: (mode: ActiveCardUIModes) => void;
  setActiveCardUIFlag: (
    flagKey: ActiveCardUIFlagKeys,
    flagMutator: (oldValue: boolean) => boolean
  ) => void;
}>;

export const createActiveCardStateSlice: Slice<ActiveCardState> = (mutate) => ({
  activeCard: {
    id: 0,
    previewText: '',
    frontSide: '',
    backSide: '',
  },
  activeCardUI: {
    mode: 'edit',
    flipped: false,
    editActive: false,
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
  setActiveCardUIMode: (mode) => {
    mutate((state) => {
      state.activeCardUI = {
        mode: mode,
        flipped: false,
        editActive: mode == 'edit',
      };
    });
  },
  setActiveCardUIFlag: (flagKey, flagMutator) => {
    mutate((state) => {
      state.activeCardUI[flagKey] = flagMutator(state.activeCardUI[flagKey]);
    });
  },
});
