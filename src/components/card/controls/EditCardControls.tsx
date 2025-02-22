import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';

import { useAppStore } from '@/state';
import { useCardCollections } from '@/query/queryHooks';
import { useCardDelete, useCardUpdate } from '@/query/mutationHooks';
import { Button, DropDown, LoadableComponent } from '@/components/library';
import {
  collectionResponseToOptions,
  CollectionsSelect,
  Option,
} from './CollectionsSelect';

export const EditCardControls: React.FC = () => {
  const cardId = useAppStore((state) => state.activeCardId);
  const cardData = useAppStore((state) => state.activeCard);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  const { cardCollections, isPending: cardCollectionsPending } =
    useCardCollections(cardId);
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<Option<number>>
  >([]);

  useEffect(() => {
    setSelectedOptions(collectionResponseToOptions(cardCollections));
  }, [cardCollections]);

  const { updateCard, error: updateError } = useCardUpdate(cardId, () => {
    setUIFlag('zoomed', () => false);
  });
  const { deleteCard, error: deleteError } = useCardDelete(cardId, () => {
    setUIFlag('zoomed', () => false);
  });

  return (
    <>
      <div
        className={clsx(
          'bg-1-1 rounded-xl',
          'w-full vstack',
          'border border-2 border-black',
          'text-white'
        )}
      >
        <div className={clsx('xs-md:vstack md:center', 'w-full p-1 md:p-4')}>
          <span className="md:text-right w-full md:w-1/6 px-1">
            Paired with:
          </span>
          <LoadableComponent isPending={cardCollectionsPending}>
            <CollectionsSelect
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </LoadableComponent>
        </div>
        {(updateError || deleteError) && (
          <div className={clsx('center mb-2', 'text-red-200 font-bold')}>
            {updateError?.message || deleteError?.message}
          </div>
        )}
      </div>
      <div className={clsx('m-2 center h-1/12')}>
        <Button
          className={clsx(
            'text-xl m-3',
            'transition-all duration-300',
            cardData.frontSide &&
              cardData.backSide &&
              selectedOptions.length > 0
              ? 'opacity-1'
              : 'opacity-0 invisible'
          )}
          variant="plate-green"
          onClick={() => {
            updateCard({
              new_card: { ...cardData },
              collections: selectedOptions.map((option) => option.value),
            });
          }}
        >
          Save card
        </Button>
        <DropDown
          buttonComponent={
            <Button className="ml-3" variant="bordered">
              Delete card
            </Button>
          }
        >
          <Button
            className="m-3"
            variant="plate-red"
            onClick={() => deleteCard()}
          >
            Confirm deletion
          </Button>
        </DropDown>
      </div>
    </>
  );
};
