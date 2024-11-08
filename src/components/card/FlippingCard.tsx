import clsx from 'clsx';
import React, { HTMLAttributes, useState } from 'react';
import Select, { MultiValue, Options } from 'react-select';
import getAnimatedComponents from 'react-select/animated';

import { PopUp } from '@/components/library/PopUp';
import { Icon } from '@/components/library/Icon';
import { Button } from '@/components/library/Button';
import { EditorComponent } from '@/components/editor/EditorComponent';

import { CardSide } from './CardSide';
import { useAppStore } from '@/state';

interface FlippingCardProps extends HTMLAttributes<React.FC> {
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

const animatedSelectComponents = getAnimatedComponents();

export const FlippingCard: React.FC<FlippingCardProps> = ({
  isShown,
  close,
  mode,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const cardData = useAppStore((state) => state.activeCard);
  const setCardSide = useAppStore((state) => state.setActiveCardSide);
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<Option<number>>
  >([options[0]]);

  return (
    <PopUp
      isShown={isShown}
      close={close}
      className="vstack center bg-1-5/50 backdrop-blur-sm"
    >
      <div
        className={clsx(
          'm-2 w-11/12 lg:w-3/4 h-3/4 md:h-2/3',
          'bg-1-1 rounded-3xl',
          'border border-2 border-black',
          'text-white',
          'transition-all duration-500 flip-inner',
          flipped && 'animate-flip'
        )}
      >
        <div className="xs-md:vstack md:center w-full py-2 px-2 md:px-6">
          <span className="md:text-right w-full md:w-1/6">Paired with:</span>
          <Select
            unstyled
            classNames={{
              container: () => 'w-full md:m-2',
              control: () => 'bg-1-2 rounded',
              multiValue: () => 'bg-1-3 m-1 px-2 py-1 rounded center',
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
        <CardSide side="front">
          <EditorComponent
            state={cardData.frontSide}
            setState={(s) => setCardSide('frontSide', s)}
            active={mode == 'edit' && isEditMode}
            extended
          />
        </CardSide>
        <CardSide side="back">
          <EditorComponent
            state={cardData.backSide}
            setState={(s) => setCardSide('backSide', s)}
            active={mode == 'edit' && isEditMode}
          />
        </CardSide>
        <div
          className={clsx(
            'absolute bottom-0',
            'h-1/12',
            'flex justify-end',
            'w-full p-2',
            'overflow-hidden',
            'transition-all',
            'hover:cursor-pointer hover:bg-1-8/10'
          )}
          onClick={() => setFlipped((f) => !f)}
        >
          <Icon icon="arrowRight" className="w-7 h-7 md:w-10 md:h-10" />
        </div>
      </div>
      {mode == 'edit' && (
        <div className="m-2 center">
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
    </PopUp>
  );
};
