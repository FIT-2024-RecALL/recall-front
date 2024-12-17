import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { readCollectionsShortUserCollectionsGet } from '@/api';

export const getProfileCollectionsQueryOptions = () =>
  queryOptions({
    queryKey: ['profile', 'collections'],
    queryFn: () =>
      dataExtractionWrapper(readCollectionsShortUserCollectionsGet()),
  });

export const useProfileCollections = () => {
  const { data: collections, ...rest } = useQuery(
    getProfileCollectionsQueryOptions()
  );

  return { collections, ...rest };
};
