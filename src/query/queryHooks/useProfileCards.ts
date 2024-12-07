import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { readCardsUserCardsGet } from '@/api';

export const getProfileCardsQueryOptions = () =>
  queryOptions({
    queryKey: ['profile', 'cards'],
    queryFn: () => dataExtractionWrapper(readCardsUserCardsGet()),
  });

export const useProfileCards = () => {
  const { data: cards, ...rest } = useQuery(getProfileCardsQueryOptions());

  return { cards, ...rest };
};
