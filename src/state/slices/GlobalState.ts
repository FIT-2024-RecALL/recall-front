import { Immutable } from 'immer';

import { Slice } from '@/state';

export type GlobalState = Immutable<{
  globalScrollEnabled: boolean;
  enableGlobalScroll: () => void;
  disableGlobalScroll: () => void;
}>;

export const createGlobalStateSlice: Slice<GlobalState> = (mutate) => ({
  globalScrollEnabled: true,
  enableGlobalScroll: () => {
    mutate((state) => {
      state.globalScrollEnabled = true;
    });
  },
  disableGlobalScroll: () => {
    mutate((state) => {
      state.globalScrollEnabled = false;
    });
  },
});
