import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { Mutator } from './types';
import {
  ActiveCardState,
  AuthWindowState,
  createActiveCardStateSlice,
  createAuthWindowStateSlice,
} from './slices';
import { createTrainStateSlice, TrainState } from './slices/TrainState';

type StoreType = AuthWindowState & ActiveCardState & TrainState;

export const useAppStore = create<StoreType>()(
  devtools((set, ...rest) => {
    const mutate: Mutator<StoreType> = (mutator) => set(produce(mutator));

    return {
      ...createAuthWindowStateSlice(mutate, set, ...rest),
      ...createActiveCardStateSlice(mutate, set, ...rest),
      ...createTrainStateSlice(mutate, set, ...rest),
    };
  })
);
