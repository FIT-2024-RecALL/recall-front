import { create, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { createFileSlice } from './slices_types';
import { loggerMiddleware } from './original_state';
import { FileSlice } from './slices_types';

export type SliceApi<T> = { setMutable: (mutator: (s: T) => void) => void };
export type Slice<T> = (
  set: StoreApi<AppState>['setState'],
  get: StoreApi<AppState>['getState'],
  api: StoreApi<AppState> & SliceApi<AppState>
) => T;

export interface AppState extends FileSlice {
  hasBeenReset: boolean;
}

export const useStore = create<AppState>()(
  devtools(
    loggerMiddleware((set, get, api) => {
      const setMutable = (mutator: (draft: AppState) => void) =>
        set(produce(mutator));

      const enrichedApi = { ...api, setMutable };
      return {
        hasBeenReset: true,
        setResetToRead: setMutable(
          (state) => (state.hasBeenReset = state.loadingFiles)
        ),
        ...createFileSlice(set, get, enrichedApi),
      };
    })
  )
);
