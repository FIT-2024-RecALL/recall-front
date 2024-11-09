import clsx from 'clsx';
import React, { useState } from 'react';
import Select, { MultiValue, Options } from 'react-select';

import { Button } from '@/components/library/Button';

import { useAppStore } from '@/state';

type Option<V> = { value: V; label: string };
const options: Options<Option<number>> = [
  { value: 0, label: 'Collection 0' },
  { value: 1, label: 'Test' },
  { value: 2, label: 'Real collection' },
];

export const EditCardControls: React.FC = () => {
  const cardData = useAppStore((state) => state.activeCard);
  const isEditMode = useAppStore((state) => state.activeCardUI.editActive);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<Option<number>>
  >([options[0]]);

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
        <Select
          unstyled
          classNames={{
            container: () => 'w-full',
            control: () => 'bg-1-2 rounded px-1',
            multiValue: () => 'bg-1-3 m-1 px-2 rounded center',
            multiValueRemove: () => 'pl-1',
            menuList: () => 'bg-1-2 my-1 py-1 divide-y-2 divide-black rounded',
            option: () => 'p-2 hover:bg-1-3',
            dropdownIndicator: () => 'mx-2',
          }}
          // components={animatedSelectComponents}
          isMulti
          isSearchable
          isClearable={false}
          options={options}
          defaultMenuIsOpen={false}
          defaultValue={[options[0]]}
          value={selectedOptions}
          onChange={(values, meta) => {
            if (values.length == 0) return;
            console.log(meta);
            setSelectedOptions(values);
          }}
        />
      </div>

      <div className="m-2 center h-1/12">
        <Button
          className="text-xl m-3"
          variant="plate"
          onClick={() => setUIFlag('editActive', (p) => !p)}
        >
          {isEditMode ? 'Preview' : 'Edit'}
        </Button>
        <Button
          className="text-xl m-3"
          variant="bordered"
          onClick={() => console.log(cardData)}
        >
          Save
        </Button>
      </div>
    </>
  );
};
