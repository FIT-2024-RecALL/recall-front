import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { addFileStoragePost, FileUploadedScheme } from '@/api';
import { getFilesListQueryOptions } from '@/query/queryHooks';

export const useFileUpload = (
  onSuccess?: (response: FileUploadedScheme) => void
) => {
  const queryClient = useQueryClient();

  const { mutate: uploadFile, ...rest } = useMutation({
    mutationFn: (data: File) =>
      dataExtractionWrapper(
        addFileStoragePost({
          body: {
            file: data,
          },
        })
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: getFilesListQueryOptions().queryKey,
      });
      onSuccess?.(response);
    },
  });
  return { uploadFile, ...rest };
};
