import clsx from 'clsx';
import React, { useState } from 'react';
import { MultiValue } from 'react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/library';
import { useAppStore } from '@/state';
import {
  getCardQueryOptions,
  getProfileCardsQueryOptions,
  getCardCollectionsQueryOptions,
} from '@/query/queryHooks';
import { dataExtractionWrapper } from '@/query';
import { createCardCardsPost } from '@/api';
import { CollectionsSelect, Option } from './CollectionsSelect';

export const CreateCardControls: React.FC = () => {
  const cardData = useAppStore((state) => state.activeCard);

  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<Option<number>>
  >([]);

  const client = useQueryClient();
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
          <CollectionsSelect
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
        {createError && (
          <div className={clsx('center mb-2', 'text-red-200 font-bold')}>
            {createError.message}
          </div>
        )}
      </div>
      <div className="m-2 center h-1/12">
        <Button
          className="text-xl m-3"
          variant="bordered"
          onClick={() => {
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
