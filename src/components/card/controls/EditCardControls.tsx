import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '@/state';
import { useCardCollections } from '@/query/queryHooks';
import { useCardDelete, useCardUpdate } from '@/query/mutationHooks';
import { Button, Icon, LoadableComponent } from '@/components/library';
import {
  collectionResponseToOptions,
  CollectionsSelect,
  Option,
} from './CollectionsSelect';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui';

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

  const {
    updateCard,
    isPending: isUpdatePending,
    error: updateError,
  } = useCardUpdate(cardId, () => {
    setUIFlag('zoomed', () => false);
  });
  const {
    deleteCard,
    isPending: isDeletePending,
    error: deleteError,
  } = useCardDelete(cardId, () => {
    setUIFlag('zoomed', () => false);
  });

  return (
    <div
      className={clsx(
        'bg-o-white text-o-black rounded-xl',
        'w-full vstack',
        'border border-black',
        'px-1 py-2'
      )}
    >
      <div className={clsx('xs-md:vstack md:center w-full')}>
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
      <div className="mt-2 text-sm md:text-md center">
        <div
          className={clsx(
            'transition-all duration-300',
            cardData.frontSide &&
              cardData.backSide &&
              selectedOptions.length > 0
              ? 'opacity-100'
              : 'opacity-0 invisible absolute'
          )}
        >
          <Button
            variant="plate-green"
            onClick={() => {
              updateCard({
                new_card: { ...cardData },
                collections: selectedOptions.map((option) => option.value),
              });
            }}
            withShadow
            disabled={isUpdatePending || isDeletePending}
            shadowBoxClassName={
              cardData.frontSide &&
              cardData.backSide &&
              selectedOptions.length > 0
                ? 'opacity-100'
                : 'opacity-0 invisible'
            }
            title={t('common.saveChanges')}
          >
            {!isUpdatePending ? (
              <Icon icon="save" />
            ) : (
              <Icon className="animate-spin" icon="loading-3/4" />
            )}
          </Button>
        </div>
        <span
          className={clsx(
            'transition-all duration-300',
            cardData.frontSide &&
              cardData.backSide &&
              selectedOptions.length > 0
              ? 'opacity-0 invisible absolute'
              : 'opacity-100'
          )}
        >
          {t('card.requirements')}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="ml-3"
            disabled={isUpdatePending || isDeletePending}
          >
            <Button variant="bordered" title={t('card.deleteCard')}>
              {!isDeletePending ? (
                <Icon icon="trash" />
              ) : (
                <Icon className="animate-spin" icon="loading-3/4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button
                variant="plate-red"
                onClick={() => deleteCard()}
                title={t('common.confirmDeletion')}
              >
                {t('common.confirmDeletion')}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
