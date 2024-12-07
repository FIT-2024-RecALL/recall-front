import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';

import { Button } from '@/components/library/Button';

import { useAppStore } from '@/state';
import {
  useProfileCollections,
  useCardCollections,
  getCardQueryOptions,
  getProfileCardsQueryOptions,
  getCardCollectionsQueryOptions,
} from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import {
  CollectionShort,
  createCardCardsPost,
  updateCardCardsCardIdPut,
} from '@/api';

type Option<V> = { value: V; label: string };

const collectionResponseToOptions = (collections?: CollectionShort[]) =>
  collections?.map((collection) => ({
    value: collection.id,
    label: collection.title,
  })) ?? [];

export const EditCardControls: React.FC = () => {
  const cardData = useAppStore((state) => state.activeCard);

  const { collections, isPending: collectionsPending } =
    useProfileCollections();
  const { cardCollections, isPending: cardCollectionsPending } =
    useCardCollections(cardData.id);
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
    onSuccess: (responseData, requestData) => {
      client.invalidateQueries({ queryKey: ['collection'] }); // TODO: подумать, как оптимизировать этот запрос
      client.invalidateQueries({
        queryKey: getCardCollectionsQueryOptions(responseData.id).queryKey,
      });
      client.setQueryData(
        getCardQueryOptions(responseData.id).queryKey,
        responseData
      );
    },
  });

  const { mutate: createCard, error: createError } = useMutation({
    mutationFn: (data: {
      card: { frontSide: string; backSide: string };
      collections: number[];
    }) =>
      dataExtractionWrapper(
        createCardCardsPost({
          body: {
            ...data,
          },
        })
      ),
    onSuccess: (responseData, requestData) => {
      client.invalidateQueries({ queryKey: ['collection'] });
      client.invalidateQueries({
        queryKey: getCardCollectionsQueryOptions(responseData.id).queryKey,
      });
      client.invalidateQueries({
        queryKey: getProfileCardsQueryOptions().queryKey,
      });
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
          'w-full vstack',
          'border border-2 border-black',
          'text-white'
        )}
      >
        <div className={clsx('xs-md:vstack md:center', 'w-full p-1 md:p-4')}>
          <span className="md:text-right w-full md:w-1/6 px-1">
            Paired with:
          </span>
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
              options={collectionResponseToOptions(collections)}
              value={selectedOptions}
              onChange={(values) => {
                if (values.length == 0) return;
                setSelectedOptions(values);
              }}
            />
          </LoadableComponent>
        </div>
        {(updateError || createError) && (
          <div className={clsx('center mb-2', 'text-red-200 font-bold')}>
            {updateError?.message || createError?.message}
          </div>
        )}
      </div>
      <div className="m-2 center h-1/12">
        <Button
          className="text-xl m-3"
          variant="bordered"
          onClick={() => {
            if (cardData.id !== 'new')
              updateCard({
                id: cardData.id,
                new_card: { ...cardData },
                collections: selectedOptions?.map((option) => option.value),
              });
            else
              createCard({
                card: { ...cardData },
                collections: selectedOptions?.map((option) => option.value),
              });
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};
