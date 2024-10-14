import { create, StateCreator, StoreApi } from 'zustand';
import { produce, Immutable, Draft } from 'immer';
import { devtools } from 'zustand/middleware';

type UIState = Immutable<{
  loginWindowShown: boolean;
  toggleLoginWindow: () => void;
}>;

const createUIStateSlice: StateCreator<UIState, [], [], UIState> = (set) => {
  return {
    loginWindowShown: false,
    toggleLoginWindow: () => {
      set(
        produce((state: Draft<UIState>) => {
          state.loginWindowShown = !state.loginWindowShown;
        })
      );
    },
  }
}

type StoreType = UIState; // Will be extended

export const useAppStore = create<StoreType>()((...a) => ({
  ...createUIStateSlice(...a),
}));
