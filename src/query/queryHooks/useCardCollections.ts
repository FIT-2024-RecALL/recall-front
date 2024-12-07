import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { readCardCollectionsCardsCardIdCollectionsGet } from '@/api';
import { CardIdType } from '@/state/slices';

export const getCardCollectionsQueryOptions = (
  id: CardIdType,
  defaultCollectionId?: number
) =>
  queryOptions({
    queryKey: ['card', id, 'collections'],
    queryFn: () =>
      id === 'new'
        ? defaultCollectionId === undefined
          ? []
          : [defaultCollectionId]
        : dataExtractionWrapper(
            readCardCollectionsCardsCardIdCollectionsGet({
              path: {
                card_id: id,
              },
            })
          ),
  });

export const useCardCollections = (
  id: CardIdType,
  defaultCollectionId?: number
) => {
  const { data: cardCollections, ...rest } = useQuery(
    getCardCollectionsQueryOptions(id, defaultCollectionId)
  );

  return { cardCollections, ...rest };
};
