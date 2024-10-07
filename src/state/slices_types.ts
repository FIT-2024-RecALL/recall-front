import { Slice } from './slices';

export interface FileSlice {
  loadingFiles: boolean;
  toggleLoadingFiles(): void;
}

export const createFileSlice: Slice<FileSlice> = (set, get, { setMutable }) => {
  return {
    loadingFiles: false,
    toggleLoadingFiles: () =>
      set((state: FileSlice) => ({ loadingFiles: !state.loadingFiles })),
  }}