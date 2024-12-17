import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { listFilesStorageGet } from '@/api';
import { serverUrl } from '@/main';

export const getFileFullPath = (filePath: string) => serverUrl + filePath;

export const getFilesListQueryOptions = () =>
  queryOptions({
    queryKey: ['files'],
    queryFn: () => dataExtractionWrapper(listFilesStorageGet()),
  });

export const useFilesList = () => {
  const { data: files, ...rest } = useQuery(getFilesListQueryOptions());

  return { files, ...rest };
};
