import { Immutable } from 'immer';

import { Slice } from '@/state';
import { Card } from '@/api';

export type CardSides = 'frontSide' | 'backSide';
export type CardStateType = {
  frontSide: string;
  backSide: string;
};

export type ActiveCardUIModes = 'train' | 'edit';
export type ActiveCardUIFlagKeys = 'zoomed' | 'flipped';
export type ActiveCardUI = {
  mode: ActiveCardUIModes;
  zoomed: boolean;
  flipped: boolean;
};

export type ActiveCardState = Immutable<{
  activeCardId: number;
  isNewActiveCard: boolean;
  activeCard: CardStateType;
  activeCardUI: ActiveCardUI;
  setDraftActiveCard: () => void;
  setRealActiveCard: (card: Card) => void;
  setActiveCardSide: (side: CardSides, sideValue: string) => void;
  setActiveCardUIMode: (mode: ActiveCardUIModes) => void;
  setActiveCardUIFlag: (
    flagKey: ActiveCardUIFlagKeys,
    flagMutator: (oldValue: boolean) => boolean
  ) => void;
}>;

export const cardDraft: CardStateType = {
  frontSide: '',
  backSide: '',
};

export const createActiveCardStateSlice: Slice<ActiveCardState> = (mutate) => ({
  activeCardId: -1,
  isNewActiveCard: false,
  activeCard: {
    frontSide: '',
    backSide: '',
  },
  activeCardUI: {
    mode: 'edit',
    zoomed: false,
    flipped: false,
    editActive: false,
  },
  setDraftActiveCard: () => {
    mutate((state) => {
      state.activeCard = cardDraft;
      state.activeCardId = -1;
      state.isNewActiveCard = true;
    });
  },
  setRealActiveCard: (card) => {
    mutate((state) => {
      state.activeCard = {
        frontSide: card.frontSide,
        backSide: card.backSide,
      };
      state.activeCardId = card.id;
      state.isNewActiveCard = false;
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
        zoomed: true,
        flipped: false,
      };
    });
  },
  setActiveCardUIFlag: (flagKey, flagMutator) => {
    mutate((state) => {
      state.activeCardUI[flagKey] = flagMutator(state.activeCardUI[flagKey]);
    });
  },
});
