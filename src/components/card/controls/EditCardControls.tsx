import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    <div
      className={clsx(
        'bg-o-white text-o-black rounded-xl',
        'w-full vstack',
        'border-2 border-black',
        'px-1 py-2'
      )}
    >
      <div className={clsx('xs-md:vstack md:center w-full')}>
        {/* <span className="md:text-right w-full md:w-1/6 px-1">
          {t('card.pairedWithShort')}
        </span> */}
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
      <div className="mt-2 center">
        <Button
          className="text-xl"
          variant="plate-green"
          onClick={() => {
            updateCard({
              new_card: { ...cardData },
              collections: selectedOptions.map((option) => option.value),
            });
          }}
          withShadow
          shadowBoxClassName={
            cardData.frontSide &&
            cardData.backSide &&
            selectedOptions.length > 0
              ? 'opacity-1'
              : 'opacity-0 invisible'
          }
          title={t('common.saveChanges')}
        >
          {t('common.saveChanges')}
        </Button>
        <DropDown
          buttonComponent={
            <Button
              className="ml-3"
              variant="bordered"
              title={t('card.deleteCard')}
            >
              {t('card.deleteCard')}
            </Button>
          }
        >
          <Button
            className="m-3"
            variant="plate-red"
            onClick={() => deleteCard()}
            title={t('common.confirmDeletion')}
          >
            {t('common.confirmDeletion')}
          </Button>
        </DropDown>
      </div>
    </div>
  );
};
