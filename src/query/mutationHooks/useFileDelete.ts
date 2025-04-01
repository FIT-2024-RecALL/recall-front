import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getProfileFilesQueryOptions } from '@/query/queryHooks';
import { deleteFileStorageFileIdDelete } from '@/api';

export const useFileDelete = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: deleteFile, ...rest } = useMutation({
    mutationFn: (file_id: number) =>
      dataExtractionWrapper(
        deleteFileStorageFileIdDelete({ path: { file_id } })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProfileFilesQueryOptions().queryKey,
      });
      onSuccess?.();
    },
  });
  return { deleteFile, ...rest };
};
