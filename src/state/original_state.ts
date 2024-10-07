import { create, StateCreator } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ObjectTyped, PickFunctions } from '@mordv/utils';
import { shallow } from 'zustand/shallow';
import { App } from '@/App';

export interface AppState {
  counter: number;
  inc(): void;
  dec(): void;
}

type MiddleWare<T> = (
  creator: StateCreator<T>,
  ...args: any
) => StateCreator<T>;

export const loggerMiddleware =
  <T>(stateCreator: StateCreator<T>): StateCreator<T> =>
  (set, ...rest) =>
    stateCreator((state) => {
      console.log(
        `update state: `,
        typeof state === `function` ? `function update` : state
      );
      set(state);
    }, ...rest);

export const useAppStore = create<AppState>()(
  devtools(
    loggerMiddleware((set, get, api) => {
      const setMutable = (mutator: (draft: AppState) => void) =>
        set(produce(mutator));

      return {
        counter: 0,
        inc: () => setMutable((state) => void state.counter++),
        dec: () => setMutable((state) => void state.counter--),
      };
    })
  )
);

export const useActions = (): PickFunctions<AppState> =>
  useAppStore(
    (state: AppState) =>
      Object.fromEntries(
        ObjectTyped.entries(state).filter(
          ([, value]) => typeof value === `function`
        )
      ) as PickFunctions<AppState>,
    shallow
  );
