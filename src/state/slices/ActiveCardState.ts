import { Immutable } from 'immer';

import { Slice } from '@/state';

export type CardSides = 'frontSide' | 'backSide';
export type NewCardPseudoId = 'new';
export type CardIdType = number | NewCardPseudoId;
export type CardType = {
  id: CardIdType;
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

export const newCardDraft: CardType = {
  id: 'new',
  frontSide: '',
  backSide: '',
};

export const createActiveCardStateSlice: Slice<ActiveCardState> = (mutate) => ({
  activeCard: {
    id: 0,
    previewText: '',
    frontSide: '',
    backSide: '',
  },
  activeCardUI: {
    mode: 'edit',
    zoomed: false,
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
