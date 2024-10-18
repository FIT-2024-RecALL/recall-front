import { Immutable } from 'immer';

import { Slice } from '@/state';

export type UIState = Immutable<{
  loginWindowShown: boolean;
  toggleLoginWindow: () => void;
  openLoginWindow: () => void;
  closeLoginWindow: () => void;

  registerFormShown: boolean;
  toggleRegisterForm: () => void;
  showRegisterForm: () => void;
  hideRegisterForm: () => void;
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
      mutate((state) => {
        state.loginWindowShown = true;
      });
    },
    closeLoginWindow: () => {
      mutate((state) => {
        state.loginWindowShown = false;
      });
    },

    registerFormShown: false,
    toggleRegisterForm: () => {
      mutate((state) => {
        state.registerFormShown = !state.registerFormShown;
      });
    },
    showRegisterForm: () => {
      mutate((state) => {
        state.registerFormShown = true;
      });
    },
    hideRegisterForm: () => {
      mutate((state) => {
        state.registerFormShown = false;
      });
    },
  };
};
