import { Immutable, Draft } from 'immer';

import { Slice } from '@/state';

export type UIState = Immutable<{
  loginWindowShown: boolean;
  toggleLoginWindow: () => void;
  openLoginWindow: () => void;
  closeLoginWindow: () => void;
}>;

export const createUIStateSlice: Slice<UIState> = (mutate) => {
  return {
    loginWindowShown: false,
    toggleLoginWindow: () => {
      mutate((state) => {
        state.loginWindowShown = !state.loginWindowShown;
      });
    },
    openLoginWindow: () => {
      mutate((state: Draft<UIState>) => {
        state.loginWindowShown = true;
      });
    },
    closeLoginWindow: () => {
      mutate((state: Draft<UIState>) => {
        state.loginWindowShown = false;
      });
    },
  };
};
