import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Select, { MultiValue, Options } from 'react-select';

import { Button } from '@/components/library/Button';

import { useAppStore } from '@/state';
import { useParams } from 'wouter';
import { EditPageParams } from '@/pages';
import {
  useProfileCollections,
  getCardCollectionsQueryOptions,
  useCardCollections,
  getCardQueryOptions,
} from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { updateCardCardsCardIdPut } from '@/api';

type Option<V> = { value: V; label: string };

export const EditCardControls: React.FC = () => {
  const { id: collectionId } = useParams<EditPageParams>(); // WE MUST GRANT THAT CREATION IS ONLY ON COLLECTION EDIT PAGE

  const cardData = useAppStore((state) => state.activeCard);

  const { collections, isPending: collectionsPending } =
    useProfileCollections();
  const { cardCollections, isPending: cardCollectionsPending } =
    useCardCollections(cardData.id, collectionId);
  // TODO: Добавить список запросов к коллекциям
  const [selectedOptions, setSelectedOptions] =
    useState<MultiValue<Option<number>>>();

  useEffect(() => {
    setSelectedOptions(
      cardCollections?.map((id) => ({
        value: id,
        label: `${id}`,
      }))
    );
  }, [cardCollections]);

  const client = useQueryClient();
  const { mutate, error } = useMutation({
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
    onSuccess: (responseData, requestData) => {
      client.invalidateQueries({ queryKey: ['collection'] }); // TODO: подумать, как оптимизировать этот запрос
      client.setQueryData(
        getCardQueryOptions(responseData.id).queryKey,
        responseData
      );
    },
  });

  return (
    <>
      <div
        className={clsx(
          'bg-1-1 rounded-xl',
          'xs-md:vstack md:center',
          'w-full p-1 md:p-4',
          'border border-2 border-black',
          'text-white'
        )}
      >
        <span className="md:text-right w-full md:w-1/6 px-1">Paired with:</span>
        <LoadableComponent
          isPending={collectionsPending || cardCollectionsPending}
        >
          <Select
            unstyled
            classNames={{
              container: () => 'w-full',
              control: () => 'bg-1-2 rounded px-1',
              multiValue: () => 'bg-1-3 m-1 px-2 rounded center',
              multiValueRemove: () => 'pl-1',
              menuList: () =>
                'bg-1-2 my-1 py-1 divide-y-2 divide-black rounded',
              option: () => 'p-2 hover:bg-1-3',
              dropdownIndicator: () => 'mx-2',
            }}
            // components={animatedSelectComponents}
            isMulti
            isSearchable
            isClearable={false}
            defaultMenuIsOpen={false}
            closeMenuOnSelect={false}
            maxMenuHeight={100}
            options={collections?.map((id) => ({
              value: id,
              label: `${id}`,
            }))}
            value={selectedOptions}
            onChange={(values) => {
              if (values.length == 0) return;
              setSelectedOptions(values);
            }}
          />
        </LoadableComponent>
      </div>
      <div className="m-2 center h-1/12">
        <Button
          className="text-xl m-3"
          variant="bordered"
          onClick={() => {
            if (cardData.id !== 'new') {
              const data = {
                id: cardData.id,
                new_card: { ...cardData },
                collections:
                  selectedOptions?.map((option) => option.value) ?? [],
              };
              console.log(data);
              mutate(data);
            }
          }}
        >
          Save
        </Button>
        {error && error.message}
      </div>
    </>
  );
};
