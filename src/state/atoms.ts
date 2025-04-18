import { atomWithStorage } from 'jotai/utils';

import { EditorElementState } from '@/components/editor/editorElementTypes';

export const frontAtom = atomWithStorage<EditorElementState[]>(
  'editor-history-front',
  []
);
export const backAtom = atomWithStorage<EditorElementState[]>(
  'editor-history-back',
  []
);
