import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { Mutator } from './types';
import {
  ActiveCardState,
  UIState,
  createActiveCardStateSlice,
  createUIStateSlice,
} from './slices';

type StoreType = UIState & ActiveCardState;

export const useAppStore = create<StoreType>()(
  devtools((set, ...rest) => {
    const mutate: Mutator<StoreType> = (mutator) => set(produce(mutator));

    return {
      ...createUIStateSlice(mutate, set, ...rest),
      ...createActiveCardStateSlice(mutate, set, ...rest),
    };
  })
);
