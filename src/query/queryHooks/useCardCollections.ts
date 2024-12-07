import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { CollectionShort, readCardCollectionsCardsCardIdCollectionsGet } from '@/api';
import { CardIdType } from '@/state/slices';

export const getCardCollectionsQueryOptions = (id: CardIdType) =>
  queryOptions({
    queryKey: ['card', id, 'collections'],
    queryFn: () =>
      id === 'new'
        ? []
        : dataExtractionWrapper(
            readCardCollectionsCardsCardIdCollectionsGet({
              path: {
                card_id: id,
              },
            })
          ),
  });

export const useCardCollections = (id: CardIdType) => {
  const { data: cardCollections, ...rest } = useQuery(
    getCardCollectionsQueryOptions(id)
  );

  return { cardCollections, ...rest };
};
