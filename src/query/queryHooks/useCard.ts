import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { readCardCardsCardIdGet } from '@/api';
import { CardIdType, newCardDraft } from '@/state/slices';

export const getCardQueryOptions = (id: CardIdType) =>
  queryOptions({
    queryKey: ['card', id],
    queryFn: () =>
      id === 'new'
        ? newCardDraft
        : dataExtractionWrapper(
            readCardCardsCardIdGet({
              path: {
                card_id: id,
              },
            })
          ),
  });

export const useCard = (id: CardIdType) => {
  const { data: card, ...rest } = useQuery(getCardQueryOptions(id));

  return { card, ...rest };
};
