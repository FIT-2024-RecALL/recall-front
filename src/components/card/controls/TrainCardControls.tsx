import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { Icon, Button } from '@/components/library';
import { useAppStore } from '@/state';
import { DescreteTrainButton, marks } from './DescreteTrainButton';

export const TrainCardControls: React.FC = () => {
  const [flippedCount, setFlippedCount] = useState(0);
  const flipped = useAppStore((state) => state.activeCardUI.flipped);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  useEffect(() => setFlippedCount((val) => val + 1), [flipped]);
  useEffect(() => setFlippedCount(0), []);


  return (
    <div
      className={clsx(
        'm-6 center vstack w-1/2',
        'transition-all duration-500 flip-inner',
        flipped && 'animate-flip'
      )}
    >
      {flippedCount >= 2 ? (
        <div className="around flip-front">
          {marks.map((mark) => (
            <DescreteTrainButton key={mark} mark={mark} />
          ))}
        </div>
      ) : (
        <Button
          className="flip-front"
          variant="bordered"
          onClick={() => setUIFlag('flipped', () => true)}
        >
          <span>Flip card</span>
          <Icon icon="arrowRight" className="ml-1 w-7 h-7" />
        </Button>
      )}
      <div className="around flip-back">
        {marks.map((mark) => (
          <DescreteTrainButton key={mark} mark={mark} />
        ))}
      </div>
    </div>
  );
};
