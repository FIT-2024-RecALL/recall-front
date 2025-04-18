import { atom, useAtomValue, useSetAtom, WritableAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { useMemo } from 'react';

export type StoredAtom<T> = WritableAtom<
  T,
  [T | typeof RESET | ((prev: T) => T | typeof RESET)],
  void
>;

export const useStoredStack = <T>(editorStatesAtom: StoredAtom<T[]>) => {
  const previousStateAtom = useMemo(
    () =>
      atom((get) => {
        const arr = get(editorStatesAtom);
        if (arr.length == 0) return undefined;
        return arr[arr.length - 1];
      }),
    [editorStatesAtom]
  );
  const canUndoAtom = useMemo(
    () => atom((get) => get(editorStatesAtom).length > 0),
    [editorStatesAtom]
  );
  const pushAtom = useMemo(
    () =>
      atom(null, (get, set, value: T) => {
        set(editorStatesAtom, (draft) => [...draft, value]);
      }),
    [editorStatesAtom]
  );
  const popAtom = useMemo(
    () =>
      atom(null, (get, set) => {
        set(editorStatesAtom, (draft) => {
          draft.pop();
          return [...draft];
        });
      }),
    [editorStatesAtom]
  );
  const resetAtom = useMemo(
    () =>
      atom(null, (get, set) => {
        console.log(get(editorStatesAtom));
        set(editorStatesAtom, RESET);
      }),
    [editorStatesAtom]
  );

  const state = useAtomValue(previousStateAtom);
  const canPop = useAtomValue(canUndoAtom);
  const push = useSetAtom(pushAtom);
  const pop = useSetAtom(popAtom);
  const reset = useSetAtom(resetAtom);

  return { state, canPop, push, pop, reset };
};
