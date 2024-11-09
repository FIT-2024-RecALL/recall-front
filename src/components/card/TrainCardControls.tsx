import clsx from 'clsx';
import React from 'react';
import { Icon } from '@/components/library/Icon';

import { Button } from '@/components/library/Button';

import { useAppStore } from '@/state';

export const TrainCardControls: React.FC = () => {
  const flipped = useAppStore((state) => state.activeCardUI.flipped);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  return (
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
        onClick={() => setUIFlag('flipped', () => true)}
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
  );
};
