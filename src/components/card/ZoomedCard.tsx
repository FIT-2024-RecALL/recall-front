import clsx from 'clsx';
import React, { HTMLAttributes, useState } from 'react';
import Select, { MultiValue, Options } from 'react-select';

import { PopUp } from '@/components/library/PopUp';
import { Icon } from '@/components/library/Icon';
import { Button } from '@/components/library/Button';
import { FlippingCard } from './FlippingCard';

import { useAppStore } from '@/state';

interface ZoomedCardProps extends HTMLAttributes<React.FC> {
  isShown: boolean;
  close: () => void;
  mode: 'train' | 'edit';
}

type Option<V> = { value: V; label: string };
const options: Options<Option<number>> = [
  { value: 0, label: 'Collection 0' },
  { value: 1, label: 'Test' },
  { value: 2, label: 'Real collection' },
];

export const ZoomedCard: React.FC<ZoomedCardProps> = ({
  isShown,
  close,
  mode,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const cardData = useAppStore((state) => state.activeCard);
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<Option<number>>
  >([options[0]]);

  return (
    <PopUp
      isShown={isShown}
      close={close}
      className="center bg-1-5/50 backdrop-blur-sm"
    >
      <div className={clsx('w-11/12 lg:w-3/4 h-11/12 lg:h-5/6 center vstack')}>
        <FlippingCard
          className={clsx(
            'm-1 md:m-4 w-full h-5/6',
            'bg-1-1 rounded-xl',
            'border border-2 border-black',
            'text-white'
          )}
          isEditMode={mode == 'edit' && isEditMode}
        />
        {mode == 'edit' && (
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
              <span className="md:text-right w-full md:w-1/6 px-1">
                Paired with:
              </span>
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
                onClick={() => setIsEditMode((p) => !p)}
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
        )}
        {mode == 'train' && (
          <div
            className={clsx(
              'm-6 center vstack w-1/2',
              'transition-all duration-500 flip-inner',
              flipped && 'animate-flip'
            )}
          >
            <Button
              className="flip-front"
              variant="bordered"
              onClick={() => setFlipped(!flipped)}
            >
              <span>Flip card</span>
              <Icon icon="arrowRight" className="ml-1 w-7 h-7" />
            </Button>
            <div className="around flip-back">
              <Button className="m-1" variant="bordered">
                1
              </Button>
              <Button className="m-1" variant="bordered">
                2
              </Button>
              <Button className="m-1" variant="bordered">
                3
              </Button>
              <Button className="m-1" variant="bordered">
                4
              </Button>
              <Button className="m-1" variant="bordered">
                5
              </Button>
            </div>
          </div>
        )}
      </div>
    </PopUp>
  );
};
