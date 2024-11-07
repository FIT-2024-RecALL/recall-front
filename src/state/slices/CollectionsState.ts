import { Immutable } from 'immer';

import { Slice } from '@/state';
import { CardType } from './ActiveCardState';

export type CollectionType = {
  id: number;
  title: string;
  description: string;
  isPublic: boolean;
  cards: CardType[];
};
export type CollectionsState = Immutable<{
  collections: CollectionType[];
}>;

function getCardExample(id: number): Immutable<CardType> {
  return {
    id: id,
    previewText: `Card ${id}`,
    frontSide:
      '# The first side \n Here will be **question** \n ' +
      'Photos: ![Cat photo](https://avatars.mds.yandex.net/i?id=76dd9d5c1922688236a4dca063bc3c2ce3dafd22-5283663-images-thumbs&n=13)' +
      'audios: ![Bip sound](https://sanstv.ru/test/audio/test.wav)' +
      'and videos: ![Waterfall video](https://tekeye.uk/html/images/Joren_Falls_Izu_Jap.mp4)' + 
      'are available! \n ' +
      'And also $LaTeX$...',
    backSide: '# The second side \n Here will be *answer* \n (Only basic markup is available)',
  };
}

export const CollectionSelectorsFactories = {
  getCollection: (id: number) => (state: CollectionsState) => {
    return state.collections.find((collection) => collection.id === id);
  },
};

export const createCollectionsStateSlice: Slice<CollectionsState> = (
  mutate
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
  };
};
