import { create, StateCreator, StoreApi } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';
import { ObjectTyped, PickFunctions } from '@mordv/utils';
import { shallow } from 'zustand/shallow';

export interface AppState {
  counter: number;
  inc(): void;
  dec(): void;
}

export const useAppStore = create<AppState>((set) => ({
  counter: 0,
  inc: () =>
    set(
      produce((state: AppState) => {
        state.counter++;
      })
    ),
  dec: () =>
    set(
      produce((state: AppState) => {
        state.counter--;
      })
    ),
}));
