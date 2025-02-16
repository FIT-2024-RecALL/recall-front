import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { Mutator } from './types';
import {
  ActiveCardState,
  AuthWindowState,
  createActiveCardStateSlice,
  createAuthWindowStateSlice,
  CreateCollectionState,
  createCreateCollectionState,
  createGlobalStateSlice,
  GlobalState,
} from './slices';
import { createTrainStateSlice, TrainState } from './slices/TrainState';

type StoreType = GlobalState &
  AuthWindowState &
  ActiveCardState &
  TrainState &
  CreateCollectionState;

export const useAppStore = create<StoreType>()(
  devtools((set, ...rest) => {
    const mutate: Mutator<StoreType> = (mutator) => set(produce(mutator));

    return {
      ...createGlobalStateSlice(mutate, set, ...rest),
      ...createAuthWindowStateSlice(mutate, set, ...rest),
      ...createActiveCardStateSlice(mutate, set, ...rest),
      ...createTrainStateSlice(mutate, set, ...rest),
      ...createCreateCollectionState(mutate, set, ...rest),
    };
  })
);
