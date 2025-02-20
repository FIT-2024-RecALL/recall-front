import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getFilesListQueryOptions } from '@/query/queryHooks';
import { deleteFileStorageFilenameDelete } from '@/api';

export const useFileDelete = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: deleteFile, ...rest } = useMutation({
    mutationFn: (filename: string) =>
      dataExtractionWrapper(
        deleteFileStorageFilenameDelete({ path: { filename } })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getFilesListQueryOptions().queryKey,
      });
      onSuccess?.();
    },
  });
  return { deleteFile, ...rest };
};
