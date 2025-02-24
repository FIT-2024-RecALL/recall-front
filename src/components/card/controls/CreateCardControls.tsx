import clsx from 'clsx';
import React, { useState } from 'react';
import { MultiValue } from 'react-select';

import { Button } from '@/components/library';
import { useAppStore } from '@/state';
import { CollectionsSelect, Option } from './CollectionsSelect';
import { useCardCreate } from '@/query/mutationHooks';

export const CreateCardControls: React.FC = () => {
  const cardData = useAppStore((state) => state.activeCard);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<Option<number>>
  >([]);

  const { createCard, error: createError } = useCardCreate(() =>
    setUIFlag('zoomed', () => false)
  );

  return (
    <div
      className={clsx(
        'bg-o-white text-o-black rounded-xl',
        'w-full vstack',
        'border-2 border-black',
        'px-1 py-2'
      )}
    >
      <div className={clsx('vstack', 'w-full p-1 md:p-2')}>
        <span className="text-sm md:text-md text-center text-lg w-full pb-1">
          Paired with (at least one paired collection):
        </span>
        <CollectionsSelect
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
      {createError && (
        <div className={clsx('center mb-2', 'text-red-400 font-bold')}>
          {createError.message}
        </div>
      )}

      <div
        className={clsx(
          'mt-1 center',
          'transition-all duration-300',
          cardData.frontSide && cardData.backSide && selectedOptions.length > 0
            ? 'opacity-1'
            : 'opacity-0 invisible'
        )}
      >
        <Button
          className="text-xl"
          variant="plate-green"
          onClick={() => {
            createCard({
              card: { ...cardData },
              collections: selectedOptions?.map((option) => option.value),
            });
          }}
          withShadow
        >
          Create card
        </Button>
      </div>
    </div>
  );
};
