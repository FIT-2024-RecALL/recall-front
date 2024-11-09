import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Select, { MultiValue, Options } from 'react-select';

import { Button } from '@/components/library/Button';

import { useAppStore } from '@/state';
import { useParams } from 'wouter';
import { EditPageParams } from '@/pages';

type Option<V> = { value: V; label: string };

const options: Options<Option<number>> = [
  { value: 0, label: 'Collection 0' },
  { value: 1, label: 'Test' },
  { value: 2, label: 'Real collection' },
];

const getAllOptionsPseudoRequest = async () => {
  return options;
};

const getCardOptionsPseudoRequest = async (cardId: number) => {
  return [options[0]];
};

export const EditCardControls: React.FC = () => {
  const { id } = useParams<EditPageParams>(); // WE MUST GRANT THAT CREATION IS ONLY ON COLLECTION EDIT PAGE

  const cardData = useAppStore((state) => state.activeCard);
  const isEditMode = useAppStore((state) => state.activeCardUI.editActive);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);
  const [allOptions, setAllOptions] = useState<MultiValue<Option<number>>>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<Option<number>>
  >([]);

  useEffect(() => {
    getAllOptionsPseudoRequest().then((options) => setAllOptions(options));
    if (cardData.id === 'new') {
      getAllOptionsPseudoRequest().then((options) =>
        setSelectedOptions(
          options.filter((option) => option.value === Number(id))
        )
      );
    } else {
      getCardOptionsPseudoRequest(cardData.id).then((options) =>
        setSelectedOptions(options)
      );
    }
  }, [id, cardData.id]);

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
        {/* TODO: Вынести в отдельный компонент */}
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
          options={allOptions}
          defaultMenuIsOpen={false}
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
          onClick={() => {
            console.log(
              `Card ${cardData.id} data for ${
                cardData.id === 'new' ? 'POST' : 'PUT'
              } request: `
            );
            console.log(cardData);
            if (cardData.backSide === '' || cardData.backSide === '')
              console.error('Invalid sides');
            console.log(
              `Card ${cardData.id} connections for ${
                cardData.id === 'new' ? 'POST' : 'PUT'
              } request: `
            );
            console.log(selectedOptions);
            if (selectedOptions.length < 1)
              console.error('Invalid connections');
          }}
        >
          Save
        </Button>
        {/* TODO: Добавить сообщение об ошибке */}
      </div>
    </>
  );
};
