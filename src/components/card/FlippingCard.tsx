import clsx from 'clsx';
import React, { HTMLAttributes, useState } from 'react';
import { PopUp } from '@/components/library/PopUp';
import { Icon } from '@/components/library/Icon';
import { CardSide } from './CardSide';
import { Button } from '../library/Button';
import { CardType } from '../../state/slices/CollectionsState';

interface FlippingCardProps extends HTMLAttributes<React.FC> {
  isShown: boolean;
  close: () => void;
  mode: 'train' | 'edit';
  cardData: CardType;
}

export const FlippingCard: React.FC<FlippingCardProps> = ({
  isShown,
  close,
  mode,
  cardData,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <PopUp
      isShown={isShown}
      close={close}
      className="vstack center bg-1-5/50 backdrop-blur-sm"
    >
      <div
        className={clsx(
          'm-2 w-11/12 lg:w-3/4 h-3/4 md:h-2/3',
          'bg-gradient-to-r from-1-3 to-1-2 rounded-3xl',
          'border border-2 border-black',
          'flex items-center',
          'text-white',
          'transition-all duration-500 flip-inner',
          flipped && 'animate-flip'
        )}
      >
        <CardSide side="front">
          <h2 className="mb-2 text-2xl font-bold">Side 1</h2>
          <p className="text-lg">{cardData.frontSide}</p>
        </CardSide>
        <CardSide side="back">
          <h2 className="mb-2 text-2xl font-bold">Side 2</h2>
          <p className="text-lg">{cardData.backSide}</p>
        </CardSide>
        <div
          className={clsx(
            'absolute bottom-0',
            'flex justify-end',
            'w-full p-2',
            'transition-all',
            'hover:cursor-pointer hover:bg-1-8/10'
          )}
          onClick={() => setFlipped(!flipped)}
        >
          <Icon icon="arrowRight" className="w-7 h-7 md:w-10 md:h-10" />
        </div>
      </div>
      <div className="m-2 center vstack">
        {mode == 'edit' && (
          <Button className="text-xl" variant="bordered">
            Save
          </Button>
        )}
        {mode == 'train' && !flipped && (
          <Button variant="bordered" onClick={() => setFlipped(!flipped)}>
            Flip card
            <Icon icon="arrowRight" className="ml-1 w-7 h-7" />
          </Button>
        )}
        {mode == 'train' && flipped && (
          <div className="around">
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
        )}
      </div>
    </PopUp>
  );
};
