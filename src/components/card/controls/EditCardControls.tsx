import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppStore } from '@/state';
import {
  useCardCollections,
  getCardQueryOptions,
  getCardCollectionsQueryOptions,
} from '@/query/queryHooks';
import { dataExtractionWrapper } from '@/query';
import { deleteCardCardsCardIdDelete, updateCardCardsCardIdPut } from '@/api';
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

  const client = useQueryClient();
  const { mutate: updateCard, error: updateError } = useMutation({
    mutationFn: (data: {
      id: number;
      new_card: { frontSide: string; backSide: string };
      collections: number[];
    }) =>
      dataExtractionWrapper(
        updateCardCardsCardIdPut({
          path: {
            card_id: data.id,
          },
          body: {
            ...data,
          },
        })
      ),
    onSuccess: (responseData) => {
      client.invalidateQueries({ queryKey: ['collection'] }); // TODO: подумать, как оптимизировать этот запрос
      client.invalidateQueries({
        queryKey: getCardCollectionsQueryOptions(responseData.id).queryKey,
      });
      client.setQueryData(
        getCardQueryOptions(responseData.id).queryKey,
        responseData
      );
      setUIFlag('zoomed', () => false);
    },
  });
  const { mutate: deleteCard, error: deleteError } = useMutation({
    mutationFn: (id: number) =>
      dataExtractionWrapper(
        deleteCardCardsCardIdDelete({
          path: {
            card_id: id,
          },
        })
      ),
    onSuccess: (responseData, id) => {
      client.invalidateQueries({ queryKey: ['collection'] }); // TODO: подумать, как оптимизировать этот запрос
      client.resetQueries({
        queryKey: getCardCollectionsQueryOptions(id).queryKey,
      });
      client.refetchQueries({
        queryKey: getCardQueryOptions(id).queryKey,
      });
      setUIFlag('zoomed', () => false);
    },
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
          variant="bordered"
          onClick={() => {
            updateCard({
              id: cardId,
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
            variant="bordered"
            onClick={() => deleteCard(cardId)}
          >
            Confirm deletion
          </Button>
        </DropDown>
      </div>
    </>
  );
};
