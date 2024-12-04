import {
  readCardsUserCardsGet,
  readCollectionCardsCollectionsCollectionIdCardsGet,
  readCollectionCollectionsCollectionIdGet,
  readUserUserProfileGet,
} from '@/api';
import { useQuery } from '@tanstack/react-query';
import { dataExtractionWrapper } from './dataExtractor';

export const useProfile = () => {
  const { data: profile, ...rest } = useQuery({
    queryKey: ['profile'],
    queryFn: () => dataExtractionWrapper(readUserUserProfileGet()),
  });

  return { profile, ...rest };
};

export const useProfileCards = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['profile', 'cards'],
    queryFn: () => dataExtractionWrapper(readCardsUserCardsGet()),
  });

  const cards = data?.map((card) => card.id);

  return { cards, ...rest };
};

export const useCollection = (id: number) => {
  const { data: collection, ...rest } = useQuery({
    queryKey: ['collection', id],
    queryFn: () =>
      dataExtractionWrapper(
        readCollectionCollectionsCollectionIdGet({
          path: {
            collection_id: id,
          },
        })
      ),
  });

  return { collection, ...rest };
};

export const useCollectionCards = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['collection', 'cards', id],
    queryFn: () =>
      dataExtractionWrapper(
        readCollectionCardsCollectionsCollectionIdCardsGet({
          path: {
            collection_id: id,
          },
        })
      ),
  });

  const cards = data?.map((card) => card.id);

  return { cards, ...rest };
};
