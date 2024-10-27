import { Immutable } from 'immer';

import { Slice } from '@/state';

export type CardType = {
  id: number;
  previewText: string;
  frontSide: string;
  backSide: string;
};
export type CollectionType = {
  id: number;
  title: string;
  description: string;
  isPublic: boolean;
  cards: [CardType];
};
export type CollectionsState = Immutable<{
  collections: [CollectionType];
  getCollection: (id: number) => Immutable<CollectionType> | undefined;
}>;

function getCardExample(id: number): Immutable<CardType> {
  return {
    id: id,
    previewText: `Card ${id}`,
    frontSide:
      'Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. ',
    backSide:
      'Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. ',
  };
}

export const createCollectionsStateSlice: Slice<CollectionsState> = (
  mutate,
  _,
  get
) => {
  return {
    collections: [
      {
        id: 1,
        title: 'The first collection',
        description: 'The first test collection',
        isPublic: true,
        cards: [
          { ...getCardExample(0) },
          { ...getCardExample(1) },
          { ...getCardExample(2) },
          { ...getCardExample(3) },
          { ...getCardExample(4) },
          { ...getCardExample(5) },
          { ...getCardExample(6) },
        ],
      },
    ],
    getCollection: (id: number) => {
      return get().collections.find((collection) => collection.id === id);
    },
  };
};
